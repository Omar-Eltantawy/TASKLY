"use server";

import { cookies } from "next/headers";
import { LoginSuccessResponse } from "../types/auth";

export async function refreshAction(): Promise<boolean> {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get("refresh_token")?.value;

    if (!refreshToken) return false;

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/token?grant_type=refresh_token`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify({ refresh_token: refreshToken }),
      },
    );

    if (!response.ok) return false;

    const data: LoginSuccessResponse = await response.json();

    cookieStore.set("access_token", data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: data.expires_in,
      path: "/",
    });

    cookieStore.set("refresh_token", data.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });

    return true;
  } catch {
    return false;
  }
}
