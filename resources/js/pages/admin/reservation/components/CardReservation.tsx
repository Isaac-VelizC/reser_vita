import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useToast } from '@/hooks/useToast';
import { ReservationInterface } from '@/interfaces/Reservation';
import { getStatusBadge } from '@/lib/funtionsUtils';
import admin from '@/routes/admin';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';
import { Clock, User } from 'lucide-react';
import { useState } from 'react';

type CardReservationProps = {
    reservation: ReservationInterface;
};

export default function CardReservation({ reservation }: CardReservationProps) {
    const { addToast } = useToast();
    const [loading, setLoading] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        try {
            setLoading(true);
            await router.put(
                admin.reservations.updateStatus(reservation.id).url,
                {
                    status: newStatus,
                },
                {
                    preserveScroll: true,
                    onSuccess: () => {
                        // Opcional: mensaje visual elegante
                        addToast({
                            type: 'success',
                            message: 'Estado actualizado correctamente.',
                        });
                    },
                    onError: (errors) => {
                        addToast({
                            type: 'error',
                            message: 'Error al actualizar el estado.',
                        });
                        console.error(errors);
                    },
                },
            );
        } catch (error) {
            console.error('Error actualizando estado:', error);
        } finally {
            setLoading(false);
        }
    };

    const renderActionButtons = () => {
        const status = reservation.status;

        if (status === 'pending') {
            return (
                <div className="flex gap-4">
                    <Button
                        onClick={() => handleStatusChange('confirmed')}
                        disabled={loading}
                        color="info"
                        size={'sm'}
                    >
                        Confirmar
                    </Button>
                    <Button
                        onClick={() => handleStatusChange('cancelled')}
                        disabled={loading}
                        color="error"
                        size={'sm'}
                    >
                        Cancelar
                    </Button>
                </div>
            );
        }

        if (status === 'confirmed') {
            return (
                <Button
                    onClick={() => handleStatusChange('in_progress')}
                    disabled={loading}
                    color="warning"
                    size={'sm'}
                >
                    Iniciar trabajo
                </Button>
            );
        }

        if (status === 'in_progress') {
            return (
                <Button
                    onClick={() => handleStatusChange('completed')}
                    disabled={loading}
                    color="success"
                    size={'sm'}
                >
                    Finalizar
                </Button>
            );
        }

        // Para completadas o canceladas, no hay acciones
        return null;
    };

    return (
        <Card className="p-4 shadow transition hover:shadow-lg">
            <div className="mb-2 flex items-center justify-between">
                <span>{getStatusBadge(reservation.status)}</span>
                <span className="text-sm text-gray-500">
                    {dayjs(reservation.date).format('MMMM D, YYYY')}
                </span>
            </div>

            <h3 className="text-lg font-semibold">
                {reservation.service.name}
            </h3>

            <div className="mt-2 flex items-center justify-between text-sm text-gray-600">
                <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    <span>{reservation.name_client}</span>
                </div>
                <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    <span>{reservation.service.duration_minutes} min</span>
                </div>
            </div>

            <div className="mt-4 flex justify-end">{renderActionButtons()}</div>
        </Card>
    );
}
