import HeaderSection from '@/components/HeaderSection';
import { UserInterface } from '@/interfaces/Profile';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin/index';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { BadgeCheck, ShieldCheck, UsersRound } from 'lucide-react';
import { useMemo } from 'react';
import TableUsers from './components/TableUsers';
import CardStats from '@/components/CardStats';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Usuarios',
        href: admin.usuarios.index().url,
    },
];

type UsersProps = {
    users: {
        data: UserInterface[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    message: string;
    status: string;
};

export default function UsersIndex({ users, status = 'success' }: UsersProps) {
    const statsData = useMemo(() => {
        const total = users.data.length;
        const active = users.data.filter((u) => u.status === 'active').length;
        const admins = users.data.filter((u) => u.role === 'admin').length;
        return { total, active, admins };
    }, [users.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Usuarios" />

            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header con estadísticas */}
                <HeaderSection
                    title="Gestión de Usuarios"
                    description="Administra usuarios, roles y permisos del sistema"
                    contentRight={
                        <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
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

                            <CardStats
                                title="Admins"
                                value={statsData.admins}
                                icon={ShieldCheck}
                                color="accent"
                            />
                        </div>
                    }
                />
                <TableUsers
                    datos={users.data}
                    statusData={status}
                    paginationLinks={users.links}
                />
            </div>
        </AppLayout>
    );
}
