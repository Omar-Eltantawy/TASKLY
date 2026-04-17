"use server";

import { ApiError } from "../types/api";
import {
  LoginAPIResponse,
  LoginSuccessResponse,
  ResetPasswordPayload,
} from "../types/auth";

export async function resetPasswordAction(
  payload: ResetPasswordPayload,
  accessToken: string,
): Promise<LoginAPIResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/user`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
        },
        body: JSON.stringify(payload),
      },
    );

    const data: LoginSuccessResponse = await response.json();

    console.log(data);

    if (!response.ok) {
      return data;
    }

    return data;
  } catch (error) {
    const err = error as ApiError;
    return err;
  }
}
