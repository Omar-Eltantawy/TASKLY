"use server";

import { TaskStatus } from "../types/task";
import { apiClient } from "../api/api-client";

type UpdateStatusResult = { success: true } | { success: false; error: string };

export async function updateTaskStatusAction(
  taskId: string,
  status: TaskStatus,
): Promise<UpdateStatusResult> {
  const result = await apiClient(`/rest/v1/tasks?id=eq.${taskId}`, {
    method: "PATCH",
    body: status,
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
