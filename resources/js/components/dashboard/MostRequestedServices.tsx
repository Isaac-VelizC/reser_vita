import { ChartColumnBig } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";
import { Progress } from "../ui/progress";

type MostRequestedServicesProps = {
    data: {
        name: string;
        count: number;
        percentage: number;
    }[];
};

const MostRequestedServices = ({ data }: MostRequestedServicesProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <ChartColumnBig className="mr-2 h-5 w-5 text-success" />
                    Servicios Más Solicitados
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {data.map((servicio, index) => (
                        <div key={index}>
                            <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center gap-2">
                                    <div
                                        className={`flex h-6 w-6 items-center justify-center rounded-full text-xs font-bold text-white ${
                                            index === 0
                                                ? 'bg-yellow-500'
                                                : index === 1
                                                  ? 'bg-gray-600'
                                                  : index === 2
                                                    ? 'bg-amber-600'
                                                    : 'bg-gray-400'
                                        }`}
                                    >
                                        {index + 1}
                                    </div>
                                    <span className="text-sm font-medium">
                                        {servicio.name}
                                    </span>
                                </div>
                                <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-primary">
                                        {servicio.count}
                                    </span>
                                    <span className="text-xs text-gray-500">
                                        ({servicio.percentage}%)
                                    </span>
                                </div>
                            </div>
                            <Progress
                                variant={
                                    index === 0
                                        ? 'warning'
                                        : index === 1
                                          ? 'info'
                                          : 'primary'
                                }
                                value={servicio.percentage}
                                max={100}
                            ></Progress>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
};

export default MostRequestedServices;
