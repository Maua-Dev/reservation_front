import { FiLoader } from 'react-icons/fi'
import { useBookingsQuery } from '../hooks/use-booking'
import { Button } from './button'
import { toast } from 'react-toastify'
import {
  FaFutbol,
  FaRegFutbol,
  FaSwimmer,
  FaVolleyballBall
} from 'react-icons/fa'
import { MdDirectionsRun, MdSportsRugby } from 'react-icons/md'
import { FaBasketball } from 'react-icons/fa6'
import { TbBeach, TbPlayHandball } from 'react-icons/tb'
import { GiPingPongBat, GiTennisRacket } from 'react-icons/gi'
import futebol from '../assets//futebol.jpg'
import volei from '../assets/Volei.jpg'
import futsal from '../assets/futsal.jpg'
import rugby from '../assets/rugby.jpg'
import tenis from '../assets/tenisbola1.jpg'
import basquete from '../assets/basquete.jpg'
import handebol from '../assets/handball1.jpg'
import beachTenis from '../assets/beach.jpg'
import corrida from '../assets/corrida.jpg'
import natacao from '../assets/natacao.jpg'
import pingPong from '../assets/tenisbola1.jpg'

interface ReservationCardProps {
  startDate: number
  endDate: number
  court?: string
  bookingId?: string
  modality?: string
  reload: () => void
}

export function ReservationCard({
  startDate,
  endDate,
  court,
  bookingId,
  modality,
  reload
}: ReservationCardProps) {
  
  const { deleteBookingMutation } = useBookingsQuery()
  const today = new Date().getTime()
  const isPassed = startDate < today

  const handleCancel = async () => {
    if (bookingId) {
      await deleteBookingMutation.mutateAsync(bookingId)
      reload()
    }
  }
  

  const modalityIcons: Record<string, JSX.Element> = {
    FOOTBALL: <FaFutbol />,
    VOLLEYBALL : <FaVolleyballBall />,
    FUTSAL: <FaRegFutbol />,
    RUGBY: <MdSportsRugby />,
    TENNIS : <GiTennisRacket />,
    BASKETBALL: <FaBasketball />,
    HANDBALL: <TbPlayHandball />,
    'BEACH TENNIS': <TbBeach />,
    NATACAO: <FaSwimmer />,
    CORRIDA: <MdDirectionsRun />,
    'PING PONG': <GiPingPongBat />
  }
  const modalityImages: Record<string, string> = {
    FOOTBALL: futebol,
    VOLLEYBALL : volei,
    FUTSAL: futsal,
    RUGBY: rugby,
    TENNIS : tenis,
    BASKETBALL: basquete,
    HANDBALL: handebol,
    'BEACH TENNIS': beachTenis,
    NATACAO: natacao,
    CORRIDA: corrida,
    'PING PONG': pingPong
  }
  const modalityColors: Record<string, string> = {
    FOOTBALL: '#32CD32',
    VOLLEYBALL : '#0000FF',
    FUTSAL: '#3b82f6',
    RUGBY: '#a16207',
    TENNIS : '#228B22',
    BASKETBALL: '#FF8C00',
    HANDBALL: '#ef4444',
    'BEACH TENNIS': '#14b8a6',
    NATACAO: '#3b82f6',
    CORRIDA: '#228B22',
    'PING PONG': '#ef4444'
  }

  const getModalityImage = () => {
    if (!modality || !modalityImages[modality]) return ''
    return `url(${modalityImages[modality]})`
  }

  console.log('Modality:', modality)
console.log('Image path:', modality ? modalityImages[modality] : 'No modality')

// E verifique se as importações funcionam:
console.log('Imported images:', {
  futebol, volei, futsal, rugby, tenis, basquete, handebol, beachTenis, natacao, corrida, pingPong
})


  return (
    <div
      className="relative flex h-36 min-h-36 w-full flex-row items-start overflow-hidden rounded-lg p-4 md:h-44 md:min-h-44"
      style={{
        backgroundImage: getModalityImage(),
        backgroundSize: 'cover',
        backgroundPosition: 'center'
      }}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-lg"
        style={{
          backgroundColor: modality ? modalityColors[modality] || '#6b7280' : '#6b7280',
          opacity: 0.4
        }}
      />
      <div className="relative z-10 flex flex-col gap-1">
        <p className="text-xl font-bold text-white md:text-2xl">
          {new Date(startDate).toLocaleDateString('pt-BR', {
            day: '2-digit',
            month: '2-digit'
          })}
        </p>
        <p className="text-xs font-normal text-white sm:text-base md:text-lg">
          Hora:{' '}
          {new Date(startDate).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}{' '}
          -{' '}
          {new Date(endDate).toLocaleTimeString('pt-BR', {
            hour: '2-digit',
            minute: '2-digit'
          })}
        </p>
        <p className="text-xs font-normal text-white sm:text-base md:text-lg">
          Quadra: {court}
        </p>
        <p className="flex flex-row justify-between gap-3 text-xs font-normal text-white sm:text-base md:text-lg">
          <span className="flex items-center gap-2">
            Esporte: {modality} {modality && modalityIcons[modality]}
          </span>
        </p>
      </div>
      <div className="relative z-10 ml-auto flex h-full justify-end gap-4">
        <Button
          className={`flex h-8 w-20 items-center justify-center bg-white p-2 text-sm font-bold text-black transition-colors ${startDate < today + 15 * 60 * 1000 ? 'bg-gray-300' : isPassed ? 'bg-gray-300' : 'hover:bg-red-400'} md:w-36 lg:h-10 lg:text-lg`}
          onClick={() => {
            // confere se pelo menos 15 min de antecedencia
            if (startDate < today + 15 * 60 * 1000) {
              toast.info(
                'Não é possível cancelar uma reserva com menos de 15 minutos de antecedência'
              )
            } else {
              if (isPassed) {
                toast.info('Não é possível cancelar uma reserva já passada')
              } else {
                if (deleteBookingMutation.isPending) {
                  return
                } else {
                  handleCancel()
                }
              }
            }
          }}
          disabled={deleteBookingMutation.isPending}
        >
          {deleteBookingMutation.isPending ? (
            <FiLoader className="animate-spin" />
          ) : (
            'Cancelar'
          )}
        </Button>
      </div>
    </div>
  )
}
