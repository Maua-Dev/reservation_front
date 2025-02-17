type ReservationDetailsProps = {
  location: string
  modality: string
  equipments: string[]
  time: string
  isChecked: boolean[]
}

export const ReservationDetails = ({
  equipments,
  location,
  modality,
  time,
  isChecked
}: ReservationDetailsProps) => {
  function getTimeOneHourLater(time: string | undefined) {
    if (!time) {
      return null
    }
    const [hours, minutes] = time.split(':').map(Number)
    const date = new Date()
    date.setHours(hours + 1, minutes, 0, 0)
    return date
  }

  return (
    <>
      <div className="flex flex-col gap-4 p-10">
        <div className="flex flex-col justify-between pb-3">
          <div className="flex justify-between">
            <p className="mt-3 font-poppins text-2xl font-bold text-black md:text-3xl">
              Daniel Capuzzo
            </p>
            <p className="mt-3 font-poppins text-2xl font-bold text-black md:text-3xl">
              22.001122-0
            </p>
          </div>
          <p className="mt-1 font-poppins text-2xl font-medium">data: 17/09</p>
        </div>

        <div className="flex w-full flex-col justify-between gap-2 font-poppins text-2xl font-medium sm:flex-row">
          <h1 className="w-36 rounded bg-yellow p-2">{location}</h1>
          <h1 className="mr-6 rounded bg-yellow p-2 tracking-wide">
            Horário: {time} - {getTimeOneHourLater(time)?.toLocaleTimeString()}
          </h1>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-start">
            <p className="pt-4 text-left font-poppins text-3xl font-bold text-black">
              Modalidade:
            </p>
          </div>
          <div className="mt-3 flex flex-wrap gap-2 pt-4">
            <h1
              className={
                'w-36 rounded border border-black bg-yellow p-1 text-center font-poppins text-2xl font-medium'
              }
            >
              {modality}
            </h1>
          </div>
        </div>

        <div className="flex flex-col">
          <div className="flex justify-start">
            <p className="mt-3 text-left font-poppins text-3xl font-bold text-black">
              Equipamentos:
            </p>
          </div>
          <div className="flex items-center">
            <div className="mt-3 flex flex-wrap gap-2 pt-4">
              {equipments?.map((equipment) => (
                <h1
                  key={equipment}
                  className={
                    'text-md w-24 rounded border border-black p-1 text-center font-poppins font-medium md:w-44 md:text-lg'
                  }
                >
                  {equipment}
                </h1>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-3 flex flex-row items-center gap-2">
          <div
            className={`size-8 rounded border border-black p-1 md:w-8 ${isChecked?.[0] ? 'bg-yellow' : 'bg-white'}`}
          />
          <p className="text-md font-poppins font-medium md:text-xl">
            Preciso de colete
          </p>
        </div>

        <div className="mt-3 flex flex-row items-center justify-between">
          <div className="flex items-center gap-2">
            <div
              className={`size-8 rounded border border-black p-1 md:w-8 ${isChecked?.[1] ? 'bg-yellow' : 'bg-white'}`}
            />
            <p className="text-md font-poppins font-medium md:text-xl">
              Aceito compartilhar quadra
            </p>
          </div>
        </div>
      </div>
    </>
  )
}
