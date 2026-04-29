"use client";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import { useEffect, useState } from "react";
import BoardColumnSkeleton from "./board-column-skeleton";
import BoardTaskCard from "./board-task-card";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import Link from "next/link";
import { COLUMN_COLORS } from "@/shared/lib/constants/constants";
import { getTasksAction } from "@/shared/lib/actions/gat-tasks-by-status.actiom";

type Props = {
  projectId: string;
  status: TaskStatus;
  label: string;
};

export default function BoardColumn({ projectId, status, label }: Props) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const result = await getTasksAction(projectId, status);
      if (!result.success) {
        setLoading(false);
        setError(result.error);
        return;
      }

      setLoading(false);
      setTasks(result.tasks);
    };

    fetchTasks();
  }, [projectId, status]);
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
      <div className="flex-1 overflow-y-auto px-2 pb-2 flex flex-col gap-2">
        {loading ? (
          <BoardColumnSkeleton />
        ) : error ? (
          <p className="text-xs text-error text-center py-4 px-2">
            Failed to load tasks
          </p>
        ) : (
          tasks.map((task) => <BoardTaskCard key={task.id} task={task} />)
        )}
      </div>
    </div>
  );
}
