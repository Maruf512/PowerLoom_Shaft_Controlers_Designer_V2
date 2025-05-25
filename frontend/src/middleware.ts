import { NextRequest, NextResponse } from "next/server";

const authPath = ["/auth/login", "/auth/register"];

export async function middleware(req: NextRequest) {
  const refreshToken = req.cookies.get("refresh_token");

  const pathname = req.nextUrl.pathname;

  if (authPath.includes(pathname) && refreshToken) {
    return NextResponse.redirect(new URL("/", req.url));
  }

  if (!refreshToken && !authPath.includes(pathname)) {
    return NextResponse.redirect(new URL("/auth/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|api).*)"],
};
