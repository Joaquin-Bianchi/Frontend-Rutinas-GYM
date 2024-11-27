import { Skeleton } from "@/components/ui/skeleton";

export default function ClientsSkeletonLoader() {
  return (
    <div className="space-y-6">
      <div className="space-y-2">
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} className="h-16 w-full" />
        ))}
      </div>
    </div>
  );
}
