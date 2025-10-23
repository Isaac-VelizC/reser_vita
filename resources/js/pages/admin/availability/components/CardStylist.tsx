import AvatarCustomer from '@/components/AvatarCustomer';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { StylistInterface } from '@/interfaces/Profile';
import admin from '@/routes/admin';
import { router } from '@inertiajs/react';
import { CalendarClock, Clock, Mail } from 'lucide-react';

type CardStylistProps = {
    data: StylistInterface;
};

const CardStylist = ({ data }: CardStylistProps) => {
    return (
        <Card className="transition-all duration-300 hover:-translate-y-1 hover:border-primary/20 hover:shadow-xl">
            <div className="card-body p-6">
                {/* Header del Card */}
                <div className="mb-4 flex items-start gap-4">
                    <AvatarCustomer iniciales={data.name} />

                    <div className="flex-1">
                        <h3 className="mb-1 card-title text-lg font-bold">
                            {data.name}
                        </h3>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                            <Mail className="h-4 w-4" />
                            {data.email}
                        </div>
                    </div>
                </div>

                {/* Estadísticas */}
                <Card className="mb-4 p-4 border-none shadow ">
                    <div className="flex items-center justify-between">
                        <div>
                            <div className="text-2xl font-bold text-primary">
                                {
                                    data.availabilities.filter(
                                        (a) => a.is_available,
                                    ).length
                                }
                            </div>
                            <div className="text-xs text-primary/70">
                                Horarios disponibles
                            </div>
                        </div>
                        <div className="text-right">
                            <div className="text-lg font-semibold text-primary/80">
                                5h
                            </div>
                            <div className="text-xs text-primary/60">
                                Esta semana
                            </div>
                        </div>
                    </div>
                </Card>

                {/* Próximos horarios */}
                {data.availabilities.length > 0 && (
                    <div className="mb-4">
                        <h4 className="mb-2 text-xs font-semibold text-gray-500">
                            Próximos horarios:
                        </h4>
                        <div className="space-y-2">
                            {data.availabilities.slice(0, 2).map((av) => (
                                <div
                                    key={av.id}
                                    className="flex items-center justify-between rounded p-2 text-xs"
                                >
                                    <div className="flex items-center gap-2">
                                        <CalendarClock className="h-4 w-4 text-primary" />
                                        <span className="text-gray-500">
                                            {av.hour.name}
                                        </span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        <span className="text-gray-500">
                                            {av.hour.open_time} - {av.hour.close_time}
                                        </span>
                                        <Badge variant={"outline"} color={av.is_available ? 'success' : 'error'}>
                                            {av.is_available
                                                ? 'Disponible'
                                                : 'No disponible'}
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {/* Botón de Acción */}
                <Button onClick={() => router.get(admin.availability.edit(data.id).url)} className='w-full'>
                    <Clock className="mr-2 h-4 w-4" />
                    Gestionar Horarios
                </Button>
            </div>
        </Card>
    );
};

export default CardStylist;
