import { useState } from 'react'
import { Button } from './button'
import imt from '../assets/imt-icon (2).svg'
import shortLogo from '../assets/logo-simplista.svg'
import { IoMenu } from 'react-icons/io5'
import { FaHome } from 'react-icons/fa'
import { FaCalendarAlt } from 'react-icons/fa'
import { BiLoaderAlt, BiWorld } from 'react-icons/bi'
import { FaUserCircle } from 'react-icons/fa'
import { IoClose } from 'react-icons/io5'
import { useIsAuthenticated, useMsal } from '@azure/msal-react'
import { CiLogout } from 'react-icons/ci'
import { useNavigate } from 'react-router-dom'
import { TbAlertSquareFilled } from 'react-icons/tb'
import { IoIosPaper } from 'react-icons/io'
import { useUser, useUserQuery } from '../hooks/use-user'

export function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [fade, setFade] = useState(false)
  const navigate = useNavigate()

  useUserQuery()
  const { instance } = useMsal()
  const auth = useIsAuthenticated()
  const { user } = useUser()
  const isLoading = false

  const handleLogout = () => {
    localStorage.removeItem('user_id')
    localStorage.removeItem('accessToken')
    instance.logoutRedirect({ postLogoutRedirectUri: '/' }).catch((error) => {
      console.error('Logout error:', error)
    })
  }
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
    <div
      style={{
        height: isMenuOpen ? '100vh' : 'auto'
      }}
      className="fixed z-[90] flex w-full flex-col font-league"
    >
      <nav className="flex w-full select-none items-center justify-between bg-white px-6 py-2 md:px-8 md:py-3 lg:px-8">
        {user?.role === 'ADMIN' ? (
          <>
            <a
              href="/admin-home"
              className="cursor-pointer"
              onClick={(e) => {
                if (window.location.pathname === '/admin-home') {
                  e.preventDefault() // Evita o redirecionamento se já está na página inicial
                  window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo
                }
              }}
            >
              <img
                src={shortLogo}
                alt="Logo do Mauá"
                className="w-14 sm:w-20 md:hidden"
              />
              <div className="hidden items-center gap-2 md:flex">
                <img
                  src={imt}
                  alt="Logo da Mauá"
                  className="mt-1 h-10 w-auto object-contain sm:h-12 md:h-14"
                />
                <div className="mt-1 h-11 border-l border-gray-800" />
                <img
                  src={shortLogo}
                  alt="Logo do Reservation"
                  className="h-10 w-auto object-contain sm:h-12 md:h-14"
                />
              </div>
            </a>

            <div className="hidden gap-16 text-xl font-medium text-blue-primary md:flex lg:text-2xl">
              <a
                href="/admin-home"
                className="cursor-pointer scroll-smooth"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/admin-home')
                }}
              >
                HOME
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/admin-reserve')
                }}
              >
                RELATÓRIO/RESERVAS
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/rules-warnings')
                }}
              >
                AVISOS
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/terms-of-use')
                }}
              >
                TERMO DE USO
              </a>
            </div>
          </>
        ) : (
          <>
            <a
              href="/"
              className="cursor-pointer"
              onClick={(e) => {
                if (window.location.pathname === '/') {
                  e.preventDefault() // Evita o redirecionamento se já está na página inicial
                  window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo
                }
              }}
            >
              <img
                src={shortLogo}
                alt="Logo do Mauá"
                className="w-14 sm:w-20 md:hidden"
              />
              <div className="hidden items-center gap-1 md:flex">
                <img
                  src={imt}
                  alt="Logo da Mauá"
                  className="mt-1 h-10 w-auto object-contain sm:h-12 md:h-14"
                />
                <div className="mt-1 h-11 border-l-2 border-yellow" />
                <img
                  src={shortLogo}
                  alt="Logo do Reservation"
                  className="h-10 w-auto object-contain sm:h-12 md:h-14"
                />
              </div>
            </a>

            <div className="hidden gap-16 text-xl font-medium text-blue-primary md:flex lg:text-2xl">
              <a
                href="/"
                className="cursor-pointer scroll-smooth"
                onClick={(e) => {
                  if (window.location.pathname === '/') {
                    e.preventDefault() // Evita o redirecionamento se já está na página inicial
                    window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo
                  }
                }}
              >
                INÍCIO
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  const destinationUrl = '/#reservation'
                  if (window.location.pathname === '/') {
                    const targetElement = document.querySelector(
                      '#reservation'
                    ) as HTMLElement | null
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }
                  } else {
                    window.location.href = destinationUrl
                  }
                }}
              >
                CEAF - ESPORTES
              </a>

              <a
                href="/#dev"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  const destinationUrl = '/#dev'
                  if (window.location.pathname === '/') {
                    const targetElement = document.querySelector(
                      '#dev'
                    ) as HTMLElement | null
                    if (targetElement) {
                      targetElement.scrollIntoView({
                        behavior: 'smooth'
                      })
                    }
                  } else {
                    window.location.href = destinationUrl
                  }
                }}
              >
                SOBRE NÓS
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/rules-warnings')
                }}
              >
                AVISOS
              </a>
              <a
                href="/#reservation"
                className="cursor-pointer"
                onClick={(e) => {
                  e.preventDefault()
                  navigate('/terms-of-use')
                }}
              >
                TERMO DE USO
              </a>
            </div>
          </>
        )}
        {auth ? (
          isLoading ? (
            <Button className="hidden h-16 w-40 items-center justify-center text-xl md:flex lg:text-2xl">
              <BiLoaderAlt className="animate-spin text-2xl" />
            </Button>
          ) : (
            <Button
              className="hidden h-16 w-40 items-center justify-center text-xl md:flex lg:text-2xl"
              onClick={handleLogout}
            >
              <CiLogout className="mr-2" />
            </Button>
          )
        ) : (
          <a href="/login">
            <Button className="hidden h-16 w-40 items-center justify-center text-xl md:flex lg:text-2xl">
              Login
            </Button>
          </a>
        )}

        {isMenuOpen ? (
          <IoClose
            className={`flex cursor-pointer text-5xl text-yellow transition-all duration-200 md:hidden ${fade ? 'opacity-100' : 'rotate-180 opacity-0'}`}
            onClick={handleCloseMenu}
          />
        ) : (
          <IoMenu
            className={`flex cursor-pointer text-5xl text-yellow transition-all duration-200 md:hidden ${fade ? 'opacity-0' : 'opacity-100'}`}
            onClick={handleOpenMenu}
          />
        )}
      </nav>
      {isMenuOpen && (
        <div
          className={`flex h-full w-full transform flex-col justify-between gap-16 bg-blue-primary pb-8 pt-10 duration-200 ${fade ? 'translate-x-0 opacity-100' : 'translate-x-[450px] opacity-0'}`}
        >
          <div className="flex flex-col justify-center gap-8 px-10">
            {user?.role === 'ADMIN' ? (
              <>
                <a
                  href="/admin-home"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-75 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    if (window.location.pathname === '/admin-home') {
                      e.preventDefault() // Evita o redirecionamento se já está na página inicial
                      window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo
                    }
                    handleCloseMenu()
                  }}
                >
                  <FaHome /> Home
                </a>
                <a
                  href="#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-200 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/#reservation'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        '#reservation'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <FaCalendarAlt /> CEAF - Esportes
                </a>
                <a
                  href="#dev"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-300 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/#dev'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        '#dev'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <BiWorld /> Sobre nós
                </a>
                <a
                  href="/#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-[400ms] duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/rules-warnings'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        'rules-warnings'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <TbAlertSquareFilled /> Avisos
                </a>
                <a
                  href="/#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-500 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/terms-of-use'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        'terms-of-use'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <IoIosPaper /> Termos de Uso
                </a>
              </>
            ) : (
              <>
                <a
                  href="/"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-75 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    if (window.location.pathname === '/') {
                      e.preventDefault() // Evita o redirecionamento se já está na página inicial
                      window.scrollTo({ top: 0, behavior: 'smooth' }) // Rola para o topo
                    }
                    handleCloseMenu()
                  }}
                >
                  <FaHome /> Início
                </a>
                <a
                  href="#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-200 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/#reservation'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        '#reservation'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <FaCalendarAlt /> CEAF - Esportes
                </a>
                <a
                  href="#dev"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-300 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/#dev'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        '#dev'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <BiWorld /> Sobre nós
                </a>
                <a
                  href="/#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-[400ms] duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/rules-warnings'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        'rules-warnings'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <TbAlertSquareFilled /> Avisos
                </a>
                <a
                  href="/#reservation"
                  className={`ml-[12px] flex w-4/5 items-center gap-4 text-2xl font-semibold text-white delay-500 duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const destinationUrl = '/terms-of-use'
                    if (window.location.pathname === '/') {
                      const targetElement = document.querySelector(
                        'terms-of-use'
                      ) as HTMLElement | null
                      if (targetElement) {
                        targetElement.scrollIntoView({
                          behavior: 'smooth'
                        })
                      }
                    } else {
                      window.location.href = destinationUrl
                    }
                    handleCloseMenu()
                  }}
                >
                  <IoIosPaper /> Termos de Uso
                </a>
              </>
            )}
            {auth ? (
              isLoading ? (
                <Button
                  className={`flex items-center gap-4 px-3 py-4 text-2xl font-semibold delay-[600ms] duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                >
                  <BiLoaderAlt className="animate-spin text-2xl" />
                </Button>
              ) : (
                <Button
                  className={`flex items-center gap-4 px-3 py-4 text-2xl font-semibold delay-[600ms] duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                  onClick={handleLogout}
                >
                  <CiLogout className="mr-2" /> Logout
                </Button>
              )
            ) : (
              <a href="/login">
                <Button
                  className={`flex w-full items-center gap-4 px-3 py-4 text-2xl font-semibold delay-[600ms] duration-500 sm:text-4xl ${fade ? 'translate-x-0 opacity-100' : 'translate-x-24 opacity-0'}`}
                >
                  <FaUserCircle className="mr-2" /> Login
                </Button>
              </a>
            )}
          </div>
          <p className="flex w-full justify-center text-xl text-white">
            Reservation Mauá - 2025
          </p>
        </div>
      )}
    </div>
  )
}
