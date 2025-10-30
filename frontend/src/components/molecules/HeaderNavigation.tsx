import React from 'react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  isActive?: boolean
}

interface HeaderNavigationProps {
  items: NavigationItem[]
  onNavigate?: (item: NavigationItem) => void
  className?: string
}

/**
 * Atomic Design: MOLECULE
 * Header navigation component for quick page switching
 * WCAG 2.2 AA compliant with proper ARIA navigation
 */
export const HeaderNavigation: React.FC<HeaderNavigationProps> = ({
  items,
  onNavigate,
  className
}) => {
  const handleNavigation = (item: NavigationItem) => {
    onNavigate?.(item)
  }

  return (
    <nav 
      className={cn('hidden md:flex items-center space-x-1', className)}
      role="navigation" 
      aria-label="Header navigation"
    >
      {items.map((item) => (
        <Button
          key={item.id}
          variant={item.isActive ? 'secondary' : 'ghost'}
          size="sm"
          onClick={() => handleNavigation(item)}
          className={cn(
            'text-sm font-medium transition-colors',
            item.isActive && 'bg-secondary'
          )}
          aria-current={item.isActive ? 'page' : undefined}
          title={item.description}
        >
          {item.label}
        </Button>
      ))}
    </nav>
  )
}

export default HeaderNavigation