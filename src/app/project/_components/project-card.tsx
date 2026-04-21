import { Project } from "@/shared/lib/types/project";

const formatDate = (date: string): string => {
  return new Date(date).toLocaleDateString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

export default function ProjectCard({ project }: { project: Project }) {
  return (
    <div className="rounded-lg p-4 bg-white shadow-xs w-76 h-55 flex flex-col justify-between">
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
