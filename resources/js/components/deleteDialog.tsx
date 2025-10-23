import { TriangleAlert } from 'lucide-react';
import { Button } from './ui/button';
import {
    Dialog,
    DialogClose,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogTitle,
} from './ui/dialog';

type DeleteDialogProps = {
    title: string;
    loading: boolean;
    description: string;
    open: boolean;
    onOpenChange: (open: boolean) => void;
    handleClick: () => void;
    alertBox?: boolean;
    children?: React.ReactNode;
};

export const DeleteDialog = ({
    title,
    description,
    handleClick,
    loading,
    open,
    onOpenChange,
    alertBox = false,
    children,
}: DeleteDialogProps) => {
    const onConfirm = () => {
        handleClick();
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogTitle>{title}</DialogTitle>
                {alertBox && (
                    <div className="alert mt-6 rounded-xl border-none bg-warning p-4">
                        <div className="flex items-center gap-2">
                            <TriangleAlert className="h-4 w-4 shrink-0 stroke-current" />
                            <h3 className="font-bold">¡Cuidado!</h3>
                        </div>
                        <div className="text-xs">
                            Esta acción no se puede deshacer
                        </div>
                    </div>
                )}

                <DialogDescription>{description}</DialogDescription>
                {children}
                <DialogFooter className="gap-2">
                    <DialogClose asChild>
                        <Button
                            variant="ghost"
                            color="neutral"
                            disabled={loading}
                        >
                            Cancelar
                        </Button>
                    </DialogClose>
                    <Button
                        color="error"
                        disabled={loading}
                        onClick={onConfirm}
                    >
                        {loading ? 'Eliminando...' : 'Eliminar'}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
};
