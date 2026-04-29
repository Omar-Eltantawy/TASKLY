import { Task } from "@/shared/lib/types/task";
import actionIcon from "../../../../../../public/icons/action.svg";
import Image from "next/image";
import { formatDate } from "@/app/project/_components/project-card";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { COLUMN_COLORS, STATUS_LABELS } from "@/shared/lib/constants/constants";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
export default function TaskRow({ task }: { task: Task }) {
  return (
    <div
      className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr_auto]
            px-6 py-3 border-b border-[#F1F3FF]"
    >
      <span className="text-xs uppercase font-normal text-primary">
        {task.task_id}
      </span>
      <span className="text-sm font-medium text-slate-dark ">{task.title}</span>
      <span
        className={cn(
          "text-xs font-medium w-fit px-2 py-1 rounded-2xl",
          COLUMN_COLORS[task.status].bg,
          COLUMN_COLORS[task.status].text,
        )}
      >
        {STATUS_LABELS[task.status]}
      </span>
      <span className="text-xs  font-normal text-slate-medium">
        {formatDate(task.due_date)}
      </span>
      <span className="text-xs uppercase font-normal text-slate-dark">
        {task.assignee.name ? (
          <div className="flex items-center gap-1.5 ">
            <div
              className={cn(
                "w-5 h-5 rounded-full flex items-center justify-center text-[.5rem] font-semibold",
                COLUMN_COLORS[task.status].bg,
                COLUMN_COLORS[task.status].text,
              )}
            >
              {getNameInitials(task.assignee.name)}
            </div>
            <span>{task.assignee.name}</span>
          </div>
        ) : (
          <span className="text-[.625rem] text-slate-medium">Unassigned</span>
        )}
      </span>
      <span className="text-xs uppercase font-bold text-[#737685] cursor-pointer ">
        <Image
          src={actionIcon}
          alt="action-icon"
          height={3}
          width={3}
          className="rotate-90"
        />
      </span>
    </div>
  );
}
