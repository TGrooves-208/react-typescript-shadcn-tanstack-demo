import React from 'react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { APIIntegrationProvider, useAPIIntegration } from '@/components/providers/APIIntegrationProvider'

/**
 * API Type Toggle Component
 */
const APITypeToggle: React.FC = () => {
  const { apiType, setApiType } = useAPIIntegration()

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Type Selection</CardTitle>
        <CardDescription>
          Switch between REST v1 and GraphQL v2 to explore different API paradigms
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex gap-2">
          <Button
            variant={apiType === 'rest' ? 'default' : 'outline'}
            onClick={() => setApiType('rest')}
            aria-pressed={apiType === 'rest'}
          >
            REST v1 API
          </Button>
          <Button
            variant={apiType === 'graphql' ? 'default' : 'outline'}
            onClick={() => setApiType('graphql')}
            aria-pressed={apiType === 'graphql'}
          >
            GraphQL v2 API
          </Button>
        </div>
        <div className="mt-4 p-4 bg-accent rounded-lg">
          <h4 className="font-semibold mb-2">
            {apiType === 'rest' ? 'REST API Features' : 'GraphQL API Features'}
          </h4>
          <ul className="text-sm text-foreground/70 space-y-1">
            {apiType === 'rest' ? (
              <>
                <li>• Traditional HTTP methods (GET, POST, PUT, DELETE)</li>
                <li>• Simple endpoint-based resource access</li>
                <li>• Fixed response structure</li>
                <li>• Easy caching and CDN integration</li>
              </>
            ) : (
              <>
                <li>• Single endpoint with flexible querying</li>
                <li>• Request exactly the data you need</li>
                <li>• Powerful filtering and search capabilities</li>
                <li>• Strong type system and introspection</li>
              </>
            )}
          </ul>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * API Endpoints List Component
 */
const APIEndpointsList: React.FC = () => {
  const { apiType, currentEndpoints, selectedEndpoint, selectEndpoint } = useAPIIntegration()

  return (
    <Card className="h-fit">
      <CardHeader>
        <CardTitle>
          {apiType === 'rest' ? 'REST Endpoints' : 'GraphQL Queries'}
        </CardTitle>
        <CardDescription>
          Click any endpoint to fetch live data from our Supabase database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
          {currentEndpoints.map((endpoint) => (
            <div key={endpoint.id} className="space-y-2">
              <Button
                variant={selectedEndpoint === endpoint.id ? 'default' : 'outline'}
                className="w-full justify-start h-auto p-4"
                onClick={(e) => selectEndpoint(endpoint.id, e.currentTarget)}
                aria-describedby={`${endpoint.id}-desc`}
              >
                <div className="text-left">
                  <div className="font-medium">{endpoint.label}</div>
                  <div className="text-sm text-foreground/70 mt-1">
                    {apiType === 'rest' ? endpoint.endpoint : 'GraphQL Query'}
                  </div>
                </div>
              </Button>
              <p
                id={`${endpoint.id}-desc`}
                className="text-sm text-foreground/70 px-4"
              >
                {endpoint.description}
              </p>
            </div>
          ))}
        </div>
        <div className="mt-4 p-3 bg-accent rounded-lg text-sm">
          <strong>TanStack Query in Action:</strong> Each button click triggers a cached query with automatic error handling and loading states!
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * API Response Display Component
 */
const APIResponseDisplay: React.FC = () => {
  const { 
    apiType, 
    selectedEndpoint, 
    getSelectedEndpoint, 
    data, 
    isLoading, 
    error 
  } = useAPIIntegration()

  if (!selectedEndpoint) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Live data from your Supabase PostgreSQL database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64 text-foreground/70">
            <div className="text-center">
              <p className="text-lg mb-2">Select an endpoint to get started</p>
              <p className="text-sm">
                Choose a {apiType === 'rest' ? 'REST endpoint' : 'GraphQL query'} from the left to see live data
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Live data from your Supabase PostgreSQL database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-64">
            <div className="text-center">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
              <p className="text-foreground/70">Fetching data from Supabase...</p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  if (error) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>API Response</CardTitle>
          <CardDescription>
            Live data from your Supabase PostgreSQL database
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div 
            className="space-y-4"
            role="region"
            aria-label="API Error Response"
            tabIndex={0}
          >
            <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
              <h4 className="font-semibold text-destructive mb-2">API Error</h4>
              <p className="text-sm text-destructive/80">
                {error.message}
              </p>
              <p className="text-xs text-foreground/70 mt-2">
                Make sure your backend server is running on localhost:3001. Click the endpoint button again to retry.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>API Response</CardTitle>
        <CardDescription>
          Live data from your Supabase PostgreSQL database
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div 
          className="space-y-4"
          role="region"
          aria-label="API Response Data"
          tabIndex={0}
        >
          {/* Request Info */}
          <div 
            className="bg-accent rounded-lg p-4"
            tabIndex={0}
            role="region"
            aria-label="Request Details"
          >
            <h4 className="font-semibold mb-2">Request Details</h4>
            <div className="text-sm space-y-1">
              <div>
                <span className="font-medium">Endpoint:</span>{' '}
                {apiType === 'rest' 
                  ? getSelectedEndpoint()?.endpoint 
                  : '/api/v2/graphql'
                }
              </div>
              <div>
                <span className="font-medium">Method:</span>{' '}
                {apiType === 'rest' ? 'GET' : 'POST'}
              </div>
              <div>
                <span className="font-medium">API Type:</span>{' '}
                {apiType === 'rest' ? 'REST v1' : 'GraphQL v2'}
              </div>
            </div>
          </div>

          {/* GraphQL Query Display */}
          {apiType === 'graphql' && getSelectedEndpoint()?.query && (
            <div 
              className="bg-accent rounded-lg p-4"
              tabIndex={0}
              role="region"
              aria-label="GraphQL Query"
            >
              <h4 className="font-semibold mb-2">GraphQL Query</h4>
              <pre 
                className="text-sm bg-background rounded p-2 overflow-x-auto"
                tabIndex={0}
                role="textbox"
                aria-readonly="true"
                aria-label="GraphQL query code"
              >
                <code>{getSelectedEndpoint()?.query?.trim()}</code>
              </pre>
            </div>
          )}

          {/* Response Data */}
          <div 
            className="bg-accent rounded-lg p-4"
            tabIndex={0}
            role="region"
            aria-label="Response Data"
          >
            <h4 className="font-semibold mb-2">Response Data</h4>
            <pre 
              className="text-sm bg-background rounded p-4 overflow-x-auto max-h-96"
              tabIndex={0}
              role="textbox"
              aria-readonly="true"
              aria-label="JSON response data"
            >
              <code>{JSON.stringify(data, null, 2)}</code>
            </pre>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * API Comparison Component
 */
const APIComparison: React.FC = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>REST vs GraphQL Comparison</CardTitle>
        <CardDescription>
          Understanding the differences between our dual API architecture
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="font-semibold mb-3">REST v1 API</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Simple and intuitive endpoint structure</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Easy caching with HTTP methods</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Wide tooling and library support</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 dark:text-orange-400">−</span>
                <span>Multiple requests for related data</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 dark:text-orange-400">−</span>
                <span>Fixed response structure</span>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="font-semibold mb-3">GraphQL v2 API</h4>
            <div className="space-y-2 text-sm">
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Request exactly the data you need</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Single endpoint for all operations</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-green-600 dark:text-green-400">✓</span>
                <span>Powerful filtering and search</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 dark:text-orange-400">−</span>
                <span>More complex caching strategies</span>
              </div>
              <div className="flex items-start gap-2">
                <span className="text-orange-600 dark:text-orange-400">−</span>
                <span>Learning curve for new concepts</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

/**
 * Main API Integration Page Component (with Context)
 */
const APIIntegrationPageContent: React.FC = () => {
  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">API Integration</h1>
        <p className="text-foreground/70 mt-2">
          Live demonstration of our dual API architecture: REST v1 and GraphQL v2 endpoints connected to Supabase PostgreSQL.
        </p>
      </div>

      {/* API Type Toggle */}
      <APITypeToggle />

      {/* Main API Demo Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Left Side - API Endpoints */}
        <APIEndpointsList />

        {/* Right Side - Response Display */}
        <APIResponseDisplay />
      </div>

      {/* API Comparison Section */}
      <APIComparison />
    </div>
  )
}

/**
 * API Integration Demo Page with Context Provider
 * Clean separation of concerns with Context managing all state
 * WCAG 2.2 AAA compliant with proper ARIA labels and keyboard navigation
 */
export const APIIntegrationPage: React.FC = () => {
  return (
    <APIIntegrationProvider>
      <APIIntegrationPageContent />
    </APIIntegrationProvider>
  )
}

export default APIIntegrationPage