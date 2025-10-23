import HeadingSmall from '@/components/heading-small';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { HourFromBackend, ScheduleInterface } from '@/interfaces/Settings';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { ensureTimeHHMM, getDayName } from '@/lib/utils';
import schedules from '@/routes/schedules';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { Pencil, Plus, Trash } from 'lucide-react';
import React, { useState } from 'react';

type SchedulesProps = {
    dataSchedules: ScheduleInterface[];
};

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Schedules settings', href: '#' },
];

export default function SchedulesConfig({ dataSchedules }: SchedulesProps) {
    const { addToast } = useToast();
    const [isModalOpen, setModalOpen] = useState(false);
    const [editingHourId, setEditingHourId] = useState<number | null>(null);
    const [modalDay, setModalDay] = useState<number | null>(null); // day_of_week 0..6
    
    const { data, setData, post, put, reset, errors } = useForm<HourFromBackend>({
        name: '',
        open_time: '09:00',
        close_time: '18:00',
        salon_day_id: 0,
    });

    // Al abrir modal para agregar horario
    const openAddModal = (dow: number) => {
        setEditingHourId(null);
        setModalDay(dow);
        setData('salon_day_id', dow);
        // reset();
        setModalOpen(true);
    };

    const openEditModal = (dow: number, hour: HourFromBackend) => {
        setModalDay(dow);
        setEditingHourId(hour?.id || null);
        setData({
            id: hour.id,
            name: hour.name,
            open_time: hour.open_time,
            close_time: hour.close_time,
            salon_day_id: hour.salon_day_id,
        });

        setModalOpen(true);
    };

    const closeModal = () => {
        setEditingHourId(null);
        setModalDay(null);
        reset();
        setModalOpen(false);
    };

    const toggleDayOpen = async (id: number) => {
        try {
            await router.get(schedules.toggle.status(id).url);
        } catch (error) {
            addToast({
                type: 'error',
                message: 'Ocurrió un error inesperado al actualizar el estado.',
            });
            console.error('Error en toggleDayOpen:', error);
        }
    };

    const handleSaveHour = (e: React.FormEvent) => {
        e.preventDefault();
        if (modalDay === null) return;

        if (editingHourId) {
            // Edición
            put(schedules.update(editingHourId).url, {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'success',
                        message: 'El horario se actualizó correctamente.',
                    });
                    reset();
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Hubo un error al actualizar el horario.',
                    });
                },
            });
        } else {
            post(schedules.store().url, {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'success',
                        message: 'El cliente fue creado correctamente.',
                    });
                    reset();
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Hubo un error al crear el cliente.',
                    });
                },
            });
        }
        closeModal();
    };

    const handleDeleteHour = (idDelete: number) => {
        if (idDelete) {
            router.delete(schedules.destroy(idDelete).url, {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'success',
                        message: 'El horario ha sido eliminado exitosamente.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message:
                            'No se pudo eliminar el horario. Por favor, intenta nuevamente.',
                    });
                },
            });
        } else {
            addToast({
                type: 'error',
                message:
                    'Error: ID inválido para eliminar el horario. Verifica la selección.',
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Schedules settings" />

            <SettingsLayout>
                <div className="space-y-6">
                    <HeadingSmall
                        title="Horarios del salón"
                        description="Configura los días y horas en que tu salón está disponible para reservas"
                    />

                    <div className="grid grid-cols-1 gap-4">
                        {dataSchedules.map((day) => {
                            return (
                                <Card key={day.id}>
                                    <CardHeader>
                                        <div className="flex items-center justify-between">
                                            <CardTitle className="text-sm">
                                                <span>
                                                    {getDayName(
                                                        day.day_of_week,
                                                    )}
                                                </span>
                                                <span className="ml-1 text-xs font-medium text-muted-foreground">
                                                    ({day.hours.length} turnos)
                                                </span>
                                            </CardTitle>

                                            <label className="flex items-center gap-2 text-sm select-none">
                                                <Checkbox
                                                    type="checkbox"
                                                    checked={day.is_open}
                                                    onChange={() =>
                                                        toggleDayOpen(day.id)
                                                    }
                                                />
                                                <span className="text-muted-foreground">
                                                    Abierto
                                                </span>
                                            </label>
                                        </div>
                                    </CardHeader>

                                    {/* Horarios */}
                                    <CardContent>
                                        <div className="min-h-[48px] space-y-2">
                                            {day.is_open &&
                                                day.hours.length === 0 && (
                                                    <div className="text-sm text-muted-foreground">
                                                        Aún no hay horarios.
                                                        Agrega uno.
                                                    </div>
                                                )}

                                            {day.is_open &&
                                                day.hours.map((hour) => (
                                                    <div
                                                        key={
                                                            hour.id ??
                                                            `${day.day_of_week}-${hour.name}-${hour.open_time}`
                                                        }
                                                        className="flex items-center justify-between rounded-lg bg-gray-100 px-3 py-2 dark:bg-gray-800/30"
                                                    >
                                                        <div className="flex items-center gap-4">
                                                            <Badge color="primary">
                                                                {hour.name}
                                                            </Badge>
                                                            <div className="text-sm text-muted-foreground">
                                                                {ensureTimeHHMM(
                                                                    hour.open_time,
                                                                )}{' '}
                                                                -{' '}
                                                                {ensureTimeHHMM(
                                                                    hour.close_time,
                                                                )}
                                                            </div>
                                                        </div>

                                                        <div className="flex items-center gap-2">
                                                            <Button
                                                                title="Editar"
                                                                onClick={() =>
                                                                    openEditModal(day.day_of_week, hour)
                                                                }
                                                                variant={
                                                                    'ghost'
                                                                }
                                                                color="neutral"
                                                                size={'sm'}
                                                            >
                                                                <Pencil className="h-4 w-4 text-info" />
                                                            </Button>
                                                            <Button
                                                                title="Eliminar"
                                                                onClick={() =>
                                                                    hour.id &&
                                                                    handleDeleteHour(
                                                                        hour.id,
                                                                    )
                                                                }
                                                                variant={
                                                                    'ghost'
                                                                }
                                                                color="neutral"
                                                                size={'sm'}
                                                            >
                                                                <Trash className="h-4 w-4 text-danger" />
                                                            </Button>
                                                        </div>
                                                    </div>
                                                ))}
                                        </div>
                                        <Button
                                            onClick={() =>
                                                openAddModal(day.id)
                                            }
                                            disabled={!day.is_open}
                                            variant={'outline'}
                                            color="neutral"
                                        >
                                            <Plus className="h-4 w-4" />
                                            Agregar horario
                                        </Button>
                                    </CardContent>
                                </Card>
                            );
                        })}
                    </div>
                </div>
            </SettingsLayout>

            {/* Modal (Agregar / Editar) */}
            {isModalOpen && modalDay !== null && (
                <Dialog open={isModalOpen} onOpenChange={setModalOpen}>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>
                                {data.id ? 'Editar horario' : 'Agregar horario'}
                            </DialogTitle>
                            <DialogDescription>
                                Día:{' '}
                                <span className="font-medium">
                                    {getDayName(modalDay)}
                                </span>
                            </DialogDescription>
                        </DialogHeader>
                        <form onSubmit={handleSaveHour}>
                            <div className="my-4 space-y-4">
                                <div>
                                    <Label htmlFor="name" text="Nombre del turno" />
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        error={errors.name}
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-3">
                                    <div>
                                        <Label
                                            htmlFor="open_time"
                                            text="Hora inicio"
                                        />
                                        <Input
                                            type="time"
                                            value={data.open_time}
                                            onChange={(e) =>
                                                setData('open_time', e.target.value)
                                            }
                                            error={errors.open_time}
                                        />
                                    </div>
                                    <div>
                                        <Label
                                            htmlFor="close_time"
                                            text="Hora fin"
                                        />
                                        <Input
                                            type="time"
                                            value={data.close_time}
                                            onChange={(e) =>
                                                setData('close_time', e.target.value)
                                            }
                                            error={errors.close_time}
                                        />
                                    </div>
                                </div>
                            </div>

                            <DialogFooter>
                                <DialogClose asChild>
                                    <Button type='button' variant="ghost" color="neutral">
                                        Cancelar
                                    </Button>
                                </DialogClose>
                                <Button
                                    type='submit'
                                    variant="solid"
                                    color="primary"
                                >
                                    Guardar
                                </Button>
                            </DialogFooter>
                        </form>
                    </DialogContent>
                </Dialog>
            )}
        </AppLayout>
    );
}
