import React from 'react'
import { Card } from '@/components/ui/card'
import { cn } from '@/lib/utils'

interface MainContentProps {
  children: React.ReactNode
  className?: string
  title?: string
  description?: string
}

/**
 * Atomic Design: ORGANISM
 * Main content area with semantic structure and ARIA landmarks
 * WCAG 2.2 AA compliant with proper focus management
 */
export const MainContent: React.FC<MainContentProps> = ({
  children,
  className,
  title,
  description
}) => {
  return (
    <main
      id="main-content"
      className={cn('flex-1 overflow-auto bg-background', className)}
      role="main"
      aria-label="Main content"
      tabIndex={-1}
    >
      <div className="container mx-auto p-6 space-y-6 min-h-full">
        {(title || description) && (
          <div className="space-y-2">
            {title && (
              <h2 className="text-3xl font-bold tracking-tight">{title}</h2>
            )}
            {description && (
              <p className="text-muted-foreground text-lg">{description}</p>
            )}
          </div>
        )}
        
        <div className="space-y-6">
          {children}
        </div>
      </div>
    </main>
  )
}

/**
 * Content section wrapper with proper semantic structure
 */
interface ContentSectionProps {
  children: React.ReactNode
  title?: string
  description?: string
  className?: string
  asCard?: boolean
}

export const ContentSection: React.FC<ContentSectionProps> = ({
  children,
  title,
  description,
  className,
  asCard = false
}) => {
  const content = (
    <section className={cn('space-y-4', className)} aria-labelledby={title ? `section-${title.replace(/\s+/g, '-').toLowerCase()}` : undefined}>
      {(title || description) && (
        <div className="space-y-2">
          {title && (
            <h3 id={`section-${title.replace(/\s+/g, '-').toLowerCase()}`} className="text-xl font-semibold tracking-tight">
              {title}
            </h3>
          )}
          {description && (
            <p className="text-muted-foreground">{description}</p>
          )}
        </div>
      )}
      <div>{children}</div>
    </section>
  )

  if (asCard) {
    return (
      <Card className="p-6">
        {content}
      </Card>
    )
  }

  return content
}

export default MainContent