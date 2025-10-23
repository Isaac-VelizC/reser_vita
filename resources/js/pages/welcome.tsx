// import { dashboard, login, register } from '@/routes';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import FeaturesSection from '@/containers/features-section';
import StatsSection from '@/containers/stats-section';
import TestimonialsSection from '@/containers/testimonials-section';
import AppFooterLayout from '@/layouts/guest/app-footer-layout';
import AppHeaderLayout from '@/layouts/guest/app-header-layout';
import { register } from '@/routes';
import { Head, router } from '@inertiajs/react';
import { Play, Star, Zap } from 'lucide-react';

export default function Welcome() {
    return (
        <AppHeaderLayout>
            <Head title="AISAKVELIZ - Sistema de Gestión de Reservas">
                <link rel="preconnect" href="https://fonts.bunny.net" />
                <link
                    href="https://fonts.bunny.net/css?family=instrument-sans:400,500,600,700"
                    rel="stylesheet"
                />
            </Head>
            {/* Hero Section */}
            <section className="overflow-hidden px-4 pb-20">
                <div className="container mx-auto max-w-6xl">
                    <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                        {/* LADO IZQUIERDO */}
                        <div className="animate-fade-in-up space-y-6">
                            <div className="animate-fade-in-down inline-block">
                                <Badge variant="solid" color="primary">
                                    <Star className="h-4 w-4" />
                                    Sistema #1 en Gestión de Salones
                                </Badge>
                            </div>

                            <h1 className="animate-slide-up text-5xl leading-tight font-bold lg:text-6xl">
                                Gestiona tu Salón de Belleza
                                <span className="block bg-secondary bg-clip-text text-transparent">
                                    de forma Inteligente
                                </span>
                            </h1>

                            <p className="animate-fade-in text-xl leading-relaxed text-gray-600 delay-150">
                                Sistema completo de gestión de reservas,
                                clientes y estilistas. Aumenta tu productividad
                                y ofrece una experiencia excepcional a tus
                                clientes.
                            </p>

                            <div className="animate-fade-in-up flex flex-col gap-4 delay-300 sm:flex-row">
                                <Button
                                    onClick={() => router.get(register().url)}
                                    variant={'solid'}
                                    size={'lg'}
                                >
                                    <Zap className="h-5 w-5" />
                                    Comenzar Gratis
                                </Button>
                                <Button
                                    variant={'outline'}
                                    size={'lg'}
                                    startIcon={<Play className="h-5 w-5" />}
                                >
                                    Ver Demo
                                </Button>
                            </div>

                            <div className="animate-fade-in-up flex items-center gap-8 pt-4 delay-500">
                                <div className="flex -space-x-2">
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-pink-500"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-blue-500"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-purple-500"></div>
                                    <div className="h-10 w-10 rounded-full border-2 border-white bg-orange-500"></div>
                                </div>
                                <div>
                                    <div className="font-bold text-gray-900 dark:text-gray-200">
                                        500+ Salones
                                    </div>
                                    <div className="text-sm text-gray-600">
                                        Ya confían en nosotros
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* LADO DERECHO */}
                        <div className="animate-fade-in-right relative">
                            <div className="relative z-10 rounded-3xl border border-gray-100 bg-white p-8 shadow-2xl transition-transform duration-500 hover:scale-[1.02]">
                                <div className="space-y-4">
                                    {[
                                        {
                                            name: 'Ana García',
                                            service: 'Corte y Color',
                                            color: 'pink',
                                            badge: 'success',
                                            gradient: 'from-pink-50 to-rose-50',
                                        },
                                        {
                                            name: 'Carlos Mendoza',
                                            service: 'Barbería',
                                            color: 'blue',
                                            badge: 'warning',
                                            gradient: 'from-blue-50 to-cyan-50',
                                        },
                                        {
                                            name: 'María López',
                                            service: 'Manicure',
                                            color: 'purple',
                                            badge: 'info',
                                            gradient:
                                                'from-purple-50 to-pink-50',
                                        },
                                    ].map(
                                        ({
                                            name,
                                            service,
                                            color,
                                            badge,
                                            gradient,
                                        }) => (
                                            <div
                                                key={name}
                                                className={`flex items-center justify-between bg-gradient-to-r p-4 ${gradient} animate-scale-in rounded-xl`}
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div
                                                        className={`h-12 w-12 bg-${color}-500 rounded-full`}
                                                    ></div>
                                                    <div>
                                                        <div className="font-semibold">
                                                            {name}
                                                        </div>
                                                        <div className="text-sm text-gray-600">
                                                            {service}
                                                        </div>
                                                    </div>
                                                </div>
                                                <Badge color={badge}>
                                                    {badge === 'success'
                                                        ? 'Confirmada'
                                                        : badge === 'warning'
                                                          ? 'Pendiente'
                                                          : 'Completada'}
                                                </Badge>
                                            </div>
                                        ),
                                    )}
                                </div>
                            </div>

                            {/* FONDOS DECORATIVOS */}
                            <div className="animate-float-slow absolute -right-4 -bottom-4 h-32 w-32 rounded-3xl bg-gradient-to-br from-secondary/80 to-secondary/40 opacity-20"></div>
                            <div className="animate-float-slow absolute -top-4 -left-4 h-24 w-24 rounded-3xl bg-gradient-to-br from-blue-400 to-cyan-400 opacity-20 delay-500"></div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Stats */}
            <StatsSection />

            {/* Features */}
            <FeaturesSection />

            {/* Testimonials */}
            <TestimonialsSection />

            {/* CTA */}
            <section className="relative overflow-hidden px-4 py-20">
                {/* Fondo decorativo dinámico */}
                <div className="animate-gradient-x absolute inset-0 bg-gradient-to-br from-blue-200 via-cyan-300/40 to-blue-300 opacity-90 dark:from-transparent dark:via-blue-600/20 dark:to-transparent" />

                {/* Patrón decorativo */}
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(120,120,120,0.15)_0%,transparent_40%)] dark:bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.2)_0%,transparent_40%)]" />

                <div className="relative container mx-auto max-w-4xl">
                    <Card className="border-none bg-white/70 text-gray-900 shadow-2xl backdrop-blur-sm dark:bg-black/60 dark:text-white">
                        <CardContent className="p-12 text-center">
                            <h2 className="mb-4 text-4xl leading-tight font-extrabold md:text-5xl">
                                ¿Listo para transformar tu negocio?
                            </h2>

                            <p className="mb-10 text-lg font-light opacity-90 md:text-xl">
                                Únete a cientos de salones que ya confían en{' '}
                                <span className="font-semibold">
                                    AISAKVELIZ
                                </span>
                            </p>

                            <div className="flex flex-col justify-center gap-4 sm:flex-row">
                                <Button
                                    onClick={() => router.get(register().url)}
                                    className="bg-white px-8 py-3 text-sm font-semibold text-primary shadow-md transition-all duration-300 hover:bg-gray-100 lg:text-lg dark:bg-pink-600 dark:text-white dark:hover:bg-pink-700"
                                >
                                    🚀 Prueba Gratis por 30 Días
                                </Button>

                                <Button
                                    variant="outline"
                                    color='primary'
                                    className="px-8 py-3 text-sm transition-all duration-300 lg:text-lg"
                                >
                                    💬 Hablar con Ventas
                                </Button>
                            </div>

                            <p className="mt-6 text-sm opacity-75">
                                No se requiere tarjeta de crédito • Cancela
                                cuando quieras
                            </p>
                        </CardContent>
                    </Card>
                </div>
            </section>

            {/* Footer */}
            <AppFooterLayout />
        </AppHeaderLayout>
    );
}
