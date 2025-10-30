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

interface AppNavigationProps {
  items: NavigationItem[]
  className?: string
  onNavigate?: (item: NavigationItem) => void
}

/**
 * Atomic Design: ORGANISM
 * Desktop sidebar navigation
 * WCAG 2.2 AA compliant with proper ARIA labels and keyboard navigation
 */
export const AppNavigation: React.FC<AppNavigationProps> = ({
  items,
  className,
  onNavigate
}) => {
  const handleNavigation = (item: NavigationItem) => {
    onNavigate?.(item)
  }

  return (
    <aside
      className={cn(
        'hidden lg:flex lg:flex-col lg:w-80 lg:border-r lg:bg-card lg:p-6 lg:overflow-y-auto',
        className
      )}
      role="complementary"
      aria-label="Sidebar navigation"
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold tracking-tight text-foreground">
          React + ShadCN + TanStack
        </h2>
        <p className="text-sm text-foreground/70 mt-1">
          Modern full-stack application showcase
        </p>
      </div>
      
      <nav
        role="navigation"
        aria-label="Main navigation"
        className="flex flex-col space-y-1"
      >
        {items.map((item) => (
          <Button
            key={item.id}
            variant={item.isActive ? 'secondary' : 'ghost'}
            className={cn(
              'justify-start h-auto p-3 text-left',
              item.isActive && 'bg-secondary font-medium'
            )}
            onClick={() => handleNavigation(item)}
            aria-current={item.isActive ? 'page' : undefined}
            aria-describedby={item.description ? `${item.id}-desc` : undefined}
          >
            <div className="flex flex-col items-start">
              <span className="font-medium">{item.label}</span>
              {item.description && (
                <span
                  id={`${item.id}-desc`}
                  className="text-sm text-foreground/60 mt-1"
                >
                  {item.description}
                </span>
              )}
            </div>
          </Button>
        ))}
      </nav>
    </aside>
  )
}

export default AppNavigation