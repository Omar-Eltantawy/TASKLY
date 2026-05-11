export default function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg p-4 bg-white shadow-xs w-76 h-55 flex flex-col justify-between animate-pulse">
      {/* Title */}
      <div className="h-5 bg-slate-200 rounded w-3/4" />

      {/* Description */}
      <div className="space-y-2">
        <div className="h-3 bg-slate-200 rounded w-full" />
        <div className="h-3 bg-slate-200 rounded w-5/6" />
        <div className="h-3 bg-slate-200 rounded w-2/3" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between">
        <div className="h-3 w-20 bg-slate-200 rounded" />
        <div className="h-3 w-24 bg-slate-200 rounded" />
      </div>
    </div>
  );
}
