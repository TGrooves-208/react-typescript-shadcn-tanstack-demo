import React, { createContext, useContext, useState } from 'react'
import type { ReactNode } from 'react'
import { useQuery } from '@tanstack/react-query'

// Types
interface ApiEndpoint {
  id: string
  label: string
  description: string
  endpoint?: string
  query?: string
}

interface APIIntegrationContextType {
  // API Type Management
  apiType: 'rest' | 'graphql'
  setApiType: (type: 'rest' | 'graphql') => void
  
  // Endpoint Selection
  selectedEndpoint: string | null
  selectEndpoint: (id: string, buttonRef: HTMLButtonElement) => void
  getSelectedEndpoint: () => ApiEndpoint | undefined
  clearResponse: () => void
  
  // Data Management
  data: any
  isLoading: boolean
  error: Error | null
  refreshCurrentEndpoint: () => Promise<void>
  
  // Current endpoints based on API type
  currentEndpoints: ApiEndpoint[]
}

// API Endpoints Configuration
const restEndpoints: ApiEndpoint[] = [
  {
    id: 'get-all-users',
    label: 'Get All Users',
    description: 'Fetch all users from the database',
    endpoint: '/api/v1/users'
  },
  {
    id: 'get-user-1',
    label: 'Get User ID: 1',
    description: 'Richard Hendricks (CEO, Pied Piper)',
    endpoint: '/api/v1/users/1'
  },
  {
    id: 'get-user-2',
    label: 'Get User ID: 2',
    description: 'Erlich Bachman (Entrepreneur, Aviato)',
    endpoint: '/api/v1/users/2'
  },
  {
    id: 'get-user-3',
    label: 'Get User ID: 3',
    description: 'Bertram Gilfoyle (System Admin, Pied Piper)',
    endpoint: '/api/v1/users/3'
  },
  {
    id: 'get-user-4',
    label: 'Get User ID: 4',
    description: 'Dinesh Chugtai (Developer, Pied Piper)',
    endpoint: '/api/v1/users/4'
  },
  {
    id: 'get-user-5',
    label: 'Get User ID: 5',
    description: 'Jared Dunn (COO, Pied Piper)',
    endpoint: '/api/v1/users/5'
  },
  {
    id: 'get-user-6',
    label: 'Get User ID: 6',
    description: 'Gavin Belson (CEO, Hooli)',
    endpoint: '/api/v1/users/6'
  },
  {
    id: 'get-user-7',
    label: 'Get User ID: 7',
    description: 'Jing Yang (CEO, New Pied Piper)',
    endpoint: '/api/v1/users/7'
  },
  {
    id: 'get-user-8',
    label: 'Get User ID: 8',
    description: 'Big Head (XYZ, Hooli)',
    endpoint: '/api/v1/users/8'
  },
  {
    id: 'get-user-9',
    label: 'Get User ID: 9',
    description: 'Monica Hall (Investor, Raviga)',
    endpoint: '/api/v1/users/9'
  },
  {
    id: 'get-user-999',
    label: 'Get User ID: 999',
    description: 'Test Error Handling - Non-existent user',
    endpoint: '/api/v1/users/999'
  }
]

const graphqlEndpoints: ApiEndpoint[] = [
  {
    id: 'gql-all-users',
    label: 'Get All Users',
    description: 'GraphQL query to fetch all users with full details',
    query: `
query GetAllUsers {
  users {
    id
    name
    email
    profession
    company
    created_at
  }
}`
  },
  {
    id: 'gql-user-1',
    label: 'Get User ID: 1',
    description: 'Richard Hendricks (CEO, Pied Piper)',
    query: `
query GetUser1 {
  user(id: "1") {
    id
    name
    email
    profession
    company
    created_at
  }
}`
  },
  {
    id: 'gql-user-2',
    label: 'Get User ID: 2',
    description: 'Erlich Bachman (Entrepreneur, Aviato)',
    query: `
query GetUser2 {
  user(id: "2") {
    id
    name
    email
    profession
    company
    created_at
  }
}`
  },
  {
    id: 'gql-user-5',
    label: 'Get User ID: 5',
    description: 'Jared Dunn (COO, Pied Piper)',
    query: `
query GetUser5 {
  user(id: "5") {
    id
    name
    email
    profession
    company
    created_at
  }
}`
  },
  {
    id: 'gql-user-999',
    label: 'Get User ID: 999',
    description: 'Test Error Handling - Non-existent user',
    query: `
query GetUser999 {
  user(id: "999") {
    id
    name
    email
    profession
    company
    created_at
  }
}`
  },
  {
    id: 'gql-users-by-company-pp',
    label: 'Users by Company (Pied Piper)',
    description: 'All Pied Piper employees',
    query: `
query GetPiedPiperUsers {
  usersByCompany(company: "Pied Piper") {
    id
    name
    profession
    company
    email
  }
}`
  },
  {
    id: 'gql-users-by-company-hooli',
    label: 'Users by Company (Hooli)',
    description: 'All Hooli employees',
    query: `
query GetHooliUsers {
  usersByCompany(company: "Hooli") {
    id
    name
    profession
    company
    email
  }
}`
  },
  {
    id: 'gql-users-by-company-aviato',
    label: 'Users by Company (Aviato)',
    description: 'All Aviato employees',
    query: `
query GetAviatoUsers {
  usersByCompany(company: "Aviato") {
    id
    name
    profession
    company
    email
  }
}`
  },
  {
    id: 'gql-users-by-profession-ceo',
    label: 'Users by Profession (CEO)',
    description: 'All CEOs across companies',
    query: `
query GetCEOs {
  usersByProfession(profession: "CEO") {
    id
    name
    company
    profession
    email
  }
}`
  },
  {
    id: 'gql-users-by-profession-dev',
    label: 'Users by Profession (Developer)',
    description: 'All developers',
    query: `
query GetDevelopers {
  usersByProfession(profession: "Developer") {
    id
    name
    company
    profession
    email
  }
}`
  },
  {
    id: 'gql-users-by-profession-investor',
    label: 'Users by Profession (Investor)',
    description: 'All investors',
    query: `
query GetInvestors {
  usersByProfession(profession: "Investor") {
    id
    name
    company
    profession
    email
  }
}`
  }
]

