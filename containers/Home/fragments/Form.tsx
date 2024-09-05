"use client"

import { InputField } from "@/components/InputField"
import { Button } from "@/components/Button"
import { FormResponse } from "../types/form-respose"
import { Title } from "@/components/Title"

export function Form({ data }: FormResponse) {
  const inputs = data.fields

  let handleSubmit: Function
  try {
    handleSubmit = eval(data.operation)
  } catch (error) {
    return (
      <span>
        Houve um erro ao processar o formulário. Tente recarregar a página e, caso o erro
        persista, contate o suporte técnico.
      </span>
    )
  }
  // TODO: contextAPI para ver o valor retornado pelo form.
  // TODO: melhorar o desoign e incluir uma div de output.
  // * Atualmente ele so da um log do resultado.
  return (
    <>
      <div className="space-y-4">
        <Title>{data.title}</Title>
        <p>{data.description}</p>
      </div>
      <form
        onSubmit={(e) => {
          e.preventDefault(), console.log(handleSubmit())
        }}
        className="space-y-8">
        {inputs.map((input) => {
          return <InputField key={`${input.name}${input.id}`} {...input} />
        })}
        <Button>{data.submitText}</Button>
      </form>
    </>
  )
}
