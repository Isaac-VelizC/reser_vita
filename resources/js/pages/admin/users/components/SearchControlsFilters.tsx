import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/useToast';
import { UserInterface } from '@/interfaces/Profile';
import admin from '@/routes/admin/index';
import { UserRole, UserStatus } from '@/types';
import { router } from '@inertiajs/react';
import { Plus, Search } from 'lucide-react';
import React from 'react';

type SearchControlsFiltersProps = {
    search: string;
    setSearch: (value: string) => void;
    roleFilter: UserRole;
    setRoleFilter: (value: UserRole) => void;
    statusFilter: UserStatus;
    setStatusFilter: (value: UserStatus) => void;
    bulkSelected: number[];
    setBulkSelected: (value: number[]) => void;
    filteredUsers: UserInterface[];
};

const pluralize = (word: string, count: number) =>
    count === 1 ? word : `${word}s`;

const SearchControlsFilters = ({
    search,
    setSearch,
    roleFilter,
    setRoleFilter,
    statusFilter,
    setStatusFilter,
    bulkSelected,
    setBulkSelected,
    filteredUsers,
}: SearchControlsFiltersProps) => {
    const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };
    const handleClearFilters = () => {
        setSearch('');
        setRoleFilter('all');
        setStatusFilter('all');
    };

    const { addToast } = useToast();

    const handleBulkDelete = () => {
        router.delete(admin.usuarios.bulkDelete().url, {
            data: { ids: bulkSelected },
            preserveScroll: true,
            onSuccess: () => {
                setBulkSelected([]);
                addToast({
                    type: 'success',
                    message: 'Usuarios eliminados con éxito ✅',
                });
            },
            onError: () => {
                addToast({
                    type: 'error',
                    message: 'Error al eliminar usuarios ❌',
                });
            },
        });
    };

    const handleBulkSuspended = () => {
        router.post(
            admin.usuarios.bulkSuspend().url,
            { ids: bulkSelected },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setBulkSelected([]);
                    addToast({
                        type: 'warning',
                        message: 'Usuarios suspendidos ⚠️',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'No se pudieron suspender usuarios ❌',
                    });
                },
            },
        );
    };

    const handleBulkActive = () => {
        router.post(
            admin.usuarios.bulkActivate().url,
            { ids: bulkSelected },
            {
                preserveScroll: true,
                onSuccess: () => {
                    setBulkSelected([]);
                    addToast({
                        type: 'success',
                        message: 'Usuarios activados correctamente.',
                    });
                },
                onError: () => {
                    addToast({
                        type: 'error',
                        message: 'Error al activar usuarios.',
                    });
                },
            },
        );
    };

    return (
        <Card>
            <CardContent>
                <div className="flex flex-col gap-4">
                    <div className="flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
                        {/* Search input */}
                        <div className="min-w-[250px] flex-1">
                            <Input
                                type="text"
                                className="w-full max-w-lg bg-transparent"
                                placeholder="Buscar por nombre, email o teléfono..."
                                value={search}
                                onChange={handleSearchChange}
                                aria-label="Buscar usuarios"
                                startIcon={Search}
                            />
                        </div>
                        {/* Filters and create button */}
                        <div className="flex flex-col items-center gap-4 lg:flex-row lg:min-w-lg">
                            <Select
                                value={roleFilter}
                                onValueChange={(value) =>
                                    setRoleFilter(value as UserRole)
                                }
                                aria-label="Filtrar por rol"
                                //className="min-w-[150px] flex-1"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos los roles" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Todos los roles
                                    </SelectItem>
                                    <SelectItem value="admin">
                                        Administradores
                                    </SelectItem>
                                    <SelectItem value="stylist">
                                        Estilistas
                                    </SelectItem>
                                    <SelectItem value="customer">
                                        Clientes
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Select
                                value={statusFilter}
                                onValueChange={(value) =>
                                    setStatusFilter(value as UserStatus)
                                }
                                aria-label="Filtrar por estado"
                                //className="min-w-[150px] flex-1"
                            >
                                <SelectTrigger>
                                    <SelectValue placeholder="Todos los estados" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="all">
                                        Todos los estados
                                    </SelectItem>
                                    <SelectItem value="active">
                                        Activos
                                    </SelectItem>
                                    <SelectItem value="inactive">
                                        Inactivos
                                    </SelectItem>
                                    <SelectItem value="suspended">
                                        Suspendidos
                                    </SelectItem>
                                </SelectContent>
                            </Select>

                            <Button
                                onClick={() =>
                                    router.get(admin.usuarios.create().url)
                                }
                                aria-label="Crear nuevo usuario"
                                startIcon={<Plus />}
                                className="whitespace-nowrap"
                            >
                                Nuevo Usuario
                            </Button>
                        </div>
                    </div>

                    {/* Bulk actions */}
                    {bulkSelected.length > 0 && (
                        <div
                            className="mt-4 rounded-xl border p-4"
                            role="region"
                            aria-live="polite"
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-sm text-secondary">
                                    {bulkSelected.length}{' '}
                                    {pluralize('usuario', bulkSelected.length)}{' '}
                                    seleccionado
                                    {bulkSelected.length > 1 ? 's' : ''}
                                </span>
                                <div className="flex gap-4">
                                    <Button
                                        color="warning"
                                        size={'sm'}
                                        variant={'outline'}
                                        type="button"
                                        onClick={handleBulkSuspended}
                                    >
                                        Suspender
                                    </Button>
                                    <Button
                                        color="success"
                                        variant={'outline'}
                                        size={'sm'}
                                        type="button"
                                        onClick={handleBulkActive}
                                    >
                                        Activar
                                    </Button>
                                    <Button
                                        color="error"
                                        variant={'outline'}
                                        size={'sm'}
                                        type="button"
                                        onClick={handleBulkDelete}
                                    >
                                        Eliminar
                                    </Button>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Search results */}
                    {(search ||
                        roleFilter !== 'all' ||
                        statusFilter !== 'all') && (
                        <div
                            className="mt-4 flex items-center justify-between"
                            role="status"
                            aria-live="polite"
                        >
                            <span className="text-sm text-secondary">
                                {filteredUsers.length}{' '}
                                {pluralize('resultado', filteredUsers.length)}{' '}
                                encontrado
                                {filteredUsers.length !== 1 ? 's' : ''}
                            </span>
                            <Button
                                size={'sm'}
                                variant={'outline'}
                                onClick={handleClearFilters}
                                type="button"
                            >
                                Limpiar filtros
                            </Button>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
};

export default React.memo(SearchControlsFilters);
