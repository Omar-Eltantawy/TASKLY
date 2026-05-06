"use server";

import { cookies } from "next/headers";

type RequestOptions = {
  method?: "GET" | "POST" | "PATCH" | "DELETE";
  body?: unknown;
  headers?: Record<string, string>;
};

export async function apiClient(
  endpoint: string,
  options: RequestOptions = {},
) {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("access_token")?.value;

  if (!accessToken) {
    return {
      success: false,
      error: "Not authenticated.",
      status: 401,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}${endpoint}`,
      {
        method: options.method ?? "GET",
        headers: {
          "Content-Type": "application/json",
          apikey: process.env.NEXT_PUBLIC_API_KEY!,
          Authorization: `Bearer ${accessToken}`,
          ...options.headers,
        },
        body: options.body ? JSON.stringify(options.body) : undefined,
        cache: "no-store",
      },
    );

    if (!response.ok) {
      const data = await response.json();
      return {
        success: false,
        error: data.message ?? data.msg ?? "Request failed.",
        status: response.status,
      };
    }

    const data = await response.json().catch(() => null);

    return {
      success: true,
      data,
      status: response.status,
      contentRange: response.headers.get("content-range"),
    };
  } catch {
    return {
      success: false,
      error: "Network error.",
    };
  }
}
