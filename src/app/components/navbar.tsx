import { useState } from 'react'
import { Button } from './button'
import fullLogo from '../assets/logo-completa.svg'
import shortLogo from '../assets/logo-simplista.svg'
import { IoMenu } from 'react-icons/io5'
import { FaHome } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { BiWorld } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fade, setFade] = useState(false)

  const handleOpenMenu = () => {
    setIsMenuOpen(true)
    setTimeout(() => {
      setFade(true)
    }, 10)
  }

  const handleCloseMenu = () => {
    setFade(false)
    setTimeout(() => {
      setIsMenuOpen(false)
    }, 500)
  }

  return (
    <div className="fixed z-50 flex h-screen w-full flex-col font-league">
      <nav className="flex w-full select-none items-center justify-between bg-white px-8 py-2 md:px-10 md:py-3">
        <img
          src={window.innerWidth < 768 ? shortLogo : fullLogo}
          alt="Logo do Mauá Reservation"
          className="w-14 sm:w-20 md:w-28 lg:w-32"
        />
        <div className="hidden gap-24 text-xl font-medium text-blue-primary md:flex lg:text-2xl">
          <a href="#" className="cursor-pointer">
            INÍCIO
          </a>
          <a href="#" className="cursor-pointer">
            MENU DE RESERVAS
          </a>
          <a href="#" className="cursor-pointer">
            SOBRE NÓS
          </a>
        </div>
        <Button className="hidden text-xl md:flex lg:text-2xl">Login</Button>
        {isMenuOpen ? (
          <IoClose
            className={`flex cursor-pointer text-5xl text-yellow transition-all duration-500 md:hidden ${fade ? 'opacity-100' : 'rotate-180 opacity-0'}`}
            onClick={handleCloseMenu}
          />
        ) : (
          <IoMenu
            className={`flex cursor-pointer text-5xl text-yellow transition-all duration-500 md:hidden ${fade ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleOpenMenu}
          />
        )}
      </nav>
      {isMenuOpen && (
        <div
          className={`flex h-full w-full transform flex-col justify-between gap-16 bg-blue-primary pb-8 pt-16 duration-500 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-[450px] opacity-0'}`}
        >
          <div className="flex flex-col justify-center gap-16 px-12">
            <a
              href="#"
              className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-75 duration-1000 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
            >
              <FaHome /> Início
            </a>
            <a
              href="#"
              className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-200 duration-1000 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
            >
              <FaCalendarAlt /> Menu de reservas
            </a>
            <a
              href="#"
              className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-300 duration-1000 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
            >
              <BiWorld /> Sobre nós
            </a>
            <Button
              className={`flex items-center gap-4 px-3 py-4 text-2xl font-semibold delay-[400ms] duration-1000 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
            >
              <FaUserCircle />
              <p className="mt-[3px]">Perfil</p>
            </Button>
          </div>
          <p className="flex w-full justify-center text-xl text-white">
            Reservation Mauá - 2024
          </p>
        </div>
      )}
    </div>
  )
}
