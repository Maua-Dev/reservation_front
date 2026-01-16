export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="flex w-full bg-white py-4 md:py-8">
      <div className="flex w-full flex-col items-center justify-center">
        <p className="font-poppins text-lg text-blue-primary md:text-2xl">
          Reservation Mauá - {currentYear}
        </p>
      </div>
    </footer>
  )
}
