import { getNameInitials } from "@/shared/lib/utils/getNameInitial";

export function OptionAvatar({ name, sub }: { name: string; sub?: string }) {
  return (
    <div className="flex items-center gap-2">
      <div
        className="w-7 h-7 rounded-full bg-[#DAE2FF] text-slate-dark
        flex items-center justify-center text-[.6rem] font-semibold shrink-0"
      >
        {getNameInitials(name)}
      </div>
      <div className="flex flex-col leading-tight">
        <span className="text-sm font-medium text-slate-dark">{name}</span>
        {sub && <span className="text-[.625rem] text-slate-medium">{sub}</span>}
      </div>
    </div>
  );
}
