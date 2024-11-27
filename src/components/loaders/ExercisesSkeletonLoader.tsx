import { ExerciseCardSkeleton } from "./ExerciseCardSkeleton";

export default function ExercisesSkeletonLoader() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, i) => (
          <ExerciseCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
