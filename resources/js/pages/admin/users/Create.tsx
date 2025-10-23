import CardComponent from '@/components/CardComponent';
import SecurityTipsCard from '@/components/CardSecurityTip';
import CompletedCard from '@/components/CompletedCard';
import HeaderSection from '@/components/HeaderSection';
import InputError from '@/components/input-error';
import SubmitButton from '@/components/SubmitButton';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { useToast } from '@/hooks/useToast';
import { UserInterface } from '@/interfaces/Profile';
import AppLayout from '@/layouts/app-layout';
import { rolesData, tipsFormUsers } from '@/lib/DataUtils';
import { calculatePasswordStrength } from '@/lib/funtionsUtils';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import { Head, router, useForm } from '@inertiajs/react';
import {
    Check,
    Clock,
    Eye,
    EyeOff,
    Lightbulb,
    Mail,
    MoveLeft,
    OctagonX,
    Phone,
    RefreshCcw,
    ShieldCheck,
    User,
} from 'lucide-react';
import { useState } from 'react';
import PreviewUser from './components/PreviewUser';
import RoleCard from './components/RoleCardForm';
import { BreadcrumbItem } from '@/types';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Usuarios',
        href: admin.usuarios.index().url,
    },
    {
        title: 'Formulario',
        href: admin.usuarios.create().url,
    },
];

type UserFormProps = {
    user?: UserInterface;
    isEdit?: boolean;
};

