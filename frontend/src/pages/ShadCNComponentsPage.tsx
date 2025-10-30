import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card'
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ContentSection } from '@/components/organisms/MainContent'
import ThemeToggle from '@/components/atoms/ThemeToggle'
import { cn } from '@/lib/utils'

interface ShadCNComponentsPageProps {
  className?: string
}

/**
 * Atomic Design: PAGE
 * ShadCN Components showcase demonstrating composition patterns
 * Shows how individual components combine to create complex UIs
 */
export const ShadCNComponentsPage: React.FC<ShadCNComponentsPageProps> = ({ className }) => {
  const [inputValue, setInputValue] = useState('')
  const [buttonClicks, setButtonClicks] = useState(0)

  return (
    <div className={cn('space-y-8', className)}>
      {/* Introduction */}
      <ContentSection
        title="ShadCN UI Components"
        description="Building blocks for modern web applications - showcasing composition and accessibility"
        asCard
      >
        <div className="space-y-4">
          <p className="text-foreground/70">
            ShadCN UI provides a collection of copy-and-paste components built on top of Radix UI and Tailwind CSS. 
            These components are designed to be composable, accessible, and customizable.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <h4 className="font-semibold mb-2">Key Benefits</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Built on Radix UI primitives</li>
                <li>• Full accessibility support (WCAG 2.2)</li>
                <li>• Customizable with Tailwind CSS</li>
                <li>• Copy-paste, no package dependencies</li>
                <li>• TypeScript support included</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Component Composition</h4>
              <ul className="text-sm text-foreground/70 space-y-1">
                <li>• Atomic Design principles</li>
                <li>• Compound component patterns</li>
                <li>• Flexible prop interfaces</li>
                <li>• Consistent design tokens</li>
                <li>• Theme-aware styling</li>
              </ul>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Button Components */}
      <ContentSection
        title="Button Component"
        description="Interactive elements with multiple variants and states"
        asCard
      >
        <div className="space-y-6">
          <div>
            <h4 className="font-semibold mb-3">Button Variants</h4>
            <div className="flex flex-wrap gap-3">
              <Button variant="default">Default</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="outline">Outline</Button>
              <Button variant="ghost">Ghost</Button>
              <Button variant="link">Link</Button>
              <Button variant="destructive">Destructive</Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Button Sizes</h4>
            <div className="flex flex-wrap items-center gap-3">
              <Button size="sm">Small</Button>
              <Button size="default">Default</Button>
              <Button size="lg">Large</Button>
              <Button size="icon">📱</Button>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Interactive Example</h4>
            <div className="flex items-center gap-4">
              <Button 
                onClick={() => setButtonClicks(prev => prev + 1)}
                className="transition-all"
              >
                Click me! ({buttonClicks})
              </Button>
              <Button 
                variant="outline" 
                onClick={() => setButtonClicks(0)}
                disabled={buttonClicks === 0}
              >
                Reset
              </Button>
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Input Components */}
      <ContentSection
        title="Input Component"
        description="Form inputs with built-in validation and accessibility"
        asCard
      >
        <div className="space-y-4">
          <div>
            <h4 className="font-semibold mb-3">Basic Input</h4>
            <div className="max-w-md space-y-3">
              <Input 
                placeholder="Enter some text..."
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              <p className="text-sm text-foreground/70">
                Current value: <code className="bg-accent text-accent-foreground px-2 py-1 rounded border text-sm font-mono">{inputValue || 'No input yet'}</code>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Input States</h4>
            <div className="max-w-md space-y-3">
              <Input placeholder="Normal input" />
              <Input placeholder="Disabled input" disabled />
              <Input placeholder="Error state" className="border-destructive focus-visible:ring-destructive" />
            </div>
          </div>
        </div>
      </ContentSection>

      {/* Card Composition */}
      <ContentSection
        title="Card Composition"
        description="Flexible containers demonstrating compound component patterns"
        asCard
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Card>
            <CardHeader>
              <CardTitle>Simple Card</CardTitle>
              <CardDescription>
                Basic card with header and content
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-foreground/70">
                This demonstrates the compound component pattern where Card, CardHeader, 
                CardTitle, and CardContent work together.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Interactive Card</CardTitle>
              <CardDescription>
                Card with actions and state
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <Input placeholder="Card input..." />
                <p className="text-sm text-foreground/70">
                  Components compose naturally within cards.
                </p>
              </div>
            </CardContent>
            <CardFooter>
              <Button className="w-full">Card Action</Button>
            </CardFooter>
          </Card>

          <Card className="border-dashed">
            <CardHeader>
              <CardTitle>Customized Card</CardTitle>
              <CardDescription>
                Styled with custom classes
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="text-center space-y-2">
                <div className="text-3xl">🎨</div>
                <p className="text-sm text-foreground/70">
                  Easy to customize with Tailwind CSS classes.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </ContentSection>

      {/* Sheet/Modal Components */}
      <ContentSection
        title="Sheet Component"
        description="Overlays and modals with focus management"
        asCard
      >
        <div className="space-y-4">
          <p className="text-foreground/70">
            Sheet components provide modal overlays with proper focus management and accessibility features.
          </p>
          
          <div className="flex flex-wrap gap-3">
            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Left Sheet</Button>
              </SheetTrigger>
              <SheetContent side="left">
                <SheetHeader>
                  <SheetTitle>Left Side Sheet</SheetTitle>
                  <SheetDescription>
                    This sheet slides in from the left side of the screen.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6 space-y-4">
                  <Input placeholder="Sheet input..." />
                  <Button className="w-full">Sheet Action</Button>
                </div>
              </SheetContent>
            </Sheet>

            <Sheet>
              <SheetTrigger asChild>
                <Button variant="outline">Open Right Sheet</Button>
              </SheetTrigger>
              <SheetContent side="right">
                <SheetHeader>
                  <SheetTitle>Right Side Sheet</SheetTitle>
                  <SheetDescription>
                    Demonstrates the flexible side prop for different slide directions.
                  </SheetDescription>
                </SheetHeader>
                <div className="mt-6">
                  <p className="text-sm text-foreground/70">
                    Sheet components automatically handle focus management, 
                    keyboard navigation, and screen reader announcements.
                  </p>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </ContentSection>

      {/* Component Composition Explanation */}
      <ContentSection
        title="Understanding Composition"
        description="How ShadCN components work together to build complex UIs"
        asCard
      >
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-3">Atomic Design Pattern</h4>
              <div className="space-y-2 text-sm text-foreground/70">
                <p><strong>Atoms:</strong> Button, Input, ThemeToggle</p>
                <p><strong>Molecules:</strong> HeaderNavigation, MobileNavigation</p>
                <p><strong>Organisms:</strong> AppHeader, AppNavigation, MainContent</p>
                <p><strong>Templates:</strong> MainLayout</p>
                <p><strong>Pages:</strong> LandingPage, ShadCNComponentsPage</p>
              </div>
            </div>
            
            <div>
              <h4 className="font-semibold mb-3">Compound Components</h4>
              <div className="space-y-2 text-sm text-foreground/70">
                <p><strong>Card:</strong> Card + CardHeader + CardContent + CardFooter</p>
                <p><strong>Sheet:</strong> Sheet + SheetTrigger + SheetContent + SheetHeader</p>
                <p><strong>Navigation:</strong> Multiple Button components with shared state</p>
                <p><strong>Theme:</strong> Provider pattern wrapping the entire app</p>
              </div>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-3">Next: TanStack Integration</h4>
            <p className="text-foreground/70">
              In the TanStack Features section, you'll see how these ShadCN components combine with 
              TanStack Query for data fetching, TanStack Table for advanced data display, and 
              TanStack Form for complex form handling. The composition patterns you see here scale 
              up to create powerful, interactive applications.
            </p>
          </div>
        </div>
      </ContentSection>

      {/* Theme Integration Demo */}
      <ContentSection
        title="Theme Integration"
        description="How components respond to theme changes"
        asCard
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-foreground/70">
              All components automatically adapt to light/dark themes using CSS variables.
            </p>
            <ThemeToggle />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="bg-card">
              <CardHeader>
                <CardTitle>Theme-Aware Card</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-foreground/70 text-sm">
                  Colors, borders, and backgrounds automatically adjust based on the current theme.
                </p>
              </CardContent>
            </Card>
            
            <div className="space-y-3">
              <Button variant="default" className="w-full">Primary Button</Button>
              <Button variant="secondary" className="w-full">Secondary Button</Button>
              <Input placeholder="Theme-aware input..." />
            </div>
          </div>
        </div>
      </ContentSection>
    </div>
  )
}

export default ShadCNComponentsPage
