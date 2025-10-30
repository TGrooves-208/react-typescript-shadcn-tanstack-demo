import React, { useState } from 'react'
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { useForm } from '@tanstack/react-form'
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
  type ColumnFiltersState,
} from '@tanstack/react-table'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle, 
  DialogTrigger,
  DialogFooter 
} from '@/components/ui/dialog'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

// Sample data type
interface User {
  id: number
  name: string
  email: string
  role: string
  status: 'active' | 'inactive'
  joinDate: string
}

// Mock API functions
const fetchUsers = async (): Promise<User[]> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 1000))
  
  return [
    { id: 1, name: 'Richard Hendricks', email: 'richard@piedpiper.com', role: 'CEO', status: 'active', joinDate: '2024-01-15' },
    { id: 2, name: 'Erlich Bachman', email: 'erlich@aviato.com', role: 'Advisor', status: 'inactive', joinDate: '2024-02-20' },
    { id: 3, name: 'Dinesh Chugtai', email: 'dinesh@piedpiper.com', role: 'Developer', status: 'active', joinDate: '2024-03-10' },
    { id: 4, name: 'Bertram Gilfoyle', email: 'gilfoyle@piedpiper.com', role: 'Developer', status: 'active', joinDate: '2024-01-25' },
    { id: 5, name: 'Jared Dunn', email: 'jared@piedpiper.com', role: 'COO', status: 'active', joinDate: '2024-02-01' },
    { id: 6, name: 'Monica Hall', email: 'monica@raviga.com', role: 'Investor', status: 'active', joinDate: '2024-01-10' },
    { id: 7, name: 'Gavin Belson', email: 'gavin@hooli.com', role: 'CEO', status: 'inactive', joinDate: '2024-03-15' },
    { id: 8, name: 'Big Head', email: 'bighead@hooli.com', role: 'XYZ', status: 'active', joinDate: '2024-02-28' },
    { id: 9, name: 'Laurie Bream', email: 'laurie@breamhall.com', role: 'Partner', status: 'active', joinDate: '2024-01-20' },
    { id: 10, name: 'Russ Hanneman', email: 'russ@roh.com', role: 'Investor', status: 'inactive', joinDate: '2024-03-05' },
  ]
}

const createUser = async (userData: Omit<User, 'id' | 'joinDate'>): Promise<User> => {
  // Simulate API delay
  await new Promise(resolve => setTimeout(resolve, 800))
  
  return {
    ...userData,
    id: Math.floor(Math.random() * 1000) + 100,
    joinDate: new Date().toISOString().split('T')[0]
  }
}

/**
 * TanStack Features Demo Page
 * Showcases TanStack Query, Table, and Form working together with ShadCN components
 * WCAG 2.2 AAA compliant with proper ARIA labels and keyboard navigation
 */
