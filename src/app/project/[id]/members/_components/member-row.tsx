import { ProjectMember } from "@/shared/lib/types/project";
import actionIcon from "../../../../../../public/icons/action.svg";
import Image from "next/image";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";

export const ROLE_STYLES: Record<ProjectMember["role"], string> = {
  owner: "bg-primary text-white",
  admin: "bg-[#CDDDFF] text-[#51617E]",
  member: "bg-[#D7E2FF] text-[#434654]",
  viewer: "bg-[#E8EDFF] text-[#434654]",
};

export default function MemberRow({ member }: { member: ProjectMember }) {
  const name = member.metadata.name;

  return (
    <div className="grid grid-cols-[2fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr] items-center px-6 py-4 border-b border-[#F1F3FF] last:border-0 hover:bg-gray-50 transition-colors">
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "w-9 h-9 rounded-xl flex items-center justify-center text-sm font-semibold shrink-0",
            ROLE_STYLES[member.role],
          )}
        >
          {getNameInitials(name)}
        </div>
        <span className="flex flex-col">
          <span className="text-sm font-semibold text-primary">{name}</span>
          <span className="text-xs font-normal text-slate-dark">
            {member.email}
          </span>
        </span>
      </div>

      <span
        className={cn(
          "text-xs font-semibold px-2.5 py-1 rounded-xl capitalize w-fit ",
          ROLE_STYLES[member.role],
        )}
      >
        {member.role}
      </span>

      <span className="text-xs font-semibold px-2.5 py-1 rounded-sm capitalize w-fit ">
        {/* {member.role !== "owner" && ( */}
        <Image
          src={actionIcon}
          alt="action Icon"
          width={3}
          height={3}
          className="cursor-pointer"
        />
        {/* )}  */}
      </span>
    </div>
  );
}
