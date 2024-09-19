"use client"

import { InputField } from "@/components/InputField"
import { Button } from "@/components/Button"
import { FormResponseData } from "../types/form-response-data"
import { useFormOutput } from "@/contexts/FormOutput"
import { FormEvent, useEffect, useState } from "react"
import { api } from "@/lib/api"
import { getJwtAndEmpresaIdFromCookies } from "@/actions/get-cookies"
import { OutputType } from "@/types/output-type"
import { Loading } from "@/components/Loading"

export function Form({
  data,
  className,
}: {
  data: FormResponseData
  className?: string
}) {
  const inputs = data.fields
  const [_, setOutput] = useFormOutput()
  const [empresaId, setEmpresaId] = useState<string>()
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    getJwtAndEmpresaIdFromCookies().then(({ token, empresaId }) =>
      setEmpresaId(empresaId),
    )
  }, [])

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    setLoading(true)
    setOutput({})
    e.preventDefault()
    try {
      const formData = new FormData(e.currentTarget)
      const reqBody = Object.fromEntries(formData.entries())
      api
        .post(`/submit/${empresaId}`, { ...reqBody })
        .then((response) => {
          setOutput(response.data as OutputType)
          setLoading(false)
        })
        .catch((err) => {
          setOutput({
            Erro: err.response.data.message,
          })
          setLoading(false)
        })
    } catch (error) {
      return (
        <span>
          Houve um erro ao processar o formulário. Tente recarregar a página e, caso o
          erro persista, contate o suporte técnico.
        </span>
      )
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className={`space-y-8 ${className}`}>
        {inputs.map((input) => {
          return <InputField key={`${input.name}${input.id}`} {...input} />
        })}
        {loading ? <Loading /> : <Button>{data.submitText}</Button>}
      </form>
    </>
  )
}
