import { Button } from "@/components/ui/button";
import { FormField } from "@/components/form/FormField";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";
import { editCategoryPlan } from "@/services/categoryPlanService";
import { handlerError } from "@/utils/handlerError";

interface Props {
  plan: CategoryPlan;
  closeModal: () => void;
}

export default function EditCategoryPlanForm({ plan, closeModal }: Props) {
  const queryClient = useQueryClient();
  const { control, handleSubmit } = useForm<CategoryPlan>({
    defaultValues: {
      name: plan.name,
    },
  });

  const editCategoryPlanMutation = useMutation({
    mutationFn: editCategoryPlan,
    mutationKey: ["editCategoryPlan"],
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categoryPlans"] });
      toast.success("Plan editado");
      closeModal();
    },
    onError: (error: any) => {
      handlerError(error);
    },
  });

  const onSubmit = handleSubmit((data: CategoryPlan) => {
    const formattedData = {
      ...data,
      id: plan.id,
    };
    editCategoryPlanMutation.mutate(formattedData);
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
          disabled={editCategoryPlanMutation.isPending}
        >
          {editCategoryPlanMutation.isPending ? "Editando..." : "Editar Plan"}
        </Button>
      </div>
    </form>
  );
}
