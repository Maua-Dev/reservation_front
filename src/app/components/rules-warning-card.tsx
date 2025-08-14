import { useNavigate } from 'react-router-dom'
type RulesWarningCardProps = {
  content: string
}
export function RulesWarningCard({ content }: RulesWarningCardProps) {
  const navigate = useNavigate()
  return (
    <div className="p-60px flex h-[300px] w-[500px] flex-col items-start justify-start overflow-auto bg-slate-300">
      <p>{content}</p>
    </div>
  )
}
