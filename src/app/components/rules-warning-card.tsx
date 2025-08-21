type RulesWarningCardProps = {
  content: string
}
export function RulesWarningCard({ content }: RulesWarningCardProps) {
  return (
    <div className="flex h-full w-full flex-col items-start justify-start overflow-auto rounded-md bg-grey-tertiary/20 p-6 text-justify font-poppins text-lg font-bold text-grey-primary">
      <p>{content}</p>
    </div>
  )
}
