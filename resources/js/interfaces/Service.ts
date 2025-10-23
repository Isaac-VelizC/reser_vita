export interface ServiceInterface {
    id: number;
    name: string;
    description: string;
    duration_minutes: number;
    price: number;
    icon: string;
    status: 'active' | 'inactive';
    created_at?: string;
    updated_at?: string;
}