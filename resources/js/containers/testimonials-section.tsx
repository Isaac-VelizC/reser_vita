import AvatarCustomer from '@/components/AvatarCustomer';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { useEffect, useState } from 'react';

const testimonials = [
    {
        name: 'María López',
        role: 'Propietaria - Belleza Total',
        text: 'Desde que usamos este sistema, nuestras reservas aumentaron un 40%. Es intuitivo y confiable.',
    },
    {
        name: 'Carlos Ramírez',
        role: 'Barbería El Corte Fino',
        text: 'La gestión de citas es una maravilla. Ya no tenemos confusiones ni solapamientos de horarios.',
    },
    {
        name: 'Ana García',
        role: 'Spa Serenidad',
        text: 'El soporte técnico es excelente y el diseño del sistema inspira confianza a nuestros clientes.',
    },
];

export default function TestimonialsSection() {
    const [visible, setVisible] = useState(false);
    // Efecto de entrada con scroll
    useEffect(() => {
        const handleScroll = () => {
            const section = document.getElementById('testimonials-section');
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
            id="testimonials-section"
            className="relative overflow-hidden bg-gradient-to-b from-white/70 to-white px-4 py-20 backdrop-blur-md dark:from-gray-950 dark:to-gray-700"
        >
            {/* Decorativos suaves */}
            <div className="animate-pulse-slow absolute top-25 left-15 h-20 w-20 rounded-full bg-pink-200/40 blur-3xl dark:bg-gray-400/40"></div>
            <div className="animate-pulse-slow absolute right-10 bottom-10 h-40 w-40 rounded-full bg-rose-200/40 blur-3xl dark:bg-gray-800/40"></div>

            <div className="relative z-10 container mx-auto max-w-6xl">
                {/* Encabezado */}
                <div
                    className={`mb-16 text-center transition-all duration-700 ${
                        visible
                            ? 'translate-y-0 opacity-100'
                            : 'translate-y-8 opacity-0'
                    }`}
                >
                    <Badge color="primary" variant="solid" className="mb-4">
                        Testimonios
                    </Badge>
                    <h2 className="mb-4 text-4xl font-bold md:text-5xl">
                        Lo que dicen nuestros clientes
                    </h2>
                    <p className="mx-auto max-w-2xl text-gray-600">
                        Opiniones reales de profesionales que ya optimizan su
                        negocio con nuestro sistema.
                    </p>
                </div>

                {/* Cards con animación progresiva */}
                <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                    {testimonials.map((testimonial, index) => (
                        <div
                            key={index}
                            className={`transform transition-all duration-700 ease-out ${
                                visible
                                    ? 'translate-y-0 opacity-100'
                                    : 'translate-y-10 opacity-0'
                            }`}
                            style={{ transitionDelay: `${index * 150}ms` }}
                        >
                            <Card className="rounded-2xl border border-gray-100 bg-white shadow-lg transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl dark:border-gray-700 dark:bg-gray-900">
                                <CardContent className="flex h-full flex-col justify-between p-6">
                                    <div>
                                        <div className="mb-4 flex items-center gap-3">
                                            <AvatarCustomer
                                                iniciales={testimonial.name}
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-900 dark:text-gray-100">
                                                    {testimonial.name}
                                                </div>
                                                <div className="text-sm text-gray-600 dark:text-gray-400">
                                                    {testimonial.role}
                                                </div>
                                            </div>
                                        </div>
                                        <p className="leading-relaxed text-gray-700 italic dark:text-gray-300">
                                            "{testimonial.text}"
                                        </p>
                                    </div>

                                    {/* Estrellas */}
                                    <div className="mt-6 flex gap-1">
                                        {[...Array(5)].map((_, i) => (
                                            <svg
                                                key={i}
                                                className="h-5 w-5 text-yellow-400"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                            >
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
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
