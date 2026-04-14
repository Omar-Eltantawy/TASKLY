"use server";
import { cookies } from "next/headers";
import { ApiError } from "../types/api";
import {
  LoginAPIResponse,
  LoginPayload,
  LoginSuccessResponse,
} from "../types/auth";

export async function loginAction(
  payload: LoginPayload,
  rememberMe?: boolean,
): Promise<LoginAPIResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/token?grant_type=password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(payload),
      },
    );

    const data: LoginAPIResponse = await response.json();

    if (!response.ok) return data;

    const successData = data as LoginSuccessResponse;

    const cookieStore = await cookies();

    cookieStore.set("access_token", successData.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: successData.expires_in,
      path: "/",
    });

    cookieStore.set("refresh_token", successData.refresh_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: rememberMe ? 60 * 60 * 24 * 30 : successData.expires_in,
      path: "/",
    });

    return data;
  } catch (error) {
    const err = error as ApiError;
    return err;
  }
}
