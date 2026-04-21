import ProjectCardSkeleton from "./project-card-skeleton";

export default function ProjectsSkeleton() {
  return (
    <div className="w-full">
      {/* Header skeleton */}
      <div className="flex items-center justify-between mb-5">
        <div className="space-y-2">
          <div className="h-7 w-40 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 w-60 bg-gray-200 rounded animate-pulse" />
        </div>

        <div className="hidden md:block h-10 w-40 bg-gray-200 rounded animate-pulse" />
      </div>

      {/* Cards skeleton */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <ProjectCardSkeleton key={i} />
        ))}
      </div>
    </div>
  );
}
