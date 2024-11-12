import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Client } from "@/interfaces/client.interface";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import { getExercises } from "@/services/exerciseService";
import { Badge } from "@/components/ui/badge";
import AddExerciseForm from "./forms/AddExerciseForm";
import { Calendar } from "lucide-react";
import ButtonIconDelete from "@/components/buttons/ButtonIconDelete";
import { deleteRoutinExercise } from "@/services/routineExerciseService";

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

  const { data: exercises } = useQuery({
    queryKey: ["exercises"],
    queryFn: () => getExercises(),
  });


  if (isLoading) return <div>Cargando rutinas del cliente...</div>;
  if (isError) return <div>Error: {error.message}</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Rutinas de {client?.name}</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {client?.routines?.map((routine) => (
          <Card key={routine.id} className="shadow-lg">
            <CardHeader>
              <CardTitle className="flex justify-between items-center">
                <div className="capitalize flex items-baseline">
                  <Calendar className="mr-2 h-4 w-4" />
                  <span className="capitalize">{routine.day} </span>
                </div>
                <ActionModalUserRutine dialogTitle="Asignar Rutina">
                  <AddExerciseForm
                    exercises={exercises?.data}
                    routineId={routine.id}
                  />
                </ActionModalUserRutine>
              </CardTitle>
            </CardHeader>
            <CardContent>
              {routine.routineExercises?.length > 0 ? (
                <div>
                  <ul className="space-y-4">
                    {routine.routineExercises.map((exercise) => (
                      <li
                        key={exercise.id}
                        className="bg-secondary/10 rounded-lg p-4 shadow-sm"
                      >
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                          <span className="font-semibold text text-primary">
                            {exercise.exercise.name}
                          </span>
                          <div className="flex flex-col flex-wrap items-center gap-2">
                            {exercise.sets !== null ?
                              <Badge variant="default">
                                {exercise.sets} series
                              </Badge> : <Badge variant="secondary">
                                No asignado
                              </Badge>
                            }
                            {exercise.sets !== null ?
                              <Badge variant="default">
                                {exercise.reps} reps
                              </Badge> : <Badge variant="secondary">
                                No asignado
                              </Badge>
                            } {exercise.time !== null ?
                              <Badge variant="default">
                                {exercise.time} minutos
                              </Badge> : <Badge variant="secondary">
                                No asignado
                              </Badge>
                            }
                            <ButtonIconDelete
                               id={exercise.id}
                               deleteFn={deleteRoutinExercise}
                               nameMutationKey="deleteRoutineExercise"
                               nameQueryKey="client"
                               textObjectDelete="Ejercicio"
                            />
                            
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p className="text-muted-foreground">
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
