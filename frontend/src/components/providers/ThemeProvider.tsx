import { ThemeProvider as NextThemesProvider } from 'next-themes'

/**
 * Theme provider wrapper component
 * Provides dark/light mode functionality throughout the app
 */
interface ThemeProviderProps {
  children: React.ReactNode
  defaultTheme?: string
  enableSystem?: boolean
  disableTransitionOnChange?: boolean
}

export function ThemeProvider({ 
  children, 
  defaultTheme = "system",
  enableSystem = true,
  disableTransitionOnChange = true,
  ...props 
}: ThemeProviderProps) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme={defaultTheme}
      enableSystem={enableSystem}
      disableTransitionOnChange={disableTransitionOnChange}
      {...props}
    >
      {children}
    </NextThemesProvider>
  )
}

export default ThemeProvider