import { formatDate } from "@/app/project/_components/project-card";
import { Task } from "@/shared/lib/types/task";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import CalenderIcon from "../../../../../../public/icons/calender.svg";
import BlueCalenderIcon from "../../../../../../public/icons/blue-calender.svg";
import DelayedIcon from "../../../../../../public/icons/delayed.svg";
import Image from "next/image";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { COLUMN_COLORS } from "@/shared/lib/constants/constants";

function isOverdue(date: string): boolean {
  return new Date(date) < new Date(new Date().toDateString());
}
function isToday(date: string): boolean {
  return new Date(date).toDateString() === new Date().toDateString();
}
export default function BoardTaskCard({ task }: { task: Task }) {
  return (
    <div
      className={cn(
        "mt-2 p-4 flex flex-col gap-2 rounded-md",
        isOverdue(task.due_date)
          ? "bg-[#FFDAD633] border-[#BA1A1A1A]"
          : "bg-white",
        isToday(task.due_date) ? "border-l-4 border-l-primary" : "",
      )}
    >
      <h3 className="text-sm font-medium text-slate-dark">{task.title}</h3>
      <div className="flex items-center justify-between mt-5">
        <span
          className={cn(
            "text-[.625rem] font-medium shrink-0 flex items-center justify-between gap-0.5 text-slate-medium",
          )}
        >
          {isOverdue(task.due_date) ? (
            <>
              <Image
                src={DelayedIcon}
                alt="calender-icon"
                height={11}
                width={11}
              />
              <p className="text-error font-bold mt-0.5">DELAYED</p>
            </>
          ) : isToday(task.due_date) ? (
            <>
              <Image
                src={BlueCalenderIcon}
                alt="today-calender-icon"
                height={11}
                width={11}
              />
              <span className="text-primary text-xs font-bold">Today</span>
            </>
          ) : (
            <>
              <Image
                src={CalenderIcon}
                alt="calender-icon"
                height={11}
                width={11}
              />
              <span>{formatDate(task.due_date)}</span>
            </>
          )}
        </span>

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
          </div>
        ) : (
          <span className="text-[.625rem] text-slate-medium">Unassigned</span>
        )}
      </div>
    </div>
  );
}
