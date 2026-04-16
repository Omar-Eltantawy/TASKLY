export default function ProjectCardSkeleton() {
  return (
    <div className="rounded-lg p-4 bg-white shadow-xs w-full h-55 flex flex-col justify-between animate-pulse">
      {/* Title */}
      <div className="h-5 w-2/3 bg-gray-200 rounded" />

      {/* Description */}
      <div className="space-y-2 mt-3">
        <div className="h-3 w-full bg-gray-200 rounded" />
        <div className="h-3 w-5/6 bg-gray-200 rounded" />
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between mt-4">
        <div className="h-3 w-20 bg-gray-200 rounded" />
        <div className="h-3 w-24 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
