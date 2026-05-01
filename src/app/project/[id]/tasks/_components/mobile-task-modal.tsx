"use client";

import { Task, TaskStatus } from "@/shared/lib/types/task";
import { cn } from "@/shared/lib/utils/tailwind-merge";
import closeIcon from "../../../../../../public/icons/close.svg";
import epicIcon from "../../../../../../public/icons/epic.svg";
import Image from "next/image";
import { useState } from "react";
import {
  COLUMN_COLORS,
  STATUS_LABELS,
  TASK_STATUSES,
} from "@/shared/lib/constants/constants";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { formatDate } from "@/app/project/_components/project-card";
type TaskDetailsProps = {
  task: Task | null;
  loading: boolean;
  error: string | null;
  onClose: () => void;
  className?: string;
};

export default function MobileTaskModal({
  task,
  loading,
  error,
  className,
  onClose,
}: TaskDetailsProps) {
  const [selectedStatus, setSelectedStatus] = useState<TaskStatus>("TO_DO");

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0  bg-[#041B3C33]/80  z-40"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-50",
          "bg-surface-low rounded-t-2xl px-5 pt-2",
          "h-[85%] overflow-y-auto",
          className,
        )}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-10 h-1.5 bg-gray-300 rounded-full mx-auto my-3" />

        {/* Content */}
        <div className="px-4 pb-6">
          {loading && (
            <p className="text-center text-sm text-gray-500 py-10">
              Loading...
            </p>
          )}

          {error && (
            <p className="text-center text-sm text-red-500 py-10">{error}</p>
          )}

          {task && !loading && (
            <div className="flex flex-col gap-4">
              <div className="flex items-center justify-between ">
                <span className="text-slate-medium text-xs font-bold">
                  {task.task_id}
                </span>
                <Image
                  onClick={onClose}
                  src={closeIcon}
                  alt="close"
                  width={12}
                  height={12}
                />
              </div>
              {/* Title */}
              <h2 className="text-lg font-bold">{task.title}</h2>
              <div className="grid grid-cols-2 gap-3 mb-8">
                <select
                  value={selectedStatus}
                  onChange={(e) =>
                    setSelectedStatus(e.target.value as TaskStatus)
                  }
                  className={cn(
                    "px-2 py-1 rounded-xl border text-sm w-full flex",
                    COLUMN_COLORS[selectedStatus].bg,
                    COLUMN_COLORS[selectedStatus].text,
                  )}
                >
                  {TASK_STATUSES.map((status) => (
                    <option
                      value={status}
                      key={status}
                      className={cn(
                        "px-2 py-1 rounded-xl w-fit",
                        COLUMN_COLORS[status].bg,
                        COLUMN_COLORS[status].text,
                      )}
                    >
                      {STATUS_LABELS[status]}
                    </option>
                  ))}
                </select>
                <span className="px-2 py-1 rounded-xl flex items-center justify-center gap-0.5 text-[#374763] text-xs bg-surface-highest">
                  <Image src={epicIcon} alt="epic" width={12} height={12} />
                  {task.epic.epic_id}
                </span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="flex flex-col gap-2  bg-[#F1F3FF] p-2">
                  <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                    Assignee
                  </span>
                  {task?.assignee.name ? (
                    <div className="flex items-center  gap-1  py-2.5 rounded-md ">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[0.5rem] font-semibold bg-[#DAE2FF] text-slate-dark">
                        {getNameInitials(task.assignee.name)}
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-slate-dark text-[0.8rem] font-semibold">
                          {task.assignee.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[.625rem] text-slate-medium">
                      Unassigned
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-5 font-medium  bg-[#F1F3FF] p-2 text-xs">
                  <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                    Due Date
                  </span>
                  {formatDate(task ? task.due_date : "")}
                </div>
                <div className="flex flex-col gap-2  bg-[#F1F3FF] p-2">
                  <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                    Created by
                  </span>
                  {task?.created_by.name ? (
                    <div className="flex items-center  gap-1  py-2.5 rounded-md ">
                      <div className="w-5 h-5 rounded-full flex items-center justify-center text-[0.5rem] font-semibold bg-[#DAE2FF] text-slate-dark">
                        {getNameInitials(task.created_by.name)}
                      </div>
                      <div className="flex flex-col ">
                        <span className="text-slate-dark text-[0.8rem] font-semibold">
                          {task.created_by.name}
                        </span>
                      </div>
                    </div>
                  ) : (
                    <span className="text-[.625rem] text-slate-medium">
                      Unassigned
                    </span>
                  )}
                </div>
                <div className="flex flex-col gap-5 font-medium  bg-[#F1F3FF] p-2 text-xs">
                  <span className="text-[.625rem] text-slate-medium font-bold uppercase">
                    Createed At
                  </span>
                  {formatDate(task ? task.created_at : "")}
                </div>
              </div>

              {/* Description */}
              <div className="mt-8">
                <p className="text-sm font-bold text-[#737685] uppercase mb-3">
                  Description
                </p>
                <p className="text-sm text-[#434654] bg-white border border-[#C3C6D61A] p-5 ">
                  {task.description || "No description"}
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
