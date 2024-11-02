import logobranca from '../assets/logobranca.png'
import baixados from '../assets/baixados.jpg'
import { Button } from '../components/button'

export function Login() {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 flex h-screen w-full bg-quadra bg-cover bg-center brightness-50" />
      <div className="absolute z-[1] flex h-screen w-full items-center justify-between bg-black bg-opacity-50 md:items-end xl:items-center xl:justify-center">
        <div className="flex h-full w-full max-w-7xl flex-col items-center justify-between md:flex-row xl:justify-center">
          <div className="flex h-full w-1/2 items-center justify-center">
            <img
              src={logobranca}
              alt="Logo do Mauá Reservation"
              className="w-10/12 sm:w-11/12 md:w-1/2"
            />
          </div>
          <div className="hidden:bg-white/70 mb-16 flex h-1/5 w-full flex-col justify-center rounded-lg p-20 shadow-lg sm:w-4/5 sm:p-10 md:mb-0 md:h-full md:w-1/2 md:bg-white/70 md:p-24">
            <div className="flex flex-col items-center gap-4 rounded-lg bg-white p-4 text-justify sm:gap-6 xl:p-7">
              <p className="text-center font-poppins text-xl text-black lg:text-2xl">
                Ao clicar no botão, você será redirecionado à página de login da
                Microsoft
              </p>
              <div className="flex justify-center">
                <Button className="flex items-center gap-2 rounded-lg border bg-white p-4 text-center font-poppins text-xl font-normal text-black">
                  <img
                    src={baixados}
                    alt="Logo da Microsoft"
                    className="h-5 w-5 sm:h-6 sm:w-6"
                  />
                  Sign in with Microsoft
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
