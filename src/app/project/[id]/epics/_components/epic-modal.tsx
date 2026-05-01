"use client";

import { Epic, EpicUser } from "@/shared/lib/types/epic";
import { ProjectMember } from "@/shared/lib/types/project";
import { useState } from "react";
import { useAppDispatch } from "@/store/hooks";
import { updateEpicAction } from "@/shared/lib/actions/update-epic.action";
import { updateEpicDetails } from "@/store/features/epics/slice";
import { Toast } from "@/shared/ui/toast";
import EpicHeader from "./epic-header";
import EpicDescription from "./epic-description";
import EpicMeta from "./epic.meta";
import EpicTasks from "./epic-tasks";

type Props = {
  epic: Epic | null;
  members: ProjectMember[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
};

export default function EpicModal({
  epic,
  loading,
  error,
  onClose,
  members,
}: Props) {
  const dispatch = useAppDispatch();

  const [isEditingAssignee, setIsEditingAssignee] = useState(false);
  const [saving, setSaving] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const [title, setTitle] = useState(epic?.title ?? "");
  const [description, setDescription] = useState(epic?.description ?? "");
  const [assigneeId, setAssigneeId] = useState(epic?.assignee?.sub ?? "");
  const [deadline, setDeadline] = useState(epic?.deadline ?? "");

  const showToast = (message: string, type: "success" | "error") => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 3000);
  };

  const saveUpdatedField = async (
    field: string,
    value: string | null,
    revert: () => void,
  ) => {
    if (!epic) return;

    setSaving(true);

    const result = await updateEpicAction(epic.id, { [field]: value });

    if (!result.success) {
      revert();
      showToast("Failed to update epic. Please try again.", "error");
      setSaving(false);
      return;
    }

    dispatch(
      updateEpicDetails({
        epicId: epic.id,
        changes: { [field]: value },
      }),
    );

    showToast("Epic updated successfully.", "success");
    setSaving(false);
  };

  /* Handlers */
  const handleTitleBlur = () => {
    const trimmed = title.trim();

    if (!trimmed || trimmed.length < 3 || trimmed === epic?.title) return;

    saveUpdatedField("title", trimmed, () => setTitle(epic?.title ?? ""));
  };

  const handleDescriptionBlur = () => {
    const trimmed = description?.trim();

    if (trimmed === (epic?.description ?? "")) return;

    saveUpdatedField("description", trimmed || null, () =>
      setDescription(epic?.description ?? ""),
    );
  };

  const handleAssigneeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    setAssigneeId(value);

    const member = members.find((m) => m.user_id === value);

    const newAssignee: EpicUser | null = member
      ? {
          sub: member.user_id,
          name: member.metadata.name,
          email: member.email,
          department: member.metadata.department,
        }
      : null;

    saveUpdatedField("assignee_id", value || null, () =>
      setAssigneeId(epic?.assignee?.sub ?? ""),
    );

    if (epic) {
      dispatch(
        updateEpicDetails({
          epicId: epic.id,
          changes: { assignee: newAssignee },
        }),
      );
    }
  };

  const handleDeadlineChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setDeadline(value);

    saveUpdatedField("deadline", value || null, () =>
      setDeadline(epic?.deadline ?? ""),
    );
  };

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#041B3C33]/90 blur-2xl z-50"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-[95%] md:max-w-[60%] lg:max-w-[40%]
          max-h-[90vh] overflow-y-auto
          shadow-[0_48px_24px_0_#041B3C1A] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div className="w-6 h-6 border-2 border-primary border-t-transparent rounded-full animate-spin" />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 px-6">
              <p className="text-error text-sm text-center">{error}</p>
              <button onClick={onClose}>Close</button>
            </div>
          )}

          {/* Content */}
          {epic && !loading && (
            <>
              {/* Header */}
              <EpicHeader
                epicId={epic.epic_id}
                title={title}
                setTitle={setTitle}
                onBlur={handleTitleBlur}
                saving={saving}
                onClose={onClose}
              />

              {/* Body */}
              <div className="p-6 flex flex-col gap-6">
                {/* Description */}
                <EpicDescription
                  description={description}
                  setDescription={setDescription}
                  onBlur={handleDescriptionBlur}
                  saving={saving}
                />

                {/* Meta */}
                <EpicMeta
                  epic={epic}
                  members={members}
                  isEditingAssignee={isEditingAssignee}
                  setIsEditingAssignee={setIsEditingAssignee}
                  assigneeId={assigneeId}
                  handleAssigneeChange={handleAssigneeChange}
                  deadline={deadline}
                  handleDeadlineChange={handleDeadlineChange}
                  saving={saving}
                />

                {/* Tasks */}
                <EpicTasks epic={epic} />
              </div>
            </>
          )}
        </div>
      </div>

      {/* Toast */}
      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
