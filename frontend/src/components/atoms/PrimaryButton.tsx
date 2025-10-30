import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface PrimaryButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode
  variant?: 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'
  size?: 'default' | 'sm' | 'lg' | 'icon'
}

/**
 * Atomic Design: ATOM
 * Primary button component wrapping ShadCN UI Button
 * Reusable across the application
 */
export const PrimaryButton: React.FC<PrimaryButtonProps> = ({
  children,
  variant = 'default',
  size = 'default',
  className,
  ...props
}) => {
  return (
    <Button
      variant={variant}
      size={size}
      className={cn('font-medium', className)}
      {...props}
    >
      {children}
    </Button>
  )
}

export default PrimaryButton