// Supabase Configuration
const SUPABASE_URL = 'https://cytjfphfunvaapqvwsiv.supabase.co'
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5dGpmcGhmdW52YWFwcXZ3c2l2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjE3NzA5ODUsImV4cCI6MjA3NzM0Njk4NX0.VdbaFXUU8Fcm9FNKCPTkFVk3oZpxOY_K5ZptSVRBDyQ'

// Note: REST API calls go directly to Supabase, GraphQL calls are converted to REST calls for deployment compatibility

// API Functions
const fetchRestData = async (endpoint: string): Promise<any> => {
  // Convert our endpoint format to Supabase REST API format
  let supabaseEndpoint = endpoint
  
  if (endpoint === '/api/v1/users') {
    supabaseEndpoint = '/rest/v1/users?select=*'
  } else if (endpoint.startsWith('/api/v1/users/')) {
    const userId = endpoint.split('/').pop()
    supabaseEndpoint = `/rest/v1/users?id=eq.${userId}&select=*`
  }
  
  const response = await fetch(`${SUPABASE_URL}${supabaseEndpoint}`, {
    headers: {
      'apikey': SUPABASE_ANON_KEY,
      'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json'
    }
  })
  
  if (!response.ok) {
    throw new Error(`REST API Error: ${response.status} ${response.statusText}`)
  }
  
  const data = await response.json()
  
  // If querying single user, return first result or null for 404
  if (endpoint.includes('/users/')) {
    return data.length > 0 ? data[0] : null
  }
  
  return data
}

