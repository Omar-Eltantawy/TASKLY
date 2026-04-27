"use client";

import { cn } from "@/shared/lib/utils/tailwind-merge";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { Epic } from "@/shared/lib/types/epic";
import { ProjectMember } from "@/shared/lib/types/project";

type Props = {
  epic: Epic;
  members: ProjectMember[];
  isEditingAssignee: boolean;
  setIsEditingAssignee: (v: boolean) => void;
  assigneeId: string;
  handleAssigneeChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
  deadline: string;
  handleDeadlineChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  saving: boolean;
};

const today = new Date().toISOString().split("T")[0];

export default function EpicMeta({
  epic,
  members,
  isEditingAssignee,
  setIsEditingAssignee,
  assigneeId,
  handleAssigneeChange,
  deadline,
  handleDeadlineChange,
  saving,
}: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-14">
      {/* Created By */}
      <div>
        <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
          Created By
        </p>

        <div className="flex items-center gap-2">
          <span
            className={cn(
              "rounded-xl font-bold flex items-center justify-center",
              "w-6 h-6 sm:w-8 sm:h-8 text-[.625rem] sm:text-sm",
              "bg-primary-container text-[#FDFDFD]",
            )}
          >
            {getNameInitials(epic.created_by.name)}
          </span>

          <p className="text-[.625rem] sm:text-sm font-medium text-gray-900">
            {epic.created_by.name}
          </p>
        </div>
      </div>

      {/* Assignee */}
      <div>
        <p className="text-[.625rem] uppercase font-bold text-[#041B3C66] mb-2">
          Assignee
        </p>

        {isEditingAssignee ? (
          //   <select
          //     value={assigneeId}
          //     onChange={(e) => {
          //       handleAssigneeChange(e);
          //       setIsEditingAssignee(false);
          //     }}
          //     onBlur={() => setIsEditingAssignee(false)}
          //     disabled={saving}
          //     className="w-full text-sm text-gray-700 outline-none
          //       border border-transparent rounded-sm px-2 py-1.5
          //       hover:bg-gray-50 focus:border-primary focus:bg-white
          //       bg-transparent transition-colors cursor-pointer
          //       disabled:opacity-60"
          //   >
          //     <option value="">Unassigned</option>
          //     {members.map((member) => (
          //       <option key={member.user_id} value={member.user_id}>
          //         {member.metadata.name}
          //       </option>
          //     ))}
          //   </select>
          <select
            value={assigneeId}
            onChange={(e) => {
              handleAssigneeChange(e);
              setIsEditingAssignee(false);
            }}
            onBlur={() => setIsEditingAssignee(false)}
            disabled={saving}
            className="w-full
    text-xs sm:text-sm md:text-base
    text-gray-700
    outline-none
    border border-transparent rounded-sm
    px-2 py-2 sm:py-1.5
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
        ) : epic?.assignee?.name ? (
          <div
            className="flex items-center gap-2 cursor-pointer"
            onClick={() => setIsEditingAssignee(true)}
          >
            <span
              className={cn(
                "rounded-xl font-bold flex items-center justify-center",
                "w-6 h-6 sm:w-8 sm:h-8 text-[.625rem] sm:text-sm",
                "bg-[#CDDDFF] text-[#51617E]",
              )}
            >
              {getNameInitials(epic.assignee.name)}
            </span>

            <p className="text-[.625rem] sm:text-sm font-medium text-gray-900">
              {epic.assignee.name}
            </p>
          </div>
        ) : (
          <p
            className="text-sm text-slate-medium font-bold cursor-pointer"
            onClick={() => setIsEditingAssignee(true)}
          >
            Unassigned
          </p>
        )}
      </div>

      {/* Deadline */}
      <div>
        <p className="text-[.625rem] uppercase font-bold text-[#737685] mb-2">
          Deadline
        </p>

        <input
          type="date"
          value={deadline}
          onChange={handleDeadlineChange}
          disabled={saving}
          min={today}
          className="w-full text-xs sm:text-sm text-gray-700 outline-none
            border border-transparent rounded-sm px-2 py-1.5
            hover:bg-gray-50 focus:border-primary focus:bg-white
            bg-transparent transition-colors cursor-pointer
            disabled:opacity-60"
        />
      </div>
    </div>
  );
}
