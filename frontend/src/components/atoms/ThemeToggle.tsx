import { Moon, Sun } from 'lucide-react'
import { useTheme } from 'next-themes'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

interface ThemeToggleProps {
  className?: string
}

/**
 * Atomic Design: ATOM
 * Theme toggle component for switching between light/dark modes
 * WCAG 2.2 AA compliant with proper labels and keyboard support
 */
export function ThemeToggle({ className }: ThemeToggleProps) {
  const { setTheme, theme } = useTheme()

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light')
  }

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={toggleTheme}
      className={cn('h-9 w-9', className)}
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      title={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
    >
      <Sun 
        className="h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" 
        aria-hidden="true"
      />
      <Moon 
        className="absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" 
        aria-hidden="true"
      />
      <span className="sr-only">Toggle theme</span>
    </Button>
  )
}

export default ThemeToggle