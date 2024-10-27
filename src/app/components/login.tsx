import logobranca from '../assets/logobranca.png'
import baixados from '../assets/baixados.jpg'
import { Button } from './button'

export function Login() {
  return (
    <div className="flex h-screen w-full items-end justify-between bg-quadra bg-cover bg-center">
      <div className="flex h-full w-full items-center justify-center gap-40 bg-black bg-opacity-50">
        <img
          src={logobranca}
          alt="Logo do Mauá Reservation"
          className="w-1/4"
        />
        <div className="flex h-2/3 w-2/5 flex-col justify-center rounded-lg bg-white bg-opacity-70 p-28 shadow-lg">
          <div className="items-center rounded-lg bg-white p-12 text-justify">
            <p className="p-14 text-center font-poppins text-2xl text-black">
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
  )
}
