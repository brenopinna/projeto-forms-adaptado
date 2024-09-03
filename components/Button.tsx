import { ButtonHTMLAttributes, FormEventHandler, MouseEventHandler } from "react"

interface ButtonProps {
  children: string
  className?: string
  onClick?: MouseEventHandler<HTMLButtonElement>
}

export function Button({ children, className, onClick }: ButtonProps) {
  return (
    <button
      onClick={onClick}
      className={`${className} hover:opacity-80 active:opacity-100 active:bg-secondary text-white px-4 py-2 bg-primary border border-secondary text-xl rounded-md min-w-fit`}>
      {children}
    </button>
  )
}
