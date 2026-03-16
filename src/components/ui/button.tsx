import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cn } from "@/lib/utils"

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'destructive' | 'link' | 'gradient'
  size?: 'sm' | 'md' | 'lg' | 'icon'
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    
    const variants = {
      primary: 'bg-primary text-white hover:bg-primary/90 shadow-[0_0_15px_rgba(79,142,247,0.3)]',
      secondary: 'bg-surface-2 text-text-1 hover:bg-surface-3 border border-white/5',
      outline: 'border border-white/10 bg-transparent text-text-1 hover:bg-white/5',
      ghost: 'text-text-2 hover:text-text-1 hover:bg-white/5',
      destructive: 'bg-destructive text-white hover:bg-destructive/90',
      link: 'text-primary underline-offset-4 hover:underline px-0 py-0 h-auto',
      gradient: 'bg-gradient-to-r from-primary to-accent-2 text-white hover:opacity-90 shadow-cta border-none transition-all duration-300',
    }

    const sizes = {
      sm: 'h-10 px-4 text-xs font-bold uppercase tracking-widest',
      md: 'h-12 px-6 py-3 text-sm font-bold',
      lg: 'h-14 px-10 text-base font-bold',
      icon: 'h-12 w-12',
    }

    return (
      <Comp
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-md)] transition-all duration-200 focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/20 disabled:pointer-events-none disabled:opacity-50 active:scale-95',
          variants[variant],
          sizes[size],
          className
        )}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button }
