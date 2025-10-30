import React from 'react'
import { cn } from '@/lib/utils'
import ThemeToggle from '@/components/atoms/ThemeToggle'
import HeaderNavigation from '@/components/molecules/HeaderNavigation'

interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  isActive?: boolean
}

interface AppHeaderProps {
  title?: string
  className?: string
  actions?: React.ReactNode
  mobileNavButton?: React.ReactNode
  navigationItems?: NavigationItem[]
  onNavigate?: (item: NavigationItem) => void
}

/**
 * Atomic Design: ORGANISM
 * Application header with title, navigation, and theme toggle
 * WCAG 2.2 AA compliant with proper heading hierarchy and landmark
 */
export const AppHeader: React.FC<AppHeaderProps> = ({
  title = 'Dashboard',
  className,
  actions,
  mobileNavButton,
  navigationItems,
  onNavigate
}) => {
  return (
    <header
      className={cn(
        'sticky top-0 z-30 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60',
        className
      )}
      role="banner"
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center space-x-6">
          {mobileNavButton && (
            <div className="lg:hidden">
              {mobileNavButton}
            </div>
          )}
          <h1 className="text-xl font-semibold tracking-tight lg:text-2xl">
            {title}
          </h1>
          
          {navigationItems && (
            <HeaderNavigation 
              items={navigationItems}
              onNavigate={onNavigate}
            />
          )}
        </div>

        <div className="flex items-center space-x-2">
          {actions && (
            <div className="flex items-center space-x-2" role="toolbar" aria-label="Page actions">
              {actions}
            </div>
          )}
          <ThemeToggle />
        </div>
      </div>
    </header>
  )
}

export default AppHeader