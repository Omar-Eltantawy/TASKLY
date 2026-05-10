export default function EpicCardSkeleton() {
  return (
    <div className="shadow-xl p-5 rounded-md bg-white animate-pulse">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="h-5 w-16 bg-gray-200 rounded-sm" />
        <div className="h-4 w-4 bg-gray-200 rounded-full" />
      </div>

      {/* Title */}
      <div className="h-6 w-3/4 bg-gray-200 rounded mb-3" />

      {/* Assignee */}
      <div className="flex items-center justify-between border-b border-gray-100 py-5">
        <div className="flex items-center gap-2">
          {/* Avatar */}
          <div className="h-10 w-10 bg-gray-200 rounded-xl" />

          {/* Text */}
          <div className="flex flex-col gap-2">
            <div className="h-3 w-16 bg-gray-200 rounded" />
            <div className="h-4 w-24 bg-gray-200 rounded" />
          </div>
        </div>

        {/* Status */}
        <div className="h-6 w-16 bg-gray-200 rounded" />
      </div>

      {/* Footer */}
      <div className="py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-4 w-4 bg-gray-200 rounded-full" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
          <div className="h-3 w-16 bg-gray-200 rounded" />
        </div>

        <div className="flex items-center gap-1">
          <div className="h-3 w-3 bg-gray-200 rounded-full" />
          <div className="h-3 w-20 bg-gray-200 rounded" />
        </div>
      </div>
    </div>
  );
}
