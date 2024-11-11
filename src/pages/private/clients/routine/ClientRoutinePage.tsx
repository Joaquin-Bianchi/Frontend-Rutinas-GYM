import { Routine } from "@/interfaces/routine.interface";
import { getRoutineById } from "@/services/routineService";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom"

export default function ClientRoutinePage() {

    const { routineId } = useParams()

    const {
        data: routine,
        isLoading,
        isError,
        error,
    } = useQuery<Routine>({
        queryKey: ["routine"],
        queryFn: () => getRoutineById(routineId as string),
    });

    if (isLoading) return <div>Cargando la rutina del cliente...</div>;
    if (isError) return <div>Error: {error.message}</div>;

    return (
        <div>ClientRoutinePage
            <p>{routine?.day}</p>
        </div>
    )
}
