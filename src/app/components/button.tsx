import { cn } from '../utils/cn'

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export function Button({ children, className, ...props }: ButtonProps) {
  return (
    <button
      {...props}
      className={cn(
        'rounded-md bg-yellow px-10 py-2 font-league text-2xl font-medium text-white',
        className
      )}
    >
      {children}
    </button>
  )
}
