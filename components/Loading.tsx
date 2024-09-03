import { Loader2 } from "lucide-react"

export function Loading({ size }: { size?: number }) {
  return <Loader2 size={size ?? 32} className="text-primary animate-spin mx-auto" />
}
