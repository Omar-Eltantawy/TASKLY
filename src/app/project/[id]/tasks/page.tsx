import TasksHeader from "./_components/tasks-header";
import TasksBoard from "./_components/tasks-board";
import TasksList from "./_components/tasks-list";
import MobileTasks from "./_components/mobile-tasks";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string; page?: string }>;
}) {
  const { id } = await params;
  const { view = "board", page = "1" } = await searchParams;
  const currentPage = parseInt(page, 10);

  return (
    <div className="h-full flex flex-col overflow-hidden pb-20 lg:pb-5">
      <TasksHeader projectId={id} />
      <div className="block flex-1 min-h-0  md:hidden">
        <MobileTasks projectId={id} />
      </div>
      <div className="hidden md:block flex-1 min-h-0 ">
        {view === "board" ? (
          <TasksBoard projectId={id} />
        ) : (
          <TasksList projectId={id} currentPage={currentPage} />
        )}
      </div>
    </div>
  );
}
