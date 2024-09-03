interface InputFieldProps {
  labelText: string
  placeholder: string
  id: string
  type?: string
  name?: string
  required?: boolean
  className?: string
}

export function InputField({
  labelText,
  placeholder,
  id,
  type,
  name,
  required,
  className,
}: InputFieldProps) {
  return (
    <div className="grid gap-2 text-primary">
      <label className="text-xl text-left" htmlFor={id}>
        {labelText}
      </label>
      <input
        className={`w-full placeholder:text-primary/50  border outline-none border-secondary rounded-md px-4 py-2 ${className}`}
        type={type ?? "text"}
        name={name ?? id}
        required={required ?? true}
        placeholder={placeholder}
        id={id}
      />
    </div>
  )
}
