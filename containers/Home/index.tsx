import { Header } from "@/components/Header"
import { Container } from "@/components/Container"
import { Form } from "./fragments/Form"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { api } from "@/lib/api"
import { FormResponse } from "./types/form-respose"
import { Title } from "@/components/Title"
import { Logout } from "@/components/Lougout"

interface Payload {
  empresaId: string
}

export default async function Home() {
  const token = cookies().get("auth-token")!.value
  const decodedToken = jwt.decode(token) as Payload | null
  let response: FormResponse | null = null
  if (decodedToken) {
    const { empresaId } = decodedToken
    response = await api.get(`/empresa/${empresaId}`, {
      headers: { Authorization: `Bearer ${token}` },
    })
  }

  const data = response?.data

  return (
    <>
      <Header />
      <Container className="py-6 space-y-4">
        {data ? (
          <>
            <div className="space-y-4">
              <Title>{data.title}</Title>
              <p>{data.description}</p>
            </div>
            <Form data={data} />
          </>
        ) : (
          <span>
            Houve um erro na autenticação do usuário. <Logout>Clique aqui</Logout> para
            voltar à tela de login e tente novamente.
          </span>
        )}
      </Container>
    </>
  )
}
