"use client";

export default function MobileTasksSkeleton() {
  return (
    <div className="animate-pulse">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="px-6 py-4 border-b border-[#F1F3FF] space-y-3">
          {/* Top Row */}
          <div className="flex items-center justify-between">
            <div className="h-3 bg-gray-200 rounded w-16"></div>
            <div className="h-5 bg-gray-200 rounded-full w-20"></div>
          </div>

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          {/* Bottom Row */}
          <div className="flex items-center justify-between mt-2">
            <div className="flex items-center gap-2">
              {/* Avatar */}
              <div className="w-5 h-5 bg-gray-200 rounded-full"></div>

              {/* Due date */}
              <div className="flex flex-col gap-1">
                <div className="h-2 bg-gray-200 rounded w-16"></div>
                <div className="h-3 bg-gray-200 rounded w-20"></div>
              </div>
            </div>

            {/* Action icon */}
            <div className="w-3 h-3 bg-gray-200 rounded"></div>
          </div>
        </div>
      ))}
    </div>
  );
}
