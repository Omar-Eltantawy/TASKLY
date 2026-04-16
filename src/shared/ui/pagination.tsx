export default function Pagination() {
  const currentPage = 1;
  const totalPages = 2;

  return (
    <div className="flex items-center gap-1 justify-between pt-4 border-t border-[#F1F3FF] shrink-0">
      <p className="text-xs text-slate-medium">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          className="h-7 w-7 text-xs rounded-sm border border-gray-200
            text-slate-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
        >
          ←
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            className={`w-7 h-7 text-xs rounded-sm transition-colors
              ${
                i + 1 === currentPage
                  ? "bg-primary text-white"
                  : "border border-gray-200 text-slate-medium hover:bg-gray-50"
              }`}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          className="h-7 w-7 text-xs rounded-sm border border-gray-200
            text-slate-medium hover:bg-gray-50 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
