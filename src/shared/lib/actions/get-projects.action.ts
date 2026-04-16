"use server";

import { cookies } from "next/headers";
import { GetProjectResponse } from "../types/project";

export async function getProjectsAction(): Promise<GetProjectResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated.", status: 401 };
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/rpc/get_projects`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
        cache: "no-store",
      },
    );

    if (response.status === 401) {
      return { success: false, error: "Unauthorized.", status: 401 };
    }

    if (!response.ok) {
      return {
        success: false,
        error: "Failed to Get Projects. Please try again.",
      };
    }

    const data = await response.json();

    return { success: true, projects: data };
  } catch {
    return { success: false, error: "server_error" };
  }
}
