"use client"

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { InputField } from "@/components/InputField"
import { Title } from "@/components/Title"
import { bff } from "@/lib/bff"
import { useRouter } from "next/navigation"
import { FormEventHandler, useState } from "react"
import { Loader2 } from "lucide-react"
import { Loading } from "@/components/Loading"

interface LoginForm extends HTMLFormElement {
  user: HTMLInputElement
  password: HTMLInputElement
}

export function Login() {
  const router = useRouter()
  const [invalid, setInvalid] = useState(false)
  const [loading, setLoading] = useState(false)
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const form: LoginForm = e.currentTarget as LoginForm
    const { user, password } = form
    setLoading(true)
    bff
      .post("/auth/login", {
        username: user.value,
        password: password.value,
      })
      .then(() => {
        router.push("../")
      })
      .catch((error) => {
        if (error.status === 404) {
          setInvalid(true)
          user.focus()
        } else {
          alert("Ocorreu um erro ao submeter o formulário. Tente novamente.")
        }
        setLoading(false)
      })
  }
  return (
    <Container className="!w-[424px] h-full pt-24 space-y-8 text-center">
      <Title>Login</Title>
      <form
        className="space-y-8"
        onChange={() => invalid && setInvalid(false)}
        onSubmit={handleSubmit}>
        <InputField id="user" label="Usuário:" placeholder="Digite seu nome de usuário" />
        <InputField
          type="password"
          id="password"
          label="Senha:"
          placeholder="Digite sua senha"
        />
        {loading ? <Loading /> : <Button className="w-1/2">Enviar</Button>}
        {invalid && (
          <p className="text-error text-xs text-left">
            O nome de usuário ou a senha estão incorretos. Tente novamente.
          </p>
        )}
      </form>
    </Container>
  )
}
