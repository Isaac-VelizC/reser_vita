// useToast.tsx
import { createContext, ReactNode, useState } from 'react';

type Toast = {
    id: number;
    type: 'info' | 'success' | 'error' | 'warning';
    message: string;
};
type ToastContextType = {
    toasts: Toast[];
    addToast: (toast: Omit<Toast, 'id'>) => void;
    removeToast: (id: number) => void;
};

export const ToastContext = createContext<ToastContextType | undefined>(
    undefined,
);

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const addToast = (toast: Omit<Toast, 'id'>) => {
        const id = Date.now();
        setToasts((prev) => [...prev, { id, ...toast }]);
        setTimeout(() => removeToast(id), 4000); // auto-remove después de 4s
    };

    const removeToast = (id: number) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    return (
        <ToastContext.Provider value={{ toasts, addToast, removeToast }}>
            {children}
            <div className="fixed top-4 right-4 z-50 flex flex-col gap-3">
                {toasts.map((t) => (
                    <div
                        key={t.id}
                        className={`flex w-80 animate-[fade-in-right_0.4s_ease-out] items-center gap-3 rounded-lg px-4 py-3 text-white shadow-lg ${
                            t.type === 'success'
                                ? 'bg-green-500'
                                : t.type === 'error'
                                  ? 'bg-red-500'
                                  : t.type === 'warning'
                                    ? 'bg-amber-500'
                                    : 'bg-blue-500'
                        } `}
                    >
                        <span className="font-medium">{t.message}</span>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
