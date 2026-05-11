import { ProjectTaskCount } from "@/shared/lib/types/stats";

export default function ProjectsBreakdown({
  projects,
}: {
  projects: ProjectTaskCount[];
}) {
  if (projects.length === 0) {
    return (
      <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A] p-6">
        <p className="text-[.625rem] uppercase font-bold text-[#737685] mb-4">
          Tasks Per Project
        </p>
        <p className="text-slate-medium text-sm text-center py-4">
          No project data available.
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white shadow-[0_4px_24px_0_#041B3C0A] p-6">
      <p className="text-2xl capitalize font-bold text-slate-dark mb-10">
        All Projects
      </p>

      <div className="flex flex-col gap-3">
        {projects.map((project) => (
          <div
            key={project.project_id}
            className="flex items-center justify-between"
          >
            <span className="text-lg  text-slate-medium font-bold truncate max-w-[60%]">
              {project.project_name}
            </span>
            <span className="text-xs font-bold text-slate-dark">
              {project.tasks_count} Tasks
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
