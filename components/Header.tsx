import { Logout } from "./Lougout"

export function Header() {
  return (
    <header className="bg-secondary text-white px-12 py-6 w-full flex justify-between items-center">
      <p className="text-3xl font-bold">Uma logo muito braba!</p>
      <Logout>Sair</Logout>
    </header>
  )
}
