import logobranca from '../assets/logobranca.png'
import baixados from '../assets/baixados.jpg'
import { Button } from '../components/button'

export function Login() {
  return (
    <>
      <div className="absolute left-0 top-0 z-0 flex h-screen w-full bg-quadra bg-cover bg-center brightness-50" />
      <div className="absolute z-[1] flex h-screen w-full items-end justify-between">
        <div className="flex h-full w-full items-center justify-between bg-black bg-opacity-50">
          <div className="flex h-full w-1/2 items-center justify-center">
            <img
              src={logobranca}
              alt="Logo do Mauá Reservation"
              className="w-1/2"
            />
          </div>
          <div className="flex h-full w-1/2 flex-col justify-center rounded-lg bg-white/70 p-28 shadow-lg">
            <div className="flex flex-col items-center gap-8 rounded-lg bg-white p-12 text-justify">
              <p className="p-1 text-center font-poppins text-2xl text-black">
                Ao clicar no botão de login, você será redirecionado à página de
                login integrado
              </p>
              <div className="flex justify-center">
                <Button className="flex items-center gap-2 rounded-lg border bg-white p-4 text-center font-poppins font-normal text-black">
                  <img
                    src={baixados}
                    alt="Logo da Microsoft"
                    className="h-8 w-8"
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
