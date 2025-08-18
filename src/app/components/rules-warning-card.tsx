import { useNavigate } from 'react-router-dom'
type RulesWarningCardProps = {
  content: string
}
export function RulesWarningCard({ content }: RulesWarningCardProps) {
  const navigate = useNavigate()
  return (
    <div className="p-60px flex h-[300px] w-[500px] flex-col items-start justify-start overflow-auto bg-gray-200 rounded-md p-3">
      <p>{content}</p>
    </div>
  )
}
