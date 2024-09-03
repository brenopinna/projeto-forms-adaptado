import { NextRequest, NextResponse } from "next/server"

export function POST() {
  const response = NextResponse.json({ message: "Logged Out." })
  response.cookies.delete("auth-token")
  return response
}
