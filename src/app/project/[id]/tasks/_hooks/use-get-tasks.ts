import { getTasksAction } from "@/shared/lib/actions/gat-tasks-by-status.actiom";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import { useEffect, useState } from "react";

export const useGetTasks = ({
  projectId,
  status,
  page = 1,
  searchTerm,
}: {
  projectId: string;
  status?: TaskStatus;
  page?: number;
  searchTerm?: string;
}) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      setError(null);

      const result = await getTasksAction(projectId, status, page, searchTerm);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setTasks(result.tasks);
      setTotalPages(result.totalPages);
      setLoading(false);
    };

    fetchTasks();
  }, [projectId, status, page, searchTerm]);
  return { tasks, loading, error, totalPages };
};
