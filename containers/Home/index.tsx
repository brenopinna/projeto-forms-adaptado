import { Header } from "@/components/Header"
import { Container } from "@/components/Container"
import { Form } from "./fragments/Form"
import { cookies } from "next/headers"
import jwt from "jsonwebtoken"
import { api } from "@/lib/api"
import { FormResponse } from "./types/form-response"
import { Logout } from "@/components/Lougout"
import { Output } from "./fragments/Output"
import { Title } from "@/components/Title"
import { FormOutputProvider } from "@/contexts/FormOutput"
import { getJwtAndEmpresaIdFromCookies } from "@/actions/get-cookies"

export default async function Home() {
  let response: FormResponse | null = null
  let ok = true
  const { token, empresaId } = await getJwtAndEmpresaIdFromCookies()
  try {
    if (empresaId) {
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
          <>
            <div className="space-y-4">
              <Title>{data.title}</Title>
              <p className="text-primary">{data.description}</p>
              <hr className="border-secondary/30" />
            </div>
            <div className="grid grid-cols-2 gap-12">
              <FormOutputProvider>
                <Form data={data} />
                <Output />
              </FormOutputProvider>
            </div>
          </>
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
