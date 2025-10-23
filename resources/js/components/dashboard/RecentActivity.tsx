import dayjs from 'dayjs';
import { Clock } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import TextLink from '../text-link';
import admin from '@/routes/admin';
import { Badge } from '../ui/badge';
import { BadgeColor } from '@/types';

type RecentActivityProps = {
    data: {
        type: string;
        message: string;
        time: string;
        color: BadgeColor;
    }[];
};

const RecentActivity = ({ data }: RecentActivityProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <Clock className="mr-2 h-5 w-5 text-warning" />
                    Actividad Reciente
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {data.map((actividad, index) => (
                        <div key={index} className="flex gap-3">
                            <div className="flex flex-col items-center">
                                <Badge variant="empty" color={actividad.color} />
                                
                                {index < data.length - 1 && (
                                    <div className="mt-1 h-full w-px bg-gray-200"></div>
                                )}
                            </div>
                            <div className="flex-1 pb-3">
                                <p className="text-sm text-gray-900 dark:text-gray-200">
                                    {actividad.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                    {dayjs(actividad.time).format('MMMM D, YYYY h:mm A')}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                <TextLink
                    href={admin.reservations.index().url}
                    className="text-center font-bold mt-2 text-xs"
                >
                    Ver todo el historial
                </TextLink>
            </CardContent>
        </Card>
    );
};

export default RecentActivity;
