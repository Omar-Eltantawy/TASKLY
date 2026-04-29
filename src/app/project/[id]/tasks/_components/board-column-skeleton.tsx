export default function BoardColumnSkeleton() {
  return (
    <>
      {Array.from({ length: 3 }).map((_, i) => (
        <div
          key={i}
          className="bg-white rounded-sm p-3 animate-pulse flex flex-col gap-2"
        >
          <div className="h-3 bg-gray-200 rounded w-3/4" />
          <div className="h-2 bg-gray-200 rounded w-1/2" />
          <div className="flex items-center gap-2 mt-1">
            <div className="w-5 h-5 rounded-full bg-gray-200" />
            <div className="h-2 bg-gray-200 rounded w-16" />
          </div>
        </div>
      ))}
    </>
  );
}
