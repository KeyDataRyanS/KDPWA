import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex h-full w-full overflow-hidden">
      {/* Sidebar skeleton */}
      <div className="hidden w-56 border-r border-border p-3 md:flex md:flex-col lg:w-64">
        <Skeleton className="mb-4 h-8 w-24" />
        <div className="flex flex-col gap-2">
          {[1, 2].map((i) => (
            <Skeleton key={i} className="h-10 w-full rounded-lg" />
          ))}
        </div>
      </div>

      {/* Main column skeleton */}
      <div className="flex flex-1 flex-col">
        <div className="flex h-14 items-center border-b border-border px-4">
          <Skeleton className="h-6 w-32" />
          <div className="flex-1" />
          <Skeleton className="size-8 rounded-lg" />
        </div>
        <div className="p-4 md:p-6">
          <div className="mx-auto w-full max-w-5xl space-y-6">
            <Skeleton className="h-8 w-48" />
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {[1, 2, 3, 4].map((i) => (
                <Skeleton key={i} className="h-28 rounded-xl" />
              ))}
            </div>
            <Skeleton className="h-40 rounded-xl" />
          </div>
        </div>
      </div>
    </div>
  );
}
