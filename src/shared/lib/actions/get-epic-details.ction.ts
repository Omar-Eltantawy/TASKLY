"use server";

import { cookies } from "next/headers";
import { Epic } from "../types/epic";

export async function getEpicDetailAction(
  projectId: string,
  epicId: string,
): Promise<{ success: true; data: Epic } | { success: false; error: string }> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/project_epics?project_id=eq.${projectId}&id=eq.${epicId}`,
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
        error: data.message ?? data.msg ?? "Failed to fetch epic.",
      };
    }

    const data: Epic[] = await response.json();

    if (!data[0]) {
      return { success: false, error: "Epic not found." };
    }

    return { success: true, data: data[0] };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
