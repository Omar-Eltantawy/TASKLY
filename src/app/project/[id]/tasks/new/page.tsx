import ProjectError from "@/app/project/_components/project-error";
import { getEpicsAction } from "@/shared/lib/actions/get-epics.action";
import { getProjectMembersAction } from "@/shared/lib/actions/get-project-members.action";
import AddTaskForm from "./_components/add-task-form";
import { TaskStatus } from "@/shared/lib/types/task";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ epicId?: string; status?: TaskStatus }>;
}) {
  const projectId = (await params).id;
  const { epicId, status } = await searchParams;

  const [epicsResult, membersResult] = await Promise.all([
    getEpicsAction(projectId),
    getProjectMembersAction(projectId),
  ]);

  if (!epicsResult.success || !membersResult.success) {
    return <ProjectError />;
  }

  const epics = epicsResult.success ? epicsResult.epics : [];
  const members = membersResult.success ? membersResult.data : [];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      <div className="flex items-center justify-center sm:justify-between mb-5 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Create New Task</h1>
      </div>

      <div className="flex-1 overflow-y-auto min-h-0 pb-20 lg:py-2">
        <AddTaskForm
          projectId={projectId}
          epics={epics}
          members={members}
          defaultEpicId={epicId}
          defaultStatus={status}
        />
      </div>
    </div>
  );
}
