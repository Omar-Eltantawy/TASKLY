"use server";

import { ResetPasswordPayload } from "../types/auth";

export async function resetPasswordAction(
  payload: ResetPasswordPayload,
  accessToken: string,
): Promise<any> {
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

    const data = await response.json();

    if (!response.ok) {
      return { success: false, error: data.msg ?? "Failed to reset password." };
    }

    return data;
  } catch (error) {
    return error;
  }
}
