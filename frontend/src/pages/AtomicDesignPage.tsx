import React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { ThemeToggle } from '@/components/atoms/ThemeToggle'
import { PrimaryButton } from '@/components/atoms/PrimaryButton'

/**
 * Atomic Design Demo Page
 * 
 * This page demonstrates how we implemented Brad Frost's Atomic Design methodology
 * in our React application with modern container queries for responsive design.
 */
const AtomicDesignPage: React.FC = () => {
  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Atomic Design Architecture</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Discover how we built this application using Brad Frost's Atomic Design methodology,
          creating a scalable component system with modern container queries.
        </p>
      </div>

      {/* What is Atomic Design? */}
      <Card>
        <CardHeader>
          <CardTitle>What is Atomic Design?</CardTitle>
          <CardDescription>
            Understanding the methodology that powers our component architecture
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-muted-foreground">
            Atomic Design is a methodology created by Brad Frost for creating design systems. 
            It's based on the idea that all matter (digital or physical) is comprised of atoms, 
            which bond together to form molecules, which combine to form organisms.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 mt-6">
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-blue-500 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                A
              </div>
              <h4 className="font-semibold">Atoms</h4>
              <p className="text-sm text-muted-foreground">Basic building blocks</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-green-500 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                M
              </div>
              <h4 className="font-semibold">Molecules</h4>
              <p className="text-sm text-muted-foreground">Groups of atoms</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-orange-500 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                O
              </div>
              <h4 className="font-semibold">Organisms</h4>
              <p className="text-sm text-muted-foreground">Complex UI sections</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-purple-500 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                T
              </div>
              <h4 className="font-semibold">Templates</h4>
              <p className="text-sm text-muted-foreground">Page-level objects</p>
            </div>
            
            <div className="text-center space-y-2">
              <div className="w-12 h-12 bg-red-500 rounded-full mx-auto flex items-center justify-center text-white font-bold">
                P
              </div>
              <h4 className="font-semibold">Pages</h4>
              <p className="text-sm text-muted-foreground">Specific instances</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Container Queries Demo */}
      <Card>
        <CardHeader>
          <CardTitle>Container Queries in Action</CardTitle>
          <CardDescription>
            Modern responsive design with container queries - resize your browser to see the magic!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="container-demo bg-gradient-to-br from-blue-50 to-purple-50 dark:from-blue-950/20 dark:to-purple-950/20 rounded-lg p-6"
            style={{ 
              containerType: 'inline-size',
              containerName: 'demo-container'
            }}
          >
            <div className="responsive-grid">
              <div className="demo-card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h4 className="font-semibold mb-2">Container Query Responsive</h4>
                <p className="text-sm text-muted-foreground">
                  This layout adapts based on container size, not viewport size!
                </p>
              </div>
              
              <div className="demo-card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h4 className="font-semibold mb-2">Modern CSS</h4>
                <p className="text-sm text-muted-foreground">
                  Using @container queries for component-level responsiveness.
                </p>
              </div>
              
              <div className="demo-card bg-white dark:bg-gray-800 rounded-lg p-4 shadow-md">
                <h4 className="font-semibold mb-2">Future-Ready</h4>
                <p className="text-sm text-muted-foreground">
                  Container queries are the future of responsive design!
                </p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Our Atomic Implementation */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        
        {/* Atoms Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                A
              </div>
              Atoms
            </CardTitle>
            <CardDescription>Basic UI elements that can't be broken down further</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h5 className="font-medium mb-2">Button Atom</h5>
                <div className="flex gap-2 flex-wrap">
                  <Button variant="default">Default</Button>
                  <Button variant="outline">Outline</Button>
                  <Button variant="ghost">Ghost</Button>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Input Atom</h5>
                <Input placeholder="Type something..." className="max-w-xs" />
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Theme Toggle Atom</h5>
                <ThemeToggle />
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Primary Button Atom</h5>
                <PrimaryButton onClick={() => alert('Atom clicked!')}>
                  Custom Atom
                </PrimaryButton>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <strong>File locations:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• <code>components/ui/button.tsx</code></li>
                <li>• <code>components/ui/input.tsx</code></li>
                <li>• <code>components/atoms/ThemeToggle.tsx</code></li>
                <li>• <code>components/atoms/PrimaryButton.tsx</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Molecules Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                M
              </div>
              Molecules
            </CardTitle>
            <CardDescription>Simple groups of UI elements functioning together</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-4">
              <div>
                <h5 className="font-medium mb-2">Search Form Molecule</h5>
                <div className="flex gap-2">
                  <Input placeholder="Search..." className="flex-1" />
                  <Button>Search</Button>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Card Header Molecule</h5>
                <div className="border rounded-lg p-4">
                  <h6 className="font-semibold">Card Title</h6>
                  <p className="text-sm text-muted-foreground">Card description text</p>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Action Group Molecule</h5>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Cancel</Button>
                  <Button size="sm">Save</Button>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <strong>File locations:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• <code>components/molecules/HeaderNavigation.tsx</code></li>
                <li>• <code>components/molecules/MobileNavigation.tsx</code></li>
                <li>• Form groups in various pages</li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Organisms Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                O
              </div>
              Organisms
            </CardTitle>
            <CardDescription>Complex UI components composed of molecules and atoms</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h5 className="font-medium mb-2">App Header Organism</h5>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 bg-primary rounded"></div>
                      <span className="font-medium">Navigation Menu</span>
                    </div>
                    <ThemeToggle />
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Data Table Organism</h5>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Input placeholder="Filter..." className="max-w-xs" />
                      <Button size="sm">Add New</Button>
                    </div>
                    <div className="border rounded h-20 flex items-center justify-center text-sm text-muted-foreground">
                      Table with pagination, sorting, filtering
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <strong>File locations:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• <code>components/organisms/AppHeader.tsx</code></li>
                <li>• <code>components/organisms/AppFooter.tsx</code></li>
                <li>• <code>components/organisms/AppNavigation.tsx</code></li>
                <li>• <code>components/organisms/MainContent.tsx</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Templates & Pages Section */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-8 h-8 bg-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                T
              </div>
              Templates & Pages
            </CardTitle>
            <CardDescription>Page-level layouts and specific content instances</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-3">
              <div>
                <h5 className="font-medium mb-2">Main Layout Template</h5>
                <div className="border rounded-lg p-3 bg-muted/30">
                  <div className="space-y-2 text-sm">
                    <div className="h-8 bg-primary/20 rounded flex items-center px-2">Header</div>
                    <div className="flex gap-2">
                      <div className="w-48 h-16 bg-secondary/30 rounded flex items-center justify-center">Sidebar</div>
                      <div className="flex-1 h-16 bg-accent/30 rounded flex items-center justify-center">Main Content</div>
                    </div>
                    <div className="h-6 bg-muted rounded flex items-center px-2">Footer</div>
                  </div>
                </div>
              </div>
              
              <div>
                <h5 className="font-medium mb-2">Page Examples</h5>
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div className="border rounded p-2 text-center">Landing Page</div>
                  <div className="border rounded p-2 text-center">ShadCN Demo</div>
                  <div className="border rounded p-2 text-center">TanStack Features</div>
                  <div className="border rounded p-2 text-center">API Integration</div>
                </div>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-muted rounded-lg text-sm">
              <strong>File locations:</strong>
              <ul className="mt-1 space-y-1 text-muted-foreground">
                <li>• <code>components/templates/MainLayout.tsx</code></li>
                <li>• <code>pages/LandingPage.tsx</code></li>
                <li>• <code>pages/ShadCNComponentsPage.tsx</code></li>
                <li>• <code>pages/TanStackFeaturesPage.tsx</code></li>
                <li>• <code>pages/APIIntegrationPage.tsx</code></li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Benefits */}
      <Card>
        <CardHeader>
          <CardTitle>Benefits of Our Atomic Design Implementation</CardTitle>
          <CardDescription>
            Why this methodology makes our codebase more maintainable and scalable
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="space-y-2">
              <h4 className="font-semibold text-green-700 dark:text-green-400">Reusability</h4>
              <p className="text-sm text-muted-foreground">
                Components can be reused across different pages and contexts, reducing code duplication.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-blue-600 dark:text-blue-400">Testability</h4>
              <p className="text-sm text-muted-foreground">
                Smaller, focused components are easier to test in isolation.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-purple-600 dark:text-purple-400">Documentation</h4>
              <p className="text-sm text-muted-foreground">
                Clear component hierarchy makes the system self-documenting.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-orange-700 dark:text-orange-400">Maintainability</h4>
              <p className="text-sm text-muted-foreground">
                Changes to atoms automatically propagate through the entire system.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-red-600 dark:text-red-400">Performance</h4>
              <p className="text-sm text-muted-foreground">
                Component-based architecture enables better code splitting and lazy loading.
              </p>
            </div>
            
            <div className="space-y-2">
              <h4 className="font-semibold text-indigo-600 dark:text-indigo-400">Team Collaboration</h4>
              <p className="text-sm text-muted-foreground">
                Common vocabulary and structure improves team communication.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default AtomicDesignPage