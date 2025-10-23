import CardComponent from '@/components/CardComponent';
import HeaderSection from '@/components/HeaderSection';
import { useToast } from '@/hooks/useToast';
import { StylistInterface } from '@/interfaces/Profile';
import {
    ClientInterface,
    ReservationFormInterface,
    ReservationInterface,
} from '@/interfaces/Reservation';
import { ServiceInterface } from '@/interfaces/Service';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import { BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Calendar, Check, Phone, Scissors, Search, User } from 'lucide-react';
import { useMemo, useState } from 'react';
import CardServiceForm from './components/CardServiceForm';
import CardStylistForm from './components/CardStylistForm';
import CardSummary from './components/CardSummary';

import InputError from '@/components/input-error';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Textarea from '@/components/ui/textarea';
import { useAvailableTimeSlots } from '@/hooks/useAvailableTimeSlots';
import dayjs from 'dayjs';
import 'dayjs/locale/es';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';

dayjs.locale('es'); // Configurar español

const breadcrumbs: BreadcrumbItem[] = [
    { title: 'Dashboard', href: dashboard().url },
    { title: 'Reservas', href: admin.services.index().url },
    { title: 'Formulario', href: admin.services.create().url },
];

type ReservationCreateProps = {
    services: ServiceInterface[];
    stylists: StylistInterface[];
    clients: ClientInterface[];
    reservations: ReservationInterface[];
};

