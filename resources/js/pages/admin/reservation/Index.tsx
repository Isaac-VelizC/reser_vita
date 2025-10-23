import HeaderSection from '@/components/HeaderSection';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ReservationInterface } from '@/interfaces/Reservation';
import AppLayout from '@/layouts/app-layout';
import { dashboard } from '@/routes';
import admin from '@/routes/admin/index';
import { type BreadcrumbItem } from '@/types';
import { Head, router } from '@inertiajs/react';
import { CircleAlert, Grid2x2, List, Search } from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import CardReservation from './components/CardReservation';
import TableReservation from './components/TableReservation';
import { Pagination } from '@/components/PaginationComponent';
import { Input } from '@/components/ui/input';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: dashboard().url,
    },
    {
        title: 'Reservas',
        href: admin.services.index().url,
    },
];

type ReservasProps = {
    reservations: {
        data: ReservationInterface[];
        current_page: number;
        last_page: number;
        per_page: number;
        total: number;
        links: { url: string | null; label: string; active: boolean }[];
    };
    message: string;
    status: string;
};

export default function Index({
    reservations,
    message,
    status,
}: ReservasProps) {
    const [search, setSearch] = useState('');

    const [manualView, setManualView] = useState<'grid' | 'table' | null>(null);
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);

    // const [viewMode, setViewMode] = usePersistedState<'grid' | 'table'>('viewMode', 'grid');

    // Detectar ancho de pantalla
    useEffect(() => {
        const handleResize = () => setWindowWidth(window.innerWidth);
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    // Decidir vista automáticamente si el usuario no eligió manualmente
    const effectiveViewMode = manualView
        ? manualView
        : windowWidth < 1024 // breakpoint lg
          ? 'grid'
          : 'table';

    // Filtrar por búsqueda
    const datosFiltrados = useMemo(() => {
        return reservations.data.filter((item) => {
            const textoBusqueda = search.toLowerCase();
            return (
                item.name_client?.toLowerCase().includes(textoBusqueda) ||
                item.service.name.toLowerCase().includes(textoBusqueda)
            );
        });
    }, [search, reservations.data]);

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Servicios" />
            <div className="flex h-full flex-1 flex-col gap-4 overflow-x-auto rounded-xl p-4">
                {/* Header Section */}
                <HeaderSection
                    title="Nuestros Servicios"
                    description="Descubre todos nuestros servicios profesionales"
                    contentRight={
                        <div className="px-4 py-2">
                            <div className="text-lg text-primary">
                                {reservations.total}
                            </div>
                            <div className="text-xs">Reservas totales</div>
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
                                    <div className="relative w-full ">
                                        <Input
                                            type={"search"}
                                            className="bg-transparent"
                                            placeholder="Buscar por nombre o descripción"
                                            value={search}
                                            onChange={(e) =>
                                                setSearch(e.target.value)
                                            }
                                            startIcon={Search}
                                        />
                                    </div>

                                    {/* View Mode Toggle */}
                                    <div className="flex items-center gap-4">
                                        <Button
                                            variant={ manualView === 'grid'  ? 'solid' : 'outline' }
                                            onClick={() =>
                                                setManualView('grid')
                                            }
                                            startIcon={<Grid2x2 className='w-4 h-4' />}
                                        >
                                            Grid
                                        </Button>
                                        <Button
                                            variant={ manualView === 'table' ? 'solid' : 'outline' }
                                            onClick={() =>
                                                setManualView('table')
                                            }
                                            startIcon={<List className='w-4 h-4' />}
                                        >
                                            Tabla
                                        </Button>
                                        {manualView && (
                                            <Button
                                                variant={'ghost'}
                                                onClick={() =>
                                                    setManualView(null)
                                                }
                                            >
                                                Auto
                                            </Button>
                                        )}
                                    </div>

                                    {/* Results count */}
                                    <div className="text-sm text-secondary">
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
                            <Button
                                onClick={() =>
                                    router.get(admin.reservations.create().url)
                                }
                            >
                                Registrar Reserva
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Content */}
                <Card className="overflow-hidden">
                    {status === 'success' && datosFiltrados.length > 0 ? (
                        <CardContent>
                            {effectiveViewMode === 'grid' ? (
                                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                                    {datosFiltrados.map((res) => (
                                        <CardReservation
                                            key={res.id}
                                            reservation={res}
                                        />
                                    ))}
                                </div>
                            ) : (
                                <TableReservation
                                    reservations={datosFiltrados}
                                    current_page={reservations.current_page}
                                    per_page={reservations.per_page}
                                />
                            )}
                        </CardContent>
                    ) : (
                        <div className="px-6 py-12 text-center">
                            <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full">
                                <CircleAlert className="h-10 w-10 text-gray-400" />
                            </div>
                            <p className="text-lg text-gray-600">
                                {message || 'No se encontraron reservas'}
                            </p>
                        </div>
                    )}
                </Card>

                {/* Pagination */}
                <div className="mt-4 join justify-center">
                    {/* Paginación con DaisyUI */}
                    {status === 'success' && (
                        <Pagination
                        links={reservations.links}
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
