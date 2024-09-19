"use client"

import { OutputType } from "@/types/output-type"
import { createContext, SetStateAction, useContext, useState } from "react"

type ContextValueType = [OutputType, React.Dispatch<SetStateAction<OutputType>>]

const FormOutputContext = createContext<ContextValueType | null>(null)

export const FormOutputProvider = ({ children }: { children: React.ReactNode }) => {
  const [output, setOutput] = useState<OutputType>({})

  return (
    <FormOutputContext.Provider value={[output, setOutput]}>
      {children}
    </FormOutputContext.Provider>
  )
}

export const useFormOutput = () => {
  const context = useContext(FormOutputContext)
  if (!context) throw new Error("This hook must be used within an FormOutputProvider.")
  return context
}
