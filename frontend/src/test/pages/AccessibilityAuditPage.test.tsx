import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ThemeProvider } from 'next-themes'
import AccessibilityAuditPage from '@/pages/AccessibilityAuditPage'

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

describe('AccessibilityAuditPage', () => {
  it('renders audit summary with zero issues', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check main heading
    expect(screen.getByRole('heading', { level: 1, name: /wcag 2\.2 accessibility audit/i })).toBeInTheDocument()

    // Check for audit summary section - use the actual text from the page
    expect(screen.getByText('Audit Summary - All Clear')).toBeInTheDocument()
    expect(screen.getByText('Critical Issues')).toBeInTheDocument()
    expect(screen.getByText('Serious Issues')).toBeInTheDocument()
    expect(screen.getByText('Moderate Issues')).toBeInTheDocument()
    expect(screen.getByText('Minor Issues')).toBeInTheDocument()
    
    // Test that we have PASS status - there may be more than 4 on the page, so just verify we have at least 4
    expect(screen.getAllByText('PASS').length).toBeGreaterThanOrEqual(4)
  })

  it('displays all audited pages', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check that all pages are listed
    expect(screen.getByText('Landing Page')).toBeInTheDocument()
    expect(screen.getByText('ShadCN Components')).toBeInTheDocument()
    expect(screen.getByText('TanStack Features')).toBeInTheDocument()
    expect(screen.getByText('API Integration')).toBeInTheDocument()
    expect(screen.getByText('Atomic Design')).toBeInTheDocument()
    expect(screen.getByText('Accessibility Audit')).toBeInTheDocument()
  })

  it('shows WCAG 2.2 guidelines compliance', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check for the 4 WCAG principles
    expect(screen.getByText('1. Perceivable')).toBeInTheDocument()
    expect(screen.getByText('2. Operable')).toBeInTheDocument()
    expect(screen.getByText('3. Understandable')).toBeInTheDocument()
    expect(screen.getByText('4. Robust')).toBeInTheDocument()
  })

  it('lists accessibility features implemented', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check for accessibility features
    expect(screen.getByText('Semantic HTML Structure')).toBeInTheDocument()
    expect(screen.getByText('ARIA Labels & Roles')).toBeInTheDocument()
    expect(screen.getByText('Keyboard Navigation')).toBeInTheDocument()
    expect(screen.getByText('Color Contrast')).toBeInTheDocument()
    expect(screen.getByText('Screen Reader Support')).toBeInTheDocument()
  })

  it('shows axe DevTools as testing methodology', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check for testing tool information
    expect(screen.getByText('axe DevTools')).toBeInTheDocument()
    expect(screen.getByText('Industry standard accessibility testing extension')).toBeInTheDocument()
  })

  it('displays certificate of compliance without download button', () => {
    render(
      <TestWrapper>
        <AccessibilityAuditPage />
      </TestWrapper>
    )

    // Check certificate information
    expect(screen.getByText('WCAG 2.2 AA/AAA Compliant')).toBeInTheDocument()
    expect(screen.getByText('Audit Date: October 29, 2025')).toBeInTheDocument()
    expect(screen.getByText('Testing Tool: axe DevTools')).toBeInTheDocument()
    expect(screen.getByText('Issues Found: 0 Critical, 0 Serious, 0 Moderate, 0 Minor')).toBeInTheDocument()
    
    // Ensure download button is NOT present
    expect(screen.queryByText('Download Compliance Report')).not.toBeInTheDocument()
  })
})