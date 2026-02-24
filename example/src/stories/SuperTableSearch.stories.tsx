import { Badge, Button } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { SuperTable } from 'chakra-supertable'
import { useCallback, useState } from 'react'

const meta: Meta = {
  title: 'SuperTable/Search',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj

const allUsers = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: '5', name: 'Eve Wilson', email: 'eve@example.com', role: 'Editor' },
  { id: '6', name: 'Frank Castle', email: 'frank@example.com', role: 'Viewer' },
  { id: '7', name: 'Grace Hopper', email: 'grace@example.com', role: 'Admin' }
]

function SearchExample({
  throttle = 300,
  placeholder = 'Search users by name, email, or role...'
}: {
  throttle?: number
  placeholder?: string
}) {
  const [search, setSearch] = useState('')

  const filtered = search
    ? allUsers.filter(
      u =>
        u.name.toLowerCase().includes(search.toLowerCase()) ||
        u.email.toLowerCase().includes(search.toLowerCase()) ||
        u.role.toLowerCase().includes(search.toLowerCase())
    )
    : allUsers

  return (
    <>
      <SuperTable.SearchBar>
        <SuperTable.SearchField
          placeholder={placeholder}
          onSearch={setSearch}
          throttle={throttle}
        />
      </SuperTable.SearchBar>

      <SuperTable.Root filtering={!!search}>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
          <SuperTable.Th>Email</SuperTable.Th>
          <SuperTable.Th>Role</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          {filtered.map(user => (
            <SuperTable.Row key={user.id}>
              <SuperTable.Cell fontWeight="medium">{user.name}</SuperTable.Cell>
              <SuperTable.Cell>{user.email}</SuperTable.Cell>
              <SuperTable.Cell>
                <Badge colorPalette={user.role === 'Admin' ? 'red' : user.role === 'Editor' ? 'blue' : 'gray'}>
                  {user.role}
                </Badge>
              </SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.Body>
        <SuperTable.Empty>No users yet</SuperTable.Empty>
        <SuperTable.Searching>No users match your search.</SuperTable.Searching>
      </SuperTable.Root>
    </>
  )
}

/**
 * Full search integration: `SearchBar` + `SearchField` with filtering.
 * Type in the search field to filter users. The input is throttled (default 300ms).
 */
export const BasicSearch: Story = {
  args: {
    throttle: 300,
    placeholder: 'Search users by name, email, or role...'
  },
  argTypes: {
    throttle: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Throttle delay in ms before onSearch fires',
      table: { defaultValue: { summary: '300' } }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text for the search input'
    }
  },
  render: ({ throttle, placeholder }) => (
    <SearchExample throttle={throttle} placeholder={placeholder} />
  )
}

/**
 * Customize the throttle delay. Set to a higher value for expensive search operations
 * (e.g., server-side search).
 */
export const CustomThrottle: Story = {
  args: {
    throttle: 800,
    placeholder: 'Search (800ms throttle)...'
  },
  argTypes: {
    throttle: {
      control: { type: 'number', min: 0, max: 2000, step: 100 },
      description: 'Throttle delay in ms',
      table: { defaultValue: { summary: '300' } }
    },
    placeholder: {
      control: 'text',
      description: 'Placeholder text'
    }
  },
  render: ({ throttle, placeholder }) => (
    <SearchExample throttle={throttle} placeholder={placeholder} />
  )
}

/**
 * The `SearchBar` is a flexible container. Combine the search field with
 * action buttons, dropdowns, and filters.
 */
export const WithActions: Story = {
  render: () => {
    const [search, setSearch] = useState('')

    const filtered = search
      ? allUsers.filter(u =>
        u.name.toLowerCase().includes(search.toLowerCase())
      )
      : allUsers

    const handleExport = useCallback(() => {
      alert(`Exporting ${filtered.length} users`)
    }, [filtered.length])

    return (
      <>
        <SuperTable.SearchBar>
          <SuperTable.SearchField
            placeholder="Search users..."
            onSearch={setSearch}
          />
          <Button variant="outline" size="sm" onClick={handleExport}>
            Export
          </Button>
          <Button colorPalette="blue" size="sm">
            Add User
          </Button>
        </SuperTable.SearchBar>

        <SuperTable.Root filtering={!!search}>
          <SuperTable.Head>
            <SuperTable.Th>Name</SuperTable.Th>
            <SuperTable.Th>Email</SuperTable.Th>
            <SuperTable.Th>Role</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.Body>
            {filtered.map(user => (
              <SuperTable.Row key={user.id}>
                <SuperTable.Cell>{user.name}</SuperTable.Cell>
                <SuperTable.Cell>{user.email}</SuperTable.Cell>
                <SuperTable.Cell>{user.role}</SuperTable.Cell>
              </SuperTable.Row>
            ))}
          </SuperTable.Body>
          <SuperTable.Searching>No results found.</SuperTable.Searching>
        </SuperTable.Root>
      </>
    )
  }
}
