import { useQuery } from "@tanstack/react-query";
import SectionHeader from "@/components/header/SectionHeader";
import { ActionModal } from "@/components/modal/ActionModal";
import { getClients } from "@/services/clientService";
import ClientForm from "./components/ClientForm";

export default function ClientsPage() {
  const { data: clients } = useQuery({
    queryKey: ["clients"],
    queryFn: () => getClients(),
  });

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
              <></>
              {/* //TODO crear client form */}
              <ClientForm />
            </ActionModal>
          }
        />
        <div>{/* //TODO: mapear los clients */}</div>
      </main>
    </div>
  );
}
