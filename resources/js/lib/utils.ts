import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-ES', {
        style: 'currency',
        currency: 'USD',
        minimumFractionDigits: 0,
    }).format(price);
};

export const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
        return `${hours}h ${mins > 0 ? `${mins}m` : ''}`;
    }
    return `${mins} min`;
};

export const formatTime = (time: string) => {
    return time;
};

export function getDayName(dayNumber: number) {
    const days = [
        "Domingo",    // 0
        "Lunes",      // 1
        "Martes",     // 2
        "Miércoles",  // 3
        "Jueves",     // 4
        "Viernes",    // 5
        "Sábado"      // 6
    ];

    return days[dayNumber] ?? "Día inválido";
}

export function ensureTimeHHMM (t: string) {
    // acepta "09:00:00" o "09:00" y devuelve "09:00"
    if (!t) return '';
    return t.length === 8 ? t.slice(0, 5) : t;
};

export function toBackendTime (hhmm: string) {
    if (!hhmm) return '';
    return hhmm.length === 5 ? `${hhmm}:00` : hhmm;
};
