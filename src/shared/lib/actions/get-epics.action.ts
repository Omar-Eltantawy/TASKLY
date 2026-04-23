"use server";

import { cookies } from "next/headers";
import { GetEpicsResult } from "../types/epic";

export async function getEpicsAction(
  projectId: string,
): Promise<GetEpicsResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated.", status: 401 };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_epics?project_id=eq.${projectId}`,
      {
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
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

    const data = await response.json();
    return { success: true, data };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
