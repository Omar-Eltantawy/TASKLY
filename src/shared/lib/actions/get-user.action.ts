"use server";

import { cookies } from "next/headers";
import { ApiError } from "../types/api";
import { UserProfileResponse } from "../types/user";

export async function getUserAction(): Promise<UserProfileResponse | ApiError> {
  try {
    const cookieStore = await cookies();
    const accessToken = cookieStore.get("access_token")?.value;
    if (!accessToken) {
      return { msg: "No access token found" } as ApiError;
    }

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/user`,
      {
        headers: {
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    );

    if (!response.ok) {
      return {
        msg: `Failed to fetch user data: ${response.statusText}`,
      } as ApiError;
    }
    const data: UserProfileResponse = await response.json();

    return data;
  } catch (error) {
    return error as ApiError;
  }
}
