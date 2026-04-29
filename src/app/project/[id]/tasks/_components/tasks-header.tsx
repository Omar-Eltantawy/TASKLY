"use client";

import Input from "@/shared/ui/input";
import Image from "next/image";
import FilterIcon from "../../../../../../public/icons/filter.svg";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

export default function TasksHeader({ projectId }: { projectId: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentView = searchParams.get("view") ?? "board";
  const handleViewChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("view", e.target.value);

    router.replace(`/project/${projectId}/tasks?${params.toString()}`);
  };
  return (
    <div className="flex items-center justify-between gap-3 mb-6 shrink-0 flex-wrap">
      <div className="flex flex-col">
        <h1 className="text-2xl md:text-[2.3rem] font-semibold mr-auto">
          Active Workboard
        </h1>
        <p className="text-sm text-slate-medium">
          Curating Project Alpha&apos;s production pipeline and milestones.
        </p>
      </div>

      <div className="flex items-center gap-2">
        <Input
          type="search"
          parentClassName="mt-5"
          placeholder="Search tasks..."
        />
        <select
          value={currentView}
          onChange={handleViewChange}
          className="outline-none text-sm font-medium px-5 py-3 gap-1 rounded-sm
          bg-white shadow-[0_4px_24px_0_#041B3C0A] text-gray-700 cursor-pointer"
        >
          <option value="board"> Board View</option>
          <option value="list">List View</option>
        </select>
        <div className="bg-surface-highest p-3 shadow-2xl rounded-md cursor-pointer">
          <Image
            src={FilterIcon}
            alt="board-view-icon"
            height={14}
            width={14}
          />
        </div>
      </div>
    </div>
  );
}
