"use server";

import { cookies } from "next/headers";
import { UpdateEpicPayload, UpdateEpicResult } from "../types/epic";
import { apiClient } from "../api/api-client";

export async function updateEpicAction(
  epicId: string,
  payload: UpdateEpicPayload,
): Promise<UpdateEpicResult> {
  const result = await apiClient(`/rest/v1/epics?id=eq.${epicId}`, {
    method: "PATCH",
    body: payload,
  });

  if (!result.success) {
    return { success: false, error: result.error };
  }

  return { success: true };
}
