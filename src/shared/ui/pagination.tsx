import { useRouter, useSearchParams } from "next/navigation";
import { cn } from "../lib/utils/tailwind-merge";

type Props = {
  totalPages: number;
  onPageChange: (page: number) => void;
  disabled?: boolean;
};

export default function Pagination({
  totalPages,
  onPageChange,
  disabled = false,
}: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentPage = Number(searchParams.get("page") ?? "1");

  const goToPage = (page: number) => {
    onPageChange(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));
    router.replace(`?${params.toString()}`, { scroll: false });
  };

  if (totalPages <= 1) return null;
  return (
    <div className="flex items-center gap-1 justify-between pt-4 border-t border-[#F1F3FF] shrink-0">
      <p className="text-xs text-slate-medium">
        Page {currentPage} of {totalPages}
      </p>

      <div className="flex items-center gap-1">
        {/* Prev */}
        <button
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1 || disabled}
          className="h-7 w-7 text-xs rounded-sm border border-gray-200 text-slate-medium disabled:opacity-40 hover:bg-gray-50 transition-colors"
        >
          ←
        </button>

        {/* Page numbers */}
        {Array.from({ length: totalPages }).map((_, i) => (
          <button
            key={i}
            onClick={() => goToPage(i + 1)}
            disabled={disabled || i + 1 === currentPage}
            className={cn(
              "w-7 h-7 text-xs rounded-sm transition-colors",
              i + 1 === currentPage
                ? "bg-primary text-white"
                : "border border-gray-200 text-slate-medium hover:bg-gray-50",
            )}
          >
            {i + 1}
          </button>
        ))}

        {/* Next */}
        <button
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages || disabled}
          className="h-7 w-7 text-xs rounded-sm border border-gray-200 text-slate-medium hover:bg-gray-50 transition-colors"
        >
          →
        </button>
      </div>
    </div>
  );
}
