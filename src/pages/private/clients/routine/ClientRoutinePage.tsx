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
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import RoutineDetailsSkeleton from "@/components/loaders/RoutineDetailsSkeleton";

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

  return (
    <div className="container px-5 sm:px-0 mx-auto my-5">
      {isLoading ? (
        <RoutineDetailsSkeleton />
      ) : isError ? (
        <ErrorDisplay message={error.message} />
      ) : (
        <>
          <h1 className="text-2xl font-bold mb-4 mt-7">Rutinas de {client?.name}</h1>
          <div className="flex flex-col gap-4">
            {client?.routines?.map((routine) => (
              <Card key={routine.id} className="shadow-lg">
                <CardHeader>
                  <CardTitle className="flex justify-between items-center">
                    <div className="capitalize flex items-baseline">
                      <Calendar className="mr-2 h-4 w-4" />
                      <span className="capitalize">{routine.day} </span>
                    </div>
                    <ActionModalUserRutine dialogTitle="Asignar Rutina">
                      {(closeModal) => (
                        <AddExerciseForm
                          exercises={exercises?.data}
                          routineId={routine.id}
                          closeModal={closeModal}
                        />
                      )}
                    </ActionModalUserRutine>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  {routine.routineExercises?.length > 0 ? (
                    <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-x-4">
                      {routine.routineExercises.map((exercise) => (
                        <div
                          key={exercise.id}
                          className="bg-secondary/10 rounded-lg p-4 shadow-sm"
                        >
                          <div className="flex flex-col sm:flex-row gap-4">
                            <div className="sm:w-[100px] aspect-video sm:aspect-square">
                              <img
                                src={
                                  exercise.exercise.image ||
                                  "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                                }
                                alt={exercise.exercise.name}
                                className="rounded-md w-full h-full object-cover object-center"
                              />
                            </div>
                            <div className="flex flex-col w-full sm:w-2/3 justify-between flex-grow">
                              <div>
                                <span className="font-semibold text-md mb-2 block uppercase">
                                  {exercise.exercise.name}
                                </span>
                                <div className="flex flex-wrap items-center gap-2 mb-4">
                                  {exercise.sets !== null ? (
                                    <Badge>{exercise.sets} Series</Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      <s>Series</s>
                                    </Badge>
                                  )}
                                  {exercise.reps !== null ? (
                                    <Badge>{exercise.reps} Reps</Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      <s>Reps</s>
                                    </Badge>
                                  )}
                                  {exercise.time !== null ? (
                                    <Badge>{exercise.time} Minutos</Badge>
                                  ) : (
                                    <Badge variant="outline">
                                      <s>Minutos</s>
                                    </Badge>
                                  )}
                                </div>
                                <div>
                                  {exercise.comment !== null && (
                                    <p className="text-xs text-gray-200 font-medium">
                                      <span className="text-primary">-</span>{" "}
                                      {exercise.comment}
                                    </p>
                                  )}
                                </div>
                              </div>
                              <div className="self-end">
                                <ButtonIconDelete
                                  id={exercise.id}
                                  deleteFn={deleteRoutinExercise}
                                  nameMutationKey="deleteRoutineExercise"
                                  nameQueryKey="client"
                                  textObjectDelete="Ejercicio"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
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
        </>
      )}
    </div>
  );
}
