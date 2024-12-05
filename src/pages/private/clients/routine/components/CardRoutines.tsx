import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Printer } from "lucide-react";
import { Routine } from "@/interfaces/routine.interface";
import { ActionModalUserRutine } from "@/components/modal/ActionModalUserRutine";
import AddExerciseForm from "../forms/AddExerciseForm";
import ButtonIconDelete from "@/components/buttons/ButtonIconDelete";
import { deleteRoutinExercise } from "@/services/routineExerciseService";
import { Button } from "@/components/ui/button";
import { jsPDF } from "jspdf";
import "jspdf-autotable";
import { generarPDFRutina } from "../pdf/GeneratePdf";

interface Props {
  routine: Routine;
  exercises?: any;
}

export default function CardRoutines({ routine, exercises }: Props) {
  return (
    <Card key={routine.id} className="shadow-lg">
      <CardHeader className="">
        <CardTitle className="flex justify-between items-center">
          <div className="capitalize flex items-baseline">
            <Calendar className="mr-2 h-4 w-4 " />
            <span className="capitalize">
              {routine.day === "miercoles"
                ? "Miércoles"
                : routine.day === "sabado"
                ? "Sábado"
                : routine.day}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            {routine.routineExercises?.length > 0 && (
              <Button
                variant="outline"
                size="icon"
                onClick={() => generarPDFRutina(routine)}
                className=""
              >
                <Printer className="h-4 w-4" />
              </Button>
            )}

            <div className="">
              <ActionModalUserRutine dialogTitle="Asignar Rutina">
                {(closeModal) => (
                  <AddExerciseForm
                    exercises={exercises?.data}
                    routineId={routine.id}
                    closeModal={closeModal}
                  />
                )}
              </ActionModalUserRutine>
            </div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="">
        {routine.routineExercises?.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            {routine.routineExercises.map((exercise) => (
              <div
                key={exercise.id}
                className="bg-secondary/10 rounded-lg p-4 shadow-sm "
              >
                <div className="flex flex-col sm:flex-row gap-4 h-full">
                  <div className="sm:w-[100px] aspect-video sm:aspect-square">
                    <img
                      src={
                        exercise.exercise.image ||
                        "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
                      }
                      alt={exercise.exercise.name}
                      className="rounded-md w-full h-full object-cover object-center "
                    />
                  </div>

                  <div className="flex flex-col w-full sm:w-2/3 justify-between flex-grow">
                    <div>
                      <span className="font-semibold text-md mb-2 block uppercase">
                        {exercise.exercise.name}
                      </span>
                      <div className="flex flex-wrap items-center gap-2 mb-4">
                        {exercise.sets !== null ? (
                          <Badge className="  ">{exercise.sets} Series</Badge>
                        ) : (
                          <Badge variant="outline" className="  ">
                            <s>Series</s>
                          </Badge>
                        )}
                        {exercise.reps !== null ? (
                          <Badge className="  ">{exercise.reps} Reps</Badge>
                        ) : (
                          <Badge variant="outline" className="  ">
                            <s>Reps</s>
                          </Badge>
                        )}
                        {exercise.time !== null ? (
                          <Badge className="  ">{exercise.time} Minutos</Badge>
                        ) : (
                          <Badge variant="outline" className="  ">
                            <s>Minutos</s>
                          </Badge>
                        )}
                      </div>
                      <div>
                        {exercise.comment !== null && (
                          <p className="text-xs text-gray-200 font-medium ">
                            <span className="text-primary ">-</span>{" "}
                            {exercise.comment}
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="self-end ">
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
            ))}
          </div>
        ) : (
          <p className="text-muted-foreground">
            No hay rutina asignada para este día.
          </p>
        )}
      </CardContent>
    </Card>
  );
}
