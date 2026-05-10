export default function EpicTasksSkeleton() {
  return (
    <div
      className="grid grid-cols-[auto_1fr_auto] gap-4 items-center
      px-3 py-3 border-b border-[#F1F3FF] animate-pulse"
    >
      {/* Icon */}
      <div className="w-5 h-5 rounded bg-gray-200" />

      {/* Title + Assignee */}
      <div className="flex flex-col gap-2 w-full">
        <div className="h-4 w-2/3 bg-gray-200 rounded" />
        <div className="h-3 w-1/3 bg-gray-100 rounded" />
      </div>

      {/* Date */}
      <div className="flex flex-col gap-1 items-end">
        <div className="h-2 w-10 bg-gray-100 rounded" />
        <div className="h-3 w-16 bg-gray-200 rounded" />
      </div>
    </div>
  );
}
