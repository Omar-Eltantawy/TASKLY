import ProjectCardSkeleton from "./project-card-skeleton";

export default function ProjectsSkeleton() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {Array.from({ length: 6 }).map((_, i) => (
        <ProjectCardSkeleton key={i} />
      ))}

      {/* Add button skeleton */}
      <div className="rounded-lg p-4 bg-white shadow-xs w-76 h-55 hidden md:flex flex-col items-center justify-center animate-pulse">
        <div className="w-10 h-10 bg-slate-200 rounded" />
        <div className="h-3 w-32 bg-slate-200 mt-3 rounded" />
      </div>
    </div>
  );
}
