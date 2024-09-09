"use client"

import { useFormOutput } from "@/contexts/FormOutput"

export function Output() {
  const [output, _] = useFormOutput()

  //TODO: Se sobrar tempo, ajeitar a exibicao dessa resposta

  return (
    <div className="text-primary space-y-8">
      <span className="text-xl">Resultado: </span>
      <output>
        {Object.entries(output).map((result) => (
          <>
            <p key={result[0].concat(result[1].toString())}>
              {result[0]}: {result[1]}
            </p>
          </>
        ))}
      </output>
    </div>
  )
}
