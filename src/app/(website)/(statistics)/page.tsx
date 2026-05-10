import { Suspense } from "react";
import { getCurrentWeekRange } from "@/shared/lib/utils/date";
import { getTasksPerProjectAction } from "@/shared/lib/actions/get-tasks-per-project.action";
import { getProjectsAction } from "@/shared/lib/actions/get-projects.action";
import { getCalendarStatsAction } from "@/shared/lib/actions/get-calender-stats.action";
// import StatsFilters from "./_components/stats-filters";
// import KpiCards from "./_components/kpi-cards";
// import WeeklyCalendar from "./_components/weekly-calendar";
// import StatusDoughnut from "./_components/status-doughnut";
// import ProjectsBreakdown from "./_components/projects-breakdown";

export default async function MyStatisticsPage({
  searchParams,
}: {
  searchParams: Promise<{
    startDate?: string;
    endDate?: string;
    projectId?: string;
    status?: string;
  }>;
}) {
  const params = await searchParams;
  const { startDate: defaultStart, endDate: defaultEnd } =
    getCurrentWeekRange();

  const startDate = params.startDate ?? defaultStart;
  const endDate = params.endDate ?? defaultEnd;
  const projectId = params.projectId ?? null;
  const status = params.status ?? null;

  const [calendarResult, projectsStatsResult, allProjectsResult] =
    await Promise.all([
      getCalendarStatsAction({ startDate, endDate, projectId, status }),
      getTasksPerProjectAction(startDate, endDate),
      getProjectsAction(1),
    ]);

  const stats = calendarResult.success ? calendarResult.data : null;
  const projectsStats = projectsStatsResult.success
    ? projectsStatsResult.data
    : [];
  const allProjects = allProjectsResult.success
    ? allProjectsResult.projects
    : [];

  return (
    <div className="h-full flex flex-col overflow-hidden">
      {/* Header */}
      <div className="mb-6 shrink-0">
        <h1 className="text-[2.3rem] font-semibold">Weekly Planner</h1>
        <p className="text-slate-medium text-sm">
          Manage your deadlines and track team velocity.{" "}
        </p>
      </div>

      {/* Filters */}
      <Suspense>
        {/* <StatsFilters
          projects={allProjects}
          defaultStartDate={startDate}
          defaultEndDate={endDate}
          defaultProjectId={projectId}
          defaultStatus={status}
        /> */}
      </Suspense>

      {/* Content */}
      <div className="flex-1 overflow-y-auto min-h-0 flex flex-col gap-6 pb-6">
        {!stats ? (
          <p className="text-error text-sm text-center py-10">
            Failed to load statistics. Please try again.
          </p>
        ) : (
          <>
            {/* KPI Cards */}
            {/* <KpiCards
              totalTasks={stats.total_tasks}
              doneTasks={stats.done_tasks}
              overdueTasks={stats.overdue_tasks}
            /> */}

            {/* Calendar + Doughnut */}
            <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-6">
              {/* <WeeklyCalendar daily={stats.daily} />
              <StatusDoughnut totals={stats.totals} /> */}
            </div>

            {/* Projects breakdown */}
            {/* <ProjectsBreakdown projects={projectsStats} /> */}
          </>
        )}
      </div>
    </div>
  );
}
