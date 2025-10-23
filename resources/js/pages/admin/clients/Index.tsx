import CardStats from '@/components/CardStats';
import HeaderSection from '@/components/HeaderSection';
import { Pagination } from '@/components/PaginationComponent';
import { ClientInterface } from '@/interfaces/Reservation';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin/index';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BadgeCheck, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
import TableClients from './components/TableClients';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Clientes',
        href: admin.usuarios.index().url,
    },
];

type ClientsProps = {
    clients: {
        data: ClientInterface[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    message: string;
    status: string;
};

export default function ClientsIndex({
    clients,
    status = 'success',
}: ClientsProps) {
    const statsData = useMemo(() => {
        const total = clients.data.length;
        const active = clients.data.filter((u) => u.status === 'active').length;
        return { total, active };
    }, [clients.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Clientes" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header con estadísticas */}
                <HeaderSection
                    title="Gestión de Clientes"
                    description="Administra clientes e historial de reservas del sistema"
                    contentRight={
                        <div className="grid grid-cols-2 gap-4">
                            <CardStats
                                title="Total"
                                value={statsData.total}
                                icon={UsersRound}
                                color="primary"
                            />
                            <CardStats
                                title="Activos"
                                value={statsData.active}
                                icon={BadgeCheck}
                                color="success"
                            />
                        </div>
                    }
                />
                <TableClients
                    datos={clients.data}
                    statusData={status}
                    paginationLinks={clients.links}
                />

                {/* Paginación */}
                {status === 'success' &&
                    clients.links &&
                    clients.data.length > 0 && (
                        <Pagination
                            links={clients.links}
                            align="center"
                            onNavigate={(url) => {
                                // opcional: manejar la navegación sin recargar
                                console.log('Ir a:', url);
                                // o usar router.push(url)
                            }}
                        />
                    )}
            </div>
        </AppLayout>
    );
}
