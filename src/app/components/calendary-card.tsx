interface CalendaryCardProps {
  court: string
  modality: string
}

export function CalendaryCard({ court, modality }: CalendaryCardProps) {
  const courtColors = () => {
    switch (court) {
      case 'Quadra1':
        return 'border-blue-primary text-blue-primary'
      case 'Quadra2':
        return 'border-blue-secondary text-blue-secondary'
      case 'Quadra3':
        return 'border-blue-tertiary text-blue-tertiary'
    }
  }
  return (
    <div
      className={`${courtColors()} flex h-20 w-20 flex-col items-center justify-evenly rounded-lg border-l-8 bg-blue-100 shadow-md`}
    >
      <p>{court}</p>
      <p>{modality}</p>
    </div>
  )
}
