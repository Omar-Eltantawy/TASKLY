export type DayStats = {
  day: string;
  statuses: Partial<Record<string, number>>;
};

export type CalendarStats = {
  daily: DayStats[];
  totals: Partial<Record<string, number>>;
  total_tasks: number;
  done_tasks: number;
  overdue_tasks: number;
};

export type ProjectTaskCount = {
  project_id: string;
  project_name: string;
  tasks_count: number;
};

export type StatsFilters = {
  startDate: string;
  endDate: string;
  projectId: string | null;
  status: string | null;
};

export type CalenderStatsResult =
  | { success: true; data: CalendarStats }
  | { success: false; error: string };

export type TasksPerProjectResult =
  | { success: true; data: ProjectTaskCount[] }
  | { success: false; error: string };
