import { ChartSpline } from 'lucide-react';
import {
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from 'recharts';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

type ReservationsWeekProps = {
    data: {
        day: string;
        count: number;
    }[];
};

const ReservationsWeek = ({ data }: ReservationsWeekProps) => {
    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center">
                    <ChartSpline className="mr-2 h-5 w-5 text-primary" />
                    Reservas por Día
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                            data={data}
                            margin={{
                                top: 20,
                                right: 20,
                                left: -10,
                                bottom: 10,
                            }}
                        >
                            <defs>
                                <linearGradient
                                    id="barColor"
                                    x1="0"
                                    y1="0"
                                    x2="0"
                                    y2="1"
                                >
                                    <stop
                                        offset="0%"
                                        stopColor="#3B82F6"
                                        stopOpacity={0.9}
                                    />
                                    <stop
                                        offset="100%"
                                        stopColor="#60A5FA"
                                        stopOpacity={0.7}
                                    />
                                </linearGradient>
                            </defs>

                            <CartesianGrid
                                strokeDasharray="3 3"
                                vertical={false}
                                stroke="#E5E7EB"
                            />
                            <XAxis
                                dataKey="day"
                                tick={{ fontSize: 12, fill: '#6B7280' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <YAxis
                                tick={{ fontSize: 12, fill: '#9CA3AF' }}
                                axisLine={false}
                                tickLine={false}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(0,0,0,0.05)' }}
                                contentStyle={{
                                    background: 'white',
                                    borderRadius: '0.75rem',
                                    border: '1px solid #E5E7EB',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                                }}
                                itemStyle={{
                                    color: '#1F2937',
                                    fontWeight: 500,
                                }}
                            />
                            <Legend verticalAlign="top" height={24} />
                            <Bar
                                dataKey="count"
                                name="Reservas"
                                fill="url(#barColor)"
                                radius={[8, 8, 0, 0]}
                                animationDuration={800}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
};

export default ReservationsWeek;
