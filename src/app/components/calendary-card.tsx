import { cn } from '../utils/cn'
import { useEffect, useRef, useState } from 'react'

interface CalendaryCardProps {
  court: number
  location: string
  sport: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  openModal: () => void
}

export function CalendaryCard({
  court,
  sport,
  openModal
  // equipments,
  // time,
  // isChecked
}: CalendaryCardProps) {
  const courtColors: {
    [key: number]: string
  } = {
    // BEACH AS COURT 6 MUST BE A TEMPORARY FIX
    6: 'border-[#F09320] text-black z-[7]',
    0: 'border-[#008000] text-[#008000] z-[1]',
    1: 'border-[#0080f5] text-[#0080f5] z-[2]',
    2: 'border-[#9414F5] text-[#9414F5] z-[3]',
    3: 'border-[#cb066C] text-[#cb066C] z-[4]',
    4: 'border-[#fd3055] text-[#fd3055] z-[5]',
    5: 'border-[#d2b202] text-[#d2b202] z-[6]'
  }

  const courtNameMap: Record<number, { full: string; short: string }> = {
    0: { full: 'Campo', short: 'Cam' },
    1: { full: 'Quadra 1', short: 'Qua.1' },
    2: { full: 'Quadra 2', short: 'Qua.2' },
    3: { full: 'Quadra 3', short: 'Qua.3' },
    4: { full: 'Quadra 4', short: 'Qua.4' },
    5: { full: 'Atividades Livres', short: 'Ativ. Liv.' },
    6: { full: 'Beach Tennis', short: 'Bea.' }
  }

  const courtLabel = courtNameMap[court] ?? {
    full: `Quadra ${court}`,
    short: `Q${court}`
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [width, setWidth] = useState<number>(0)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        setWidth(entry.contentRect.width)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const showShort = width < 60 && width >= 40
  const hideAllText = width < 10

  const shortSport =
    sport && sport.length > 9 ? `${sport.slice(0, 8)}…` : sport || ''

  return (
    <div
      ref={containerRef}
      onClick={openModal}
      className={cn(
        'group z-10 flex h-full w-full flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 px-1 text-center shadow-md duration-300 hover:z-[999] hover:-translate-y-1 hover:cursor-pointer',
        courtColors[court]
      )}
      title={`${courtLabel.full} - ${sport}`}
    >
      {!hideAllText && (
        <>
          <span className="font-semibold leading-tight">
            {showShort ? courtLabel.short : courtLabel.full}
          </span>
          <p className="mt-1 w-full truncate text-xs font-semibold sm:text-sm">
            {showShort ? shortSport : sport}
          </p>
        </>
      )}
    </div>
  )
}
