"use client"

import { InputField } from "@/components/InputField"
import { Button } from "@/components/Button"
import { FormResponse } from "../types/form-respose"

export function Form({ data }: FormResponse) {
  const inputs = data.fields
  const handleSubmit = eval(data.operation)
  // TODO: contextAPI para ver o valor retornado pelo form.
  // TODO: melhorar o desoign e incluir uma div de output.
  // * Atualmente ele so da um log do resultado.
  return (
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
  )
}
