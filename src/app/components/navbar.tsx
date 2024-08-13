import { Button } from './buttont'

export function Navbar() {
  return (
    <nav className="flex select-none items-center justify-between px-6 py-5 font-league">
      <h1 className="">LOGO</h1>
      <div className="flex gap-24 text-2xl font-medium text-blue-primary">
        <p className="cursor-pointer">INÍCIO</p>
        <p className="cursor-pointer">MENU DE RESERVAS</p>
        <p className="cursor-pointer">SOBRE NÓS</p>
      </div>
      <Button>LOGIN</Button>
    </nav>
  )
}
