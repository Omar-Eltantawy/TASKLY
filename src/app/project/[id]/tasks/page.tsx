import TasksHeader from "./_components/tasks-header";
import TasksBoard from "./_components/tasks-board";

export default async function page({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ view?: string }>;
}) {
  const { id } = await params;
  const { view } = await searchParams;

  return (
    <div className="h-full flex flex-col overflow-hidden pb-20 lg:pb-5">
      <TasksHeader projectId={id} />
      <div className="flex-1 min-h-0 ">
        {view === "board" ? <TasksBoard projectId={id} /> : null}
      </div>
    </div>
  );
}
