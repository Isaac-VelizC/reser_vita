import { AvailabilityInterface } from "@/interfaces/Availability";
import { StylistInterface } from "@/interfaces/Profile";
import { ReservationInterface } from "@/interfaces/Reservation";
import { ServiceInterface } from "@/interfaces/Service";
import dayjs from "dayjs";
import isToday from "dayjs/plugin/isToday";
dayjs.extend(isToday);
import { useMemo } from "react";

interface SlotInterface {
  time: string;
  available: boolean;
}

interface UseAvailableSlotsParams {
  selectedStylist?: StylistInterface | null;
  selectedService?: ServiceInterface | null;
  date?: string;
  reservations?: ReservationInterface[];
}

export const useAvailableTimeSlots = ({
  selectedStylist,
  selectedService,
  date,
  reservations = [],
}: UseAvailableSlotsParams): SlotInterface[] => {
  return useMemo(() => {
    if (!selectedStylist || !selectedService || !date) return [];

    const selectedDate = dayjs(date, "YYYY-MM-DD");
    const dayOfWeek = selectedDate.day(); // 0=domingo, 1=lunes...

    // 1️⃣ Tomar todas las disponibilidades del estilista en ese día
    const availabilities = selectedStylist.availabilities.filter(
      (av: AvailabilityInterface) =>
        av.day.day_of_week === dayOfWeek &&
        av.is_working &&
        av.is_available &&
        av.hour &&
        av.hour.open_time &&
        av.hour.close_time
    );

    if (availabilities.length === 0) return [];

    const serviceDuration = selectedService.duration_minutes;
    let slots: SlotInterface[] = [];

    // 2️⃣ Generar slots por cada bloque horario (ej. 9–13 y 15–20)
    for (const av of availabilities) {
      const open = dayjs(`2000-01-01T${av.hour.open_time}`);
      const close = dayjs(`2000-01-01T${av.hour.close_time}`);
      let current = open;

      while (
        current.add(serviceDuration, "minute").isBefore(close) ||
        current.add(serviceDuration, "minute").isSame(close)
      ) {
        slots.push({ time: current.format("HH:mm"), available: true });
        current = current.add(serviceDuration, "minute");
      }
    }

    // 3️⃣ Filtrar horarios pasados si la fecha es hoy
    if (selectedDate.isToday()) {
      const now = dayjs();
      const currentTime = dayjs(`2000-01-01T${now.format("HH:mm")}`);
      slots = slots.filter((slot) =>
        dayjs(`2000-01-01T${slot.time}`).isAfter(currentTime)
      );
    }

    // 4️⃣ Bloquear horarios ocupados (reservas pendientes o confirmadas)
    const stylistReservations = reservations.filter(
      (r) =>
        r.stylist_id === selectedStylist.id &&
        r.date === date &&
        ["pending", "confirmed"].includes(r.status)
    );

    slots = slots.map((slot) => {
      const slotStart = dayjs(`2000-01-01T${slot.time}`);
      const slotEnd = slotStart.add(serviceDuration, "minute");

      const isOccupied = stylistReservations.some((r) => {
        const resStart = dayjs(`2000-01-01T${r.time}`);
        const resServiceDuration = r.service?.duration_minutes ?? 0;
        const resEnd = resStart.add(resServiceDuration, "minute");

        return (
          slotStart.isBefore(resEnd) &&
          slotEnd.isAfter(resStart) // 👈 se solapan
        );
      });

      return { ...slot, available: !isOccupied };
    });

    // 5️⃣ Eliminar duplicados (por si dos bloques generan misma hora)
    const uniqueSlots = Object.values(
      slots.reduce((acc, slot) => {
        acc[slot.time] = acc[slot.time] ?? slot;
        return acc;
      }, {} as Record<string, SlotInterface>)
    );

    // 6️⃣ Ordenar horarios
    uniqueSlots.sort((a, b) =>
      dayjs(`2000-01-01T${a.time}`).isBefore(dayjs(`2000-01-01T${b.time}`))
        ? -1
        : 1
    );

    return uniqueSlots;
  }, [selectedStylist, selectedService, date, reservations]);
};
