"use client";

import { Project } from "@/shared/lib/types/project";
import { setActiveProject } from "@/store/features/active-project/slice";
import { useAppDispatch } from "@/store/hooks";
import { useRouter } from "next/navigation";

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProjectCard({ project }: { project: Project }) {
  const dispatch = useAppDispatch();
  const router = useRouter();

  const handleClick = () => {
    dispatch(
      setActiveProject({
        projectId: project.id,
        projectName: project.name,
        projectDescription: project.description,
      }),

      router.push(`project/${project.id}/epics`),
    );
  };

  return (
    <div
      onClick={handleClick}
      className="rounded-lg p-4 bg-white shadow-xs w-76 h-55 flex flex-col justify-between cursor-pointer hover:scale-105 hover:shadow-2xl transition-all"
    >
      <h3 className="font-semibold text-lg text-slate-dark max-w-full">
        {project.name}
      </h3>

      <p className="text-sm text-[#434654]  max-w-full">
        {project.description}
      </p>

      <p className="text-sm font-medium text-[#434654] flex items-center justify-between ">
        <span className="text-[#737685] text-[11px] font-bold">CREATED AT</span>
        {formatDate(project.created_at)}
      </p>
    </div>
  );
}
