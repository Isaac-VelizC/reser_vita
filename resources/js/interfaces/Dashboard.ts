import { StatusKey } from "@/types";

export type Trend = "up" | "down" | "warning" | "none";

export type Kpis = {
    reservas_hoy: { value: number; change: string; trend: Trend };
    estilistas_activos: { value: number; change: string; trend: Trend };
    ingresos_dia: { value: number; change: string; trend: Trend };
    horas_disponibles: { value: number; change: string; trend: Trend };
    pendientes: { value: number; change: string; trend: Trend };
    cancelaciones: { value: number; change: string; trend: Trend };
};


export type ReservasHoy = {
    id: number;
    time: string;
    client: string;
    service: string;
    stylist: string;
    status: StatusKey;
    notes: string;
};

export type HorariosSemana = {
    day: number;
    is_open: boolean;
    open: string;
    close: string;
    hours: number;
};

export type Estilistas = {
    id: number;
    name: string;
    avatar_color: string;
    reservas_dia: number;
    reservas_mes: number;
    ingresos: number;
    desempeno: number;
};

export type ServiciosPopulares = {
    name: string;
    count: number;
    percentage: number;
};

export type EstadoReservas = {
    pending: number;
    confirmed: number;
    completed: number;
    canceled: number;
};

export type ActividadReciente = {
    type: string;
    message: string;
    time: string;
    color: string;
};

export type ReservasSemana = { day: string; count: number };
