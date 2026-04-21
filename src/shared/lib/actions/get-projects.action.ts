"use server";

import { cookies } from "next/headers";
import { GetProjectResponse, Project } from "../types/project";

const LIMIT = 5;

export async function getProjectsAction(
  page: number = 1,
): Promise<GetProjectResponse> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) {
      return { success: false, error: "Not authenticated.", status: 401 };
    }

    const offset = (page - 1) * LIMIT;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rest/v1/rpc/get_projects?limit=${LIMIT}&offset=${offset}`,
      {
        method: "GET",
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
          Prefer: "count=exact",
        },
        cache: "force-cache",
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

    const countRange = response.headers.get("content-range");
    const totalCount = countRange ? parseInt(countRange.split("/")[1], 10) : 0;

    const projects: Project[] = await response.json();

    return {
      success: true,
      projects,
      totalCount,
      totalPages: Math.ceil(totalCount / LIMIT),
      currentPage: page,
    };
  } catch {
    return { success: false, error: "server_error" };
  }
}
