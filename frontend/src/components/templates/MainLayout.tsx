import React from 'react'
import { cn } from '@/lib/utils'

interface MainLayoutProps {
  children: React.ReactNode
  className?: string
}

/**
 * Atomic Design: TEMPLATE
 * Main application layout providing semantic structure and accessibility
 * WCAG 2.2 AA compliant with proper landmarks and skip navigation
 */
export const MainLayout: React.FC<MainLayoutProps> = ({ children, className }) => {
  return (
    <div className={cn('min-h-screen bg-background flex flex-col', className)}>
      {/* Skip Navigation for Screen Readers - WCAG 2.2 Requirement */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:px-4 focus:py-2 focus:bg-primary focus:text-primary-foreground focus:rounded-md focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
        tabIndex={0}
      >
        Skip to main content
      </a>

      {/* Main Application Structure */}
      {children}
    </div>
  )
}

export default MainLayout