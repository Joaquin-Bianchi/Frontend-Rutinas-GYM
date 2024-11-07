import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Client } from "@/interfaces/client.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit } from "lucide-react";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import CreateClientRoutineForm from "./forms/CreateClientRoutineForm";

const daysOfWeek = [
  "Lunes",
  "Martes",
  "Miércoles",
  "Jueves",
  "Viernes",
  "Sábado",
  "Domingo",
];

export default function ClientRoutinePage() {
  const { id } = useParams();

  const {
    data: client,
    isLoading,
    isError,
    error,
  } = useQuery<Client>({
    queryKey: ["client"],
    queryFn: () => getClientById(id as string),
  });

  console.log(client);

  if (isLoading) return <div>Cargando clientes...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rutinas de {client?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {daysOfWeek.map((day, index) => (
            <Card key={day} className="shadow-lg">
              <CardHeader>
                <CardTitle className="flex justify-between items-center">
                  <span>{day}</span>
                  {index % 2 === 0 ? (
                    <Button
                      variant="outline"
                      size="icon"
                      onClick={() => console.log(`Editar rutina de ${day}`)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                  ) : (
                    <ActionModalUserRutine dialogTitle="Asignar Rutina">
                      <CreateClientRoutineForm />
                    </ActionModalUserRutine>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {index % 2 === 0 ? (
                  <div>
                    <h3 className="font-semibold">Rutina de ejemplo</h3>
                    <ul className="list-disc list-inside">
                      <li>Press de banca - 3 series x 10 repeticiones</li>
                      <li>Sentadillas - 4 series x 12 repeticiones</li>
                      <li>Dominadas - 3 series x 8 repeticiones</li>
                    </ul>
                  </div>
                ) : (
                  <p className="text-gray-500">
                    No hay rutina asignada para este día.
                  </p>
                )}
              </CardContent>
            </Card>
        ))}
      </div>
    </div>
  );
}
