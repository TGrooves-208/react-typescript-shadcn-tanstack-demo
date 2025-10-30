import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { Menu } from 'lucide-react'

interface NavigationItem {
  id: string
  label: string
  href: string
  description?: string
  isActive?: boolean
}

interface MobileNavigationProps {
  items: NavigationItem[]
  onNavigate?: (item: NavigationItem) => void
}

/**
 * Atomic Design: MOLECULE
 * Mobile navigation component with sheet overlay
 * WCAG 2.2 AA compliant
 */
export const MobileNavigation: React.FC<MobileNavigationProps> = ({
  items,
  onNavigate
}) => {
  const [isOpen, setIsOpen] = useState(false)

  const handleNavigation = (item: NavigationItem) => {
    setIsOpen(false)
    onNavigate?.(item)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          aria-label="Open navigation menu"
        >
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80">
        <SheetHeader>
          <SheetTitle>Navigation Menu</SheetTitle>
        </SheetHeader>
        <nav className="mt-6 space-y-1" role="navigation" aria-label="Main navigation">
          {items.map((item) => (
            <Button
              key={item.id}
              variant={item.isActive ? 'secondary' : 'ghost'}
              className="w-full justify-start h-auto p-3 text-left"
              onClick={() => handleNavigation(item)}
              aria-current={item.isActive ? 'page' : undefined}
            >
              <div className="flex flex-col items-start">
                <span className="font-medium">{item.label}</span>
                {item.description && (
                  <span className="text-sm text-muted-foreground mt-1">
                    {item.description}
                  </span>
                )}
              </div>
            </Button>
          ))}
        </nav>
      </SheetContent>
    </Sheet>
  )
}

export default MobileNavigation