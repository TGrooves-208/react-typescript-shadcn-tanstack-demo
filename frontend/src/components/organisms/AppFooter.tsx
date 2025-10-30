import React from 'react'
import { cn } from '@/lib/utils'

interface AppFooterProps {
  className?: string
}

/**
 * Atomic Design: ORGANISM
 * Application footer with project information and links
 * WCAG 2.2 AA compliant with proper landmark and contrast
 */
export const AppFooter: React.FC<AppFooterProps> = ({ className }) => {
  const currentYear = new Date().getFullYear()

  return (
    <footer
      className={cn(
        'border-t bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
      role="contentinfo"
    >
      <div className="container mx-auto px-4 py-4">
        <div className="text-center">
          <p className="text-sm text-muted-foreground">
            © {currentYear} React ShadCN TanStack Demo. Built with modern web technologies.
          </p>
        </div>
      </div>
    </footer>
  )
}

export default AppFooter