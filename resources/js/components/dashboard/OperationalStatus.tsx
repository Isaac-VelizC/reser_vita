import { ChartColumnStacked } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type OperationalStatusProps = {
    data: {
        pending: number;
        confirmed: number;
        completed: number;
        canceled: number;
    };
};

const OperationalStatus = ({ data }: OperationalStatusProps) => {
    // Normalizamos datos faltantes
    const safeData = {
        pending: data.pending ?? 0,
        confirmed: data.confirmed ?? 0,
        completed: data.completed ?? 0,
        canceled: data.canceled ?? 0,
    };

    // Total y cálculo de porcentajes
    const total =
        safeData.pending +
        safeData.confirmed +
        safeData.completed +
        safeData.canceled;

    const percent = (value: number) =>
        total ? ((value / total) * 100).toFixed(1) : 0;

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <ChartColumnStacked className="mr-2 h-5 w-5 text-info" />
                    Estado del Día
                </CardTitle>
            </CardHeader>

                {total === 0 ? (
                    <div className="text-center text-sm text-gray-400">
                        No hay reservas registradas hoy.
                    </div>
                ) : (
                    <CardContent className="space-y-3">
                        {/* Confirmadas */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-success" />
                                <span className="text-sm text-gray-500">
                                    Confirmadas
                                </span>
                            </div>
                            <span className="font-semibold">
                                {data.confirmed} ({percent(data.confirmed)}%)
                            </span>
                        </div>

                        {/* Completadas */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-info" />
                                <span className="text-sm text-gray-500">
                                    Completadas
                                </span>
                            </div>
                            <span className="font-semibold">
                                {data.completed} ({percent(data.completed)}%)
                            </span>
                        </div>

                        {/* Pendientes */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-warning" />
                                <span className="text-sm text-gray-500">
                                    Pendientes
                                </span>
                            </div>
                            <span className="font-semibold">
                                {data.pending} ({percent(data.pending)}%)
                            </span>
                        </div>

                        {/* Canceladas */}
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                                <div className="h-3 w-3 rounded-full bg-danger" />
                                <span className="text-sm text-gray-500">
                                    Canceladas
                                </span>
                            </div>
                            <span className="font-semibold">
                                {data.canceled} ({percent(data.canceled)}%)
                            </span>
                        </div>

                        {/* Línea total */}
                        <div className="mt-4 border-t border-gray-400 pt-2 text-right text-sm">
                            Total:{' '}
                            <span className="font-semibold">{total}</span>
                        </div>
                    </CardContent>
                )}
        </Card>
    );
};

export default OperationalStatus;
