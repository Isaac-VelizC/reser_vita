import AvatarCustomer from '@/components/AvatarCustomer';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { ClientInterface } from '@/interfaces/Reservation';
import { getStatusBadge } from '@/lib/funtionsUtils';
import admin from '@/routes/admin';
import { UserStatus } from '@/types';
import { router } from '@inertiajs/react';
import {
    ChevronsDownUp,
    EllipsisVertical,
    Eye,
    Mail,
    Phone,
    SquarePen,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import FormModalClient from './FormModalClient';
import TableControls from './TableControls';

type TableClientsProps = {
    datos: ClientInterface[];
    statusData: string;
    paginationLinks: { url: string | null; label: string; active: boolean }[];
};

const TableClients = ({ datos, statusData }: TableClientsProps) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<ClientInterface | null>(null);
    const [search, setSearch] = useState('');
    const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
    const [bulkSelected, setBulkSelected] = useState<number[]>([]);

    // Filtrar y buscar clientes
    const filteredClients = useMemo(() => {
        return datos.filter((client) => {
            const searchText = search.toLowerCase();
            const matchesSearch =
                client.name.toLowerCase().includes(searchText) ||
                client.email.toLowerCase().includes(searchText) ||
                client.phone.includes(searchText);

            const matchesStatus =
                statusFilter === 'all' || client.status === statusFilter;

            return matchesSearch && matchesStatus;
        });
    }, [search, statusFilter, datos]);

    const handleBulkSelect = (clientId: number) => {
        setBulkSelected((prev) =>
            prev.includes(clientId)
                ? prev.filter((id) => id !== clientId)
                : [...prev, clientId],
        );
    };

    const handleSelectAll = () => {
        if (bulkSelected.length === filteredClients.length) {
            setBulkSelected([]);
        } else {
            setBulkSelected(filteredClients.map((c) => c.id));
        }
    };

    return (
        <>
            {/* Controles de búsqueda y filtros */}
            <TableControls
                search={search}
                setSearch={setSearch}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                bulkSelected={bulkSelected}
                setBulkSelected={setBulkSelected}
                filteredUsers={filteredClients}
            />

            {/* Tabla de usuarios */}
            <Card>
                {statusData === 'success' && filteredClients.length > 0 ? (
                    <CardContent className="overflow-x-auto">
                        <Table>
                            <TableHeader>
                                <TableRow className="text-gray-700 dark:text-gray-400">
                                    <TableHead className="w-12">
                                        <Checkbox
                                            checked={
                                                bulkSelected.length ===
                                                    datos.length &&
                                                datos.length > 0
                                            }
                                            onChange={handleSelectAll}
                                        />
                                    </TableHead>
                                    <TableHead>Nombre Completo</TableHead>
                                    <TableHead>Número de Teléfono</TableHead>
                                    <TableHead>Correo Electronico</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Acciones</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredClients.map((client) => (
                                    <TableRow
                                        key={client.id}
                                        className="rounded-xl odd:bg-transparent even:bg-primary/5"
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={bulkSelected.includes(
                                                    client.id,
                                                )}
                                                onChange={() =>
                                                    handleBulkSelect(client.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <AvatarCustomer
                                                    iniciales={client.name}
                                                />
                                                <div className="font-semibold">
                                                    {client.name +
                                                        ' ' +
                                                        client.surname}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 text-sm">
                                                <Phone className="h-4 w-4 text-gray-400 dark:text-gray-200" />
                                                <span className="text-gray-500">
                                                    {client.phone}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4 text-sm">
                                                <Mail className="h-4 w-4 text-gray-400 dark:text-gray-200" />
                                                <span className="text-gray-500">
                                                    {client.email}
                                                </span>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            {getStatusBadge(client.status)}
                                        </TableCell>

                                        <TableCell>
                                            <div className="flex items-center justify-center gap-4">
                                                <DropdownMenu>
                                                    <DropdownMenuTrigger
                                                        asChild
                                                        className="cursor-pointer"
                                                    >
                                                        <EllipsisVertical className="h-4 w-4" />
                                                    </DropdownMenuTrigger>
                                                    <DropdownMenuContent className="dropdown-content menu rounded-box z-[1] w-36 bg-white p-2 shadow-lg dark:bg-black">
                                                        <DropdownMenuItem
                                                            onClick={() => {}}
                                                        >
                                                            <span className="flex items-center gap-4 text-info">
                                                                <Eye className="h-4 w-4 text-info" />
                                                                Historial
                                                            </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem
                                                            onClick={() => {
                                                                setSelectedClient(
                                                                    client,
                                                                ); // cliente que quieres editar
                                                                setModalOpen(
                                                                    true,
                                                                );
                                                            }}
                                                        >
                                                            <span className="flex items-center gap-4 text-warning">
                                                                <SquarePen className="h-4 w-4 text-warning" />
                                                                Editar
                                                            </span>
                                                        </DropdownMenuItem>

                                                        <DropdownMenuItem
                                                            onClick={() =>
                                                                router.get(
                                                                    admin.clients.suspended(
                                                                        client.id,
                                                                    ).url,
                                                                )
                                                            }
                                                        >
                                                            <span className="flex items-center gap-4 text-danger">
                                                                <ChevronsDownUp className="h-4 w-4 text-danger" />
                                                                {client.status}
                                                            </span>
                                                        </DropdownMenuItem>
                                                    </DropdownMenuContent>
                                                </DropdownMenu>
                                            </div>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                ) : (
                    <div className="px-6 py-12 text-center">
                        <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center">
                            <Users className="h-10 w-10 text-gray-400" />
                        </div>
                        <h3 className="mb-2 text-lg font-medium">
                            {search || statusFilter !== 'all'
                                ? 'No se encontraron clientes'
                                : 'No hay clientes registrados'}
                        </h3>
                        <p className="mb-4 text-gray-500">
                            {search || statusFilter !== 'all'
                                ? 'Intenta con otros términos de búsqueda o filtros'
                                : 'Comienza creando tu primer usuario'}
                        </p>
                    </div>
                )}
            </Card>
            <FormModalClient
                client={selectedClient ?? undefined}
                clientId={selectedClient?.id}
                open={modalOpen}
                onOpenChange={setModalOpen}
            />
        </>
    );
};

export default TableClients;
