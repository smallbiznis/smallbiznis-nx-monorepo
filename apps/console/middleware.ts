import { NextResponse, type NextRequest } from "next/server"

interface SetupStatusResponse {
  setup_required: boolean
}

function isIgnoredPath(pathname: string) {
  return (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname.startsWith("/favicon.ico") ||
    pathname.startsWith("/public")
  )
}

async function fetchSetupStatus(origin: string): Promise<boolean | null> {
  try {
    const response = await fetch(`${origin}/internal/setup-status`, { cache: "no-store" })
    if (!response.ok) {
      return null
    }
    const payload = (await response.json()) as SetupStatusResponse
    return Boolean(payload.setup_required)
  } catch {
    return null
  }
}

export async function middleware(request: NextRequest) {
  const { pathname, origin } = request.nextUrl

  if (isIgnoredPath(pathname)) {
    return NextResponse.next()
  }

  const setupRequired = await fetchSetupStatus(origin)

  if (setupRequired === null) {
    return NextResponse.next()
  }

  if (setupRequired && !pathname.startsWith("/setup")) {
    return NextResponse.redirect(new URL("/setup", request.url))
  }

  if (!setupRequired && pathname.startsWith("/setup")) {
    return NextResponse.redirect(new URL("/login", request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/((?!api|_next|favicon\\.ico|public).*)"],
}
