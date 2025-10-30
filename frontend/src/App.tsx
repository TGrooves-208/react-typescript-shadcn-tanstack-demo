import { useState } from 'react'
import MainLayout from '@/components/templates/MainLayout'
import AppNavigation from '@/components/organisms/AppNavigation'
import AppHeader from '@/components/organisms/AppHeader'
import AppFooter from '@/components/organisms/AppFooter'
import MainContent from '@/components/organisms/MainContent'
import MobileNavigation from '@/components/molecules/MobileNavigation'
import TanStackQueryProvider from '@/components/providers/TanStackQueryProvider'
import LandingPage from '@/pages/LandingPage'
import ShadCNComponentsPage from '@/pages/ShadCNComponentsPage'
import TanStackFeaturesPage from '@/pages/TanStackFeaturesPage'
import APIIntegrationPage from '@/pages/APIIntegrationPage'
import AtomicDesignPage from '@/pages/AtomicDesignPage'
import AccessibilityAuditPage from '@/pages/AccessibilityAuditPage'

// Navigation items for the application
const navigationItems = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: '/',
    description: 'Overview and landing page',
    isActive: true
  },
  {
    id: 'components-demo',
    label: 'ShadCN Components',
    href: '/components',
    description: 'UI component showcase'
  },
  {
    id: 'tanstack-demo',
    label: 'TanStack Features',
    href: '/tanstack',
    description: 'Query, Table, and Form demos'
  },
  {
    id: 'api-demo',
    label: 'API Integration',
    href: '/api',
    description: 'REST and GraphQL examples'
  },
  {
    id: 'atomic-demo',
    label: 'Atomic Design',
    href: '/atomic',
    description: 'Component architecture showcase'
  },
  {
    id: 'accessibility-demo',
    label: 'Accessibility Audit',
    href: '/accessibility',
    description: 'WCAG 2.2 compliance audit results'
  }
]

/**
 * Main App component showcasing React + ShadCN + TanStack
 * with full WCAG 2.2 AA accessibility compliance
 */
export default function App() {
  const [currentPage, setCurrentPage] = useState('dashboard')
  
  // Update navigation items based on current page
  const updatedNavItems = navigationItems.map(item => ({
    ...item,
    isActive: item.id === currentPage
  }))

  // Create compact navigation items for header
  const headerNavItems = updatedNavItems.map(item => ({
    ...item,
    label: item.id === 'components-demo' ? 'Components' :
           item.id === 'tanstack-demo' ? 'TanStack' :
           item.id === 'api-demo' ? 'API' :
           item.id === 'atomic-demo' ? 'Atomic' :
           item.id === 'accessibility-demo' ? 'A11y' :
           item.label
  }))

  const handleNavigation = (item: { id: string; label: string; href: string }) => {
    setCurrentPage(item.id)
    // Announce page change to screen readers
    const announcement = `Navigated to ${item.label} page`
    const ariaLive = document.createElement('div')
    ariaLive.setAttribute('aria-live', 'polite')
    ariaLive.setAttribute('aria-atomic', 'true')
    ariaLive.className = 'sr-only'
    ariaLive.textContent = announcement
    document.body.appendChild(ariaLive)
    setTimeout(() => document.body.removeChild(ariaLive), 1000)
  }

  const renderCurrentPage = () => {
    switch (currentPage) {
      case 'dashboard':
        return (
          <LandingPage onNavigate={(section) => setCurrentPage(section)} />
        )
      case 'components-demo':
        return <ShadCNComponentsPage />
      case 'tanstack-demo':
        return <TanStackFeaturesPage />
      case 'api-demo':
        return <APIIntegrationPage />
      case 'atomic-demo':
        return <AtomicDesignPage />
      case 'accessibility-demo':
        return <AccessibilityAuditPage />
      default:
        return <LandingPage onNavigate={(section) => setCurrentPage(section)} />
    }
  }

  const currentPageTitle = updatedNavItems.find(item => item.isActive)?.label || 'Dashboard'

  return (
    <TanStackQueryProvider>
      <MainLayout>
        {/* Top Navigation Bar */}
        <AppHeader 
          title={currentPageTitle}
          navigationItems={headerNavItems}
          onNavigate={handleNavigation}
          mobileNavButton={
            <MobileNavigation 
              items={updatedNavItems} 
              onNavigate={handleNavigation}
            />
          }
        />

        {/* Content Area with Sidebar and Main */}
        <div className="flex flex-1 overflow-hidden">
          {/* Desktop Navigation Sidebar */}
          <AppNavigation 
            items={updatedNavItems} 
            onNavigate={handleNavigation}
          />

          {/* Main Content Area */}
          <MainContent
            title={currentPage === 'dashboard' ? undefined : currentPageTitle}
            description={currentPage === 'dashboard' ? undefined : updatedNavItems.find(item => item.isActive)?.description}
          >
            {renderCurrentPage()}
          </MainContent>
        </div>

        {/* Footer spans full width like navbar */}
        <AppFooter />
      </MainLayout>
    </TanStackQueryProvider>
  )
}
