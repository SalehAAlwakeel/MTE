import { NextResponse, type NextRequest } from "next/server";
import { locales } from "@/lib/i18n";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (pathname.startsWith("/_next") || pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  const matched = locales.find((locale) => pathname === `/${locale}` || pathname.startsWith(`/${locale}/`));
  const headers = new Headers(request.headers);

  if (matched) {
    headers.set("x-locale", matched);
    return NextResponse.next({ request: { headers } });
  }

  headers.set("x-locale", "en");
  const url = request.nextUrl.clone();
  url.pathname = `/en${pathname === "/" ? "" : pathname}`;
  return NextResponse.rewrite(url, { request: { headers } });
}

export const config = {
  matcher: ["/((?!_next|api|.*\\..*).*)"],
};
