import { refreshAction } from "@/shared/lib/actions/refresh.action";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const callbackURL = req.nextUrl.searchParams.get("callback") || "/project";

  const success = await refreshAction();

  if (success) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  return NextResponse.redirect(new URL(callbackURL, req.url));
}
