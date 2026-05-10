"use client";

import MobileTaskCard from "./mobile-task-card";
import { useAppDispatch } from "@/store/hooks";
import { openTaskModal } from "@/store/features/ui/slice";
import { useGetTasks } from "../_hooks/use-get-tasks";
import MobileTasksSkeleton from "./mobile-tasks-skeleton";

export default function MobileTasks({
  projectId,
  searchTerm,
}: {
  projectId: string;
  searchTerm: string;
}) {
  const dispatch = useAppDispatch();
  const { tasks, loading, error } = useGetTasks({
    projectId,
    searchTerm,
  });

  if (loading) return <MobileTasksSkeleton />;

  if (error)
    return (
      <p className="text-center py-6 text-sm text-error">
        Failed to load tasks
      </p>
    );
  return (
    <div>
      {tasks.map((task) => (
        <MobileTaskCard
          onClick={() =>
            dispatch(openTaskModal({ taskId: task.id, projectId }))
          }
          key={task.id}
          task={task}
        />
      ))}
    </div>
  );
}
