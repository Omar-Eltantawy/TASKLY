"use client";

import TaskRow from "./task-row";
import Pagination from "@/shared/ui/pagination";
import { useGetTasks } from "../_hooks/use-get-tasks";
import { useRouter, useSearchParams } from "next/navigation";
import TasksListSkeleton from "./tasks-list-skeleton";

export default function TasksList({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string;
}) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentPage = Number(searchParams.get("page") ?? "1");

  const { tasks, loading, error, totalPages } = useGetTasks({
    projectId,
    page: currentPage,
    searchTerm,
  });

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", String(page));

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A]">
      {/* Header */}
      <div className="hidden md:grid grid-cols-[1fr_2fr_1fr_1fr_1fr] px-6 py-3 border-b border-[#F1F3FF]">
        <span className="text-xs uppercase font-bold text-[#434654]">
          Task ID
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Title
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Status
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Due Date
        </span>
        <span className="text-xs uppercase font-bold text-[#434654]">
          Assignee
        </span>
      </div>

      {/* Loading */}
      {loading && <TasksListSkeleton />}

      {/* Error */}
      {error && <p className="text-center py-6 text-sm text-error">{error}</p>}

      {/* Empty state */}
      {!loading && !error && tasks.length === 0 && (
        <p className="text-center py-6 text-sm text-slate-medium">
          No tasks found.
        </p>
      )}

      {/* Tasks */}
      {!loading &&
        !error &&
        tasks.map((task) => <TaskRow key={task.id} task={task} />)}

      {/* Pagination */}
      <Pagination totalPages={totalPages} onPageChange={handlePageChange} />
    </div>
  );
}
