import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { AxiosResponse } from "axios";

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

  const deleteMutation = useMutation({
    mutationFn: () => deleteFn(id),
    mutationKey: [`${nameMutationKey}`],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [`${nameQueryKey}`] });
      toast.success(`${textObjectDelete} eliminado correctamente`);
    },
    onError: (error) => {
      toast.error(error.message || `Error al eliminar el ${textObjectDelete}`);
    },
  });

  const handleDelete = () => {
    deleteMutation.mutate();
  };

  return (
    <Button
      variant="destructive"
      size="sm"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? "Eliminando..." : "Eliminar"}
    </Button>
  );
}
