"use client";

import { useEffect, useState } from "react";
import {
  DragEndEvent,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core";

import { TASK_STATUSES } from "@/shared/lib/constants/constants";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import { getTasksAction } from "@/shared/lib/actions/gat-tasks-by-status.actiom";

type TasksMap = Record<TaskStatus, Task[]>;

const emptyMap = (): TasksMap =>
  Object.fromEntries(TASK_STATUSES.map((s) => [s, [] as Task[]])) as TasksMap;

export function useTasksBoard(projectId: string) {
  const [tasksMap, setTasksMap] = useState<TasksMap>(emptyMap());
  const [loading, setLoading] = useState(true);
  const [activeTask, setActiveTask] = useState<Task | null>(null);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  // sensors
  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 8 } }),
  );

  // fetch
  useEffect(() => {
    const fetchAll = async () => {
      setLoading(true);

      const results = await Promise.all(
        TASK_STATUSES.map((status) => getTasksAction(projectId, status, 1)),
      );

      const map = emptyMap();

      results.forEach((res, i) => {
        if (res.success) {
          map[TASK_STATUSES[i]] = res.tasks;
        }
      });

      setTasksMap(map);
      setLoading(false);
    };

    fetchAll();
  }, [projectId]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  // drag start
  const handleDragStart = (event: DragStartEvent) => {
    const task = event.active.data.current?.task as Task;
    setActiveTask(task || null);
  };

  // drag end
  const handleDragEnd = async (event: DragEndEvent) => {
    setActiveTask(null);

    const { active, over } = event;
    if (!over) return;

    const task = active.data.current?.task as Task;

    const newStatus: TaskStatus | undefined =
      over.data.current?.columnStatus || over.data.current?.task?.status;

    if (!task || !newStatus || task.status === newStatus) return;

    const oldStatus = task.status;

    // optimistic update
    setTasksMap((prev) => ({
      ...prev,
      [oldStatus]: prev[oldStatus].filter((t) => t.id !== task.id),
      [newStatus]: [...prev[newStatus], { ...task, status: newStatus }],
    }));

    try {
      const res = await fetch("/api/tasks/update-status", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          taskId: task.id,
          status: newStatus,
        }),
      });

      const data = await res.json();

      if (!data.success) throw new Error();

      showToast("Status updated", "success");
    } catch {
      // rollback
      setTasksMap((prev) => ({
        ...prev,
        [newStatus]: prev[newStatus].filter((t) => t.id !== task.id),
        [oldStatus]: [...prev[oldStatus], task],
      }));

      showToast("Failed to update status", "error");
    }
  };

  return {
    tasksMap,
    loading,
    activeTask,
    toast,
    sensors,
    handleDragStart,
    handleDragEnd,
  };
}
