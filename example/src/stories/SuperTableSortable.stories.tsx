import { Badge } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import type { SortDirection } from 'chakra-super-table'
import { SuperTable } from 'chakra-super-table'
import { useCallback, useState } from 'react'

const meta: Meta = {
  title: 'SuperTable/Sortable',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj

type User = {
  id: string
  name: string
  email: string
  age: number
  role: string
}

const rawUsers: User[] = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', age: 32, role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', age: 28, role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', age: 45, role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', age: 31, role: 'Admin' },
  { id: '5', name: 'Eve Wilson', email: 'eve@example.com', age: 27, role: 'Editor' }
]

function SortableTable({ sortDelay = 300 }: { sortDelay?: number }) {
  const [sortColumn, setSortColumn] = useState<keyof User | null>(null)
  const [sortDirection, setSortDirection] = useState<SortDirection>('none')
  const [users, setUsers] = useState(rawUsers)

  const handleSort = useCallback(
    (column: keyof User) => async (direction: SortDirection) => {
      // Simulate async sort (e.g. server-side)
      await new Promise(resolve => setTimeout(resolve, sortDelay))

      setSortColumn(column)
      setSortDirection(direction)

      if (direction === 'none') {
        setUsers(rawUsers)
      } else {
        const sorted = [...rawUsers].sort((a, b) => {
          const aVal = a[column]
          const bVal = b[column]
          if (typeof aVal === 'string' && typeof bVal === 'string') {
            return direction === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal)
          }
          if (typeof aVal === 'number' && typeof bVal === 'number') {
            return direction === 'asc' ? aVal - bVal : bVal - aVal
          }
          return 0
        })
        setUsers(sorted)
      }
    },
    [sortDelay]
  )

  const getDirection = (col: keyof User): SortDirection =>
    sortColumn === col ? sortDirection : 'none'

  return (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th sortable sortDirection={getDirection('name')} onSort={handleSort('name')}>
          Name
        </SuperTable.Th>
        <SuperTable.Th sortable sortDirection={getDirection('email')} onSort={handleSort('email')}>
          Email
        </SuperTable.Th>
        <SuperTable.Th sortable sortDirection={getDirection('age')} onSort={handleSort('age')}>
          Age
        </SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body>
        {users.map(user => (
          <SuperTable.Row key={user.id}>
            <SuperTable.Cell fontWeight="medium">{user.name}</SuperTable.Cell>
            <SuperTable.Cell>{user.email}</SuperTable.Cell>
            <SuperTable.Cell>{user.age}</SuperTable.Cell>
            <SuperTable.Cell>
              <Badge colorPalette={user.role === 'Admin' ? 'red' : user.role === 'Editor' ? 'blue' : 'gray'}>
                {user.role}
              </Badge>
            </SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.Body>
    </SuperTable.Root>
  )
}

/**
 * Click on column headers to sort. The sort cycles through:
 * `none` -> `asc` -> `desc` -> `none`.
 *
 * The `onSort` handler is async -- a spinner appears while sorting.
 * Adjust `sortDelay` to simulate faster or slower server responses.
 */
export const SortableColumns: Story = {
  args: {
    sortDelay: 300
  },
  argTypes: {
    sortDelay: {
      control: { type: 'number', min: 0, max: 3000, step: 100 },
      description: 'Simulated sort delay in ms (mimics server-side sorting)',
      table: { defaultValue: { summary: '300' } }
    }
  },
  render: ({ sortDelay }) => <SortableTable sortDelay={sortDelay} />
}

/**
 * Columns without the `sortable` prop render as plain headers.
 * Mix sortable and non-sortable columns freely.
 */
export const MixedSortable: Story = {
  render: () => {
    const [direction, setDirection] = useState<SortDirection>('none')
    const [users, setUsers] = useState(rawUsers)

    const handleSort = async (dir: SortDirection) => {
      await new Promise(r => setTimeout(r, 200))
      setDirection(dir)
      if (dir === 'none') {
        setUsers(rawUsers)
      } else {
        setUsers([...rawUsers].sort((a, b) =>
          dir === 'asc' ? a.name.localeCompare(b.name) : b.name.localeCompare(a.name)
        ))
      }
    }

    return (
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th sortable sortDirection={direction} onSort={handleSort}>
            Name (sortable)
          </SuperTable.Th>
          <SuperTable.Th>Email (not sortable)</SuperTable.Th>
          <SuperTable.Th>Role (not sortable)</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          {users.map(user => (
            <SuperTable.Row key={user.id}>
              <SuperTable.Cell>{user.name}</SuperTable.Cell>
              <SuperTable.Cell>{user.email}</SuperTable.Cell>
              <SuperTable.Cell>{user.role}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.Body>
      </SuperTable.Root>
    )
  }
}
