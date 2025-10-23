import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
    DialogTrigger,
} from '@/components/ui/dialog';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from '@/components/ui/select';
import { useToast } from '@/hooks/useToast';
import { SalonDayInterface } from '@/interfaces/Availability';
import { getDayName } from '@/lib/utils';
import admin from '@/routes/admin';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import { useState } from 'react';

type AvailabilityFormModalProps = {
    hoarios: SalonDayInterface[];
    stylistId: number;
};

const AvailabilityFormModal = ({
    hoarios,
    stylistId,
}: AvailabilityFormModalProps) => {
    const { addToast } = useToast();
    const [open, setOpen] = useState(false);
    const { data, setData, reset, post, processing } = useForm({
        stylist_id: stylistId,
        day_id: '',
        hour_id: '',
    });

    // Para controlar los horarios del día seleccionado
    const selectedDay = hoarios.find((d) => d.id.toString() === data.day_id);
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post(admin.availability.store().url, {
            preserveScroll: true,
            onSuccess: () => {
                reset();
                addToast({
                    type: 'success',
                    message: 'Horario creado con éxito.',
                });
                setOpen(false); // Cierra el diálogo al guardar con éxito
            },
            onError: () => {
                addToast({
                    type: 'error',
                    message: 'Ocurrió un error al guardar horario.',
                });
                // No cerrar diálogo en error
            },
        });
    };

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger>
                <Button startIcon={<Plus />}>
                    Nuevo Horario
                </Button>
            </DialogTrigger>
            <DialogContent>
                <DialogTitle className="flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-primary" />
                    Agregar Nuevo Horario
                </DialogTitle>
                {/* Formulario */}
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                        {/* Día */}
                        <div className="form-control">
                            <Label text="Día" required />
                            <Select
                                value={data.day_id}
                                onValueChange={(value) => {
                                    setData('day_id', value);
                                    setData('hour_id', '');
                                }}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un día"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {hoarios.map((day) => (
                                        <SelectItem key={day.id} value={String(day.id)}>
                                            {getDayName(day.day_of_week)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        {/* Horario */}
                        <div className="form-control">
                            <Label text="Horario" required />
                            <Select 
                                value={data.hour_id}
                                onValueChange={(value) => setData('hour_id', value)}
                                disabled={!selectedDay}
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Selecciona un horario"/>
                                </SelectTrigger>
                                <SelectContent>
                                    {selectedDay?.hours.map((hour) => (
                                        <SelectItem key={hour.id} value={String(hour.id)}>
                                            {hour.name
                                                ? hour.name
                                                : `${hour.open_time} - ${hour.close_time}`}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    {/* Botones */}
                    <DialogFooter className="gap-4">
                        <DialogClose asChild>
                            <Button variant={'ghost'} onClick={() => reset()}>
                                Cancel
                            </Button>
                        </DialogClose>

                        <Button
                            disabled={processing}
                            type="submit"
                            startIcon={<Plus />}
                            data-test="confirm-delete-horario-button"
                        >
                            {processing ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default AvailabilityFormModal;
