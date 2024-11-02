import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/interfaces/exercise.interface";

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card className="hover:shadow-lg transition-shadow flex flex-col ">
      <CardHeader>
        <CardTitle className="text-xl capitalize">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="text-sm text-muted-foreground flex gap-2">
            {exercise.muscleGroups.map((muscle) => (
              <span
                className="bg-primary px-2 p-0.5 text-secondary font-semibold capitalize rounded-md"
                key={muscle}
              >
                {muscle}{" "}
              </span>
            ))}
          </div>
          <img
            src={
              exercise.image ||
              "https://app-media.fitbod.me/v2/102/images/landscape/0_960x540.jpg"
            }
            alt={exercise.name}
            className="rounded-md"
          />
          <div className="flex gap-2 mb-10">
            <Button variant="outline" size="sm">
              Editar
            </Button>
            <Button variant="destructive" size="sm">
              Eliminar
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ExerciseCard;
