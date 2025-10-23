import { useToast } from '@/hooks/useToast';
import { getStatusBadge } from '@/lib/funtionsUtils';
import admin from '@/routes/admin';
import { StatusKey } from '@/types';
import { router } from '@inertiajs/react';
import { Calendar, Check, Eye, X } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from '../ui/table';

type AgendaDayProps = {
    data: {
        id: number;
        time: string;
        client: string;
        service: string;
        stylist: string;
        status: StatusKey;
        notes: string;
    }[];
};

const AgendaDay = ({ data }: AgendaDayProps) => {
    const { addToast } = useToast();
    const handleStatusChange = async (id: number, newStatus: string) => {
        try {
            await router.put(
                admin.reservations.updateStatus(id).url,
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
        }
    };
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Agenda del Día
                    </CardTitle>
                    <Button
                        onClick={() =>
                            router.get(admin.reservations.index().url)
                        }
                    >
                        Ver todas
                    </Button>
                </div>
            </CardHeader>

            <CardContent>
                {data.length > 0 ? (
                    <div className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableCell>Hora</TableCell>
                                    <TableCell>Cliente</TableCell>
                                    <TableCell>Servicio</TableCell>
                                    <TableCell>Estilista</TableCell>
                                    <TableCell>Estado</TableCell>
                                    <TableCell>Acciones</TableCell>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {data.map((reserva) => (
                                    <TableRow
                                        key={reserva.id}
                                        className="odd:bg-transparent even:bg-gray-100 dark:even:bg-black/50"
                                    >
                                        <TableCell className="font-medium">
                                            {reserva.time}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {reserva.client}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {reserva.service}
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-500">
                                            {reserva.stylist}
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(reserva.status)}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center justify-center gap-1">
                                                {reserva.status ===
                                                    'pending' && (
                                                    <Button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                reserva.id,
                                                                'confirmed',
                                                            )
                                                        }
                                                        variant={'ghost'}
                                                        size={'sm'}
                                                        title="Confirmar"
                                                    >
                                                        <Check className="h-3 w-3" />
                                                    </Button>
                                                )}
                                                <Button
                                                    variant={'ghost'}
                                                    size={'sm'}
                                                    title="Ver"
                                                >
                                                    <Eye className="h-3 w-3" />
                                                </Button>
                                                {reserva.status !==
                                                    'canceled' && (
                                                    <Button
                                                        onClick={() =>
                                                            handleStatusChange(
                                                                reserva.id,
                                                                'cancelled',
                                                            )
                                                        }
                                                        variant={'ghost'}
                                                        size={'sm'}
                                                        title="Cancelar"
                                                    >
                                                        <X className="h-3 w-3" />
                                                    </Button>
                                                )}
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                ) : (
                    <div className='w-full py-12 flex items-center justify-center'>
                        <p className='font-semibold'>No hay datos</p>
                    </div>
                )}
            </CardContent>
        </Card>
    );
};

export default AgendaDay;
