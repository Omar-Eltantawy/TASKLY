"use server";

import { apiClient } from "../api/api-client";
import {
  CalendarStats,
  CalenderStatsResult,
  StatsFilters,
} from "../types/stats";

export async function getCalendarStatsAction(
  filters: StatsFilters,
): Promise<CalenderStatsResult> {
  const result = await apiClient("/rest/v1/rpc/get_tasks_calendar_stats", {
    method: "POST",
    body: {
      p_start_date: filters.startDate,
      p_end_date: filters.endDate,
      p_project_id: filters.projectId ?? null,
      p_status: filters.status ?? null,
    },
  });

  if (!result.success) {
    return { success: false, error: result.error ?? "Failed to load stats." };
  }

  return { success: true, data: result.data as CalendarStats };
}
