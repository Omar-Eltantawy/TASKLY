"use client";

import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeTaskModal } from "@/store/features/ui/slice";
import { Task } from "@/shared/lib/types/task";
import { getTaskDetailAction } from "@/shared/lib/actions/get-task-details.acction";
import TaskDetailsModal from "./task-details/task-details-modal";
import MobileTaskModal from "./mobile-task-modal";
import { Epic } from "@/shared/lib/types/epic";
import { getEpicsAction } from "@/shared/lib/actions/get-epics.action";

export default function TaskModalGlobal() {
  const dispatch = useAppDispatch();
  const { open, taskId, projectId } = useAppSelector(
    (state) => state.ui.taskModal,
  );
  const members = useAppSelector((state) => state.activeProject.members);
  const [task, setTask] = useState<Task | null>(null);
  const [epics, setEpics] = useState<Epic[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!open || !taskId || !projectId) return;

    const fetch = async () => {
      setLoading(true);
      setError(null);
      setTask(null);

      // Fetch task + epics in parallel
      const [taskResult, epicsResult] = await Promise.all([
        getTaskDetailAction(projectId, taskId),
        getEpicsAction(projectId, 1, ""),
      ]);

      if (!taskResult.success) {
        setError(taskResult.error);
        setLoading(false);
        return;
      }

      setTask(taskResult.task);
      setEpics(epicsResult.success ? epicsResult.epics : []);
      setLoading(false);
    };

    fetch();
  }, [open, taskId, projectId]);
  const handleClose = () => {
    dispatch(closeTaskModal());
    setTask(null);
    setError(null);
  };

  const handleUpdated = (changes: Partial<Task>) => {
    setTask((prev) => (prev ? { ...prev, ...changes } : prev));
  };

  if (!open) return null;

  return (
    <>
      <TaskDetailsModal
        className="hidden md:block"
        task={task}
        loading={loading}
        error={error}
        members={members}
        epics={epics}
        onClose={handleClose}
        onUpdated={handleUpdated}
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
