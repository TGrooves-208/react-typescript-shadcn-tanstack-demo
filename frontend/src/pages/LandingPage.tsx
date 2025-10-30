import React from 'react'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { ContentSection } from '@/components/organisms/MainContent'
import { cn } from '@/lib/utils'

interface LandingPageProps {
  className?: string
  onNavigate?: (section: string) => void
}

/**
 * Atomic Design: PAGE
 * Landing page showcasing the application features and tech stack
 * WCAG 2.2 AA compliant with proper heading hierarchy and keyboard navigation
 */
export const LandingPage: React.FC<LandingPageProps> = ({
  className,
  onNavigate
}) => {
  const features = [
    {
      title: 'Modern React Stack',
      description: 'React 18 with TypeScript, Vite, and hot module replacement for lightning-fast development.',
      section: 'react-demo'
    },
    {
      title: 'ShadCN UI Components',
      description: 'Beautiful, accessible, and customizable components built on Radix UI and Tailwind CSS.',
      section: 'components-demo'
    },
    {
      title: 'TanStack Suite',
      description: 'Powerful data fetching with Query, advanced tables with Table, and type-safe forms with Form.',
      section: 'tanstack-demo'
    },
    {
      title: 'Atomic Design',
      description: 'Scalable component architecture with atoms, molecules, organisms, templates, and pages.',
      section: 'atomic-demo'
    },
    {
      title: 'WCAG 2.2 Accessibility',
      description: 'Full accessibility compliance with screen reader support, keyboard navigation, and proper ARIA.',
      section: 'accessibility-demo'
    },
    {
      title: 'Full-Stack Integration',
      description: 'Dual API architecture with REST v1 and GraphQL v2 connected to Supabase PostgreSQL.',
      section: 'api-demo'
    }
  ]

  const techStack = [
    { category: 'Frontend', items: ['React 18', 'TypeScript', 'Vite', 'Tailwind CSS'] },
    { category: 'UI/UX', items: ['ShadCN UI', 'Radix UI', 'Container Queries', 'Dark Mode'] },
    { category: 'State Management', items: ['TanStack Query', 'TanStack Table', 'TanStack Form'] },
    { category: 'Backend', items: ['Node.js', 'TypeScript', 'GraphQL', 'REST API'] },
    { category: 'Database', items: ['Supabase', 'PostgreSQL', 'Real-time subscriptions'] },
    { category: 'Testing', items: ['Vitest', 'React Testing Library', 'Jest', 'Playwright'] }
  ]

  return (
    <div className={cn('space-y-8', className)}>
      {/* Hero Section */}
      <ContentSection
        title="React + ShadCN + TanStack Showcase"
        description="A comprehensive demonstration of modern React development with cutting-edge tools and accessibility best practices."
        asCard
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
          {features.map((feature) => (
            <Card
              key={feature.section}
              className="p-4 hover:shadow-md transition-shadow cursor-pointer focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2"
              role="article"
              tabIndex={0}
              onClick={() => onNavigate?.(feature.section)}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  onNavigate?.(feature.section)
                }
              }}
              aria-label={`Navigate to ${feature.title} demo`}
            >
              <div className="space-y-2">
                <h3 className="font-semibold text-base">{feature.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </ContentSection>

      {/* Tech Stack Overview */}
      <ContentSection
        title="Technology Stack"
        description="Modern technologies powering this application"
        asCard
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          {techStack.map((stack) => (
            <div key={stack.category} className="space-y-3">
              <h4 className="font-semibold text-sm text-primary">{stack.category}</h4>
              <ul className="space-y-2" role="list">
                {stack.items.map((item, itemIndex) => (
                  <li key={itemIndex} className="text-sm text-muted-foreground flex items-center">
                    <span className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </ContentSection>

      {/* Key Features */}
      <ContentSection
        title="Key Features & Benefits"
        description="What makes this application special"
        asCard
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-4">
            <h4 className="font-semibold">Developer Experience</h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>• Type-safe development with TypeScript</li>
              <li>• Hot module replacement with Vite</li>
              <li>• Component-driven development</li>
              <li>• Comprehensive testing setup</li>
              <li>• Git hooks and linting</li>
            </ul>
          </div>
          
          <div className="space-y-4">
            <h4 className="font-semibold">User Experience</h4>
            <ul className="space-y-2 text-sm text-muted-foreground" role="list">
              <li>• Fully accessible (WCAG 2.2 AA)</li>
              <li>• Responsive design with container queries</li>
              <li>• Dark/light mode support with toggle</li>
              <li>• Fast loading and smooth interactions</li>
              <li>• Keyboard navigation support</li>
            </ul>
          </div>
        </div>
      </ContentSection>

      {/* Call to Action */}
      <ContentSection
        title="Explore the Demos"
        description="Navigate through different sections to see the features in action"
        asCard
      >
        <div className="flex flex-wrap gap-3 mt-6">
          <Button onClick={() => onNavigate?.('components-demo')} variant="default">
            View Components
          </Button>
          <Button onClick={() => onNavigate?.('tanstack-demo')} variant="outline">
            TanStack Features
          </Button>
          <Button onClick={() => onNavigate?.('api-demo')} variant="outline">
            API Integration
          </Button>
          <Button onClick={() => onNavigate?.('accessibility-demo')} variant="outline">
            Accessibility
          </Button>
        </div>
      </ContentSection>
    </div>
  )
}

export default LandingPage