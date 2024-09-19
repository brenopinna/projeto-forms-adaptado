"use server"

import { cookies } from "next/headers"
import jwt from "jsonwebtoken"

interface Payload {
  empresaId: string
}

export async function getJwtAndEmpresaIdFromCookies() {
  const token = cookies().get("auth-token")!.value
  const decodedToken = jwt.decode(token) as Payload | null
  let empresaId: string | undefined
  try {
    if (decodedToken) {
      empresaId = decodedToken.empresaId
    }
    if (!empresaId || !decodedToken)
      throw new Error(
        "The cookies are either invalid or malformed. Logout and try again.",
      )
  } catch (error) {
    console.log(error)
  }
  return { token, empresaId }
}
