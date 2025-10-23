import CardComponent from '@/components/CardComponent';
import SecurityTipsCard from '@/components/CardSecurityTip';
import CompletedCard from '@/components/CompletedCard';
import SubmitButton from '@/components/SubmitButton';
import HeaderSection from '@/components/HeaderSection';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { ServiceInterface } from '@/interfaces/Service';
import AppLayout from '@/layouts/app-layout';
import { tipsFormServices } from '@/lib/DataUtils';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head, router, useForm } from '@inertiajs/react';
import { ArrowLeft, Clock, DollarSign, Info, RefreshCcw } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import Textarea from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import InputError from '@/components/input-error';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Servicios',
        href: admin.services.index().url,
    },
    {
        title: 'Formulario',
        href: admin.services.create().url,
    },
];

// Props del componente
type ServiceFormProps = {
    service?: ServiceInterface;
    isEdit?: boolean;
};

export default function Create({ service, isEdit = false }: ServiceFormProps) {
    const { addToast } = useToast();
    const {
        errors,
        reset,
        processing,
        data,
        setData,
        post,
        put,
    } = useForm({
        name: service?.name || '',
        description: service?.description || '',
        duration_minutes: service?.duration_minutes || 0,
        price: service?.price || 0,
    });

    const isFormValid = (): boolean => {
        return (
            !!data.name &&
            !!data.description &&
            data.price > 0 &&
            data.duration_minutes > 0
        );
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        if (isEdit && service) {
            put(admin.services.update(service.id).url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    addToast({ type: "success", message: "Servicio actualizado con éxito." });
                },
                onError: () => {
                    addToast({ type: "error", message: "Ocurrió un error al eliminar." });
                },
            });
        } else {
            post(admin.services.store().url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    addToast({ type: "success", message: "Servicio creado con éxito." });
                },
                onError: () => {
                    addToast({ type: "error", message: "Ocurrió un error al eliminar." });
                },
            });
        }
    };

    const fields = [
        { label: 'Nombre', value: data.name },
        { label: 'Descripción', value: data.description },
        { label: 'Precio', value: String(data.price) },
        { label: 'Duración', value: String(data.duration_minutes) }
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Servicio' : 'Crear Servicio'} />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <HeaderSection
                    title={isEdit ? 'Editar Servicio' : 'Crear Nuevo Servicio'}
                    description={
                        isEdit
                            ? 'Modifica la información del servicio'
                            : 'Completa los datos para crear un nuevo servicio'
                    }
                    contentRight={
                        <Button
                            onClick={() => router.get(admin.services.index().url)}
                            variant={"outline"}
                            color="neutral"
                        >
                            <ArrowLeft className="mr-2 h-4 w-4" />
                            Volver
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Formulario */}
                    <form onSubmit={handleSubmit} className="lg:col-span-2 space-y-4">
                        {/* Información Básica */}
                        <CardComponent
                            icon={Info}
                            title="Información Básica"
                            description="Datos principales del servicio"
                        >
                            <div className="grid grid-cols-1 gap-4">
                                {/* Nombre */}
                                <div className="form-control">
                                    <Label
                                        text="Nombre del Servicio"
                                        required={true}
                                        auxiliaryText={`${data.name.length}/100`}
                                    />
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        error={errors.name}
                                        placeholder="Ej: Corte de Cabello Premium"
                                        maxLength={100}
                                    />
                                </div>

                                {/* Descripción */}
                                <div className="form-control">
                                    <Label
                                        text="Descripción"
                                        required={true}
                                        auxiliaryText={`${data.description.length}/500`}
                                    />
                                    <Textarea
                                        value={data.description}
                                        onChange={(e) =>
                                            setData('description', e.target.value)
                                        }
                                        error={errors.description}
                                        maxLength={500}
                                        placeholder="Describe detalladamente el servicio, qué incluye, beneficios, etc."
                                        rows={6}
                                    />
                                </div>
                            </div>
                        </CardComponent>
                        {/* Detalles del Servicio */}
                        <CardComponent icon={Clock} title="Detalles del Servicio" description="Precio y duración">
                            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                {/* Precio */}
                                <div className="form-control">
                                    <Label text="Precio (USD)" required={true} />
                                    <Input
                                        startIcon={DollarSign}
                                        value={data.price}
                                        min={0}
                                        step={0.01}
                                        onChange={(e) =>
                                            setData('price', parseFloat(e.target.value) || 0)
                                        }
                                        error={errors.price}
                                        placeholder="0.00"
                                    />
                                </div>

                                {/* Duración */}
                                <div className="form-control">
                                    <Label text="Duración (minutos)" required={true} />
                                    <Select
                                        value={data.duration_minutes.toString()}
                                        onValueChange={(value) =>
                                            setData('duration_minutes', parseInt(value))
                                        }
                                        aria-label="Seleccionar duración">
                                        <SelectTrigger className='bg-background'>
                                            <SelectValue placeholder="Seleccionar duración" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="0">Seleccionar duración</SelectItem>
                                            <SelectItem value="15">15 minutos</SelectItem>
                                            <SelectItem value="30">30 minutos</SelectItem>
                                            <SelectItem value="45">45 minutos</SelectItem>
                                            <SelectItem value="60">1 hora</SelectItem>
                                            <SelectItem value="90">1 hora 30 minutos</SelectItem>
                                            <SelectItem value="120">2 horas</SelectItem>
                                            <SelectItem value="180">3 horas</SelectItem>
                                            <SelectItem value="240">4 horas</SelectItem>
                                        </SelectContent>
                                    </Select>
                                    <InputError message={errors.duration_minutes} />
                                </div>
                            </div>
                        </CardComponent>
                        {/* Botones de Acción */}
                        <Card>
                            <CardContent className="flex flex-col justify-between gap-4 sm:flex-row">
                                <Button type="button"
                                    onClick={() => reset()}
                                    variant={'outline'}
                                    color="neutral"
                                    disabled={processing}>
                                    <RefreshCcw className="mr-2 h-4 w-4" />
                                    Limpiar
                                </Button>

                                <div className="flex gap-4">
                                    <Button
                                        onClick={() => router.get(admin.services.index().url)}
                                        variant={"ghost"}
                                        color='neutral'
                                        type='button'
                                    >
                                        Cancelar
                                    </Button>
                                    <SubmitButton
                                        processing={processing}
                                        isEdit={!!isEdit}
                                        isFormValid={isFormValid}
                                    />
                                </div>
                            </CardContent>
                        </Card>
                    </form>

                    {/* Panel Lateral */}
                    <div className="space-y-4">
                        {/* Estado del Formulario */}
                        <CompletedCard
                            data={data}
                            fields={fields}
                            isValid={isFormValid}
                        />

                        {/* Consejos */}
                        <SecurityTipsCard tips={tipsFormServices}/>
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
