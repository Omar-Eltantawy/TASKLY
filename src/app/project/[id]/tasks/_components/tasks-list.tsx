"use client";
import { getTasksAction } from "@/shared/lib/actions/gat-tasks-by-status.actiom";
import { Task } from "@/shared/lib/types/task";
import { useEffect, useState } from "react";
import TaskRow from "./task-row";
import Pagination from "@/shared/ui/pagination";

export default function TasksList({
  projectId,
  currentPage,
}: {
  projectId: string;
  currentPage: number;
}) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState(1);
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      //   setLoading(true);
      const result = await getTasksAction(projectId, undefined, currentPage);
      if (!result.success) {
        // setLoading(false);
        // setError(result.error);
        return;
      }

      //   setLoading(false);
      setTasks(result.tasks);
      setTotalPages(result.totalPages ?? 1);
    };

    fetchTasks();
  }, [projectId, currentPage]);

  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A]">
      {/* Table header */}
      <div
        className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr]
            px-6 py-3 border-b border-[#F1F3FF]"
      >
        <span className="text-xs uppercase font-bold text-[#434654]">
          Task ID
        </span>
        <span className="text-xs uppercase font-bold  text-[#434654] ">
          Title
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Status
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Due Date
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Assigne
        </span>
      </div>
      {tasks.map((task) => (
        <TaskRow key={task.id} task={task} />
      ))}
      <Pagination
        totalPages={totalPages}
        onPageChange={async (page) => {
          const result = await getTasksAction(projectId, undefined, page);
          if (!result.success) return;
          setTasks(result.tasks);
          setTotalPages(result.totalPages ?? 1);
        }}
      />
    </div>
  );
}
