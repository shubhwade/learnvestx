import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const token = request.cookies.get("refreshToken")?.value || 
                request.headers.get("authorization")?.replace("Bearer ", "");

  // Public routes that don't require auth
  const publicRoutes = ["/", "/login", "/signup", "/api/auth"];
  const isPublicRoute = publicRoutes.some(route => request.nextUrl.pathname.startsWith(route));

  // API routes - let them handle their own auth
  if (request.nextUrl.pathname.startsWith("/api/")) {
    return NextResponse.next();
  }

  // Dashboard routes require auth
  if (request.nextUrl.pathname.startsWith("/dashboard") && !token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"]
};
