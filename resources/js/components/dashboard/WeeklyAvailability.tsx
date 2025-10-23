import { getDayName } from '@/lib/utils';
import admin from '@/routes/admin';
import { router } from '@inertiajs/react';
import { Calendar, CircleCheck, OctagonX } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Button } from '../ui/button';
import { Badge } from '../ui/badge';
import { Table, TableBody, TableCell, TableHeader, TableRow } from '../ui/table';

type WeeklyAvailabilityProps = {
    data: {
        day: number;
        is_open: boolean;
        open: string;
        close: string;
        hours: number;
    }[];
};

const WeeklyAvailability = ({ data }: WeeklyAvailabilityProps) => {
    return (
        <Card>
            <CardHeader>
                <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                        <Calendar className="mr-2 h-5 w-5 text-primary" />
                        Horarios del Salón
                    </CardTitle>
                    <Button
                        onClick={() =>
                            router.get(admin.availability.index().url)
                        }
                    >
                        Editar Horarios
                    </Button>
                </div>
            </CardHeader>
            <CardContent>
                <div className="overflow-x-auto">
                    <Table>
                        <TableHeader>
                            <TableRow className="text-gray-700 dark:text-gray-400">
                                <TableCell className="font-semibold">Día</TableCell>
                                <TableCell className="font-semibold">Estado</TableCell>
                                <TableCell className="font-semibold">Apertura</TableCell>
                                <TableCell className="font-semibold">Cierre</TableCell>
                                <TableCell className="font-semibold">
                                    Horas Disponibles
                                </TableCell>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {data.map((horario, index) => (
                                <TableRow key={index}>
                                    <TableCell className="font-medium">
                                        {getDayName(horario.day)}
                                    </TableCell>
                                    <TableCell>
                                        {horario.is_open ? (
                                            <Badge variant='outline' color='success' icon={CircleCheck}>
                                                Abierto
                                            </Badge>
                                        ) : (
                                            <Badge  variant='outline' color='error' icon={OctagonX}>
                                                Cerrado
                                            </Badge>
                                        )}
                                    </TableCell>
                                    <TableCell className="text-sm">{horario.open}</TableCell>
                                    <TableCell className="text-sm">{horario.close}</TableCell>
                                    <TableCell>
                                        {horario.is_open ? (
                                            <Badge variant='outline'>
                                                {horario.hours} hrs.
                                            </Badge>
                                        ) : (
                                            <span className="text-gray-500">
                                                -
                                            </span>
                                        )}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
        </Card>
    );
};

export default WeeklyAvailability;
