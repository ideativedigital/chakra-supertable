import userEvent from '@testing-library/user-event'
import { useState } from 'react'
import { describe, expect, it, vi } from 'vitest'
import { SuperTable } from '../index'
import { render, screen, waitFor } from './test-utils'

describe('SuperTable Integration', () => {
  it('should render a complete table', () => {
    const users = [
      { id: 1, name: 'John', email: 'john@example.com' },
      { id: 2, name: 'Jane', email: 'jane@example.com' }
    ]

    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
          <SuperTable.Th>Email</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          {users.map(user => (
            <SuperTable.Row key={user.id}>
              <SuperTable.Cell>{user.name}</SuperTable.Cell>
              <SuperTable.Cell>{user.email}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.Body>
        <SuperTable.Empty>No users</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.getByText('John')).toBeInTheDocument()
    expect(screen.getByText('jane@example.com')).toBeInTheDocument()
    expect(screen.queryByText('No users')).not.toBeInTheDocument()
  })

  it('should show empty state when no data', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>No data available</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should show loading state', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Loading>Loading data...</SuperTable.Loading>
        <SuperTable.Empty>No data</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.getByText('Loading data...')).toBeInTheDocument()
    expect(screen.queryByText('No data')).not.toBeInTheDocument()
  })

  it('should show searching state when filtering', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>No data</SuperTable.Empty>
        <SuperTable.Searching>No results found</SuperTable.Searching>
      </SuperTable.Root>
    )

    expect(screen.getByText('No results found')).toBeInTheDocument()
    expect(screen.queryByText('No data')).not.toBeInTheDocument()
  })

  it('should work with sections', async () => {
    const user = userEvent.setup()

    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.SimpleSection title="Active Users" collapsible>
          <SuperTable.Row>
            <SuperTable.Cell>John</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
        <SuperTable.SimpleSection title="Inactive Users" collapsible defaultCollapsed>
          <SuperTable.Row>
            <SuperTable.Cell>Jane</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
      </SuperTable.Root>
    )

    // Active section is expanded
    expect(screen.getByText('John')).toBeInTheDocument()

    // Inactive section is collapsed
    await waitFor(() => {
      expect(screen.queryByText('Jane')).not.toBeInTheDocument()
    })

    // Expand inactive section
    await user.click(screen.getByText('Inactive Users'))
    expect(screen.getByText('Jane')).toBeInTheDocument()

    // Collapse active section
    await user.click(screen.getByText('Active Users'))
    await waitFor(() => {
      expect(screen.queryByText('John')).not.toBeInTheDocument()
    })
  })

  it('should work with search bar and field', async () => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    const TestComponent = () => {
      const [search, setSearch] = useState('')
      const users = [
        { id: 1, name: 'John Doe' },
        { id: 2, name: 'Jane Smith' }
      ]
      const filteredUsers = users.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      )

      return (
        <>
          <SuperTable.SearchBar>
            <SuperTable.SearchField
              placeholder="Search users..."
              onSearch={setSearch}
            />
          </SuperTable.SearchBar>
          <SuperTable.Root filtering={!!search}>
            <SuperTable.Head>
              <SuperTable.Th>Name</SuperTable.Th>
            </SuperTable.Head>
            <SuperTable.Body>
              {filteredUsers.map(user => (
                <SuperTable.Row key={user.id}>
                  <SuperTable.Cell>{user.name}</SuperTable.Cell>
                </SuperTable.Row>
              ))}
            </SuperTable.Body>
            <SuperTable.Searching>No results</SuperTable.Searching>
          </SuperTable.Root>
        </>
      )
    }

    render(<TestComponent />)

    // Initially all users visible
    expect(screen.getByText('John Doe')).toBeInTheDocument()
    expect(screen.getByText('Jane Smith')).toBeInTheDocument()

    // Search for "John"
    const input = screen.getByPlaceholderText('Search users...')
    await user.type(input, 'John')

    // Wait for throttle
    vi.advanceTimersByTime(300)

    // Only John should be visible
    await waitFor(() => {
      expect(screen.getByText('John Doe')).toBeInTheDocument()
      expect(screen.queryByText('Jane Smith')).not.toBeInTheDocument()
    })

    // Search for something that doesn't exist
    await user.clear(input)
    vi.advanceTimersByTime(300)

    await user.type(input, 'xyz')
    vi.advanceTimersByTime(300)

    await waitFor(() => {
      expect(screen.getByText('No results')).toBeInTheDocument()
    })

    vi.useRealTimers()
  })

  it('should handle sorting', async () => {
    const user = userEvent.setup()
    const onSort = vi.fn().mockResolvedValue(undefined)

    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th sortable onSort={onSort} sortDirection="none">
            Name
          </SuperTable.Th>
          <SuperTable.Th>Email</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>John</SuperTable.Cell>
            <SuperTable.Cell>john@test.com</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    const sortableHeader = screen.getByText('Name').closest('th')
    await user.click(sortableHeader!)

    expect(onSort).toHaveBeenCalledWith('asc')
  })
})
