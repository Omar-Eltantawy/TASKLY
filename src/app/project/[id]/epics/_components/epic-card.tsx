"use client";

import { useState } from "react";
import { Epic } from "@/shared/lib/types/epic";
import actionIcon from "../../../../../../public/icons/action.svg";
import creatorIcon from "../../../../../../public/icons/creator.svg";
import calenderIcon from "../../../../../../public/icons/calender.svg";
import Image from "next/image";
import { getNameInitials } from "@/shared/lib/utils/getNameInitial";
import { formatDate } from "@/app/project/_components/project-card";
import { cn } from "@/shared/lib/utils/tailwind-merge";

export default function EpicCard({ epic }: { epic: Epic }) {
  const [isDone, setIsDone] = useState(false);

  return (
    <div
      onClick={() => setIsDone((prev) => !prev)}
      className={cn(
        "shadow-xl rounded-md cursor-pointer transition-all duration-200 p-4 sm:p-5",
        isDone ? "bg-[#E0E8FF]" : "bg-white border-l-4 border-[#004E32]",
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-3 sm:mb-4">
        <span
          className={cn(
            "text-[9px] sm:text-[10px] font-bold py-1 px-3 sm:px-4 rounded-sm",
            isDone ? "bg-white text-primary" : "bg-[#82F9BE] text-[#005235]",
          )}
        >
          {epic.epic_id}
        </span>

        <Image src={actionIcon} alt="action Icon" width={3} height={3} />
      </div>

      {/* Title */}
      <p className="text-base sm:text-lg md:text-xl font-semibold text-slate-dark mb-2 sm:mb-3 line-clamp-2">
        {epic.title}
      </p>

      {/* Assignee + Status */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-surface-highest py-4 sm:py-5">
        {epic.assignee?.name && (
          <div className="flex items-center gap-2">
            <span
              className={cn(
                "rounded-xl font-bold flex items-center justify-center",
                "w-9 h-9 sm:w-10 sm:h-10 text-xs sm:text-sm",
                isDone
                  ? "bg-[#003D9B] text-[#FDFDFD]"
                  : "bg-[#65DCA4] text-[#002113]",
              )}
            >
              {getNameInitials(epic.assignee.name)}
            </span>

            <span className="flex flex-col">
              <span className="text-[10px] sm:text-xs text-slate-medium">
                Assignee
              </span>
              <span className="text-xs sm:text-sm font-semibold text-slate-dark truncate max-w-[120px] sm:max-w-none">
                {epic.assignee.name}
              </span>
            </span>
          </div>
        )}

        {/* Status */}
        <span
          className={cn(
            "text-[10px] sm:text-xs py-1 px-3 sm:px-4 rounded w-fit",
            isDone
              ? "bg-[#003D9B1A] text-primary font-semibold"
              : "bg-surface-low text-[#004E32]",
          )}
        >
          {isDone ? "Done" : "TO DO"}
        </span>
      </div>

      {/* Footer */}
      <div className="py-3 sm:py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
        {/* Created By */}
        <div className="flex items-center gap-2 flex-wrap">
          <Image src={creatorIcon} alt="creator Icon" width={12} height={12} />
          <span className="text-[10px] sm:text-xs text-slate-medium">
            created by :
          </span>
          <span className="text-[10px] sm:text-xs font-medium text-slate-dark truncate max-w-[120px]">
            {epic.created_by.name}
          </span>
        </div>

        {/* Date */}
        <div className="flex items-center gap-1">
          <Image
            src={calenderIcon}
            alt="calendar Icon"
            width={10}
            height={10}
          />
          <p className="text-[10px] sm:text-[11px] text-[#434654CC]">
            {formatDate(epic.created_at)}
          </p>
        </div>
      </div>
    </div>
  );
}