const fetchGraphQLData = async (query: string): Promise<any> => {
  // Convert GraphQL queries to equivalent Supabase REST API calls
  // This allows GraphQL demo to work in production without a backend server
  
  if (query.includes('users {')) {
    // Get all users query
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?select=*&order=created_at.asc`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error(`REST API Error: ${response.status}`)
    const data = await response.json()
    return { users: data }
    
  } else if (query.includes('user(id:')) {
    // Single user by ID query
    const idMatch = query.match(/user\(id:\s*"(\d+)"\)/)
    if (!idMatch) throw new Error('Invalid user ID in query')
    const userId = idMatch[1]
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?id=eq.${userId}&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error(`REST API Error: ${response.status}`)
    const data = await response.json()
    return { user: data.length > 0 ? data[0] : null }
    
  } else if (query.includes('usersByCompany(company:')) {
    // Users by company query
    const companyMatch = query.match(/usersByCompany\(company:\s*"([^"]+)"\)/)
    if (!companyMatch) throw new Error('Invalid company in query')
    const company = companyMatch[1]
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?company=eq.${encodeURIComponent(company)}&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error(`REST API Error: ${response.status}`)
    const data = await response.json()
    return { usersByCompany: data }
    
  } else if (query.includes('usersByProfession(profession:')) {
    // Users by profession query
    const professionMatch = query.match(/usersByProfession\(profession:\s*"([^"]+)"\)/)
    if (!professionMatch) throw new Error('Invalid profession in query')
    const profession = professionMatch[1]
    
    const response = await fetch(`${SUPABASE_URL}/rest/v1/users?profession=eq.${encodeURIComponent(profession)}&select=*`, {
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': `Bearer ${SUPABASE_ANON_KEY}`,
        'Content-Type': 'application/json'
      }
    })
    if (!response.ok) throw new Error(`REST API Error: ${response.status}`)
    const data = await response.json()
    return { usersByProfession: data }
    
  } else {
    throw new Error('Unsupported GraphQL query - this demo converts common queries to REST calls')
  }
}

// Create Context
const APIIntegrationContext = createContext<APIIntegrationContextType | undefined>(undefined)

// Provider Component
interface APIIntegrationProviderProps {
  children: ReactNode
}

export const APIIntegrationProvider: React.FC<APIIntegrationProviderProps> = ({ children }) => {
  const [apiType, setApiType] = useState<'rest' | 'graphql'>('rest')
  const [selectedEndpoint, setSelectedEndpoint] = useState<string | null>(null)
  const [triggeringButtonRef, setTriggeringButtonRef] = useState<HTMLButtonElement | null>(null)

  // Get current endpoints based on API type
  const currentEndpoints = apiType === 'rest' ? restEndpoints : graphqlEndpoints

  // Query for API data
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['api-demo', apiType, selectedEndpoint],
    queryFn: async () => {
      if (!selectedEndpoint) return null
      
      const endpoint = currentEndpoints.find(e => e.id === selectedEndpoint)
      if (!endpoint) return null

      if (apiType === 'rest' && endpoint.endpoint) {
        return fetchRestData(endpoint.endpoint)
      } else if (apiType === 'graphql' && endpoint.query) {
        return fetchGraphQLData(endpoint.query)
      }
      
      return null
    },
    enabled: !!selectedEndpoint,
    retry: 1,
    staleTime: 0 // Always fetch fresh data for demo purposes
  })

  // Enhanced selectEndpoint function
  const selectEndpoint = (id: string, buttonRef: HTMLButtonElement) => {
    setSelectedEndpoint(id)
    setTriggeringButtonRef(buttonRef)
  }

  // Enhanced refresh function - refreshes current endpoint and returns focus
  const refreshCurrentEndpoint = async () => {
    if (!selectedEndpoint) return
    
    // Refetch the data
    await refetch()
    
    // Focus back to the triggering button for accessibility
    if (triggeringButtonRef) {
      triggeringButtonRef.focus()
      
      // Announce the refresh to screen readers
      const selectedEndpointData = currentEndpoints.find(e => e.id === selectedEndpoint)
      const announcement = `Data refreshed for ${selectedEndpointData?.label}`
      const ariaLive = document.createElement('div')
      ariaLive.setAttribute('aria-live', 'polite')
      ariaLive.setAttribute('aria-atomic', 'true')
      ariaLive.className = 'sr-only'
      ariaLive.textContent = announcement
      document.body.appendChild(ariaLive)
      setTimeout(() => document.body.removeChild(ariaLive), 1000)
    }
  }

  // Clear response and return focus
  const clearResponse = () => {
    setSelectedEndpoint(null)
    
    // Focus back to the triggering button for accessibility
    if (triggeringButtonRef) {
      triggeringButtonRef.focus()
      
      // Announce the clear to screen readers
      const announcement = 'Response cleared'
      const ariaLive = document.createElement('div')
      ariaLive.setAttribute('aria-live', 'polite')
      ariaLive.setAttribute('aria-atomic', 'true')
      ariaLive.className = 'sr-only'
      ariaLive.textContent = announcement
      document.body.appendChild(ariaLive)
      setTimeout(() => document.body.removeChild(ariaLive), 1000)
    }
    
    setTriggeringButtonRef(null)
  }

  // Get selected endpoint helper
  const getSelectedEndpoint = () => {
    return currentEndpoints.find(e => e.id === selectedEndpoint)
  }

  // Enhanced setApiType that clears selection
  const handleSetApiType = (type: 'rest' | 'graphql') => {
    setApiType(type)
    setSelectedEndpoint(null)
    setTriggeringButtonRef(null)
  }

  const contextValue: APIIntegrationContextType = {
    apiType,
    setApiType: handleSetApiType,
    selectedEndpoint,
    selectEndpoint,
    getSelectedEndpoint,
    clearResponse,
    data,
    isLoading,
    error,
    refreshCurrentEndpoint,
    currentEndpoints
  }

  return (
    <APIIntegrationContext.Provider value={contextValue}>
      {children}
    </APIIntegrationContext.Provider>
  )
}

// Custom Hook
export const useAPIIntegration = (): APIIntegrationContextType => {
  const context = useContext(APIIntegrationContext)
  if (context === undefined) {
    throw new Error('useAPIIntegration must be used within an APIIntegrationProvider')
  }
  return context
}

export default APIIntegrationProvider