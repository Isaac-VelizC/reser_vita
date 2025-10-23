import { AvailabilityInterface } from "./Availability";

export interface UserInterface {
    id: number;
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'stylist';
    status: 'active' | 'inactive' | 'suspended';
    created_at: string;
    updated_at: string;
};

export interface StylistInterface {
    id: number;
    name: string;
    email: string;
    phone: string;
    status: string;
    availabilities: AvailabilityInterface[];
};

export interface UserFormInterface {
    id?: number;
    name: string;
    email: string;
    phone: string;
    role: 'admin' | 'stylist';
    status: string;
};