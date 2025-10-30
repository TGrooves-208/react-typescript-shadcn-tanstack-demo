import { describe, it, expect, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider } from 'next-themes'
import { Button } from '@/components/ui/button'
import { PrimaryButton } from '@/components/atoms/PrimaryButton'

// Test wrapper for components that need theme provider
const TestWrapper = ({ children }: { children: React.ReactNode }) => (
  <ThemeProvider attribute="class" defaultTheme="light">
    {children}
  </ThemeProvider>
)

describe('Button Components', () => {
  describe('UI Button', () => {
    it('renders with default variant', () => {
      render(<Button>Click me</Button>)
      const button = screen.getByRole('button', { name: /click me/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('bg-primary')
    })

    it('renders with outline variant', () => {
      render(<Button variant="outline">Outline Button</Button>)
      const button = screen.getByRole('button', { name: /outline button/i })
      expect(button).toBeInTheDocument()
      expect(button).toHaveClass('border-input')
    })

    it('renders as disabled', () => {
      render(<Button disabled>Disabled Button</Button>)
      const button = screen.getByRole('button', { name: /disabled button/i })
      expect(button).toBeDisabled()
    })
  })

  describe('PrimaryButton Atom', () => {
    it('renders with children', () => {
      render(
        <TestWrapper>
          <PrimaryButton>Primary Action</PrimaryButton>
        </TestWrapper>
      )
      const button = screen.getByRole('button', { name: /primary action/i })
      expect(button).toBeInTheDocument()
    })

    it('calls onClick handler when clicked', async () => {
      const handleClick = vi.fn()
      const user = userEvent.setup()
      
      render(
        <TestWrapper>
          <PrimaryButton onClick={handleClick}>Clickable</PrimaryButton>
        </TestWrapper>
      )
      
      const button = screen.getByRole('button', { name: /clickable/i })
      await user.click(button)
      expect(handleClick).toHaveBeenCalledOnce()
    })
  })
})