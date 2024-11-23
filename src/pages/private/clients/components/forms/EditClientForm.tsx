import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";
import { editClient } from "@/services/clientService";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import { getCategoryPlans } from "@/services/categoryPlan";

interface Props {
  client: Client;
}

function EditClientForm({ client }: Props) {
  const queryClient = useQueryClient();

  const { control, handleSubmit } = useForm<Client>({
    defaultValues: {
      name: client.name,
      email: client.email,
      age: client.age,
      address: client.address,
      phone: client.phone,
      phoneEmergency: client.phoneEmergency,
      routines: client.routines,
      categoryPlans: client.categoryPlans,
    },
  });
  const { data: categoryPlans, isLoading } = useQuery({
    queryKey: ["categoryPlans"],
    queryFn: () => getCategoryPlans(),
  });

  const editClientMutation = useMutation({
    mutationFn: editClient,
    mutationKey: ["editClient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente editado correctamente");
    },
    onError: (error) => {
      console.error("Error al editar el client:", error);
      toast.error(error.message || "Error al editar el cliente");
    },
  });

  const onSubmit = handleSubmit((data: Client) => {
    const formattedData = {
      ...data,
      id: client.id,
      age: Number(data.age),
      phone: Number(data.phone),
      phoneEmergency: Number(data.phoneEmergency),
    };
    editClientMutation.mutate(formattedData);
  });

  return (
    <form className="grid gap-4 py-4" onSubmit={onSubmit}>
      <div className="col-span-2">
        <FormField
          name="name"
          label="Nombre completo"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          placeholder="Nombre completo"
        />
      </div>
      <div className="col-span-2">
        <FormField
          name="email"
          label="Email"
          control={control}
          rules={{ required: "El email es requerido" }}
          placeholder="Email"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="age"
          label="Edad"
          control={control}
          rules={{ required: "La edad es requerida" }}
          placeholder="Edad"
          type="number"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="phone"
          label="Teléfono"
          control={control}
          rules={{ required: "El teléfono es requerido" }}
          placeholder="Teléfono"
          type="number"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="phoneEmergency"
          label="Teléfono de emergencia"
          control={control}
          rules={{ required: "El teléfono de emergencia es requerido" }}
          placeholder="Teléfono de emergencia"
          type="number"
        />
      </div>

      <div className="col-span-2">
        <FormField
          name="address"
          label="Dirección"
          control={control}
          rules={{ required: "La dirección es requerida" }}
          placeholder="Dirección"
        />
      </div>

      <div className="col-span-2">
        {isLoading ? (
          <FormField
            name="."
            label="Plan de entrenamiento"
            control={control}
            placeholder="Plan de entrenamiento"
          />
        ) : (
          <MultiSelectField
            name="categoryPlans"
            label="Plan de entrenamiento"
            control={control}
            options={
              categoryPlans?.map((category: CategoryPlan) => category.name) ||
              []
            }
            rules={{
              required: "Debes seleccionar al menos un plan de entrenamiento",
            }}
            placeholder="Plan de entrenamineto"
          />
        )}
      </div>

      <div className="col-span-2">
        <Button type="submit" disabled={editClientMutation.isPending}>
          {editClientMutation.isPending ? "Editando..." : "Editar Cliente"}
        </Button>
      </div>
    </form>
  );
}

export default EditClientForm;