export default function Create({ user, isEdit = false }: UserFormProps) {
    const { data, setData, post, put, processing, errors, reset } = useForm({
        name: user?.name || '',
        email: user?.email || '',
        phone: user?.phone || '',
        password: '',
        password_confirmation: '',
        role: user?.role || 'stylist',
        send_welcome_email: true,
        status: user?.status || 'active',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const { addToast } = useToast();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isEdit && user) {
            put(admin.usuarios.update(user.id).url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    addToast({
                        type: 'success',
                        message: 'Usuario actualizado con éxito.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Ocurrió un error al eliminar.',
                    });
                },
            });
        } else {
            post(admin.usuarios.store().url, {
                preserveScroll: true,
                onSuccess: () => {
                    reset();
                    addToast({
                        type: 'success',
                        message: 'Usuario creado con éxito.',
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

    const handlePasswordChange = (value: string) => {
        setData('password', value);
        setPasswordStrength(calculatePasswordStrength(value));
    };

    const getPasswordStrengthLabel = () => {
        if (passwordStrength < 30) return 'Débil';
        if (passwordStrength < 60) return 'Media';
        if (passwordStrength < 80) return 'Buena';
        return 'Fuerte';
    };

    const isFormValid = (): boolean => {
        const basicValid = data.name && data.email && data.phone && data.role;

        if (isEdit) return Boolean(basicValid);

        return Boolean(
            basicValid &&
                data.password &&
                data.password === data.password_confirmation,
        );
    };

    const fields = [
        { label: 'Nombre', value: data.name },
        { label: 'Email', value: data.email },
        { label: 'Teléfono', value: data.phone },
        {
            label: 'Contraseña',
            value: data.password,
            validator: (v: string) => typeof v === 'string' && v.length >= 8,
        },
        {
            label: 'Confirmación',
            value: data.password_confirmation,
            validator: (v: string, d?: typeof data) => v === d?.password && !!v,
        },
        { label: 'Rol', value: data.role },
    ];

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title={isEdit ? 'Editar Usuario' : 'Crear Usuario'} />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                <HeaderSection
                    title={isEdit ? 'Editar Usuario' : 'Crear Nuevo Usuario'}
                    description={
                        isEdit
                            ? 'Modifica la información del usuario'
                            : 'Completa los datos para registrar un nuevo usuario'
                    }
                    contentRight={
                        <Button
                            onClick={() =>
                                router.get(admin.usuarios.index().url)
                            }
                            startIcon={<MoveLeft />}
                            variant={'outline'}
                        >
                            Volver
                        </Button>
                    }
                />

                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    {/* Formulario Principal */}
                    <form
                        onSubmit={handleSubmit}
                        className="space-y-4 lg:col-span-2"
                    >
                        {/* Información Personal */}
                        <CardComponent
                            title="Información Personal"
                            description="Datos básicos del usuario"
                            icon={Clock}
                        >
                            <div className="grid grid-cols-1 gap-4">
                                {/* Nombre Completo */}
                                <div className="form-control">
                                    <Label
                                        text="Nombre Completo"
                                        required={true}
                                        auxiliaryText={`${data.name.length}/100`}
                                    />
                                    <Input
                                        value={data.name}
                                        onChange={(e) =>
                                            setData('name', e.target.value)
                                        }
                                        error={errors.name}
                                        placeholder="Ej: Juan Carlos Pérez López"
                                        maxLength={100}
                                    />
                                    <InputError message={errors.name} />
                                </div>

                                {/* Email y Teléfono */}
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                    {/* Email */}
                                    <div className="form-control">
                                        <Label
                                            text="Correo Electrónico"
                                            required={true}
                                        />
                                        <Input
                                            type="email"
                                            startIcon={Mail}
                                            value={data.email}
                                            onChange={(e) =>
                                                setData('email', e.target.value)
                                            }
                                            placeholder="usuario@ejemplo.com"
                                            error={errors.email}
                                        />
                                        <InputError message={errors.email} />
                                    </div>

                                    {/* Teléfono */}
                                    <div className="form-control">
                                        <Label
                                            text="Teléfono"
                                            required={true}
                                        />
                                        <Input
                                            type="tel"
                                            startIcon={Phone}
                                            value={data.phone}
                                            onChange={(e) =>
                                                setData('phone', e.target.value)
                                            }
                                            placeholder="+591 70123456"
                                            error={errors.phone}
                                        />
                                        <InputError message={errors.phone} />
                                    </div>
                                </div>
                            </div>
                        </CardComponent>

                        {/* Seguridad y Acceso */}
                        <CardComponent
                            title="Seguridad y Acceso"
                            description="Contraseña y permisos"
                            icon={User}
                            colorIcon="success"
                        >
                            <div className="space-y-4">
                                {/* Contraseña */}
                                <div className="form-control">
                                    <Label text="Contraseña" required={true} />
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPassword
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password}
                                            onChange={(e) =>
                                                handlePasswordChange(
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Mínimo 8 caracteres"
                                            error={errors.password}
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer text-gray-400 hover:text-gray-600"
                                            onClick={() =>
                                                setShowPassword(!showPassword)
                                            }
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>

                                        <InputError message={errors.password} />
                                    </div>

                                    {/* Indicador de fortaleza */}
                                    {data.password && (
                                        <div className="mt-2">
                                            <div className="mb-1 flex items-center justify-between">
                                                <span className="text-xs text-gray-600">
                                                    Fortaleza de la contraseña
                                                </span>
                                                <span
                                                    className={`text-xs font-semibold ${
                                                        passwordStrength < 30
                                                            ? 'text-danger'
                                                            : passwordStrength <
                                                                60
                                                              ? 'text-warning'
                                                              : passwordStrength <
                                                                  80
                                                                ? 'text-info'
                                                                : 'text-success'
                                                    }`}
                                                >
                                                    {getPasswordStrengthLabel()}
                                                </span>
                                            </div>
                                            <Progress
                                                value={passwordStrength}
                                                max={100}
                                                label="Fortaleza de contraseña"
                                                variant={
                                                    passwordStrength < 40
                                                        ? 'error'
                                                        : passwordStrength < 70
                                                          ? 'warning'
                                                          : 'success'
                                                }
                                            />
                                        </div>
                                    )}

                                    <label className="mt-2 flex items-center gap-1">
                                        <Lightbulb className="h-4 w-4 text-warning" />
                                        <span className="label-text-alt text-sm text-gray-500">
                                            Usa mayúsculas, minúsculas, números
                                            y símbolos
                                        </span>
                                    </label>
                                </div>

                                {/* Confirmar Contraseña */}
                                <div className="form-control">
                                    <Label
                                        text="Confirmar Contraseña"
                                        required={true}
                                    />
                                    <div className="relative">
                                        <Input
                                            type={
                                                showPasswordConfirm
                                                    ? 'text'
                                                    : 'password'
                                            }
                                            value={data.password_confirmation}
                                            onChange={(e) =>
                                                setData(
                                                    'password_confirmation',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Repite la contraseña"
                                            error={errors.password_confirmation}
                                        />
                                        <button
                                            type="button"
                                            className="absolute top-1/2 right-3 -translate-y-1/2 transform text-gray-400 hover:text-gray-600"
                                            onClick={() =>
                                                setShowPasswordConfirm(
                                                    !showPasswordConfirm,
                                                )
                                            }
                                        >
                                            {showPasswordConfirm ? (
                                                <EyeOff className="h-5 w-5" />
                                            ) : (
                                                <Eye className="h-5 w-5" />
                                            )}
                                        </button>
                                        <InputError
                                            message={
                                                errors.password_confirmation
                                            }
                                        />
                                    </div>

                                    {data.password &&
                                        data.password_confirmation && (
                                            <div>
                                                {data.password ===
                                                data.password_confirmation ? (
                                                    <span className="flex items-center text-success">
                                                        <Check className="mr-1 h-4 w-4" />
                                                        Las contraseñas
                                                        coinciden
                                                    </span>
                                                ) : (
                                                    <span className="flex items-center text-danger">
                                                        <OctagonX className="mr-1 h-4 w-4" />
                                                        Las contraseñas no
                                                        coinciden
                                                    </span>
                                                )}
                                            </div>
                                        )}
                                </div>
                            </div>
                        </CardComponent>

                        {/* Rol y Permisos */}
                        <CardComponent
                            title="Rol y Permisos"
                            description="Define el nivel de acceso"
                            icon={ShieldCheck}
                            colorIcon="warning"
                        >
                            <div className="form-control">
                                <Label text="Seleccionar Rol" required={true} />
                                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                                    {rolesData.map((r) => (
                                        <RoleCard
                                            key={r.role}
                                            role={r.role}
                                            selectedRole={data.role}
                                            onSelect={() =>
                                                setData('role', r.role)
                                            }
                                            icon={r.icon}
                                            title={r.label}
                                            description={r.description}
                                            permissions={r.permissions}
                                            borderColorClass={
                                                r.borderColorClass
                                            }
                                            bgColorClass={r.bgColorClass}
                                            radioClass={r.radioClass}
                                        />
                                    ))}
                                </div>

                                {errors.role && (
                                    <InputError message={errors.role} />
                                )}
                            </div>
                        </CardComponent>

                        {/* Botones de Acción */}
                        <div className="flex flex-col justify-between gap-4 sm:flex-row">
                            <Button
                                type="button"
                                onClick={() => reset()}
                                variant={'outline'}
                                disabled={processing}
                                startIcon={<RefreshCcw />}
                            >
                                Limpiar Formulario
                            </Button>

                            <div className="flex gap-4">
                                <Button
                                    onClick={() =>
                                        router.get(admin.usuarios.index().url)
                                    }
                                    variant={'ghost'}
                                >
                                    Cancelar
                                </Button>

                                <SubmitButton
                                    processing={processing}
                                    isEdit={!!isEdit}
                                    isFormValid={isFormValid}
                                />
                            </div>
                        </div>
                    </form>

                    {/* Panel Lateral */}
                    <div className="space-y-4">
                        {/* Vista Previa del Usuario */}
                        <PreviewUser data={data} />

                        {/* Estado del Formulario */}
                        <CompletedCard
                            data={data}
                            fields={fields}
                            isValid={isFormValid}
                        />

                        {/* Consejos de Seguridad */}
                        <SecurityTipsCard tips={tipsFormUsers} />
                    </div>
                </div>
            </div>
        </AppLayout>
    );
}
