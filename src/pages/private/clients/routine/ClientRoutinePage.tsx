import { getClientById } from "@/services/clientService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";
import { Client } from "@/interfaces/client.interface";
import { getExercises } from "@/services/exerciseService";
import ErrorDisplay from "@/components/erros/ErrorDisplay";
import RoutineDetailsSkeleton from "@/components/loaders/RoutineDetailsSkeleton";
import CardRoutines from "./components/CardRoutines";

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
          <h1 className="text-2xl font-bold mb-4 mt-7">
            Rutinas de {client?.name}
          </h1>
          <div className="flex flex-col gap-4">
            {client?.routines?.map((routine) => (
              <CardRoutines routine={routine} exercises={exercises} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}
