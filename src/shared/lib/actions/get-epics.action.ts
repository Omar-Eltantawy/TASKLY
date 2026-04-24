"use server";

import { cookies } from "next/headers";
import { Epic, GetEpicsResult } from "../types/epic";

const LIMIT = 6;

export async function getEpicsAction(
  projectId: string,
  page: number = 1,
): Promise<GetEpicsResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated.", status: 401 };
    }

    const offset = (page - 1) * LIMIT;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_epics?project_id=eq.${projectId}&limit=${LIMIT}&offset=${offset}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          Prefer: "count=exact",
        },
        cache: "no-store",
      },
    );

    if (response.status === 401) {
      return { success: false, error: "Unauthorized.", status: 401 };
    }

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message ?? data.msg ?? "Failed to fetch epics.",
      };
    }

    const countRange = response.headers.get("content-range");
    const totalCount = countRange ? parseInt(countRange.split("/")[1], 10) : 0;
    const epics: Epic[] = await response.json();

    return {
      success: true,
      epics,
      totalCount,
      totalPages: Math.ceil(totalCount / LIMIT),
      currentPage: page,
    };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
