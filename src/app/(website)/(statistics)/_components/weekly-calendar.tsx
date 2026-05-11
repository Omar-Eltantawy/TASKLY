import { COLUMN_COLORS, STATUS_LABELS } from "@/shared/lib/constants/constants";
import { DayStats } from "@/shared/lib/types/stats";
import { TaskStatus } from "@/shared/lib/types/task";
import { formatDayLabel } from "@/shared/lib/utils/date";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import NoTasksIcon from "../../../../../public/icons/no-tasks.svg";
import Image from "next/image";

const today = new Date().toISOString().split("T")[0];

export default function WeeklyCalendar({ daily }: { daily: DayStats[] }) {
  return (
    <div className="bg-surface-low shadow-[0_4px_24px_0_#041B3C0A] p-6 w-full mt-3">
      {/* <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full "> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-3 w-full ">
        {daily.map((day) => {
          const hasStatuses = Object.keys(day.statuses).length > 0;
          return (
            <div
              key={day.day}
              className={cn(
                "flex flex-col gap-2 p-3 bg-white rounded-2xl relative md:min-h-80",
                day.day === today && "border-3 border-primary",
              )}
            >
              {day.day === today && (
                <span className="absolute -top-3 left-[50%] translate-x-[-50%] bg-primary text-white py-0.5 px-2 w-fit rounded-2xl text-[0.625rem] font-bold">
                  Today
                </span>
              )}

              <p
                className={cn(
                  "text-sm font-bold uppercase shrink-0 text-center mb-3",
                  day.day === today ? " text-black" : "text-[#737685] ",
                )}
              >
                {/* {formatDayLabel(day.day)} */}
                {formatDayLabel(day.day)}
              </p>

              {hasStatuses ? (
                Object.entries(day.statuses).map(([s, count]) => (
                  <div
                    key={s}
                    className={cn(
                      "flex items-center justify-between px-2 py-1 rounded-3xl text-[.625rem] font-semibold",
                      COLUMN_COLORS[s as TaskStatus].text,
                      COLUMN_COLORS[s as TaskStatus].bg,
                    )}
                  >
                    <span>
                      {STATUS_LABELS[s as keyof typeof STATUS_LABELS] ?? s}
                    </span>
                    <span>{count}</span>
                  </div>
                ))
              ) : (
                <div className="m-auto text-center flex flex-col items-center justify-center">
                  <Image
                    src={NoTasksIcon}
                    alt="no-tasks"
                    height={30}
                    width={30}
                  />
                  <p className="text-[.625rem] text-slate-medium text-center py-2">
                    No Tasks
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
