"use client"

import { bff } from "@/lib/bff"
import { useRouter } from "next/navigation"
import { Loading } from "./Loading"
import { useState } from "react"

export function Logout({ children }: { children: React.ReactNode }) {
  const [loading, setLoading] = useState(false)

  const router = useRouter()
  const handleClick = async () => {
    setLoading(true)
    await bff
      .post("/logout")
      .then(() => router.push("/login"))
      .catch(() => setLoading(false))
  }

  return (
    <>
      <span onClick={handleClick} className="hover:opacity-70 cursor-pointer">
        {children}
      </span>
      {loading && (
        <div className="absolute grid place-items-center bg-blend-darken top-0 left-0 bg-black/50 w-full h-full">
          <Loading size={45} />
        </div>
      )}
    </>
  )
}
