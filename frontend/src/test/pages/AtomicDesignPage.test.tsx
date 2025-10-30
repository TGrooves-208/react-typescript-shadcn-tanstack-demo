import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import AtomicDesignPage from '@/pages/AtomicDesignPage'

// Test wrapper with required providers
const TestWrapper = ({ children }: { children: React.ReactNode }) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  })

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute="class" defaultTheme="light">
        {children}
      </ThemeProvider>
    </QueryClientProvider>
  )
}

describe('AtomicDesignPage', () => {
  it('renders page title and main sections', () => {
    render(
      <TestWrapper>
        <AtomicDesignPage />
      </TestWrapper>
    )

    // Check main heading
    expect(screen.getByRole('heading', { level: 1, name: /atomic design architecture/i })).toBeInTheDocument()

    // Check section headings
    expect(screen.getByText(/what is atomic design\?/i)).toBeInTheDocument()
    expect(screen.getByText(/container queries in action/i)).toBeInTheDocument()
    expect(screen.getByText(/benefits of our atomic design implementation/i)).toBeInTheDocument()
  })

  it('displays atomic design methodology steps', () => {
    render(
      <TestWrapper>
        <AtomicDesignPage />
      </TestWrapper>
    )

    // Check for the 5 steps of atomic design - verify they exist (some may appear only once)
    expect(screen.getAllByText('Atoms').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Molecules').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Organisms').length).toBeGreaterThanOrEqual(1) 
    expect(screen.getAllByText('Templates').length).toBeGreaterThanOrEqual(1)
    expect(screen.getAllByText('Pages').length).toBeGreaterThanOrEqual(1)
    
    // Verify the descriptive text for each level
    expect(screen.getByText('Basic building blocks')).toBeInTheDocument()
    expect(screen.getByText('Groups of atoms')).toBeInTheDocument()
    expect(screen.getByText('Complex UI sections')).toBeInTheDocument()
    expect(screen.getByText('Page-level objects')).toBeInTheDocument()
    expect(screen.getByText('Specific instances')).toBeInTheDocument()
  })

  it('shows component examples for each atomic level', () => {
    render(
      <TestWrapper>
        <AtomicDesignPage />
      </TestWrapper>
    )

    // Check for component examples
    expect(screen.getByText('Button Atom')).toBeInTheDocument()
    expect(screen.getByText('Input Atom')).toBeInTheDocument()
    expect(screen.getByText('Search Form Molecule')).toBeInTheDocument()
    expect(screen.getByText('App Header Organism')).toBeInTheDocument()
  })

  it('displays benefits without emojis', () => {
    render(
      <TestWrapper>
        <AtomicDesignPage />
      </TestWrapper>
    )

    // Check that benefits are displayed as clean text
    expect(screen.getByText('Reusability')).toBeInTheDocument()
    expect(screen.getByText('Testability')).toBeInTheDocument()
    expect(screen.getByText('Documentation')).toBeInTheDocument()
    expect(screen.getByText('Maintainability')).toBeInTheDocument()
    expect(screen.getByText('Performance')).toBeInTheDocument()
    expect(screen.getByText('Team Collaboration')).toBeInTheDocument()
  })

  it('includes file location examples', () => {
    render(
      <TestWrapper>
        <AtomicDesignPage />
      </TestWrapper>
    )

    // Check for file path examples
    expect(screen.getByText('components/ui/button.tsx')).toBeInTheDocument()
    expect(screen.getByText('components/atoms/ThemeToggle.tsx')).toBeInTheDocument()
    expect(screen.getByText('components/organisms/AppHeader.tsx')).toBeInTheDocument()
  })
})