import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import {
    BarChart,
    CalendarDays,
    Settings,
    ShieldCheck,
    Sparkles,
    Users,
} from 'lucide-react';
import { useEffect, useState } from 'react';

export default function FeaturesSection() {
    const [visible, setVisible] = useState(false);

    const features = [
        {
            icon: <CalendarDays className="h-10 w-10 text-primary" />,
            title: 'Gestión de Citas',
            description:
                'Administra tus reservas con un calendario inteligente y automatiza recordatorios.',
        },
        {
            icon: <Users className="h-10 w-10 text-primary" />,
            title: 'Gestión de Clientes',
            description:
                'Crea perfiles, registra historial y mejora la fidelización de tus clientes.',
        },
        {
            icon: <BarChart className="h-10 w-10 text-primary" />,
            title: 'Reportes y Estadísticas',
            description:
                'Obtén métricas de rendimiento y visualiza el crecimiento de tu negocio.',
        },
        {
            icon: <Settings className="h-10 w-10 text-primary" />,
            title: 'Configuración Personalizable',
            description:
                'Adapta el sistema a tus servicios, horarios y políticas de atención.',
        },
        {
            icon: <ShieldCheck className="h-10 w-10 text-primary" />,
            title: 'Seguridad y Privacidad',
            description:
                'Tus datos están protegidos con encriptación y autenticación segura.',
        },
        {
            icon: <Sparkles className="h-10 w-10 text-primary" />,
            title: 'Diseño Moderno',
            description:
                'Una interfaz elegante, rápida y responsiva, optimizada para cualquier dispositivo.',
        },
    ];

    // Efecto para animar la entrada al hacer scroll
    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('features-section');
            if (section) {
                const rect = section.getBoundingClientRect();
                if (rect.top < window.innerHeight - 150) setVisible(true);
            }
        };

        window.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <section
            id="features-section"
            className="relative overflow-hidden px-4 py-20"
        >
            {/* Decorativo de fondo */}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white via-pink-50/20 to-white dark:from-gray-950 dark:via-gray-800/50 dark:to-gray-950"></div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                {/* Encabezado */}
                <div
                    className={`mb-16 text-center transition-all duration-700 ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <Badge
                        color="primary"
                        variant="solid"
                        className="animate-fade-in mb-4"
                    >
                        Características
                    </Badge>
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        Todo lo que necesitas para{' '}
                        <span className="block bg-gradient-to-r from-pink-600 to-rose-600 bg-clip-text text-transparent">
                            gestionar tu negocio
                        </span>
                    </h2>
                    <p className="mx-auto max-w-2xl text-lg text-gray-600">
                        Herramientas poderosas diseñadas específicamente para
                        salones de belleza y spas.
                    </p>
                </div>

                {/* Cards */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-700 ease-out ${
                                visible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-10 opacity-0'
                            }`}
                            style={{
                                transitionDelay: `${index * 100}ms`,
                            }}
                        >
                            <Card className="group rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-xl dark:border-gray-700 dark:bg-gray-900">
                                <CardContent className="p-6">
                                    <div className="flex flex-col items-start space-y-4">
                                        <div className="rounded-xl bg-primary/10 p-3 transition-colors duration-300 group-hover:bg-primary/20 dark:bg-primary/20 dark:group-hover:bg-primary/30">
                                            {feature.icon}
                                        </div>
                                        <h3 className="text-xl font-semibold text-gray-900 transition-colors duration-300 group-hover:text-primary dark:text-gray-100">
                                            {feature.title}
                                        </h3>
                                        <p className="leading-relaxed text-gray-600 dark:text-gray-300">
                                            {feature.description}
                                        </p>
                                    </div>
                                </CardContent>
                            </Card>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
