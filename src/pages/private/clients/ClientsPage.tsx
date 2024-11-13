import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getClients } from "@/services/clientService";
import CreateClientForm from "./components/forms/CreateClientForm";
import ClientGrid from "./components/table/ClientGrid";

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
  
  if (isLoading) return <div>Cargando clientes...</div>;
  if (isError) return <div>Error: {error.message}</div>;

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
              <CreateClientForm />
            </ActionModal>
          }
        />
        <ClientGrid clients={clients} />
      </main>
    </div>
  );
}
