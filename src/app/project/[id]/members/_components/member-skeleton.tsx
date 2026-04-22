function SkeletonRow() {
  return (
    <div
      className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr]
      items-center px-6 py-4 border-b border-[#F1F3FF] animate-pulse"
    >
      {/* Member */}
      <div className="flex items-center gap-3">
        <div className="w-9 h-9 rounded-full bg-gray-200 shrink-0" />
        <div className="h-3 bg-gray-200 rounded w-28" />
      </div>
      {/* Role */}
      <div className="h-3 bg-gray-200 rounded w-40 hidden md:block" />
      {/* Action */}
      <div className="h-5 bg-gray-200 rounded w-14" />
    </div>
  );
}

export default function MembersSkeleton() {
  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A]">
      <div
        className="grid grid-cols-[1fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr]
        px-6 py-3 border-b border-[#F1F3FF]"
      >
        <div className="h-2 bg-gray-200 rounded w-10" />
        <div className="h-2 bg-gray-200 rounded w-10 hidden md:block" />
        <div className="h-2 bg-gray-200 rounded w-8" />
      </div>
      {Array.from({ length: 5 }).map((_, i) => (
        <SkeletonRow key={i} />
      ))}
    </div>
  );
}
