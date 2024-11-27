import { Skeleton } from "../ui/skeleton";
import { RoutineCardSkeleton } from "./RoutineCardSkeleton";

export function HomeClientSkeletonLoader() {
  return (
    <div className="space-y-8">
      <Skeleton className="h-10 w-1/4 mx-auto" />
      <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {[...Array(6)].map((_, index) => (
          <RoutineCardSkeleton key={index} />
        ))}
      </div>
    </div>
  );
}
