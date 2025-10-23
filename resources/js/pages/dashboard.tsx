import AgendaDay from '@/components/dashboard/AgendaDay';
import KpiCard from '@/components/dashboard/KpiCard';
import MostRequestedServices from '@/components/dashboard/MostRequestedServices';
import OperationalStatus from '@/components/dashboard/OperationalStatus';
import QuickActions from '@/components/dashboard/QuickActions';
import RecentActivity from '@/components/dashboard/RecentActivity';
import ReservationsWeek from '@/components/dashboard/ReservationsWeek';
import StaffPerformance from '@/components/dashboard/StaffPerformance';
import WeeklyAvailability from '@/components/dashboard/WeeklyAvailability';
import { ActividadReciente, EstadoReservas, Estilistas, HorariosSemana, Kpis, ReservasHoy, ReservasSemana, ServiciosPopulares } from '@/interfaces/Dashboard';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import {
    AlarmClock,
    BadgeDollarSign,
    Calendar,
    Hourglass,
    Users2,
    X,
} from 'lucide-react';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
];

type AdminDashboardProps = {
    kpis: Kpis;
    reservas_hoy: ReservasHoy[];
    estilistas: Estilistas[];
    estado_reservas: EstadoReservas;
    actividad_reciente: ActividadReciente[];
    horarios_semana: HorariosSemana[];
    reservas_semana: ReservasSemana[];
    servicios_populares: ServiciosPopulares[];
};

export default function AdminDashboard({ kpis, reservas_hoy, estilistas, estado_reservas, actividad_reciente, horarios_semana, reservas_semana, servicios_populares }: AdminDashboardProps) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* === KPIs === */}
                <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
                    <KpiCard
                        icon={Calendar}
                        gradientFrom="from-blue-400"
                        gradientTo="to-blue-600"
                        value={kpis.reservas_hoy.value}
                        change={kpis.reservas_hoy.change}
                        trend={kpis.reservas_hoy.trend}
                        description="Reservas de hoy"
                    />

                    <KpiCard
                        icon={Users2}
                        gradientFrom="from-green-400"
                        gradientTo="to-green-600"
                        value={kpis.estilistas_activos.value}
                        change={kpis.estilistas_activos.change}
                        trend={kpis.estilistas_activos.trend}
                        description="Estilistas activos"
                    />

                    <KpiCard
                        icon={BadgeDollarSign}
                        gradientFrom="from-amber-400"
                        gradientTo="to-amber-600"
                        value={kpis.ingresos_dia.value}
                        change={kpis.ingresos_dia.change}
                        trend={kpis.ingresos_dia.trend}
                        description="Ingresos del día"
                        formatValue
                    />

                    <KpiCard
                        icon={AlarmClock}
                        gradientFrom="from-purple-400"
                        gradientTo="to-purple-600"
                        value={kpis.horas_disponibles.value}
                        change={kpis.horas_disponibles.change}
                        trend={kpis.horas_disponibles.trend}
                        description="Horas disponibles"
                    />

                    <KpiCard
                        icon={Hourglass}
                        gradientFrom="from-orange-400"
                        gradientTo="to-orange-600"
                        value={kpis.pendientes.value}
                        change={kpis.pendientes.change}
                        trend={kpis.pendientes.trend}
                        description="Pendientes"
                    />

                    <KpiCard
                        icon={X}
                        gradientFrom="from-red-400"
                        gradientTo="to-red-600"
                        value={kpis.cancelaciones.value}
                        change={kpis.cancelaciones.change}
                        trend={kpis.cancelaciones.trend}
                        description="Cancelaciones"
                    />
                </div>

                {/* === Bloque central === */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
                    <div className="space-y-4 lg:col-span-2">
                        <AgendaDay data={reservas_hoy} />
                        <StaffPerformance data={estilistas} />
                    </div>

                    <div className="space-y-4">
                        <OperationalStatus data={estado_reservas} />
                        <RecentActivity data={actividad_reciente} />
                        <QuickActions />
                    </div>
                </div>

                {/* === Disponibilidad semanal === */}
                <WeeklyAvailability data={horarios_semana} />

                {/* === Gráficos === */}
                <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                    <ReservationsWeek data={reservas_semana} />
                    <MostRequestedServices data={servicios_populares} />
                </div>
            </div>
        </AppLayout>
    );
}
