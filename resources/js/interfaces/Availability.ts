export interface SalonDayInterface {
    id: number;
    day_of_week: number;
    is_open: boolean;
    hours: SalonHourInterface[];
}

export interface SalonHourInterface {
    id: number;
    name: string;
    open_time: string;
    close_time: string;
    salon_day_id: number;
}

export interface AvailabilityInterface {
    id: number;
    salon_day_id: number;
    day: SalonDayInterface;
    salon_hour_id: number;
    hour: SalonHourInterface;
    is_working: boolean;
    is_available: boolean;
    stylist_id: number;
    created_at?: string;
    updated_at?: string;
}
