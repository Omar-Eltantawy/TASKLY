"use client";
import { getTasksAction } from "@/shared/lib/actions/gat-tasks-by-status.actiom";
import { Task } from "@/shared/lib/types/task";
import { useEffect, useState } from "react";
import MobileTaskCard from "./mobile-task-card";

export default function MobileTasks({ projectId }: { projectId: string }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      const result = await getTasksAction(projectId);
      if (!result.success) {
        setLoading(false);
        setError(result.error);
        return;
      }

      setLoading(false);
      setTasks(result.tasks);
    };

    fetchTasks();
  }, [projectId]);
  return (
    <div>
      {tasks.map((task) => (
        <MobileTaskCard key={task.id} task={task} />
      ))}
    </div>
  );
}
