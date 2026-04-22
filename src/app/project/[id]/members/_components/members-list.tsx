import { ProjectMember } from "@/shared/lib/types/project";
import MemberRow from "./member-row";

export default function MembersList({ members }: { members: ProjectMember[] }) {
  if (members.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-full gap-3">
        <p className="text-slate-medium text-sm">No members found.</p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A]">
      {/* Table header */}
      <div
        className="grid grid-cols-[3fr_1fr_auto] md:grid-cols-[2fr_2fr_1fr]
        px-6 py-3 border-b border-[#F1F3FF]"
      >
        <span className="text-[.625rem] uppercase font-bold text-[#737685]">
          Member
        </span>
        <span className="text-[.625rem] uppercase font-bold text-[#737685] ">
          Role
        </span>
        <span className="text-[.625rem] uppercase font-bold text-[#737685]">
          Action
        </span>
      </div>

      {/* Rows */}
      {members.map((member) => (
        <MemberRow key={member.user_id} member={member} />
      ))}
    </div>
  );
}
