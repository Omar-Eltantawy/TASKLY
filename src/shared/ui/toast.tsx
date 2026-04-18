import { cn } from "../lib/utils/tailwind-merge";

export function Toast({
  message,
  type,
}: {
  message: string;
  type: "success" | "error";
}) {
  return (
    <div
      className={cn(
        "fixed bottom-6 right-6 z-50 px-5 py-3 rounded-sm shadow-lg text-sm font-medium animate-in fade-in slide-in-from-bottom-2",
        type === "success"
          ? "bg-green-50 text-green-700 border border-green-200"
          : "bg-[#FFDAD6] text-error border border-red-200",
      )}
    >
      {message}
    </div>
  );
}
