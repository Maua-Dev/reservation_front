import { cn } from '../utils/cn'
import { useEffect, useRef, useState } from 'react'

interface CalendaryCardProps {
  court: number
  location: string
  modality: string
  equipments: string[]
  time: number
  isChecked: boolean[]
  openModal: () => void
}

export function CalendaryCard({
  court,
  modality,
  openModal
}: CalendaryCardProps) {
  const courtColors: {
    [key: number]: string
  } = {
    // BEACH AS COURT 6 MUST BE A TEMPORARY FIX
    6: 'border-[#E5CBA8] text-black z-[1]',
    0: 'border-yellow text-yellow z-[2]',
    1: 'border-blue-primary text-blue-primary z-[1]',
    2: 'border-blue-secondary text-blue-secondary z-[2]',
    3: 'border-blue-tertiary text-blue-tertiary z-[3]',
    4: 'border-blue-950 text-blue-950 z-[4]'
  }

  const courtNameMap: Record<number, { full: string; short: string }> = {
    0: { full: 'Campo', short: 'Cam' },
    1: { full: 'Quadra 1', short: 'Qua.1' },
    2: { full: 'Quadra 2', short: 'Qua.2' },
    3: { full: 'Quadra 3', short: 'Qua.3' },
    4: { full: 'Quadra 4', short: 'Qua.4' },
    6: { full: 'Beach Tennis', short: 'Bea.' }
  }

  const courtLabel = courtNameMap[court] ?? {
    full: `Quadra ${court}`,
    short: `Q${court}`
  }

  const containerRef = useRef<HTMLDivElement | null>(null)
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const observer = new ResizeObserver((entries) => {
      for (const entry of entries) {
        const width = entry.contentRect.width
        setIsCompact(width < 90)
      }
    })
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const showShort = isCompact

  const shortModality =
    modality.length > 9 ? `${modality.slice(0, 8)}…` : modality

  return (
    <div
      ref={containerRef}
      onClick={openModal}
      className={cn(
        'group z-10 flex h-full w-full flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 px-1 text-center shadow-md duration-300 hover:z-10 hover:-translate-y-1 hover:cursor-pointer',
        courtColors[court]
      )}
      title={`${courtLabel.full} - ${modality}`}
    >
      <span className="font-semibold leading-tight">
        {showShort ? courtLabel.short : courtLabel.full}
      </span>
      <p className="mt-1 w-full truncate text-xs font-semibold sm:text-sm">
        {showShort ? shortModality : modality}
      </p>
    </div>
  )
}
