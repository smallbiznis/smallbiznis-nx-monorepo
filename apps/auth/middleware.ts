import { NextRequest, NextResponse } from "next/server";
import { ACCESS_TOKEN_COOKIE } from "./lib/auth/token-constants";

const PUBLIC_PATH_PREFIXES = [
  "/",
  "/login",
  "/register",
  "/otp",
  "/oauth",
  "/api",
  "/_next",
  "/favicon",
  "/sitemap",
  "/robots",
  "/.well-known",
];

// ===========================
// MAIN MIDDLEWARE
// ===========================
export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  // Public paths do not require authentication
  if (isPublicPath(pathname)) {
    return withTenantHeader(req, NextResponse.next());
  }

  // Resolve tenant first (always)
  const tenant = resolveTenant(req);
  if (!tenant) {
    return NextResponse.json({ error: "invalid_tenant" }, { status: 400 });
  }

  // Validate session for protected routes
  // const accessToken = req.cookies.get(ACCESS_TOKEN_COOKIE)?.value;
  // if (!accessToken) {
  //   return redirectToLogin(req);
  // }

  return withTenantHeader(req, NextResponse.next());
}

// ===========================
// TENANT RESOLUTION
// ===========================
function resolveTenant(req: NextRequest): string | null {
  const host = req.headers.get("host") || "";
  if (host.endsWith(process.env.ROOT_HOST || "smallbiznisapp.io")) {
    const sub = host.split(".")[0];
    if (sub && sub !== "www") return sub;
  }

  const path = req.nextUrl.pathname.split("/").filter(Boolean);
  if (path[0] === "t" && path.length >= 2) {
    return path[1]; // /t/<tenant>/*
  }

  // 3. fallback (dev local)
  return process.env.DEFAULT_TENANT || null;
}

// ===========================
// Add X-Tenant-ID on all requests
// ===========================
function withTenantHeader(req: NextRequest, res: NextResponse) {
  const tenant = resolveTenant(req);
  if (tenant) {
    res.headers.set("X-Tenant-ID", tenant);
  }
  return res;
}

// ===========================
// PUBLIC PATH CHECK
// ===========================
function isPublicPath(pathname: string) {
  const normalized = pathname.toLowerCase();
  return PUBLIC_PATH_PREFIXES.some((prefix) => {
    if (prefix === "/") {
      return normalized === "/" || normalized.startsWith("/api/internal");
    }
    return normalized === prefix || normalized.startsWith(`${prefix}/`);
  });
}

// ===========================
// REDIRECT TO LOGIN
// ===========================
function redirectToLogin(req: NextRequest) {
  const url = req.nextUrl.clone();
  url.pathname = "/login";
  url.searchParams.set("redirect", req.nextUrl.pathname + req.nextUrl.search);
  return NextResponse.redirect(url);
}

// ===========================
// CONFIG
// ===========================
export const config = {
  matcher: [
    "/((?!api/internal|_next/static|_next/image|favicon.ico).*)",
  ],
};
