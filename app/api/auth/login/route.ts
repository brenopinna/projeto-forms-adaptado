import { api } from "@/lib/api"
import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"

interface ApiResponse {
  data: {
    message: string
    token: string
  }
}

export async function POST(req: NextRequest) {
  const bodySchema = z.object({
    username: z.string(),
    password: z.string(),
  })
  try {
    const body = bodySchema.parse(await req.json())
    const { data }: ApiResponse = await api.post("/auth/login", body)
    const { token } = data
    const res = NextResponse.json({ ok: true })
    res.cookies.set("auth-token", token, {
      httpOnly: true,
      path: "/",
      maxAge: 60 * 60 * 24 * 7, // 1 semana, em segundos
    })
    return res
  } catch (error) {
    return NextResponse.json(
      {
        message: error ?? "An unexpected error occurred.",
      },
      { status: 404 },
    )
  }
}
