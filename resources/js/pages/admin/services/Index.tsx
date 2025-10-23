import HeaderSection from '@/components/HeaderSection';
import { Pagination } from '@/components/PaginationComponent';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import usePersistedState from '@/hooks/usePersistedState';
import { ServiceInterface } from '@/interfaces/Service';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin/index';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CircleAlert, Grid2x2, List, Search } from 'lucide-react';
import { useMemo, useState } from 'react';
import CardService from './components/CardService';
import TableService from './components/TableService';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Servicios',
        href: admin.services.index().url,
    },
];

type ServicesProps = {
    services: {
        data: ServiceInterface[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    message: string;
    status: string;
};

export default function Index({ services, message, status }: ServicesProps) {
    const [search, setSearch] = useState('');
    const [viewMode, setViewMode] = usePersistedState<'grid' | 'table'>(
        'viewMode',
        'grid',
    );

    // Filtrar por búsqueda
    const datosFiltrados = useMemo(() => {
        return services.data.filter((item) => {
            const textoBusqueda = search.toLowerCase();
            return (
                item.name.toLowerCase().includes(textoBusqueda) ||
                item.description.toLowerCase().includes(textoBusqueda)
            );
        });
    }, [search, services.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header Section */}
                <HeaderSection
                    title="Nuestros Servicios"
                    description="Descubre todos nuestros servicios profesionales"
                    contentRight={
                        <div className="p-2">
                            <span className="text-lg text-primary">
                                {services.total}
                            </span>
                            <p className="text-xs">Servicios totales</p>
                        </div>
                    }
                />

                {/* Search and Controls */}
                <Card>
                    <CardContent>
                        <div className="flex w-full flex-col items-center justify-between lg:flex-row">
                            <div className="w-full lg:w-[60%]">
                                <div className="flex flex-col items-center gap-4 lg:flex-row">
                                    {/* Search */}
                                    <div className="relative flex-1">
                                        <Input
                                            type="text"
                                            className="grow py-3 bg-transparent"
                                            placeholder="Buscar por nombre o descripción"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            startIcon={Search}
                                        />
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className="space-x-2">
                                        <Button
                                            variant={viewMode === 'grid' ? 'solid' : 'outline'}
                                            size={"sm"}
                                            onClick={() => setViewMode('grid')}
                                            startIcon={<Grid2x2 className='w-4 h-4' />}
                                        >
                                            Cuadrícula
                                        </Button>
                                        <Button
                                            variant={ viewMode === 'table' ? "solid" : 'outline' }
                                            size={"sm"}
                                            onClick={() => setViewMode('table')}
                                            startIcon={<List className='w-4 h-4' />}
                                        >
                                            Tabla
                                        </Button>
                                    </div>

                                    {/* Results count */}
                                    <div className="text-sm text-neutral">
                                        {search && (
                                            <span>
                                                {datosFiltrados.length}{' '}
                                                resultado
                                                {datosFiltrados.length !== 1
                                                    ? 's'
                                                    : ''}
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                            <div>
                                <Button
                                    onClick={() =>
                                        router.get(admin.services.create().url)
                                    }
                                    size={'sm'}
                                >
                                    Agregar Servicio
                                </Button>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                <Card>
                    {status === 'success' ? (
                        <>
                            {viewMode === 'grid' ? (
                                /* Grid View */
                                <CardContent>
                                    {datosFiltrados.length > 0 ? (
                                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
                                            {datosFiltrados.map(
                                                (service, index) => (
                                                    <CardService
                                                        key={index}
                                                        index={index}
                                                        service={service}
                                                        current_page={
                                                            services.current_page
                                                        }
                                                        per_page={
                                                            services.per_page
                                                        }
                                                    />
                                                ),
                                            )}
                                        </div>
                                    ) : (
                                        <div className="py-12 text-center">
                                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                                                <Search className="h-10 w-10 text-gray-400" />
                                            </div>
                                            <h3 className="mb-2 text-lg font-medium">
                                                No se encontraron servicios
                                            </h3>
                                            <p className="text-gray-500">
                                                Intenta con otros términos de
                                                búsqueda
                                            </p>
                                        </div>
                                    )}
                                </CardContent>
                            ) : (
                                /* Table View */
                                <CardContent className="overflow-x-auto">
                                    <TableService
                                        datos={datosFiltrados}
                                        current_page={services.current_page}
                                        per_page={services.per_page}
                                    />
                                </CardContent>
                            )}
                        </>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                                <CircleAlert className="h-10 w-10 text-gray-400" />
                            </div>
                            <p className="text-lg text-gray-600">{message}</p>
                        </div>
                    )}
                </Card>

                {/* Pagination */}
                <div className="join mt-4 justify-center">
                    {/* Paginación  */}
                    {status === 'success' && (
                        <Pagination
                            links={services.links}
                            align="center"
                            onNavigate={(url) => {
                                // opcional: manejar la navegación sin recargar
                                console.log('Ir a:', url);
                                // o usar router.push(url)
                            }}
                        />
                    )}
                </div>
            </div>
        </AppLayout>
    );
}
