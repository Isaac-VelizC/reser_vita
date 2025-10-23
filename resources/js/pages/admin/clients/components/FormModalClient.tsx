import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogFooter,
    DialogTitle,
} from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/useToast';
import { ClientInterface } from '@/interfaces/Reservation';
import admin from '@/routes/admin';
import { useForm } from '@inertiajs/react';
import { Plus } from 'lucide-react';
import React, { useEffect } from 'react';

type FormModalClientProps = {
  client?: ClientInterface;
  clientId?: number;
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

const FormModalClient = ({ client, clientId, open, onOpenChange }: FormModalClientProps) => {
    const { addToast } = useToast();

    const { data, setData, reset, post, put, errors, processing } = useForm({
        id: null as number | null,
        name: '',
        surname: '',
        email: '',
        phone: '',
    });

    // Cuando cambia clientId o client, cargar datos en el formulario para edición
    useEffect(() => {
        if (client && clientId) {
            setData({
                id: client.id,
                name: client.name,
                surname: client.surname,
                email: client.email,
                phone: client.phone,
            });
        } else {
            reset();
        }
    }, [client, clientId, setData, reset]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (data.id) {
            // Edición
            put(admin.clients.update(data.id).url, {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'success',
                        message: 'El cliente se actualizó correctamente.',
                    });
                    reset();
                    onOpenChange(false);
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Hubo un error al actualizar el cliente.',
                    });
                },
            });
        } else {
            post(admin.clients.store().url, {
                preserveScroll: true,
                onSuccess: () => {
                    addToast({
                        type: 'success',
                        message: 'El cliente fue creado correctamente.',
                    });
                    onOpenChange(false);
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
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle className="flex items-center">
                    <Plus className="mr-2 h-5 w-5 text-primary" />
                    {data.id ? 'Editar Cliente' : 'Agregar Nuevo Cliente'}
                </DialogTitle>

                <form className="space-y-4" onSubmit={handleSubmit} noValidate>
                    <div className="grid grid-cols-1 gap-4">
                        {/* Nombre */}
                        <div className="form-control">
                            <Label text="Nombre" required />
                            <Input
                                value={data.name}
                                onChange={(e) =>
                                    setData('name', e.target.value)
                                }
                                error={errors.name}
                                placeholder="Ej: Juan Carlos"
                                maxLength={100}
                                required
                            />
                            <InputError message={errors.name} />
                        </div>

                        {/* Apellido */}
                        <div className="form-control">
                            <Label text="Apellido" required />
                            <Input
                                value={data.surname}
                                onChange={(e) =>
                                    setData('surname', e.target.value)
                                }
                                error={errors.surname}
                                placeholder="Ej: Pérez López"
                                maxLength={100}
                                required
                            />
                            <InputError message={errors.surname} />
                        </div>

                        {/* Email */}
                        <div className="form-control">
                            <Label text="Email" required />
                            <Input
                                type="email"
                                value={data.email}
                                onChange={(e) =>
                                    setData('email', e.target.value)
                                }
                                error={errors.email}
                                placeholder="Ej: juan@example.com"
                                required
                            />
                            <InputError message={errors.email} />
                        </div>

                        {/* Teléfono */}
                        <div className="form-control">
                            <Label text="Teléfono" />
                            <Input
                                type="tel"
                                value={data.phone}
                                onChange={(e) =>
                                    setData('phone', e.target.value)
                                }
                                error={errors.phone}
                                placeholder="Ej: +1234567890"
                                minLength={8}
                            />
                            <InputError message={errors.phone} />
                        </div>
                    </div>

                    {/* Botones */}
                    <DialogFooter className="gap-4">
                        <DialogClose asChild>
                            <Button
                                variant="ghost"
                                color="neutral"
                                onClick={() => reset()}
                            >
                                Cancelar
                            </Button>
                        </DialogClose>

                        <Button
                            disabled={processing}
                            type="submit"
                            startIcon={<Plus className="h-4 w-4" />}
                            data-test="confirm-button"
                        >
                            {processing ? 'Guardando...' : 'Guardar'}
                        </Button>
                    </DialogFooter>
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FormModalClient;
