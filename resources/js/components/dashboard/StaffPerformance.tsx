import { Users } from 'lucide-react';
import { Badge } from '../ui/badge';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Progress } from '../ui/progress';

type StaffPerformanceProps = {
    data: {
        id: number;
        name: string;
        avatar_color: string;
        reservas_dia: number;
        reservas_mes: number;
        ingresos: number;
        desempeno: number;
    }[];
};

const StaffPerformance = ({ data }: StaffPerformanceProps) => {
    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat('es-ES', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 0,
        }).format(amount);
    };

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Users className="mr-2 h-5 w-5 text-success" />
                    <h2 className="text-lg">Rendimiento del Personal</h2>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {data.map((estilista) => (
                        <div key={estilista.id} className="border rounded-xl shadow-sm transition-shadow hover:shadow-md">
                            <div className="p-4">
                                <div className="mb-4 flex-1">
                                    <h3 className="font-bold">
                                        {estilista.name}
                                    </h3>
                                </div>

                                <div className="mb-3 grid grid-cols-2 gap-6 text-xs">
                                    <Badge color='info'>
                                        <p className="font-bold text-info">
                                            {estilista.reservas_dia}
                                        </p>
                                        <span className="text-info">Hoy</span>
                                    </Badge>
                                    <Badge color='success'>
                                        <p className="font-bold text-success">
                                            {estilista.reservas_mes}
                                        </p>
                                        <span className="text-success">
                                            Este mes
                                        </span>
                                    </Badge>
                                </div>

                                <div className="mb-2 flex items-center justify-between text-sm">
                                    <span className="text-gray-500">
                                        Ingresos:
                                    </span>
                                    <span className="text-lg font-bold text-primary">
                                        {formatCurrency(estilista.ingresos)}
                                    </span>
                                </div>

                                <div>
                                    <div className="mb-1 flex items-center justify-between text-xs">
                                        <span className="text-gray-500">
                                            Desempeño
                                        </span>
                                        <span className="font-semibold">
                                            {estilista.desempeno}%
                                        </span>
                                    </div>
                                    <Progress
                                        value={estilista.desempeno}
                                        max={100}
                                        size="sm"
                                    ></Progress>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default StaffPerformance;
