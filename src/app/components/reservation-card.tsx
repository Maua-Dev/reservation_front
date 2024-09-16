import { Button } from './button'

type ReservationCardProps = {
  image: string
  title: string
  description: string
}

export function ReservationCard({
  image,
  title,
  description
}: ReservationCardProps) {
  return (
    <div className="flex w-full flex-col md:w-1/3">
      <img
        src={image}
        alt="Imagem do campo"
        className="h-44 w-full rounded-t-xl object-cover sm:h-60"
      />
      <div className="flex flex-col items-center justify-center gap-2 rounded-b-xl bg-blue-primary py-2 pb-2 text-center text-white lg:px-4 lg:py-4">
        <h1 className="font-league text-sm font-semibold lg:text-4xl">
          {title}
        </h1>
        <p className="hidden p-4 font-poppins text-xl lg:flex">{description}</p>
        <div className="flex w-full items-center justify-center px-2">
          <Button className="flex w-full items-center justify-center py-1 font-league text-sm font-semibold lg:py-2 lg:text-2xl">
            Reservar
          </Button>
        </div>
      </div>
    </div>
  )
}
