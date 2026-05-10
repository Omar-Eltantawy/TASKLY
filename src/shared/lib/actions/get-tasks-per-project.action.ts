"use server";

import { apiClient } from "../api/api-client";
import { ProjectTaskCount, TasksPerProjectResult } from "../types/stats";

export async function getTasksPerProjectAction(
  startDate: string,
  endDate: string,
): Promise<TasksPerProjectResult> {
  const result = await apiClient("/rest/v1/rpc/get_tasks_count_per_project", {
    method: "POST",
    body: { p_start_date: startDate, p_end_date: endDate },
  });

  if (!result.success) {
    return {
      success: false,
      error: result.error ?? "Failed to load project stats.",
    };
  }

  return { success: true, data: result.data as ProjectTaskCount[] };
}
