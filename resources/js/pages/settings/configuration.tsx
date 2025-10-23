import CardComponent from '@/components/CardComponent';
import HeadingSmall from '@/components/heading-small';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/useToast';
import { SettingInterface } from '@/interfaces/Settings';
import AppLayout from '@/layouts/app-layout';
import SettingsLayout from '@/layouts/settings/layout';
import { edit as editAppearance } from '@/routes/appearance';
import configuration from '@/routes/configuration';
import { BreadcrumbItem, CurrenryItems, LanguageItems } from '@/types';
import { Head, useForm } from '@inertiajs/react';
import {
    Building,
    Info,
    Mail,
    MapPin,
    MapPinHouse,
    Phone,
    Settings,
} from 'lucide-react';
import { useState } from 'react';
import { CardPreferences } from './components/CardPreferences';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { cn } from '@/lib/utils';

type ConfigurationProps = {
    dataSetting: SettingInterface;
};

const tabs = [
    { id: "general", label: "Información General", icon: Building },
    { id: "contact", label: "Contacto y Ubicación", icon: Mail },
    { id: "preferences", label: "Preferencias", icon: Settings },
  ];


const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Configuración',
        href: editAppearance().url,
    },
];

function Configuration({ dataSetting }: ConfigurationProps) {
    const { addToast } = useToast();
    const safeDataSetting = dataSetting || {
        currency: 'USD',
        language: 'es',
        logo: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        address2: '',
        years_experience: 0,
    };

    const { data, setData, processing, errors, put } = useForm(safeDataSetting);

    const [logoPreview, setLogoPreview] = useState(data.logo || '');
    const [activeTab, setActiveTab] = useState('general');

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        put(configuration.update().url, {
            preserveScroll: true,
            onSuccess: () => {
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
    };
    
    const handleLogoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="" />
            <SettingsLayout>
                <div className="mx-auto max-w-6xl space-y-6">
                    <HeadingSmall
                        title="Configuración del Sistema"
                        description="Administra la información general y preferencias del salón"
                    />
                    {/* Tabs */}
                    <div
                        className="
                            flex gap-1 overflow-x-auto scrollbar-none rounded-xl
                            bg-white/60 p-1 dark:bg-gray-800/40
                        "
                        >
                        {tabs.map(({ id, label, icon: Icon }) => (
                            <button
                            key={id}
                            onClick={() => setActiveTab(id)}
                            className={cn(
                                "flex items-center whitespace-nowrap rounded-xl px-4 py-2 text-sm font-medium transition-all duration-200 focus:outline-none",
                                activeTab === id
                                ? "bg-gradient-to-r from-primary to-primary text-white shadow-md"
                                : "text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
                            )}
                            >
                            <Icon className="mr-2 h-4 w-4" />
                            {label}
                            </button>
                        ))}
                        </div>

                    <form onSubmit={handleSubmit}>
                        {/* Tab: Información General */}
                        {activeTab === 'general' && (
                            <CardComponent
                                title="Información del Negocio"
                                description="Datos principales del salón"
                                icon={Building}
                                colorIcon="primary"
                            >
                                <div className="space-y-6">
                                    {/* Logo */}
                                    <div className="form-control">
                                        <Label text="Logo del Salón" />
                                        <div className="flex flex-col items-center gap-4 md:flex-row">
                                            <div className="avatar shrink-0">
                                                <div className="flex h-24 w-24 items-center justify-center rounded-xl border-2 border-gray-500 bg-gradient-to-br from-gray-300 to-white shadow-md transition-colors dark:from-gray-700 dark:to-gray-900">
                                                    {logoPreview && (
                                                        <img
                                                            src={logoPreview}
                                                            alt="Logo"
                                                            className="h-full w-full rounded-xl object-cover"
                                                        />
                                                    )}
                                                </div>
                                            </div>

                                            <div className="w-full max-w-md flex-1">
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={
                                                        handleLogoChange
                                                    }
                                                    className="file-input file-input-primary w-full"
                                                />
                                                <label className="label mt-1">
                                                    <span className="label-text-alt text-xs text-gray-500 dark:text-gray-400">
                                                        Formatos: JPG, PNG,
                                                        SVG. Tamaño máximo:
                                                        2MB
                                                    </span>
                                                </label>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Nombre del Salón */}
                                    <div className="form-control">
                                        <Label
                                            text="Nombre del Salón"
                                            required
                                            auxiliaryText={`${data.name.length}/100`}
                                        />
                                        <Input
                                            id="name"
                                            value={data.name}
                                            required
                                            autoComplete="name"
                                            onChange={(e) =>
                                                setData(
                                                    'name',
                                                    e.target.value,
                                                )
                                            }
                                            placeholder="Ej: Salón de Belleza AISAKVELIZ"
                                            maxLength={100}
                                            error={errors.name}
                                        />
                                    </div>

                                    {/* Años de Experiencia */}
                                    <div className="form-control">
                                        <Label
                                            text="Años de Experiencia"
                                            required
                                        />

                                        <Input
                                            id="years_experience"
                                            type="number"
                                            min={0}
                                            value={data.years_experience}
                                            onChange={(e) =>
                                                setData(
                                                    'years_experience',
                                                    parseInt(
                                                        e.target.value,
                                                    ) || 0,
                                                )
                                            }
                                            required
                                            placeholder="15"
                                            error={errors.years_experience}
                                        />

                                        <label className="label">
                                            <span className="label-text-alt text-xs text-gray-500">
                                                Este dato se mostrará en la
                                                página pública del salón
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </CardComponent>
                        )}

                        {/* Tab: Contacto y Ubicación */}
                        {activeTab === 'contact' && (
                            <CardComponent
                                title="Información de Contacto"
                                description="Datos para que los clientes te contacten"
                                icon={MapPin}
                                colorIcon="success"
                            >
                                <div className="space-y-6">
                                    {/* Email */}
                                    <div className="form-control">
                                        <Label
                                            text="Correo Electrónico"
                                            required
                                        />
                                        <div className="relative">
                                            <Input
                                                id="email"
                                                type="email"
                                                value={data.email}
                                                required
                                                placeholder="info@salon.com"
                                                onChange={(e) =>
                                                    setData(
                                                        'email',
                                                        e.target.value,
                                                    )
                                                }
                                                startIcon={Mail}
                                                error={errors.email}
                                            />
                                        </div>
                                    </div>

                                    {/* Teléfono */}
                                    <div className="form-control">
                                        <Label
                                            text="Teléfono"
                                            required
                                        />
                                        <div className="relative">
                                            <Input
                                                id="phone"
                                                type="tel"
                                                value={data.phone}
                                                required
                                                placeholder="+591 70123456"
                                                onChange={(e) =>
                                                    setData(
                                                        'phone',
                                                        e.target.value,
                                                    )
                                                }
                                                startIcon={Phone}
                                                error={errors.phone}
                                            />
                                        </div>
                                    </div>

                                    {/* Dirección Principal */}
                                    <div className="form-control">
                                        <Label
                                            text="Dirección Principal"
                                            required
                                        />
                                        <div className="relative">
                                            <Input
                                                id="address"
                                                value={data.address}
                                                required
                                                placeholder="Av. Principal #123"
                                                onChange={(e) =>
                                                    setData(
                                                        'address',
                                                        e.target.value,
                                                    )
                                                }
                                                startIcon={MapPinHouse}
                                                error={errors.address}
                                            />
                                        </div>
                                    </div>

                                    {/* Dirección Secundaria */}
                                    <div className="form-control">
                                        <Label text="Dirección Secundaria (Opcional)" />
                                        <div className="relative">
                                            <Input
                                                id="address2"
                                                value={data.address2}
                                                placeholder="Edificio, piso, departamento, etc."
                                                onChange={(e) =>
                                                    setData(
                                                        'address2',
                                                        e.target.value,
                                                    )
                                                }
                                                startIcon={MapPinHouse}
                                                error={errors.address2}
                                            />
                                        </div>
                                        <label className="label">
                                            <span className="label-text-alt text-xs text-gray-500">
                                                Referencias adicionales para
                                                encontrar el lugar
                                            </span>
                                        </label>
                                    </div>

                                    {/* Preview de Dirección Completa */}
                                    <Alert variant="info" icon={Info}>
                                        <AlertTitle>Dirección Completa:</AlertTitle>
                                        <AlertDescription>
                                            {data.address}
                                                {data.address2 &&
                                                    `, ${data.address2}`}
                                        </AlertDescription>
                                    </Alert>
                                </div>
                            </CardComponent>
                        )}

                        {/* Tab: Preferencias */}
                        {activeTab === 'preferences' && (
                            <CardComponent
                                title="Preferencias del Sistema"
                                description="Configuración regional e idioma"
                                icon={Settings}
                                colorIcon="warning"
                            >
                                <div className="space-y-6">
                                    {/* Moneda */}
                                    <div className="form-control">
                                        <Label
                                            text="Moneda"
                                            required
                                        />

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <CardPreferences
                                                code="BOB"
                                                name="Bolivianos"
                                                description="Moneda de Bolivia"
                                                flag="🇧🇴"
                                                selectedCode={data.currency}
                                                onSelect={(
                                                    code: CurrenryItems,
                                                ) =>
                                                    setData(
                                                        'currency',
                                                        code,
                                                    )
                                                }
                                                radioName="currency"
                                            />
                                            <CardPreferences
                                                code="USD"
                                                name="Dólares"
                                                description="Moneda internacional"
                                                flag="🇺🇸"
                                                selectedCode={data.currency}
                                                onSelect={(
                                                    code: CurrenryItems,
                                                ) =>
                                                    setData(
                                                        'currency',
                                                        code,
                                                    )
                                                }
                                                radioName="currency"
                                            />
                                        </div>

                                        <label className="label">
                                            <span className="label-text-alt text-xs text-gray-500">
                                                Esta será la moneda
                                                predeterminada para precios
                                                y transacciones
                                            </span>
                                        </label>
                                    </div>

                                    {/* Idioma */}
                                    <div className="form-control">
                                        <Label
                                            text="Idioma del Sistema"
                                            required
                                        />

                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                                            <CardPreferences
                                                code="es"
                                                name="Español"
                                                description="Interfaz en español"
                                                flag="🇪🇸"
                                                selectedCode={data.language}
                                                onSelect={(
                                                    code: LanguageItems,
                                                ) =>
                                                    setData(
                                                        'language',
                                                        code,
                                                    )
                                                }
                                                colorClass="warning"
                                                radioName="language"
                                                radioClass="radio-warning"
                                            />
                                            <CardPreferences
                                                code="en"
                                                name="English"
                                                description="Interface in English"
                                                flag="🇬🇧"
                                                selectedCode={data.language}
                                                onSelect={(
                                                    code: LanguageItems,
                                                ) =>
                                                    setData(
                                                        'language',
                                                        code,
                                                    )
                                                }
                                                colorClass="warning"
                                                radioName="language"
                                                radioClass="radio-warning"
                                            />
                                        </div>

                                        <label className="label">
                                            <span className="label-text-alt text-xs text-gray-500">
                                                El idioma afectará toda
                                            </span>
                                        </label>
                                    </div>
                                </div>
                            </CardComponent>
                        )}
                        <div className="mt-4 flex items-center justify-end">
                            <Button type="submit" disabled={processing}>{processing ? "Guardando" :  "Guardar Cambios"}</Button>
                        </div>
                    </form>
                </div>
            </SettingsLayout>
        </AppLayout>
    );
}

export default Configuration;
