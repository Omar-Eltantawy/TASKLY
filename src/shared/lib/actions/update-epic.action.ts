"use server";

import { cookies } from "next/headers";
import { UpdateEpicPayload, UpdateEpicResult } from "../types/epic";

export async function updateEpicAction(
  epicId: string,
  payload: UpdateEpicPayload,
): Promise<UpdateEpicResult> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/epics?id=eq.${epicId}`,
      {
        method: "PATCH",
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
        error: data.message ?? data.msg ?? "Failed to update epic.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
