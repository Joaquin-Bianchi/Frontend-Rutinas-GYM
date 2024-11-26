import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { MultiSelectField } from "@/components/form/MultiSelectField";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";
import { createClient } from "@/services/clientService";
import { getCategoryPlans } from "@/services/categoryPlanService";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import { handlerError } from "@/utils/handlerError";

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
      toast.success("Cliente creado");
    },
    onError: (error: any) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit((data: Client) => {
    const formattedData = {
      ...data,
      age: Number(data.age),
      phone: Number(data.phone),
      phoneEmergency: Number(data.phoneEmergency),
    };
    createClientMutation.mutate(formattedData);
  });

  return (
    <form className="grid grid-cols-2 gap-4 py-4" onSubmit={onSubmit}>
      <div className="col-span-1">
        <FormField
          name="name"
          label="Nombre completo"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          placeholder="Nombre completo"
        />
      </div>

      <div className="col-span-1">
        <FormField
          name="password"
          label="DNI (contraseña)"
          control={control}
          rules={{ required: "El DNI es requerido" }}
          placeholder="DNI"
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
          rules={{ required: "El telefono es requerido" }}
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
        <Button
          type="submit"
          className="w-full"
          disabled={createClientMutation.isPending}
        >
          {createClientMutation.isPending ? "Creando..." : "Crear Cliente"}
        </Button>
      </div>
    </form>
  );
}

export default CreateClientForm;
