import { NextResponse } from "next/server";
import { apiClient } from "@/shared/lib/api/api-client";

export async function PATCH(req: Request) {
  const { taskId, status } = await req.json();

  const result = await apiClient(`/rest/v1/tasks?id=eq.${taskId}`, {
    method: "PATCH",
    body: { status },
    headers: { Prefer: "return=minimal" },
  });

  if (!result.success) {
    return NextResponse.json({ success: false }, { status: 500 });
  }

  return NextResponse.json({ success: true });
}
