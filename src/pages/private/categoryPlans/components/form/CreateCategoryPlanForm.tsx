import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import { createCategoryPlan } from "@/services/categoryPlanService";
import { handlerError } from "@/utils/handlerError";

interface Props {
  closeModal: () => void;
}

export default function CreateCategoryPlanForm({ closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<CategoryPlan>();

  const createCategoryPlanMutation = useMutation({
    mutationFn: createCategoryPlan,
    mutationKey: ["createCategoryPlan"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryPlans"] });
      toast.success("Plan creado");
      closeModal();
    },
    onError: (error: any) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit((data: CategoryPlan) => {
    createCategoryPlanMutation.mutate(data);
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
          disabled={createCategoryPlanMutation.isPending}
        >
          {createCategoryPlanMutation.isPending ? "Creando..." : "Crear Plan"}
        </Button>
      </div>
    </form>
  );
}
