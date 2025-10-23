import { StylistInterface } from "./Profile";
import { ServiceInterface } from "./Service";


export interface ClientInterface {
    id: number;
    name: string;
    surname: string;
    email: string;
    phone: string;
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    updated_at: string;
};

export interface ReservationInterface {
    id: number;
    customer_id: number;
    customer: ClientInterface;
    stylist_id: number;
    stylist: StylistInterface;
    service_id: number;
    service: ServiceInterface;
    date: string;
    time: string;
    status: 'pending' | 'confirmed' | 'in_progress' | 'completed' | 'canceled';
    notes?: string;
    created_at: string;
    updated_at: string;
}

export interface ReservationFormInterface {
    // id: number;
    customer_id: number | null;
    stylist_id: number | null;
    service_id: number | null;
    date: string;
    time: string;
    notes?: string;
}

export type ReservationErrorsMessage = {
    customer_id: string;
    service_id: string;
    stylist_id: string;
    date: string;
    time: string;
}