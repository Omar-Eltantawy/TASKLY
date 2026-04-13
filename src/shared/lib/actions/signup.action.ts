"use server";

import { ApiError } from "../types/api";
import { SignupAPIResponse, SignupPayload } from "../types/auth";

export async function signupAction(
  payload: SignupPayload,
): Promise<SignupAPIResponse> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/v1/signup`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
        },
        body: JSON.stringify(payload),
      },
    );
    const data: SignupAPIResponse = await response.json();

    return data;
  } catch (error) {
    const err = error as ApiError;
    return err;
  }
}