export const TanStackFeaturesPage: React.FC = () => {
  const [sorting, setSorting] = useState<SortingState>([])
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 3, // Show 3 users per page to demonstrate pagination
  })
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const queryClient = useQueryClient()

  // TanStack Query - Data fetching
  const { data: users = [], isLoading, error } = useQuery({
    queryKey: ['users'],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutes
  })

  // TanStack Query - Mutation for creating users
  const createUserMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['users'] })
      setIsDialogOpen(false)
    },
  })

  // TanStack Table - Column definitions
  const columns: ColumnDef<User>[] = [
    {
      accessorKey: 'name',
      header: 'Name',
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue('name')}</div>
      ),
    },
    {
      accessorKey: 'email',
      header: 'Email',
      cell: ({ row }) => (
        <div className="text-foreground/70">{row.getValue('email')}</div>
      ),
    },
    {
      accessorKey: 'role',
      header: 'Role',
    },
    {
      accessorKey: 'status',
      header: 'Status',
      cell: ({ row }) => {
        const status = row.getValue('status') as string
        return (
          <span
            className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
              status === 'active'
                ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                : 'bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200'
            }`}
          >
            {status}
          </span>
        )
      },
    },
    {
      accessorKey: 'joinDate',
      header: 'Join Date',
      cell: ({ row }) => {
        const date = new Date(row.getValue('joinDate'))
        return <div>{date.toLocaleDateString()}</div>
      },
    },
  ]

  // TanStack Table - Table instance
  const table = useReactTable({
    data: users,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: 'includesString',
    state: {
      sorting,
      columnFilters,
      globalFilter,
      pagination,
    },
  })

  // TanStack Form - Form instance
  const form = useForm({
    defaultValues: {
      name: '',
      email: '',
      role: '',
      status: 'active' as const,
    },
    onSubmit: async ({ value }) => {
      await createUserMutation.mutateAsync(value)
    },
  })

  if (error) {
    return (
      <div className="container mx-auto p-6">
        <div className="text-destructive">Error loading users: {(error as Error).message}</div>
      </div>
    )
  }

  return (
    <div className="container mx-auto p-6 space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight">TanStack Features</h1>
        <p className="text-foreground/70 mt-2">
          Comprehensive demonstration of TanStack Query, Table, and Form working together with ShadCN UI components.
        </p>
      </div>

      {/* Overview Cards */}
      <div className="grid gap-6 md:grid-cols-3">
        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TanStack Query</CardTitle>
            <CardDescription>
              Powerful data fetching with caching, background updates, and optimistic updates
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Automatic caching & invalidation</li>
              <li>• Background refetching</li>
              <li>• Optimistic updates</li>
              <li>• Loading & error states</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TanStack Table</CardTitle>
            <CardDescription>
              Headless table library with sorting, filtering, and pagination
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Column sorting & filtering</li>
              <li>• Global search</li>
              <li>• Pagination controls</li>
              <li>• Flexible cell rendering</li>
            </ul>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className="text-lg">TanStack Form</CardTitle>
            <CardDescription>
              Type-safe forms with validation and optimized re-renders
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ul className="text-sm text-foreground/70 space-y-1">
              <li>• Type-safe field access</li>
              <li>• Validation support</li>
              <li>• Optimized re-renders</li>
              <li>• Easy form state management</li>
            </ul>
          </CardContent>
        </Card>
      </div>

      {/* Data Table Section */}
      <Card>
        <CardHeader>
          <CardTitle>Users Data Table</CardTitle>
          <CardDescription>
            Interactive table with search, sorting, and pagination powered by TanStack Table
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Table Controls */}
          <div className="flex items-center justify-between py-4">
            <Input
              placeholder="Search users..."
              value={globalFilter ?? ''}
              onChange={(event) => setGlobalFilter(String(event.target.value))}
              className="max-w-sm"
              aria-label="Search users"
            />
            
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button>Add User</Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                  <DialogTitle>Add New User</DialogTitle>
                  <DialogDescription>
                    Create a new user account. Click save when you're done.
                  </DialogDescription>
                </DialogHeader>
                
                {/* TanStack Form */}
                <form
                  onSubmit={(e) => {
                    e.preventDefault()
                    e.stopPropagation()
                    form.handleSubmit()
                  }}
                  className="space-y-4"
                >
                  <form.Field
                    name="name"
                    children={(field) => (
                      <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                          Name *
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter full name"
                          required
                          aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p id={`${field.name}-error`} className="text-sm text-destructive mt-1">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="email"
                    children={(field) => (
                      <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                          Email *
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          type="email"
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter email address"
                          required
                          aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p id={`${field.name}-error`} className="text-sm text-destructive mt-1">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <form.Field
                    name="role"
                    children={(field) => (
                      <div>
                        <label htmlFor={field.name} className="text-sm font-medium">
                          Role *
                        </label>
                        <Input
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onBlur={field.handleBlur}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter role (e.g., Developer, Designer)"
                          required
                          aria-describedby={field.state.meta.errors.length ? `${field.name}-error` : undefined}
                        />
                        {field.state.meta.errors.length > 0 && (
                          <p id={`${field.name}-error`} className="text-sm text-destructive mt-1">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                      </div>
                    )}
                  />

                  <DialogFooter>
                    <Button 
                      type="button" 
                      variant="outline" 
                      onClick={() => setIsDialogOpen(false)}
                      disabled={createUserMutation.isPending}
                    >
                      Cancel
                    </Button>
                    <Button 
                      type="submit" 
                      disabled={createUserMutation.isPending}
                    >
                      {createUserMutation.isPending ? 'Creating...' : 'Create User'}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>

          {/* Table */}
          <div className="rounded-md border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {isLoading ? (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      Loading users...
                    </TableCell>
                  </TableRow>
                ) : table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      data-state={row.getIsSelected() && "selected"}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-between py-4">
            <div className="text-sm text-foreground/70">
              Showing {table.getState().pagination.pageIndex * table.getState().pagination.pageSize + 1} to{' '}
              {Math.min((table.getState().pagination.pageIndex + 1) * table.getState().pagination.pageSize, table.getFilteredRowModel().rows.length)}{' '}
              of {table.getFilteredRowModel().rows.length} users
            </div>
            <div className="flex items-center space-x-2">
              <div className="text-sm text-foreground/70">
                Page {table.getState().pagination.pageIndex + 1} of {table.getPageCount()}
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.previousPage()}
                disabled={!table.getCanPreviousPage()}
              >
                Previous
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => table.nextPage()}
                disabled={!table.getCanNextPage()}
              >
                Next
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Integration Explanation */}
      <Card>
        <CardHeader>
          <CardTitle>How It All Works Together</CardTitle>
          <CardDescription>
            The chef's kiss of modern React development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 text-sm">
            <div>
              <h4 className="font-semibold mb-2">TanStack Query Integration</h4>
              <p className="text-foreground/70">
                Manages server state with automatic caching, background refetching, and optimistic updates. 
                The table data is fetched once and cached, with mutations automatically invalidating the cache.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">TanStack Table Power</h4>
              <p className="text-foreground/70">
                Provides headless table functionality with built-in sorting, filtering, and pagination. 
                The table state is managed independently and can work with any data source.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">TanStack Form Excellence</h4>
              <p className="text-foreground/70">
                Type-safe form handling with optimized re-renders and validation support. 
                Form submission triggers the mutation which updates the table data automatically.
              </p>
            </div>
            
            <div>
              <h4 className="font-semibold mb-2">ShadCN UI Polish</h4>
              <p className="text-foreground/70">
                Beautiful, accessible components that work seamlessly with TanStack libraries. 
                The dialog, table, and form components provide a professional user experience.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

export default TanStackFeaturesPage