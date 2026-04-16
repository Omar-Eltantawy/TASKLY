"use server";

import { cookies } from "next/headers";
import { AddProjectPayload, AddProjectResponse } from "../types/project";

export async function addProjectAction(
  payload: AddProjectPayload,
): Promise<AddProjectResponse> {
  try {
    const cookiestore = await cookies();
    const accessToken = cookiestore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Unauthorized. Please log in." };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/projects`,
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
      return {
        success: false,
        error: "Failed to create project. Please try again.",
      };
    }

    return { success: true };
  } catch {
    return { success: false, error: "Network error. Please try again." };
  }
}
