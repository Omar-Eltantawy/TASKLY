"use client";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import BoardColumnSkeleton from "./board-column-skeleton";
import BoardTaskCard from "./board-task-card";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import Link from "next/link";
import { COLUMN_COLORS } from "@/shared/lib/constants/constants";
import { useDroppable } from "@dnd-kit/core";

type Props = {
  projectId: string;
  status: TaskStatus;
  label: string;
  tasks: Task[];
  loading: boolean;
  onTaskClick: (taskId: string) => void;
};

export default function BoardColumn({
  projectId,
  status,
  label,
  tasks,
  loading,
  onTaskClick,
}: Props) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: { columnStatus: status },
  });
  return (
    <div className={`flex flex-col shrink-0 w-64  rounded-sm`}>
      {/* Column header */}
      <div className="flex items-center justify-between px-3 py-3 shrink-0">
        <div className="flex items-center gap-2">
          <div
            className={cn(
              "w-2 h-2 rounded-full block z-50",
              COLUMN_COLORS[status].bg,
            )}
          ></div>
          <span className="text-xs font-bold text-[#041B3C] uppercase">
            {label}
          </span>
          {!loading && (
            <span
              className={cn(
                "text-[.625rem] font-semibold px-1.5 py-0.5 rounded-sm",
                COLUMN_COLORS[status].bg,
                COLUMN_COLORS[status].text,
              )}
            >
              {tasks.length}
            </span>
          )}
        </div>
      </div>
      <Link
        href={`/project/${projectId}/tasks/new?status=${status}`}
        className="border border-dashed border-gray-300 rounded-sm py-6 flex items-center justify-center cursor-pointer hover:border-primary transition-all"
      >
        <span className="text-xs text-[#43465499] uppercase font-bold">
          + Add task
        </span>
      </Link>

      {/* Tasks list */}
      <div
        ref={setNodeRef}
        className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-2"
      >
        {loading ? (
          <BoardColumnSkeleton />
        ) : tasks.length === 0 ? (
          <div
            className={cn(
              "flex-1 border-2 border-dashed rounded-sm mt-2 transition-colors",
              isOver ? "border-primary bg-primary/5" : "border-transparent",
            )}
          />
        ) : (
          tasks.map((task) => (
            <BoardTaskCard
              key={task.id}
              task={task}
              onClick={() => onTaskClick(task.id)}
            />
          ))
        )}
      </div>
    </div>
  );
}
