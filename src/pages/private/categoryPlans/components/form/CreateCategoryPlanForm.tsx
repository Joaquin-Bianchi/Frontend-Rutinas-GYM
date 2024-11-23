import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import { createCategoryPlan } from "@/services/categoryPlanService";

export default function CreateCategoryPlanForm() {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<CategoryPlan>();

  const createClientMutation = useMutation({
    mutationFn: createCategoryPlan,
    mutationKey: ["createCategoryPlan"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryPlans"] });
      toast.success("Plan creado correctamente");
    },
    onError: (error: any) => {
      const errorMessage =
        error.response?.data?.error || "Error al crear el plan";
      toast.error(errorMessage);
    },
  });

  const onSubmit = handleSubmit((data: CategoryPlan) => {
    createClientMutation.mutate(data);
  });

  return (
    <form className="grid grid-cols-2 gap-4 py-4" onSubmit={onSubmit}>
      <div className="col-span-2">
        <FormField
          name="name"
          label="Nombre"
          control={control}
          rules={{ required: "El nombre es requerido" }}
          placeholder="Nombre completo"
        />
      </div>
      <div className="col-span-2">
        <Button
          type="submit"
          className="w-full"
          disabled={createClientMutation.isPending}
        >
          {createClientMutation.isPending ? "Creando..." : "Crear Plan"}
        </Button>
      </div>
    </form>
  );
}
