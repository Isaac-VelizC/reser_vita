import AvatarCustomer from '@/components/AvatarCustomer';
import { DeleteDialog } from '@/components/deleteDialog';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/hooks/useToast';
import { UserInterface } from '@/interfaces/Profile';
import { getRoleBadge, getStatusBadge } from '@/lib/funtionsUtils';
import admin from '@/routes/admin';
import { UserRole, UserStatus } from '@/types';
import { router, useForm } from '@inertiajs/react';
import dayjs from 'dayjs';
import {
    ChevronsDownUp,
    EllipsisVertical,
    Mail,
    Phone,
    SquarePen,
    TimerReset,
    Trash2,
    Users,
} from 'lucide-react';
import { useMemo, useState } from 'react';
import SearchControlsFilters from './SearchControlsFilters';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Pagination } from '@/components/PaginationComponent';

type TableUsersProps = {
    datos: UserInterface[];
    statusData: string;
    paginationLinks: { url: string | null; label: string; active: boolean }[];
};

const TableUsers = ({
    datos,
    statusData,
    paginationLinks,
}: TableUsersProps) => {
    const [openDelete, setOpenDelete] = useState(false);
    const [userToDelete, setUserToDelete] = useState<UserInterface | null>(
        null,
    );

    const { addToast } = useToast();
    const [search, setSearch] = useState('');
    const { delete: destroy, processing } = useForm({});
    const [roleFilter, setRoleFilter] = useState<UserRole>('all');
    const [statusFilter, setStatusFilter] = useState<UserStatus>('all');
    const [bulkSelected, setBulkSelected] = useState<number[]>([]);

    // Filtrar y buscar usuarios
    const filteredUsers = useMemo(() => {
        return datos.filter((user) => {
            const searchText = search.toLowerCase();
            const matchesSearch =
                user.name.toLowerCase().includes(searchText) ||
                user.email.toLowerCase().includes(searchText) ||
                user.phone.includes(searchText);

            const matchesRole =
                roleFilter === 'all' || user.role === roleFilter;
            const matchesStatus =
                statusFilter === 'all' || user.status === statusFilter;

            return matchesSearch && matchesRole && matchesStatus;
        });
    }, [search, roleFilter, statusFilter, datos]);

    const handleDeleteUser = (user: UserInterface) => {
        setUserToDelete(user);
        setOpenDelete(true);
    };

    const handleBulkSelect = (userId: number) => {
        setBulkSelected((prev) =>
            prev.includes(userId)
                ? prev.filter((id) => id !== userId)
                : [...prev, userId],
        );
    };

    const handleSelectAll = () => {
        if (bulkSelected.length === filteredUsers.length) {
            setBulkSelected([]);
        } else {
            setBulkSelected(filteredUsers.map((user) => user.id));
        }
    };

    const confirmDelete = () => {
        if (userToDelete) {
            destroy(admin.usuarios.destroy(userToDelete?.id).url, {
                preserveScroll: true,
                onSuccess: () => {
                    setOpenDelete(false);
                    setUserToDelete(null);
                    addToast({
                        type: 'success',
                        message: 'Usuario eliminado con éxito.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Ocurrió un error al eliminar.',
                    });
                },
            });
        }
    };

    return (
        <>
            {/* Controles de búsqueda y filtros */}
            <SearchControlsFilters
                search={search}
                setSearch={setSearch}
                roleFilter={roleFilter} // Si los tipos no coinciden exactos, ajustar o tipar mejor
                setRoleFilter={setRoleFilter}
                statusFilter={statusFilter}
                setStatusFilter={setStatusFilter}
                bulkSelected={bulkSelected}
                setBulkSelected={setBulkSelected}
                filteredUsers={filteredUsers}
            />

            {/* Tabla de usuarios */}
            <Card>
                {statusData === 'success' && filteredUsers.length > 0 ? (
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
                                    <TableHead>Usuario</TableHead>
                                    <TableHead>Contacto</TableHead>
                                    <TableHead>Rol</TableHead>
                                    <TableHead>Estado</TableHead>
                                    <TableHead>Registro</TableHead>
                                    <TableHead>
                                        Acciones
                                    </TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {filteredUsers.map((user) => (
                                    <TableRow
                                        key={user.id}
                                        className="rounded-xl odd:bg-transparent even:bg-primary/5"
                                    >
                                        <TableCell>
                                            <Checkbox
                                                checked={bulkSelected.includes(
                                                    user.id,
                                                )}
                                                onChange={() =>
                                                    handleBulkSelect(user.id)
                                                }
                                            />
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex items-center gap-4">
                                                <AvatarCustomer
                                                    iniciales={user.name}
                                                />
                                                <div className="font-semibold">
                                                    {user.name}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell>
                                            <div className="space-y-1">
                                                <div className="flex items-center gap-4 text-sm">
                                                    <Mail className="h-4 w-4 text-gray-400 dark:text-gray-200" />
                                                    <span className="text-gray-500">
                                                        {user.email}
                                                    </span>
                                                </div>
                                                <div className="flex items-center gap-4 text-sm">
                                                    <Phone className="h-4 w-4 text-gray-400 dark:text-gray-200" />
                                                    <span className="text-gray-500">
                                                        {user.phone}
                                                    </span>
                                                </div>
                                            </div>
                                        </TableCell>

                                        <TableCell>{getRoleBadge(user.role)}</TableCell>
                                        <TableCell>{getStatusBadge(user.status)}</TableCell>

                                        <TableCell className="text-sm text-gray-500">
                                            {dayjs(user.created_at).format(
                                                'MMMM D, YYYY',
                                            )}
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
                                                    <DropdownMenuContent className="dropdown-content menu z-[1] w-36 rounded-box bg-white p-2 shadow-lg dark:bg-black">
                                                        <DropdownMenuItem onClick={() => router.get(admin.usuarios.edit(user.id).url)}>
                                                            <span className="flex items-center gap-4 text-info">
                                                                <SquarePen className="h-4 w-4 text-info" />
                                                                Editar
                                                            </span>
                                                        </DropdownMenuItem>
                                                        <DropdownMenuItem onClick={() => router.get(admin.usuarios.suspended(user.id).url)}>
                                                            <span className="flex items-center gap-4 text-warning">
                                                                <ChevronsDownUp className="h-4 w-4 text-warning" />
                                                                {user.status}
                                                            </span>
                                                        </DropdownMenuItem>
                                                        {user.role == "stylist" && <DropdownMenuItem onClick={() => router.get(admin.availability.edit(user.id).url)}>
                                                            <span className="flex items-center gap-4 text-secondary">
                                                                <TimerReset className="h-4 w-4 text-secondary" />
                                                                Horarios
                                                            </span>
                                                        </DropdownMenuItem> }
                                                        
                                                        <div className="divider my-0 divider-primary"></div>
                                                        <DropdownMenuItem onClick={() => handleDeleteUser(user)}>
                                                            <span className="flex items-center gap-4 text-danger">
                                                                <Trash2 className="h-4 w-4 text-danger" />
                                                                Eliminar
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
                            {search ||
                            roleFilter !== 'all' ||
                            statusFilter !== 'all'
                                ? 'No se encontraron usuarios'
                                : 'No hay usuarios registrados'}
                        </h3>
                        <p className="mb-4 text-gray-500">
                            {search ||
                            roleFilter !== 'all' ||
                            statusFilter !== 'all'
                                ? 'Intenta con otros términos de búsqueda o filtros'
                                : 'Comienza creando tu primer usuario'}
                        </p>
                        <Button
                            onClick={() =>
                                router.get(admin.usuarios.create().url)
                            }
                            size={'sm'}
                        >
                            Crear Primer Usuario
                        </Button>
                    </div>
                )}
            </Card>

            {/* Paginación */}
            {statusData === 'success' &&
                paginationLinks &&
                filteredUsers.length > 0 && (
                    <Pagination
                        links={paginationLinks}
                        align="center"
                        onNavigate={(url) => {
                            // opcional: manejar la navegación sin recargar
                            console.log('Ir a:', url);
                            // o usar router.push(url)
                        }}
                    />
                )}

            {/* Modal de confirmación de eliminación */}
            <DeleteDialog
                open={openDelete}
                onOpenChange={setOpenDelete}
                loading={processing}
                handleClick={confirmDelete}
                title={"Eliminar Usuario"}
                alertBox={true}
                description="¿Estás seguro de que deseas eliminar al usuario?"
            >
                <div className="mt-4 rounded-xl bg-gray-50 p-4 dark:bg-black">
                    <div className="flex items-center gap-4">
                        <AvatarCustomer iniciales={userToDelete?.name ?? "??"} />
                        <div>
                            <div className="font-semibold text-gray-900 dark:text-white">
                                {userToDelete?.name}
                            </div>
                            <div className="text-sm text-gray-500">
                                {userToDelete?.email}
                            </div>
                            <div className="text-xs text-gray-400">
                                Rol: {userToDelete?.role}
                            </div>
                        </div>
                    </div>
                </div>
            </DeleteDialog>
        </>
    );
};

export default TableUsers;
