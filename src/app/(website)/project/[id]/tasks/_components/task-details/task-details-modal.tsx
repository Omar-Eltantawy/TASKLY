"use client";

import { useEffect, useState } from "react";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import { Epic } from "@/shared/lib/types/epic";
import { ProjectMember } from "@/shared/lib/types/project";
import { updateTaskAction } from "@/shared/lib/actions/update-task.action";
import { Toast } from "@/shared/ui/toast";
import TaskDetailsHeader from "./task-details-header";
import TaskDetailsBody from "./task-details-body";
import TaskDetailsSidebar from "./task-details-sidebar";
import TaskDetailsFooter from "./task-details-footer";

type Props = {
  task: Task | null;
  loading: boolean;
  error: string | null;
  members: ProjectMember[];
  epics: Epic[];
  onClose: () => void;
  onUpdated: (changes: Partial<Task>) => void;
  className?: string;
};

export default function TaskDetailsModal({
  task,
  members,
  epics,
  onClose,
  onUpdated,
  className,
}: Props) {
  const [saving, setSaving] = useState(false);
  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [title, setTitle] = useState(task?.title ?? "");
  const [description, setDescription] = useState(task?.description ?? "");
  const [assigneeId, setAssigneeId] = useState(task?.assignee?.id ?? "");
  const [epicId, setEpicId] = useState(task?.epic_id ?? "");
  const [dueDate, setDueDate] = useState(
    task?.due_date ? task.due_date.split("T")[0] : "",
  );
  const [status, setStatus] = useState<TaskStatus>(task?.status ?? "TO_DO");

  useEffect(() => {
    if (!task) return;
    setTitle(task.title);
    setDescription(task.description ?? "");
    setAssigneeId(task.assignee?.id ?? "");
    setEpicId(task.epic_id ?? "");
    setDueDate(task.due_date ? task.due_date.split("T")[0] : "");
    setStatus(task.status);
  }, [task]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handler);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 4000);
  };

  const save = async (
    payload: Record<string, string | null>,
    revert: () => void,
    uiUpdate: Partial<Task>,
  ) => {
    if (!task) return;
    setSaving(true);
    const result = await updateTaskAction(task.id, payload);
    if (!result.success) {
      revert();
      showToast("Failed to update task. Please try again.", "error");
      setSaving(false);
      return;
    }
    onUpdated(uiUpdate);
    showToast("Task updated.", "success");
    setSaving(false);
  };

  // Field handlers
  const handleTitleBlur = () => {
    const trimmed = title.trim();
    if (!trimmed || trimmed.length < 3 || trimmed === task?.title) return;
    save({ title: trimmed }, () => setTitle(task?.title ?? ""), {
      title: trimmed,
    });
  };

  const handleDescriptionBlur = () => {
    const trimmed = description.trim();
    const prev = task?.description ?? "";
    if (trimmed === prev) return;
    save({ description: trimmed || null }, () => setDescription(prev), {
      description: trimmed || undefined,
    });
  };

  const handleAssigneeChange = (val: string) => {
    const prev = assigneeId;
    setAssigneeId(val);
    save({ assignee_id: val || null }, () => setAssigneeId(prev), {
      assignee_id: val || null,
    } as Partial<Task>);
  };

  const handleEpicChange = (val: string) => {
    const prev = epicId;
    setEpicId(val);
    save({ epic_id: val || null }, () => setEpicId(prev), {
      epic_id: val || null,
    } as Partial<Task>);
  };

  const handleDueDateChange = (val: string) => {
    const prev = dueDate;
    setDueDate(val);
    save(
      { due_date: val ? `${val}T23:59:00Z` : null },
      () => setDueDate(prev),
      { due_date: val ? `${val}T23:59:00Z` : null } as Partial<Task>,
    );
  };

  const handleStatusChange = (val: TaskStatus) => {
    const prev = status;
    setStatus(val);
    save({ status: val }, () => setStatus(prev), { status: val });
  };

  if (!task) return null;

  return (
    <div className={className}>
      {/* Overlay */}
      <div className="fixed inset-0 bg-[#041B3C33]/10 z-50" onClick={onClose} />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#E8EDFF] w-full max-w-[95%] md:max-w-[70%]
            max-h-[90vh] shadow-[0_48px_24px_0_#041B3C1A]
            grid grid-cols-[2fr_1fr] h-[90%] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Left — main content */}
          <div className="flex flex-col overflow-hidden">
            <div className="flex-1 overflow-y-auto bg-white">
              <TaskDetailsHeader
                taskId={task.task_id}
                title={title}
                epicId={epicId}
                epics={epics}
                saving={saving}
                onTitleChange={setTitle}
                onTitleBlur={handleTitleBlur}
                onEpicChange={handleEpicChange}
              />
              <TaskDetailsBody
                description={description}
                saving={saving}
                onChange={setDescription}
                onBlur={handleDescriptionBlur}
              />
            </div>
            <TaskDetailsFooter taskId={task.task_id} onClose={onClose} />
          </div>

          {/* Right — sidebar */}
          <div className="overflow-y-auto border-l border-[#C3C6D633]">
            <TaskDetailsSidebar
              task={task}
              status={status}
              assigneeId={assigneeId}
              dueDate={dueDate}
              members={members}
              saving={saving}
              onStatusChange={handleStatusChange}
              onAssigneeChange={handleAssigneeChange}
              onDueDateChange={handleDueDateChange}
            />
          </div>
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </div>
  );
}
