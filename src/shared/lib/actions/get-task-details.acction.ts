"use server";

import { cookies } from "next/headers";
import { GetTaskDetailResult, Task } from "../types/task";

export async function getTaskDetailAction(
  projectId: string,
  taskId: string,
): Promise<GetTaskDetailResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_tasks?project_id=eq.${projectId}&id=eq.${taskId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message ?? data.msg ?? "Failed to load task details.",
      };
    }

    const data: Task[] = await response.json();

    if (!data[0]) {
      return { success: false, error: "Task not found." };
    }

    return { success: true, task: data[0] };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
