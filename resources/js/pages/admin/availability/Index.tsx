import CardStats from '@/components/CardStats';
import HeaderSection from '@/components/HeaderSection';
import { StylistInterface } from '@/interfaces/Profile';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { CircleCheckBig, Clock, Search, UsersRound } from 'lucide-react';
import { useMemo, useState } from 'react';
import CardStylist from './components/CardStylist';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Disponibilidad',
        href: dashboard().url,
    },
];

type AvailabilityProps = {
    stylists: {
        data: StylistInterface[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    message: string;
    status: string;
};

export default function AvailabilityManagement({
    stylists,
    status
}: AvailabilityProps) {
    const [searchTerm, setSearchTerm] = useState('');

    // Filtrar estilistas
    const filteredStylists = useMemo(() => {
        if (!stylists || !stylists.data) return [];
        return stylists.data.filter((stylist) => {
            const matchesSearch =
                stylist.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                stylist.email.toLowerCase().includes(searchTerm.toLowerCase());
            return matchesSearch;
        });
    }, [stylists, searchTerm]);

    const getTotalStats = () => {
        if (!stylists || !stylists.data) {
            return {
                totalStylists: 0,
                totalAvailabilities: 0,
                activeAvailabilities: 0,
            };
        }

        const totalStylists = stylists.data.length;

        const totalAvailabilities = stylists.data.reduce(
            (acc, s) => acc + (s.availabilities?.length || 0),
            0,
        );

        const activeAvailabilities = stylists.data.reduce(
            (acc, s) =>
                acc +
                (s.availabilities?.filter((a) => a.is_available).length || 0),
            0,
        );

        return { totalStylists, totalAvailabilities, activeAvailabilities };
    };

    const stats = getTotalStats();

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Gestión de Disponibilidad" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header */}
                <HeaderSection
                    title="Gestión de Disponibilidad"
                    description="Administra los horarios disponibles de tus estilistas"
                    contentRight={
                        <div className="grid grid-cols-3 gap-4">
                            <CardStats
                                title="Estilistas"
                                value={stats.totalStylists}
                                icon={UsersRound}
                            />
                            <CardStats
                                title="Disponibles"
                                value={stats.activeAvailabilities}
                                icon={CircleCheckBig}
                                color="success"
                            />
                            <CardStats
                                title="Total Horarios"
                                value={stats.totalAvailabilities}
                                icon={Clock}
                                color="info"
                            />
                        </div>
                    }
                />
                <Card>
                    <CardContent>
                        <div className="flex flex-col gap-4">
                            {/* Search input */}
                            <div className='w-full'>
                                <Input
                                    type="search"
                                    className="bg-transparent"
                                    placeholder="Buscar estilista o especialidad..."
                                    value={searchTerm}
                                    onChange={(e) =>
                                        setSearchTerm(e.target.value)
                                    }
                                    aria-label="Buscar estilista o especialidad"
                                    startIcon={Search}
                                />
                            </div>

                            {/* Search results */}
                            {searchTerm !== '' && (
                                <Button variant={"outline"} onClick={() => setSearchTerm('')}>
                                    Limpiar filtros
                                </Button>
                            )}
                        </div>
                    </CardContent>
                </Card>

                {/* Grid de Estilistas */}
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                    { status == "success" && filteredStylists.map((stylist) => (
                        <CardStylist data={stylist} />
                    ))}
                </div>

                {/* Estado vacío */}
                {filteredStylists.length === 0 && (
                    <Card>
                        <div className="p-12 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                                <Search className="h-10 w-10 text-gray-400" />
                            </div>
                            <h3 className="mb-2 text-lg font-medium">
                                No se encontraron estilistas
                            </h3>
                            <p className="text-gray-500">
                                Intenta con otros términos de búsqueda o filtros
                            </p>
                        </div>
                    </Card>
                )}
            </div>
        </AppLayout>
    );
}
