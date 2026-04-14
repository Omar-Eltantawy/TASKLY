import { ForgotPasswordPayload } from "../types/auth";

export async function forgotPasswordAction(payload: ForgotPasswordPayload) {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/recover`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(payload),
      },
    );

    const data = await response.json();

    return data;
  } catch (error) {
    return error;
  }
}
