import { NextRequest, NextResponse } from "next/server";

export default function Proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const pathname = req.nextUrl.pathname;
  const search = req.nextUrl.search;

  const isAuthPage =
    pathname.startsWith("/login") ||
    pathname.startsWith("/signup") ||
    pathname.startsWith("/forgot-password") ||
    pathname.startsWith("/reset-password");

  const isInvitePage = pathname.startsWith("/invite");

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/project", req.url));
  }

  if (!accessToken && isInvitePage) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callback", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  if (!accessToken && refreshToken && !isAuthPage) {
    const refreshURL = new URL("/api/auth/refresh", req.url);
    refreshURL.searchParams.set("callback", pathname + search);
    return NextResponse.redirect(refreshURL);
  }

  if (!accessToken && !isAuthPage) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callback", pathname + search);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
