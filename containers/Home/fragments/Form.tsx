import { InputField } from "@/components/InputField"
import { Button } from "@/components/Button"
import { FormResponse } from "../types/form-respose"

export async function Form({ data }: FormResponse) {
  const inputs = data.fields
  return (
    <form className="space-y-8">
      {inputs.map((input) => {
        return <InputField key={input.id} {...input} />
      })}
      <Button>{data.submitText}</Button>
    </form>
  )
}
