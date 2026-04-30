"use client";
import { Epic, EpicUser } from "@/shared/lib/types/epic";
import Button from "@/shared/ui/button";
import EpicIdIcon from "../../../../../../public/icons/epic-id.svg";
import Image from "next/image";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import EpicTasks from "./epic-tasks";
import { useState } from "react";
import { updateEpicAction } from "@/shared/lib/actions/update-epic.action";
import { useAppDispatch } from "@/store/hooks";
import { updateEpicDetails } from "@/store/features/epics/slice";
import { Toast } from "@/shared/ui/toast";
import { ProjectMember } from "@/shared/lib/types/project";

type Props = {
  epic: Epic | null;
  members: ProjectMember[];
  loading: boolean;
  error: string | null;
  onClose: () => void;
};

const today = new Date().toISOString().split("T")[0];
console.log(today);

export default function EpicModal({
  epic,
  loading,
  error,
  onClose,
  members,
}: Props) {
  const dispatch = useAppDispatch();
  console.log(members);

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
      updateEpicDetails({ epicId: epic.id, changes: { [field]: value } }),
    );
    showToast("Epic updated successfully.", "success");
    setSaving(false);
  };

  const handleTitleBlur = () => {
    const trimmedTitle = title.trim();
    if (
      !trimmedTitle ||
      trimmedTitle.length < 3 ||
      trimmedTitle === epic?.title
    )
      return;

    saveUpdatedField("title", trimmedTitle, () => setTitle(epic?.title ?? ""));
  };

  const handleDescriptionBlur = () => {
    const trimmedDescription = description?.trim();
    if (trimmedDescription === (epic?.description ?? "")) return;

    saveUpdatedField("description", trimmedDescription || null, () =>
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
      <div
        className="fixed inset-0 bg-[#041B3C33]/90 blur-2xl z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-white w-full max-w-[95%] md:max-w-[60%] lg:max-w-[40%] max-h-[90vh] overflow-y-auto
            shadow-[0_48px_24px_0_#041B3C1A] flex flex-col"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Loading */}
          {loading && (
            <div className="flex items-center justify-center py-20">
              <div
                className="w-6 h-6 border-2 border-primary border-t-transparent
                rounded-full animate-spin"
              />
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 px-6">
              <p className="text-error text-sm text-center">{error}</p>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </div>
          )}

          {/* Content */}
          {epic && !loading && (
            <>
              {/* Header */}
              <div className="flex items-start justify-between p-6 border-b border-[#F1F3FF]">
                <div className="flex-1 min-w-0 pr-4">
                  <span className="text-xs font-bold text-slate-500 px-2 py-1 rounded-sm flex items-center gap-1">
                    <Image
                      src={EpicIdIcon}
                      height={14}
                      width={14}
                      alt="epic-id-icon"
                    />
                    {epic.epic_id}
                  </span>
                  <input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onBlur={handleTitleBlur}
                    disabled={saving}
                    className="mt-2 w-full text-xl font-semibold text-gray-900
                      outline-none border-b-2 border-transparent
                      focus:border-primary bg-transparent transition-colors
                      disabled:opacity-60"
                  />
                </div>

                {/* Close button */}
                <Button
                  variant="secondary"
                  onClick={onClose}
                  className="p-1.5 rounded-md hover:bg-gray-100 transition-all shrink-0"
                >
                  x
                </Button>
              </div>

              {/* Body */}
              <div className="p-6 flex flex-col gap-6">
                {/* Description */}
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  onBlur={handleDescriptionBlur}
                  disabled={saving}
                  rows={3}
                  placeholder="No description provided."
                  className="w-full text-sm text-gray-700 leading-relaxed
                      outline-none border border-transparent rounded-sm px-2 py-1.5
                      focus:border-primary bg-transparent hover:bg-gray-50
                      focus:bg-white transition-colors resize-none
                      placeholder:text-slate-medium disabled:opacity-60"
                />

                <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-14  ">
                  {/* Created By */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
                      Created By
                    </p>
                    <div className="flex items-center gap-2">
                      <span
                        className={cn(
                          "rounded-xl font-bold flex items-center justify-center",
                          "w-7 h-7 sm:w-8 sm:h-8 text-xs sm:text-sm",
                          "bg-primary-container text-[#FDFDFD]",
                        )}
                      >
                        {getNameInitials(epic.created_by.name)}
                      </span>
                      <p className="text-xs md:text-sm  font-medium text-gray-900">
                        {epic.created_by.name}
                      </p>
                    </div>
                  </div>

                  {/* Assignee */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
                      Assignee
                    </p>
                    <select
                      value={assigneeId}
                      onChange={handleAssigneeChange}
                      disabled={saving}
                      className="w-full text-sm text-gray-700 outline-none
                        border border-transparent rounded-sm px-2 py-1.5
                        hover:bg-gray-50 focus:border-primary focus:bg-white
                        bg-transparent transition-colors cursor-pointer
                        disabled:opacity-60"
                    >
                      <option value="">Unassigned</option>
                      {members.map((member) => (
                        <option key={member.user_id} value={member.user_id}>
                          {member.metadata.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Deadline */}
                  <div>
                    <p className="text-[.625rem] uppercase font-bold text-[#737685] mb-2">
                      Deadline
                    </p>
                    <input
                      type="date"
                      value={deadline}
                      min={today}
                      onChange={handleDeadlineChange}
                      disabled={saving}
                      className="w-full text-sm text-gray-700 outline-none
                        border border-transparent rounded-sm px-2 py-1.5
                        hover:bg-gray-50 focus:border-primary focus:bg-white
                        bg-transparent transition-colors cursor-pointer
                        disabled:opacity-60"
                    />
                  </div>
                </div>

                <EpicTasks epic={epic} />
              </div>
            </>
          )}
        </div>
      </div>

      {toast && <Toast message={toast.message} type={toast.type} />}
    </>
  );
}
