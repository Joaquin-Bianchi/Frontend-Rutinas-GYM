import ErrorDisplay from "@/components/erros/ErrorDisplay";
import ClientGrid from "./components/table/ClientGrid";
import ClientsSkeletonLoader from "@/components/loaders/ClientsSkeletonLoader";
import CreateClientForm from "./components/forms/CreateClientForm";
import { ActionModal } from "@/components/modal/ActionModal";
import SectionHeader from "@/components/header/SectionHeader";
import { filterClientsByName } from "@/utils/searchFilters/filterClients";
import { SearchContext } from "@/context/SearchContext";
import { useContext, useState } from "react";
import { getClients } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
  const [page, setPage] = useState(1);
  const limit = 10; // Número de elementos por página

  const {
    data: clientsData,
    isLoading,
    isError,
    error,
  } = useQuery({
    queryKey: ["clients", page],
    queryFn: () => getClients({ page, limit }),
  });

  const { searchText } = useContext(SearchContext);

  // Asegúrate de usar el nombre correcto del campo
  const filteredClients = filterClientsByName(
    clientsData?.clients || [],
    searchText
  );

  const totalPages = clientsData ? Math.ceil(clientsData.total / limit) : 0;

  return (
    <div className="min-h-screen bg-background text-foreground flex flex-col">
      <main className="flex-grow container mx-auto py-8 px-4 sm:px-6 lg:px-8">
        <SectionHeader
          title="Clientes"
          createButton={
            <ActionModal
              title="Nuevo Cliente"
              dialogTitle="Crear Nuevo Cliente"
              showIcon={true}
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
          <>
            <ClientGrid clients={filteredClients} />
            <div className="pagination flex items-center justify-center gap-5 mt-4">
              <Button
                size={"sm"}
                onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
                disabled={page === 1}
                className={`btn ${
                  page === 1 ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Anterior
              </Button>
              <span>
                Página {page} de {totalPages}
              </span>
              <Button
                size={"sm"}
                onClick={() =>
                  setPage((prev) => (prev < totalPages ? prev + 1 : prev))
                }
                disabled={page === totalPages}
                className={`btn ${
                  page === totalPages ? "opacity-50 cursor-not-allowed" : ""
                }`}
              >
                Siguiente
              </Button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
