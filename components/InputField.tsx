interface InputFieldProps {
  label: string
  placeholder: string
  id: string
  type?: string
  name?: string
  required?: boolean
  className?: string
}

export function InputField({
  label,
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
        {label}
      </label>
      <input
        className={`w-full focus:ring-1 ring-secondary placeholder:text-primary/50  border outline-none border-secondary rounded-md px-4 py-2 ${className}`}
        type={type ?? "text"}
        name={name ?? id}
        required={required ?? true}
        placeholder={placeholder}
        id={id}
      />
    </div>
  )
}
