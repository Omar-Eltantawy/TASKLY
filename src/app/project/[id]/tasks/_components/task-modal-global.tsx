"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeTaskModal } from "@/store/features/ui/slice";
import { Task } from "@/shared/lib/types/task";
import { getTaskDetailAction } from "@/shared/lib/actions/get-task-details.acction";
import TaskDetailsModal from "./task-details-modal";
import MobileTaskModal from "./mobile-task-modal";

export default function TaskModalGlobal() {
  const dispatch = useAppDispatch();
  const { open, taskId, projectId } = useAppSelector(
    (state) => state.ui.taskModal,
  );

  const [task, setTask] = useState<Task | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !taskId || !projectId) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      setTask(null);

      const result = await getTaskDetailAction(projectId, taskId);

      if (!result.success) {
        setError(result.error);
        setLoading(false);
        return;
      }

      setTask(result.task);
      setLoading(false);
    };

    fetch();
  }, [open, taskId, projectId]);

  if (!open) return null;

  return (
    <>
      <TaskDetailsModal
        className="hidden md:block"
        task={task}
        loading={loading}
        error={error}
        onClose={() => {
          dispatch(closeTaskModal());
          setTask(null);
          setError(null);
        }}
      />
      <MobileTaskModal
        className="block md:hidden"
        task={task}
        loading={loading}
        error={error}
        onClose={() => {
          dispatch(closeTaskModal());
          setTask(null);
          setError(null);
        }}
      />
    </>
  );
}
