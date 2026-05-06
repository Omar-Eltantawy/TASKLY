"use server";

import { GetTasksResult } from "../types/task";
import { apiClient } from "../api/api-client";

const LIMIT = 8;

export async function getTasksAction(
  projectId: string,
  status?: string,
  page: number = 1,
  searchTerm: string = "",
): Promise<GetTasksResult> {
  try {
    const offset = (page - 1) * LIMIT;

    let query = `project_id=eq.${projectId}&limit=${LIMIT}&offset=${offset}`;

    if (status) {
      query += `&status=eq.${status}`;
    }

    if (searchTerm.trim()) {
      query += `&title=ilike.%25${encodeURIComponent(searchTerm.trim())}%25`;
    }

    const result = await apiClient(`/rest/v1/project_tasks?${query}`, {
      method: "GET",
      headers: { Prefer: "count=exact" },
    });

    if (!result.success) {
      return { success: false as const, error: result.error };
    }
    const rawTotal = result.contentRange?.split("/")[1];
    const totalCount =
      rawTotal && rawTotal !== "*" ? parseInt(rawTotal, 10) : 0;

    return {
      success: true as const,
      tasks: result.data ?? [],
      totalCount,
      totalPages: Math.ceil(totalCount / LIMIT) || 1,
      limit: LIMIT,
    };
  } catch {
    return { success: false, error: "Network error." };
  }
}
