"use server";

import { apiClient } from "../api/api-client";
import { UpdateTaskPayload, UpdateTaskResult } from "../types/task";

export async function updateTaskAction(
  taskId: string,
  payload: UpdateTaskPayload,
): Promise<UpdateTaskResult> {
  const result = await apiClient(`/rest/v1/tasks?id=eq.${taskId}`, {
    method: "PATCH",
    body: payload,
    headers: { Prefer: "return=minimal" },
  });

  if (!result.success) {
    return { success: false, error: result.error ?? "Failed to update task." };
  }

  return { success: true };
}
