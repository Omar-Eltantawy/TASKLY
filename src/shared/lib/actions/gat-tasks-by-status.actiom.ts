"use server";

import { cookies } from "next/headers";
import { GetTasksResult } from "../types/task";

const LIMIT = 8;

export async function getTasksAction(
  projectId: string,
  status?: string,
  page: number = 1,
): Promise<GetTasksResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const offset = (page - 1) * LIMIT;

    let url = `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_tasks?project_id=eq.${projectId}`;

    if (status) {
      url += `&status=eq.${status}`;
    }

    const response = await fetch(url + `&limit=${LIMIT}&offset=${offset}`, {
      headers: {
        "Content-Type": "application/json",
        apikey: process.env.NEXT_PUBLIC_API_KEY!,
        Authorization: `Bearer ${accessToken}`,
        Prefer: "count=exact",
      },
      cache: "no-store",
    });

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message ?? data.msg ?? "Failed to fetch tasks.",
      };
    }
    const contentRange = response.headers.get("content-range");
    const rawTotal = contentRange?.split("/")[1];
    const totalCount =
      rawTotal && rawTotal !== "*" ? parseInt(rawTotal, 10) : 0;

    const data = await response.json();
    return {
      success: true,
      tasks: data,
      totalCount,
      totalPages: Math.ceil(totalCount / LIMIT),
    };
  } catch {
    return { success: false, error: "Network error." };
  }
}
