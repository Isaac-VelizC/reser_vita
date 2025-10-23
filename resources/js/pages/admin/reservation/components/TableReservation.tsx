import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';
import { useToast } from '@/hooks/useToast';
import { ReservationInterface } from '@/interfaces/Reservation';
import { getStatusBadge } from '@/lib/funtionsUtils';
import admin from '@/routes/admin';
import { router } from '@inertiajs/react';
import dayjs from 'dayjs';

type TableReservationProps = {
    reservations: ReservationInterface[];
    current_page: number;
    per_page: number;
};

export default function TableReservation({
    reservations,
    current_page,
    per_page,
}: TableReservationProps) {
    const { addToast } = useToast();
    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await router.put(admin.reservations.updateStatus(id).url, {
            status: newStatus,
        }, {
            preserveScroll: true,
            onSuccess: () => {
                // Opcional: mensaje visual elegante
                addToast({ type: 'success', message: 'Estado actualizado correctamente.' });
            },
            onError: (errors) => {
                addToast({ type: 'error', message: 'Error al actualizar el estado.'});
                console.error(errors);
            },
        });
            
        } catch (error) {
            console.error('Error actualizando estado:', error);
        }
    };

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    <TableCell>#</TableCell>
                    <TableCell>Cliente</TableCell>
                    <TableCell>Servicio</TableCell>
                    <TableCell>Fecha y Hora</TableCell>
                    <TableCell>Duración</TableCell>
                    <TableCell>Estado</TableCell>
                    <TableCell className="p-3 text-center">Acciones</TableCell>
                </TableRow>
            </TableHeader>
            <TableBody>
                {reservations.map((res, index) => (
                    <TableRow
                        key={res.id}
                        className="odd:bg-transparent even:bg-secondary/5"
                    >
                        <TableCell>{(current_page - 1) * per_page + index + 1}</TableCell>
                        <TableCell>{res.customer.name+ ' ' + res.customer.surname}</TableCell>
                        <TableCell>{res.service.name}</TableCell>
                        <TableCell>
                            {dayjs(res.date).format('MMMM D, YYYY')} -{' '}
                            {res.time}
                        </TableCell>
                        <TableCell>{res.service.duration_minutes} min</TableCell>
                        <TableCell>{getStatusBadge(res.status)}</TableCell>
                        <TableCell className="space-x-2 p-3 text-center">
                            {res.status === 'pending' && (
                                <Button
                                    onClick={() =>
                                        handleStatusChange(res.id, 'confirmed')
                                    }
                                    color="info"
                                    size={"sm"}
                                >
                                    Confirmar
                                </Button>
                            )}
                            {res.status === 'confirmed' && (
                                <Button
                                    onClick={() =>
                                        handleStatusChange(
                                            res.id,
                                            'in_progress',
                                        )
                                    }
                                    size={"sm"}
                                    color="secondary"
                                >
                                    Iniciar
                                </Button>
                            )}
                            {res.status === 'in_progress' && (
                                <Button
                                    onClick={() =>
                                        handleStatusChange(res.id, 'completed')
                                    }
                                    color="success"
                                    size={"sm"}
                                >
                                    Finalizar
                                </Button>
                            )}
                            {res.status !== 'completed' && (
                                <Button
                                    onClick={() =>
                                        handleStatusChange(res.id, 'cancelled')
                                    }
                                    color="error"
                                    size={"sm"}
                                >
                                    Cancelar
                                </Button>
                            )}
                        </TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    );
}
