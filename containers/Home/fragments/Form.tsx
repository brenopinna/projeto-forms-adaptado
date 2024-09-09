"use client"

import { InputField } from "@/components/InputField"
import { Button } from "@/components/Button"
import { FormResponseData } from "../types/form-response-data"
import { useFormOutput } from "@/contexts/FormOutput"
import { FormEvent } from "react"

export function Form({
  data,
  className,
}: {
  data: FormResponseData
  className?: string
}) {
  const inputs = data.fields
  const [_, setOutput] = useFormOutput()

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    let operation: Function
    try {
      operation = eval(data.operation) //! TODO: SUBSTITUIR ISSO PRA ONTEM!!!!
      setOutput(operation())
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
        <Button>{data.submitText}</Button>
      </form>
    </>
  )
}
