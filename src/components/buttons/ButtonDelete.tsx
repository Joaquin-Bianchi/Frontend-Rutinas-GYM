import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";

interface Props {
  id: string;
  deleteFn: (id: string) => Promise<AxiosResponse<any, any>>;
  nameMutationKey: string;
  nameQueryKey: string;
  textObjectDelete: string;
}

export default function ButtonDelete({
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
      toast.success(`${textObjectDelete} eliminado`);
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
      <Button
        variant="destructive"
        size="default"
        onClick={handleOpenDialog}
        disabled={deleteMutation.isPending}
      >
        {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmar eliminación</DialogTitle>
            <DialogDescription>
              ¿Estás seguro de que deseas eliminar este {textObjectDelete.toLocaleLowerCase()}? Esta acción no se puede deshacer.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={handleCloseDialog}>
              Cancelar
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={deleteMutation.isPending}
            >
              {deleteMutation.isPending ? "Eliminando..." : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
