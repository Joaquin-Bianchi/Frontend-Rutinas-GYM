import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getCategoryPlans } from "@/services/categoryPlanService";
import CategoryPlanGrid from "./components/table/CategoryPlanGrid";
import CreateCategoryPlanForm from "./components/form/CreateCategoryPlanForm";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import ClientsSkeletonLoader from "@/components/loaders/ClientsSkeletonLoader";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import { CategoryPlan } from "@/interfaces/categotyPlan.interface";

export default function CategoryPlansPage() {
  const {
    data: categoryPlans,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["categoryPlans"],
    queryFn: () => getCategoryPlans(),
  });

  const { searchText } = useContext(SearchContext);

  const filteredCategoryPlans = categoryPlans?.filter((plan: CategoryPlan) =>
    plan.name.toLowerCase().includes(searchText.toLowerCase())
  );
  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Planes de entreamiento"
          createButton={
            <ActionModal showIcon={true} title="Nuevo Plan" dialogTitle="Crear Nuevo Plan">
              {(closeModal) => (
                <CreateCategoryPlanForm closeModal={closeModal} />
              )}
            </ActionModal>
          }
        />
        {isLoading ? (
          <ClientsSkeletonLoader />
        ) : isError ? (
          <ErrorDisplay message={error.message} />
        ) : (
          <CategoryPlanGrid plans={filteredCategoryPlans} />
        )}
      </main>
    </div>
  );
}
