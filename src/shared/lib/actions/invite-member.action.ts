"use server";

import { apiClient } from "../api/api-client";

export async function inviteMemberAction(
  email: string,
  projectId: string,
): Promise<InviteResult> {
  const result = await apiClient("/rest/v1/rpc/invite_member", {
    method: "POST",
    body: {
      p_email: email,
      p_project_id: projectId,
      p_app_url: process.env.NEXT_PUBLIC_APP_URL!,
      p_base_url: process.env.NEXT_PUBLIC_API_URL!,
    },
  });

  if (!result.success) {
    const status = result.status;
    if (status === 401)
      return { success: false, error: "Unauthorized. Please log in again." };
    if (status === 403)
      return {
        success: false,
        error: "You don't have permission to invite members.",
      };
    return {
      success: false,
      error: result.error ?? "Failed to send invitation.",
    };
  }

  return { success: true };
}
