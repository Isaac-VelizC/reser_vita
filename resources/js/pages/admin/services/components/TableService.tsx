import { DeleteDialog } from '@/components/deleteDialog';
import { useToast } from '@/hooks/useToast';
import { ServiceInterface } from '@/interfaces/Service';
import { getStatusBadge } from '@/lib/funtionsUtils';
import { formatDuration, formatPrice } from '@/lib/utils';
import admin from '@/routes/admin/index';
import { Button } from '@headlessui/react';
import { router, useForm } from '@inertiajs/react';
import { Search, SquarePen, Trash2 } from 'lucide-react';
import { useState } from 'react';
import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/table"

type TableServiceProps = {
    datos: ServiceInterface[];
    current_page: number;
    per_page: number;
};

const TableService = ({ datos, current_page, per_page }: TableServiceProps) => {
  const [openDelete, setOpenDelete] = useState(false)
  const [serviceToDelete, setServiceToDelete] = useState<number | null>(null)
  const { addToast } = useToast()
  const { delete: destroy, processing } = useForm({})

  const handleConfirmDelete = () => {
    if (serviceToDelete) {
      destroy(admin.services.destroy(serviceToDelete).url, {
        preserveScroll: true,
        onSuccess: () => {
          setOpenDelete(false)
          setServiceToDelete(null)
          addToast({
            type: "success",
            message: "Servicio eliminado con éxito.",
          })
        },
        onError: () => {
          addToast({
            type: "error",
            message: "Ocurrió un error al eliminar.",
          })
        },
      })
    }
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>#</TableHead>
            <TableHead>Servicio</TableHead>
            <TableHead>Descripción</TableHead>
            <TableHead>Precio</TableHead>
            <TableHead>Duración</TableHead>
            <TableHead>Estado</TableHead>
            <TableHead>Acciones</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {datos.length > 0 ? (
            datos.map((service, index) => (
              <TableRow
                key={service.id}
                className="odd:bg-transparent even:bg-secondary/5"
              >
                <TableCell>
                  {(current_page - 1) * per_page + index + 1}
                </TableCell>
                <TableCell className="font-semibold">
                  {service.name}
                </TableCell>
                <TableCell className="max-w-xs truncate">
                  {service.description}
                </TableCell>
                <TableCell className="font-bold text-primary">
                  {formatPrice(service.price)}
                </TableCell>
                <TableCell className="text-info">
                  {formatDuration(service.duration_minutes)}
                </TableCell>
                <TableCell>{getStatusBadge(service.status)}</TableCell>
                <TableCell className="flex items-center gap-4">
                  <Button
                    onClick={() =>
                      router.get(admin.services.edit(service.id).url)
                    }
                    className="cursor-pointer"
                  >
                    <SquarePen className="h-4 w-4 text-warning" />
                  </Button>
                  <Button
                    className="cursor-pointer"
                    onClick={() => {
                      setServiceToDelete(service.id)
                      setOpenDelete(true)
                    }}
                  >
                    <Trash2 className="h-4 w-4 cursor-pointer text-destructive" />
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="py-12 text-center">
                <div>
                  <Search className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                  <p className="mb-1 text-lg font-medium">
                    No se encontraron servicios
                  </p>
                  <p className="text-sm text-gray-500">
                    Intenta con otros términos de búsqueda
                  </p>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
      <DeleteDialog
        open={openDelete}
        onOpenChange={setOpenDelete}
        loading={processing}
        handleClick={handleConfirmDelete}
        title="Eliminar Servicio"
        description="¿Está seguro que desea eliminar este servicio?"
      />
    </>
  )
}

export default TableService
