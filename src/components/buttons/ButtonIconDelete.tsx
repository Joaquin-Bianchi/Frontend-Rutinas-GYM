import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { AxiosResponse } from "axios";
import { Trash2 } from "lucide-react";

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
    <button
      className="group hover:bg-destructive hover:text-white px-1 rounded"
      onClick={handleDelete}
      disabled={deleteMutation.isPending}
    >
      {deleteMutation.isPending ? (
        "..."
      ) : (
        <Trash2 className="w-4 text-destructive group-hover:text-white" />
      )}
    </button>
  );
}
