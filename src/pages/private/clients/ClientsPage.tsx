import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getClients } from "@/services/clientService";
import CreateClientForm from "./components/forms/CreateClientForm";
import ClientGrid from "./components/table/ClientGrid";
import ClientsSkeletonLoader from "@/components/loaders/ClientsSkeletonLoader";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import { useContext } from "react";
import { SearchContext } from "@/context/SearchContext";
import { filterClientsByName } from "@/utils/searchFilters/filterClients";

export default function ClientsPage() {
  const {
    data: clients,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });

  const { searchText } = useContext(SearchContext);
  const filteredClients = filterClientsByName(clients, searchText);

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Clientes"
          createButton={
            <ActionModal
              title="Nuevo Cliente"
              dialogTitle="Crear Nuevo Cliente"
            >
              {(closeModal) => <CreateClientForm closeModal={closeModal} />}
            </ActionModal>
          }
        />
        {isLoading ? (
          <ClientsSkeletonLoader />
        ) : isError ? (
          <ErrorDisplay message={error.message} />
        ) : (
          <ClientGrid clients={filteredClients} />
        )}
      </main>
    </div>
  );
}