export default function ReservationCreate({
    services,
    stylists,
    clients,
    reservations,
}: ReservationCreateProps) {
    const { addToast } = useToast();
    const [searchClient, setSearchClient] = useState('');
    const [errorMessages, setErrorMessages] = useState<Record<string, string>>(
        {},
    );
    const { data, setData, processing, errors, post, reset } =
        useForm<ReservationFormInterface>({
            customer_id: null,
            service_id: null,
            stylist_id: null,
            date: '',
            time: '',
            notes: '',
        });

    const selectedClient = clients.find((c) => c.id === data.customer_id);

    // Datos seleccionados
    const selectedService = useMemo(
        () => services.find((s) => s.id === data.service_id),
        [data.service_id, services],
    );

    const filteredClients = clients.filter(
        (client) =>
            client.name.toLowerCase().includes(searchClient.toLowerCase()) ||
            client.phone.includes(searchClient),
    );

    const selectedStylist = useMemo(
        () => stylists.find((s) => s.id === data.stylist_id),
        [data.stylist_id, stylists],
    );

    // Horarios disponibles basados en el estilista y fecha seleccionados
    const availableTimeSlots = useAvailableTimeSlots({
        selectedStylist,
        selectedService,
        date: data.date,
        reservations,
    });

    // Fechas disponibles (hoy + próximos 2 días)
    const availableDates = useMemo(() => {
        const today = new Date();

        const nextThreeDays = Array.from({ length: 3 }, (_, i) => {
            const d = new Date(today);
            d.setDate(today.getDate() + i);
            return d.toISOString().split('T')[0]; // formato YYYY-MM-DD
        });
        return nextThreeDays;
    }, []);

    const validateStep = (step: number): boolean => {
        const newErrors: Any = {};

        switch (step) {
            case 1:
                if (!data.customer_id)
                    newErrors.customer_id = 'El cliente es obligatorio';
                break;
            case 2:
                if (!data.service_id)
                    newErrors.service_id = 'Selecciona un servicio';
                break;
            case 3:
                if (!data.stylist_id)
                    newErrors.stylist_id = 'Selecciona un estilista';
                break;
            case 4:
                if (!data.date) newErrors.date = 'Selecciona una fecha';
                if (!data.time) newErrors.time = 'Selecciona una hora';
                break;
        }

        // Actualiza los errores del useForm
        setErrorMessages(newErrors);

        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateStep(4)) {
            post(admin.reservations.store().url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    addToast({
                        type: 'success',
                        message: '¡Reserva creada exitosamente!',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Ocurrió un error al registrar la reserva',
                    });
                },
            });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Nueva Reserva" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <HeaderSection
                    title={'Nueva Reserva'}
                    description={
                        'Completa el proceso paso a paso para crear una reserva'
                    }
                    contentRight={
                        <Button
                            onClick={() =>
                                router.get(admin.reservations.index().url)
                            }
                            variant={'outline'}
                            color="neutral"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Contenido Principal */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 lg:col-span-2"
                    >
                        {/* Paso 1: Información del Cliente */}
                        <CardComponent
                            title="Información del Cliente"
                            description="Datos de contacto del cliente"
                            icon={User}
                            colorIcon="primary"
                        >
                            <div className="space-y-4">
                                {/* Input de Búsqueda */}
                                <div className="relative">
                                    <Input
                                        type="search"
                                        placeholder="Buscar por nombre o teléfono..."
                                        value={searchClient}
                                        onChange={(e) =>
                                            setSearchClient(e.target.value)
                                        }
                                        startIcon={Search}
                                        className="bg-transparent"
                                    />
                                </div>

                                {/* Lista de Clientes */}
                                <div className="grid max-h-48 grid-cols-2 gap-3 overflow-y-auto pr-1 lg:grid-cols-3">
                                    {filteredClients.map((client) => (
                                        <button
                                            key={client.id}
                                            type={"button"}
                                            onClick={() =>
                                                setData(
                                                    'customer_id',
                                                    client.id,
                                                )
                                            }
                                            className={`rounded-xl cursor-pointer border-2 p-3 text-left shadow-sm transition-all duration-200 ${
                                                data.customer_id === client.id
                                                    ? 'border-green-600 bg-success/5'
                                                    : 'border-gray-500/30 hover:border-green-600 hover:bg-gray-50 dark:hover:bg-success/5'
                                            }`}
                                        >
                                            <p className="text-sm font-medium">
                                                {client.name}
                                            </p>
                                            <p className="mt-1 flex items-center gap-1 text-xs text-muted-foreground">
                                                <Phone className="h-3 w-3" />
                                                {client.phone}
                                            </p>
                                        </button>
                                    ))}
                                </div>
                                {(errorMessages.customer_id ||
                                    errors.customer_id) && (
                                    <InputError
                                        message={
                                            errorMessages.customer_id ||
                                            errors.customer_id
                                        }
                                    />
                                )}
                            </div>
                        </CardComponent>

                        {/* Paso 2: Seleccionar Servicio */}
                        <CardComponent
                            title="Seleccionar Servicio"
                            description="Elige el servicio que deseas reservar"
                            icon={User}
                            colorIcon="success"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                {services.map((item) => (
                                    <CardServiceForm
                                        key={item.id}
                                        service={item}
                                        selectedId={data.service_id}
                                        onSelect={(e) =>
                                            setData('service_id', e)
                                        }
                                    />
                                ))}
                            </div>
                            {(errorMessages.service_id ||
                                errors.service_id) && (
                                <InputError
                                    message={
                                        errorMessages.service_id ||
                                        errors.service_id
                                    }
                                />
                            )}
                        </CardComponent>

                        {/* Paso 3: Elegir Estilista */}
                        <CardComponent
                            title="Elegir Estilista"
                            description="Selecciona tu estilista preferido"
                            icon={Scissors}
                            colorIcon="warning"
                        >
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                {stylists.map((stylist) => (
                                    <CardStylistForm
                                        key={stylist.id}
                                        dataStylist={stylist}
                                        selectedId={data.stylist_id}
                                        onSelect={(id) =>
                                            setData('stylist_id', id)
                                        }
                                    />
                                ))}
                            </div>

                            {(errorMessages.stylist_id ||
                                errors.stylist_id) && (
                                <InputError
                                    message={
                                        errorMessages.stylist_id ||
                                        errors.stylist_id
                                    }
                                />
                            )}
                        </CardComponent>

                        {/* Paso 4: Fecha y Hora */}
                        <CardComponent
                            title="Fecha y Hora"
                            description="Selecciona cuándo quieres tu cita"
                            icon={Calendar}
                            colorIcon="info"
                        >
                            <div className="space-y-4">
                                {/* Selección de Fecha */}
                                <div>
                                    <Label text="Selecciona una fecha" required />
                                    <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-5">
                                        {availableDates.map((date, index) => (
                                            <button
                                                key={index}
                                                type="button"
                                                onClick={() => setData('date', date)}
                                                className={`rounded-lg border-2 p-2 text-center transition-all ${
                                                    data.date === date
                                                        ? 'border-orange-600 bg-warning/5'
                                                        : 'border-gray-500/30 hover:border-orange-600/40 hover:bg-warning/5'
                                                }`}
                                            >
                                                <p className="text-xs text-muted-foreground capitalize">
                                                    {dayjs(date).format('MMM')}
                                                </p>
                                                <p className="text-sm font-semibold">
                                                    {dayjs(date).format('D')}
                                                </p>
                                            </button>
                                        ))}
                                    </div>
                                    {errors.date && (
                                        <InputError message={errors.date} />
                                    )}
                                </div>

                                {/* Selección de Hora */}
                                {data.date && (
                                    <div>
                                        <Label text="Selecciona una hora" required />
                                        {availableTimeSlots.length > 0 ? (
                                            <div className="grid grid-cols-3 gap-4 md:grid-cols-4 lg:grid-cols-8">
                                                {availableTimeSlots.map(
                                                    (item, index) => (
                                                        <button
                                                            key={index}
                                                            type="button"
                                                            onClick={() => setData('time', item.time)}
                                                            className={`rounded-lg border-2 p-2 text-sm font-medium transition-all ${
                                                                data.time ===
                                                                item.time
                                                                    ? 'border-orange-600 bg-warning/5'
                                                                    : 'border-gray-500/30 hover:border-orange-600/40 hover:bg-warning/5'
                                                            }`}
                                                        >
                                                            {item.time}
                                                        </button>
                                                    ),
                                                )}
                                            </div>
                                        ) : (
                                            <Alert variant={"error"}>
                                                <AlertTitle>Horarios no disponibles</AlertTitle>
                                                <AlertDescription>
                                                    No se encontraron horarios para esta fecha. Verifica que hayas elegido un servicio y un estilista.
                                                </AlertDescription>
                                            </Alert>
                                        )}
                                        {errorMessages.time ||
                                            (errors.time && (
                                                <InputError message={errors.time} />
                                            ))}
                                    </div>
                                )}

                                {/* Notas Adicionales */}
                                <div className="form-control">
                                    <Label text="Notas adicionales (opcional)" />
                                    <Textarea
                                        placeholder="Alguna observación o requerimiento especial..."
                                        value={data.notes || ''}
                                        onChange={(e) =>
                                            setData('notes', e.target.value)
                                        }
                                    ></Textarea>
                                </div>
                            </div>
                        </CardComponent>

                        {/* Botones de Navegación */}
                        <Card>
                            <CardContent>
                                <div className="flex justify-between">
                                    <Button
                                        type="button"
                                        onClick={() => admin.reservations.index().url}
                                        variant={'outline'}
                                        color="neutral"
                                        startIcon={<ArrowLeft />}
                                    >
                                        Anterior
                                    </Button>

                                    <Button
                                        type="submit"
                                        className={`${processing ? 'loading' : ''}`}
                                        disabled={processing}
                                    >
                                        {processing ? (
                                            <>
                                                <span className="loading loading-sm loading-spinner"></span>
                                                Procesando...
                                            </>
                                        ) : (
                                            <>
                                                <Check className="mr-2 h-4 w-4" />
                                                Confirmar Reserva
                                            </>
                                        )}
                                    </Button>
                                </div>
                            </CardContent>
                        </Card>
                    </form>
                    {/* Panel Lateral - Resumen */}
                    <div>
                        {/* Resumen de Selección */}
                        <CardSummary
                            data={data}
                            selectedService={selectedService}
                            selectedStylist={selectedStylist}
                            selectedClient={selectedClient}
                            resetForm={reset}
                        />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
