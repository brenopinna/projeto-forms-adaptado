import { Header } from "@/components/Header"
import { Container } from "@/components/Container"
import { Form } from "./fragments/Form"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { api } from "@/lib/api"
import { FormResponse } from "./types/form-respose"
import { Title } from "@/components/Title"

interface Payload {
  empresaId: string
}

export default async function Home() {
  const token = cookies().get("auth-token")!.value
  const { empresaId } = jwt.decode(token) as Payload

  const { data }: FormResponse = await api.get(`/empresa/${empresaId}`, {
    headers: { Authorization: `Bearer ${token}` },
  })

  return (
    <>
      <Header />
      <Container className="py-6 space-y-4">
        <div className="space-y-4">
          <Title>{data.title}</Title>
          <p>{data.description}</p>
        </div>
        <Form data={data} />
      </Container>
    </>
  )
}
