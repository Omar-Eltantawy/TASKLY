"use server";

import { cookies } from "next/headers";
import { AddTaskPayload, AddTaskResult } from "../types/task";

export async function addNewTaskAction(
  payload: AddTaskPayload,
): Promise<AddTaskResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/tasks`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message ?? data.msg ?? "Failed to create task.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
