"use client";

import Image from "next/image";
import FilterIcon from "../../../../../../public/icons/filter.svg";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import Button from "@/shared/ui/button";
import TasksSearch from "./tasks-search";

export default function TasksHeader({ projectId }: { projectId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") ?? "board";

  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", e.target.value);
    params.delete("page");
    router.replace(`/project/${projectId}/tasks?${params.toString()}`);
  };
  return (
    <div className="flex flex-col md:flex-row  items-stretch md:items-center justify-between gap-3 mb-6 shrink-0 flex-wrap">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-[2.3rem] font-semibold mr-auto">
          Active Workboard
        </h1>
        <p className="hidden md:block text-sm text-slate-medium">
          Curating Project Alpha&apos;s production pipeline and milestones.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <TasksSearch />
        <select
          value={currentView}
          onChange={handleViewChange}
          className="hidden md:block outline-none text-sm font-medium px-5 py-3 gap-1 rounded-sm
          bg-white shadow-[0_4px_24px_0_#041B3C0A] text-gray-700 cursor-pointer"
        >
          <option value="board"> Board View</option>
          <option value="list">List View</option>
        </select>
        <div className="hidden md:block bg-surface-highest p-3 shadow-2xl rounded-md cursor-pointer">
          <Image
            src={FilterIcon}
            alt="board-view-icon"
            height={14}
            width={14}
          />
        </div>
      </div>
      <Button className="block md:hidden w-full">+ Create New Task</Button>
    </div>
  );
}
