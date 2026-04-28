"use server";

import { cookies } from "next/headers";
import { GetEpicTasksResult } from "../types/task";

export async function getEpicTasksAction(
  epicId: string,
): Promise<GetEpicTasksResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_tasks?epic_id=eq.${epicId}`,
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
        error: data.message ?? data.msg ?? "Failed to load tasks.",
      };
    }

    const data = await response.json();

    return { success: true, tasks: data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
