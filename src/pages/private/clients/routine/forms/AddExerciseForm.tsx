import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { Client } from "@/interfaces/client.interface";
import { createClient } from "@/services/clientService";

function AddExerciseForm() {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<Client>();

  const createClientMutation = useMutation({
    mutationFn: createClient,
    mutationKey: ["createClient"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["clients"] });
      toast.success("Cliente creado correctamente");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Error al iniciar sesión";
      toast.error(errorMessage);
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
    <form className="grid grid-cols-3 gap-4 py-4" onSubmit={onSubmit}>

      <div className="col-span-3">
        <FormField
          name="exerciseId"
          label="Ejercicio"
          control={control}
          rules={{ required: "El ejercicio es requerido" }}
          placeholder="Seleccionar el ejercicio"
        />
      </div>


      <div className="col-span-2 flex items-end space-x-2">
        <div className="flex-1">
          <FormField
            name="sets"
            label="Series"
            control={control}
            placeholder="Series"
            type="number"
          />
        </div>

        <div className="flex items-center justify-center pb-2">
          <span className="text-lg font-bold">x</span>
        </div>

        <div className="flex-1">
          <FormField
            name="reps"
            label="Repeticiones"
            control={control}
            rules={{ required: "Este campo es requerido" }}
            placeholder="Repeticiones"
            type="number"
          />
        </div>
      </div>

      <div className="col-span-1">
        <FormField
          name="time"
          label="Tiempo"
          control={control}
          placeholder="Tiempo"
          type="number"
        />
      </div>

      <div className="col-span-3">
        <FormField
          name="comment"
          label="Comentario"
          control={control}
          placeholder="Comentario"
        />
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

export default AddExerciseForm;
