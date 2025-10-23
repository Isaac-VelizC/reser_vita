import AvatarCustomer from '@/components/AvatarCustomer';
import { Card, CardContent } from '@/components/ui/card';
import { SalonDayInterface } from '@/interfaces/Availability';
import { StylistInterface } from '@/interfaces/Profile';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import AvailabilityFormModal from './components/AvailabilityFormModal';
import AvailableTable from './components/AvailableTable';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Disponibilidad',
        href: admin.availability.index().url,
    },
    {
        title: 'Gestión de Horarios',
        href: '#',
    },
];

type FormAvailabilityProps = {
    stylist: StylistInterface;
    availableDays: SalonDayInterface[];
    message: string;
    status: string;
};

export default function AvailabilityManagement({
    stylist,
    availableDays,
}: FormAvailabilityProps) {

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Disponibilidad" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <Card>
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                                <AvatarCustomer iniciales={stylist.name} />
                                <div>
                                    <h3 className="text-xl font-bold">
                                        {stylist.name}
                                    </h3>
                                    <p className="text-sm text-gray-500">
                                        {stylist.email}
                                    </p>
                                </div>
                            </div>
                            <AvailabilityFormModal
                                hoarios={availableDays}
                                stylistId={stylist.id}
                            />
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent>
                        {/* Tabla de Horarios */}
                        <AvailableTable
                            availabilities={stylist.availabilities}
                        />
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
