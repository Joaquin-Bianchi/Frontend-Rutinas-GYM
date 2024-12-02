import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "../ui/dialog";

interface Props {
  id: string;
  deleteFn: (id: string) => Promise<AxiosResponse<any, any>>;
  nameMutationKey: string;
  nameQueryKey: string;
  textObjectDelete: string;
}

export default function ButtonIconDelete({
  id,
  deleteFn,
  nameMutationKey,
  nameQueryKey,
  textObjectDelete,
}: Props) {
  const queryClient = useQueryClient();
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const deleteMutation = useMutation({
    mutationFn: () => deleteFn(id),
    mutationKey: [`${nameMutationKey}`],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${nameQueryKey}`] });
      toast.success(`${textObjectDelete} eliminado correctamente`);
      setIsDialogOpen(false); // Cerrar el diálogo al éxito
    },
    onError: (error) => {
      toast.error(error.message || `Error al eliminar el ${textObjectDelete}`);
      setIsDialogOpen(false); // Cerrar el diálogo en caso de error
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  const handleOpenDialog = () => {
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
  };

  return (
    <>
      <button
        className="group hover:bg-destructive hover:text-white px-1 rounded"
        onClick={handleOpenDialog}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? (
          "..."
        ) : (
          <Trash2 className="w-4 text-destructive group-hover:text-white" />
        )}
      </button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este {textObjectDelete.toLocaleLowerCase()}? Esta
              acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <button
              className="px-3 py-1 rounded border border-gray-300 hover:bg-gray-200"
              onClick={handleCloseDialog}
            >
              Cancelar
            </button>
            <button
              className="px-3 py-1 rounded bg-destructive text-white hover:bg-red-600"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Eliminando..." : "Confirmar"}
            </button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
