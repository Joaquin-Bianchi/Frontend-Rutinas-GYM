import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";
import { editClient } from "@/services/clientService";

interface Props {
  client: Client;
}

function EditClientForm({ client }: Props) {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<Client>({
    defaultValues: {
      name: client.name,
      categoryPlan: client.categoryPlan,
    },
  });

  const editClientMutation = useMutation({
    mutationFn: editClient,
    mutationKey: ["editClient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exercises"] });
      toast.success("Ejercicio editado correctamente");
    },
    onError: (error) => {
      console.error("Error al editar el client:", error);
      toast.error(error.message || "Error al editar el cliente");
    },
  });

  const onSubmit = handleSubmit((data: Client) => {
    editClientMutation.mutate(data);
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <FormField
        name="name"
        label="Nombre"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        placeholder={client.name}
      />

      <Button type="submit" disabled={editClientMutation.isPending}>
        {editClientMutation.isPending ? "Editando..." : "Editar Cliente"}
      </Button>
    </form>
  );
}

export default EditClientForm;
