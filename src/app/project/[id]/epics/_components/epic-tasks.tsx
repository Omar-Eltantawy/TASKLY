"use client";

import Image from "next/image";
import Button from "@/shared/ui/button";
import AddIcon from "../../../../../../public/icons/add-tasks.svg";
import ListIcon from "../../../../../../public/icons/list.svg";

export default function EpicTasks() {
  return (
    <div>
      <div className="flex items-center justify-between">
        <p className="text-lg font-bold text-slate-dark mb-3 mt-5">Tasks</p>

        <p className="text-sm font-semibold text-primary-container mb-3 mt-5 flex items-center gap-1 cursor-pointer">
          <Image src={AddIcon} height={13} width={13} alt="add-tasks-icon" />
          Add Tasks
        </p>
      </div>

      <div
        className="bg-surface-low border border-dashed border-gray-200 rounded-sm
        py-10 flex flex-col items-center justify-center gap-4"
      >
        <div className="bg-[#D7E2FF] p-4 rounded-md">
          <Image src={ListIcon} height={16} width={16} alt="calender-icon" />
        </div>

        <p className="text-1rem text-slate-dark font-bold text-center">
          No tasks have been added to this epic yet.
        </p>

        <Button className="text-sm">+ Add Task</Button>
      </div>
    </div>
  );
}
