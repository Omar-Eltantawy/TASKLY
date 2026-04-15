"use server";

import { cookies } from "next/headers";
import { ApiError } from "../types/api";

export async function logoutAction(): Promise<boolean | ApiError> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;

    if (!accessToken) return true;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/logout`,
      {
        method: "POST",
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    // Clear cookies ALWAYS (even if API fails)
    cookieStore.delete("access_token");
    cookieStore.delete("refresh_token");

    if (!response.ok) {
      return { msg: "Logout API failed" } as ApiError;
    }

    return true;
  } catch {
    return { msg: "Logout failed" } as ApiError;
  }
}
