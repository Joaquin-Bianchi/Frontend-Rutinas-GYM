import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Exercise } from "@/interfaces/exercise.interface";

function ExerciseCard({ exercise }: { exercise: Exercise }) {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <CardTitle className="text-lg">{exercise.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">
            {exercise.muscleGroups.join(", ")}
          </p>
          <div className="flex gap-2">
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
