import { AvailabilityInterface } from '@/interfaces/Availability';
import { formatTime, getDayName } from '@/lib/utils';
import admin from '@/routes/admin/index';
import { Calendar, Clock, Trash2 } from 'lucide-react';

import { DeleteDialog } from '@/components/deleteDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { router, useForm } from '@inertiajs/react';
import { useState } from 'react';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '@/components/ui/table';

type AvailableTableProps = {
    availabilities: AvailabilityInterface[];
};

const AvailableTable = ({ availabilities }: AvailableTableProps) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [availableToDelete, setAvailableToDelete] = useState<number | null>(
        null,
    );
    const { delete: destroy, processing } = useForm({});
    const { addToast } = useToast();

    const handleConfirmDelete = () => {
        if (availableToDelete) {
            destroy(admin.availability.destroy(availableToDelete).url, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDelete(false);
                    setAvailableToDelete(null);
                    addToast({
                        type: 'success',
                        message: 'Hoario eliminado con éxito.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Ocurrió un error al eliminar.',
                    });
                },
            });
        }
    };

    const updateAvailability = (id: number, isWorking: boolean) => {
        router.patch(
            admin.availability.update(id).url,
            { is_working: isWorking },
            {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'warning',
                        message: 'Horario cambiado con exito.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'No se puedo cambiar el estado del horario.',
                    });
                },
            },
        );
    };

    return (
        <div>
            <h4 className="mb-3 flex items-center justify-between font-semibold">
                <span>Horarios Registrados</span>
                <Badge color="primary">
                    {availabilities.length} horarios
                </Badge>
            </h4>

            {availabilities.length > 0 ? (
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableCell>Fecha</TableCell>
                                <TableCell>Horario</TableCell>
                                <TableCell>Duración</TableCell>
                                <TableCell>Estado</TableCell>
                                <TableCell>Acciones</TableCell>
                                <TableCell></TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {availabilities.map((availability) => {
                                const start = new Date(
                                    `2000-01-01T${availability.hour.open_time}`,
                                );
                                const end = new Date(
                                    `2000-01-01T${availability.hour.close_time}`,
                                );
                                const duration =
                                    (end.getTime() - start.getTime()) /
                                    (1000 * 60 * 60);

                                return (
                                    <TableRow key={availability.id}>
                                        <TableCell>
                                            <div className="flex items-center gap-2">
                                                <Calendar className="h-4 w-4 text-primary" />
                                                <span className="font-medium">
                                                    {getDayName(
                                                        availability.day
                                                            .day_of_week,
                                                    )}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-2 text-gray-700 dark:text-gray-50">
                                                <Clock className="h-4 w-4 text-primary" />
                                                {formatTime(
                                                    availability.hour.open_time,
                                                )}{' '}
                                                -{' '}
                                                {formatTime(
                                                    availability.hour
                                                        .close_time,
                                                )}
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <Badge> {duration.toFixed(1)}h </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                            variant="outline"
                                                color={availability.is_available ? 'success' : 'error' }
                                            >
                                                {availability.is_available
                                                    ? 'Disponible'
                                                    : 'No disponible'}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <input
                                                type="checkbox"
                                                className="toggle w-10 rounded-xl bg-gray-200/60 toggle-primary"
                                                checked={
                                                    availability.is_working
                                                }
                                                onChange={(e) =>
                                                    updateAvailability(
                                                        availability.id,
                                                        e.target.checked,
                                                    )
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <Button
                                                className="cursor-pointer"
                                                variant={'ghost'}
                                                onClick={() => {
                                                    setAvailableToDelete(availability.id);
                                                    setOpenDelete(true);
                                                }}
                                            >
                                                <Trash2 className="h-4 w-4 cursor-pointer text-destructive" />
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                );
                            })}
                        </TableBody>
                    </Table>
                </div>
            ) : (
                <div className="rounded-xl py-8 text-center">
                    <Clock className="mx-auto mb-3 h-12 w-12" />
                    <p className="mb-1 font-medium text-gray-500">
                        No hay horarios registrados
                    </p>
                    <p className="text-sm text-gray-500">
                        Agrega el primer horario usando el formulario
                    </p>
                </div>
            )}
            <DeleteDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                loading={processing}
                handleClick={handleConfirmDelete}
                title="¿Eliminar horario?"
                description="Esta acción no se puede deshacer. ¿Estás seguro de eliminar el hoario?"
            />
        </div>
    );
};

export default AvailableTable;
