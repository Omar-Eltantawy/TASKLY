import { NextRequest, NextResponse } from "next/server";

export default function Proxy(req: NextRequest) {
  const accessToken = req.cookies.get("access_token")?.value;
  const refreshToken = req.cookies.get("refresh_token")?.value;

  const isAuthPage =
    req.nextUrl.pathname.startsWith("/login") ||
    req.nextUrl.pathname.startsWith("/signup");

  const isProtected =
    !isAuthPage && !req.nextUrl.pathname.startsWith("/api/auth/refresh");

  if (accessToken && isAuthPage) {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  if (!accessToken && refreshToken && isProtected) {
    const refreshURL = new URL("/api/auth/refresh", req.url);
    refreshURL.searchParams.set("callback", req.nextUrl.pathname);
    return NextResponse.redirect(refreshURL);
  }

  if (!accessToken && isProtected) {
    const loginUrl = new URL("/login", req.url);
    loginUrl.searchParams.set("callback", req.nextUrl.pathname);
    return NextResponse.redirect(loginUrl);
  }

  return NextResponse.next();
}

export const config = {
  matcher:
    "/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
};
