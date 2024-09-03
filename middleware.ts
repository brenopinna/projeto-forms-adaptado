import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export function middleware(req: NextRequest) {
  const auth = cookies().get("auth-token")
  if (req.nextUrl.pathname.startsWith("/login")) {
    if (auth) return NextResponse.redirect(new URL("/", req.nextUrl.origin))
    else return NextResponse.next()
  }
  const loginUrl = new URL("/login", req.nextUrl.origin)
  if (!auth) return NextResponse.redirect(loginUrl)
  else return NextResponse.next()
}

export const config = {
  matcher: ["/login", "/"],
}
