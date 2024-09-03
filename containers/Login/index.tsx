"use client"

import { Button } from "@/components/Button"
import { Container } from "@/components/Container"
import { InputField } from "@/components/InputField"
import { Title } from "@/components/Title"
import { bff } from "@/lib/bff"
import { error } from "console"
import { useRouter } from "next/navigation"
import { FormEventHandler, useEffect, useState } from "react"

interface LoginForm extends HTMLFormElement {
  user: HTMLInputElement
  password: HTMLInputElement
}

export function Login() {
  const router = useRouter()
  const [valid, setValid] = useState(true)
  useEffect(() => {
    console.log(valid)
  }, [valid])
  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault()
    const form: LoginForm = e.currentTarget.parentNode as LoginForm
    const { user, password } = form
    setValid(true)
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
          setValid(false)
        } else {
          alert("Ocorreu um erro ao submeter o formulário. Tente novamente.")
        }
      })
  }
  return (
    <Container className="w-[424px] h-full pt-24 space-y-8 text-center">
      <Title>Login</Title>
      <form className="space-y-8" onSubmit={handleSubmit}>
        <InputField
          id="user"
          labelText="Usuário:"
          placeholder="Digite seu nome de usuário"
        />
        <InputField
          type="password"
          id="password"
          labelText="Senha:"
          placeholder="Digite sua senha"
        />
        <Button className="w-1/2">Enviar</Button>
      </form>
    </Container>
  )
}
