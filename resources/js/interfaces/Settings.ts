import { CurrenryItems, LanguageItems } from "@/types";

export interface SettingInterface {
    id: number;
    currency: CurrenryItems;
    language: LanguageItems;
    logo: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    address2: string;
    years_experience: number;
}

export type DayFromBackend = {
    id?: number; // puede venir o no
    day_of_week: number; // 0..6 (Lunes..Domingo)
    is_open: boolean;
};

export type HourFromBackend = {
    id?: number;
    name: string;
    open_time: string; // "09:00:00" o "09:00"
    close_time: string; // "13:00:00"
    salon_day_id: number; // referencia al id del day en backend
};

export interface ScheduleInterface {
    id: number;
    day_of_week: number;
    is_open: boolean;
    hours: HourFromBackend[];
}
