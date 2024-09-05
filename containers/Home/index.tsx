import { Header } from "@/components/Header"
import { Container } from "@/components/Container"
import { Form } from "./fragments/Form"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { api } from "@/lib/api"
import { FormResponse } from "./types/form-respose"
import { Logout } from "@/components/Lougout"

interface Payload {
  empresaId: string
}

export default async function Home() {
  const token = cookies().get("auth-token")!.value
  const decodedToken = jwt.decode(token) as Payload | null
  let response: FormResponse | null = null
  let ok = true
  try {
    if (decodedToken) {
      const { empresaId } = decodedToken
      response = await api.get(`/empresa/${empresaId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
    }
    if (!response) throw new Error("The response was nullish.")
  } catch (error) {
    ok = false
  }

  const data = response?.data

  return (
    <>
      <Header />
      <Container className="space-y-4">
        {ok && data ? (
          <Form data={data} />
        ) : (
          <span>
            Houve um erro na autenticação do usuário.{" "}
            <span className="underline text-secondary">
              <Logout>Clique aqui</Logout>
            </span>{" "}
            para voltar à tela de login e tente novamente.
          </span>
        )}
      </Container>
    </>
  )
}
