"use server";

import { apiClient } from "../api/api-client";

type AcceptResult = { success: true } | { success: false; error: string };

export async function acceptInvitationAction(
  token: string,
): Promise<AcceptResult> {
  const result = await apiClient("/rest/v1/rpc/accept_invitation", {
    method: "POST",
    body: { p_token: token },
  });

  if (!result.success) {
    const status = result.status;
    if (status === 401)
      return {
        success: false,
        error: "Please log in to accept this invitation.",
      };
    if (status === 403)
      return {
        success: false,
        error: "This invitation is not for your account.",
      };
    return {
      success: false,
      error: result.error ?? "Invalid or expired invitation link.",
    };
  }

  return { success: true };
}
