"use client";
import { Task, TaskStatus } from "@/shared/lib/types/task";
import Image from "next/image";
import epicIdIcon from "../../../../../../public/icons/epic.svg";
import copyIcon from "../../../../../../public/icons/copy.svg";
import {
  COLUMN_COLORS,
  STATUS_LABELS,
  TASK_STATUSES,
} from "@/shared/lib/constants/constants";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import { useState } from "react";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { formatDate } from "@/app/project/_components/project-card";
import Button from "@/shared/ui/button";

type TaskDetailsProps = {
  task: Task | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  className: string;
};
export default function TaskDetailsModal({
  task,
  loading,
  error,
  className,
  onClose,
}: TaskDetailsProps) {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("TO_DO");

  return (
    <div className={className}>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-[#041B3C33]/10  z-50"
        onClick={onClose}
      />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div
          className="bg-[#E8EDFF] w-full max-w-[95%] md:max-w-[70%] max-h-[90vh] overflow-y-auto
            shadow-[0_48px_24px_0_#041B3C1A] grid grid-cols-[2fr_1fr] h-[90%]"
          onClick={(e) => e.stopPropagation()}
        >
          <div>
            <div className="bg-white h-[90%]">
              <div className="flex items-center gap-3 ps-10 pt-6">
                <span className="bg-surface-highest px-3 py-1 rounded-sm text-primary text-xs font-bold">
                  {task?.task_id}
                </span>
                <span className="flex items-center gap-2 text-[#434654] text-sm font-medium">
                  <Image
                    src={epicIdIcon}
                    alt="epiIdIcon"
                    width={12}
                    height={12}
                  />
                  {task?.epic.epic_id}
                </span>
              </div>
              <h2 className="text-3xl font-bold text-slate-dark ps-10 mt-3 pb-10 border-b border-b-surface-low">
                {task?.title}
              </h2>
              <p className="ps-10 pt-10 flex flex-col gap-2 ">
                <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                  {" "}
                  Description
                </span>
                <span className="text-slate-dark text-sm font-normal">
                  {task?.description}
                </span>
              </p>
            </div>
            <div className="flex items-center justify-between px-10 pt-1 ">
              <div className="flex items-center gap-1">
                <Image src={copyIcon} alt="epiIdIcon" width={12} height={12} />
                Copy link
              </div>
              <Button variant="secondary" onClick={onClose}>
                Close
              </Button>
            </div>
          </div>
          <div>
            <div className="pt-8 ps-8 pr-5 flex flex-col gap-2">
              <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                Status
              </span>
              <select
                value={selectedStatus}
                onChange={(e) =>
                  setSelectedStatus(e.target.value as TaskStatus)
                }
                className={cn(
                  "px-4 py-3 rounded-sm border text-sm w-full flex",
                  COLUMN_COLORS[selectedStatus].bg,
                  COLUMN_COLORS[selectedStatus].text,
                )}
              >
                {TASK_STATUSES.map((status) => (
                  <option
                    value={status}
                    key={status}
                    className={cn(
                      "py-5 mt-5",
                      COLUMN_COLORS[status].bg,
                      COLUMN_COLORS[status].text,
                    )}
                  >
                    {STATUS_LABELS[status]}
                  </option>
                ))}
              </select>
            </div>
            <div className="ps-8 pr-5 flex flex-col gap-2 mt-10">
              <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                Assignee
              </span>
              {task?.assignee.name ? (
                <div className="flex items-center gap-2.5 bg-white px-2 py-2.5 rounded-md ">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#DAE2FF] text-slate-dark">
                    {getNameInitials(task.assignee.name)}
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-slate-dark text-sm font-semibold">
                      {task.assignee.name}
                    </span>
                    <span className="text-[.625rem] text-slate-medium">
                      {task.assignee.department}
                    </span>
                  </div>
                </div>
              ) : (
                <span className="text-[.625rem] text-slate-medium">
                  Unassigned
                </span>
              )}
            </div>
            <div className="ps-8 pr-5 flex flex-col gap-2 mt-10 pb-10 border-b border-[#C3C6D633]">
              <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                Reporter
              </span>
              {task?.created_by && (
                <div className="flex items-center gap-2.5 px-2 py-2.5 rounded-md ">
                  <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold bg-[#DAE2FF] text-slate-dark">
                    {getNameInitials(task?.created_by.name)}
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-slate-dark text-sm font-semibold">
                      {task?.created_by.name}
                    </span>
                  </div>
                </div>
              )}
            </div>
            <div className="px-8 py-8">
              <div className="flex items-center justify-between">
                <span className="text-slate-medium text-xs ">Due Date</span>
                <span className="text-sm text-slate-dark">
                  {formatDate(task ? task.due_date : "")}
                </span>
              </div>
              <div className="flex items-center justify-between mt-4">
                <span className="text-slate-medium text-xs ">Created At</span>
                <span className="text-sm text-slate-dark">
                  {formatDate(task ? task.created_at : "")}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
