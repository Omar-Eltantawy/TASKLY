export default function TasksListSkeleton() {
  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A] animate-pulse">
      {/* Header */}
      <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] px-6 py-3 border-b border-[#F1F3FF]">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="h-3 bg-gray-200 rounded w-3/4"></div>
        ))}
      </div>

      {/* Rows */}
      {Array.from({ length: 8 }).map((_, i) => (
        <div
          key={i}
          className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_auto] px-6 py-4 border-b border-[#F1F3FF]"
        >
          {/* Task ID */}
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>

          {/* Title */}
          <div className="h-4 bg-gray-200 rounded w-3/4"></div>

          {/* Status */}
          <div className="h-5 bg-gray-200 rounded w-20"></div>

          {/* Due Date */}
          <div className="h-3 bg-gray-200 rounded w-2/3"></div>

          {/* Assignee */}
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 bg-gray-200 rounded-full"></div>
            <div className="h-3 bg-gray-200 rounded w-16"></div>
          </div>

          {/* Action */}
          <div className="h-3 w-3 bg-gray-200 rounded"></div>
        </div>
      ))}
    </div>
  );
}
