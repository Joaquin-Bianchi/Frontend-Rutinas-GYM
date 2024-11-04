import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";
import { createClient } from "@/services/clientService";
import { getCategoryPlans } from "@/services/categoryPlan";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";

function CreateClientForm() {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Client>();

  const { data: categoryPlans, isLoading } = useQuery({
    queryKey: ["categoryPlans"],
    queryFn: () => getCategoryPlans(),
  });

  const createClientMutation = useMutation({
    mutationFn: createClient,
    mutationKey: ["createClient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente creado correctamente");
    },
    onError: (error) => {
      toast.error(error.message || "Error al crear el cliente");
    },
  });

  const onSubmit = handleSubmit((data: Client) => {
    createClientMutation.mutate(data);
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <FormField
        name="name"
        label="Nombre completo"
        control={control}
        rules={{ required: "El nombre es requerido" }}
        placeholder="Nombre completo"
      />

      <FormField
        name="age"
        label="Edad"
        control={control}
        rules={{ required: "La edad es requerida" }}
        placeholder="Edad"
        type="number"
      />

      <FormField
        name="phone"
        label="Teléfono"
        control={control}
        rules={{ required: "El telefono es requerido" }}
        placeholder="Teléfono"
        type="number"
      />

      <FormField
        name="phoneEmergency"
        label="Teléfono de emergencia"
        control={control}
        rules={{ required: "El teléfono de emergencia es requerido" }}
        placeholder="Teléfono de emergencia"
        type="number"
      />

      <FormField
        name="address"
        label="Dirección"
        control={control}
        rules={{ required: "La dirección es requerida" }}
        placeholder="Dirección"
      />

      {isLoading ? (
        <FormField
          name="."
          label="Plan de entrenamiento"
          control={control}
          placeholder="Plan de entrenamiento"
        />
      ) : (
        <MultiSelectField
          name="categoryPlan"
          label="Plan de entrenamiento"
          control={control}
          options={
            categoryPlans?.map((category: CategoryPlan) => category.name) || []
          }
          rules={{
            required: "Debes seleccionar al menos un plan de entrenamiento",
          }}
          placeholder="Plan de entrenamineto"
        />
      )}

      <Button type="submit" disabled={createClientMutation.isPending}>
        {createClientMutation.isPending ? "Creando..." : "Crear ejercicio"}
      </Button>
    </form>
  );
}

export default CreateClientForm;
