import { Badge, HStack, Text } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { SuperTable } from 'chakra-super-table'

const users = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', role: 'Admin' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', role: 'Editor' },
  { id: '3', name: 'Charlie Brown', email: 'charlie@example.com', role: 'Viewer' },
  { id: '4', name: 'Diana Prince', email: 'diana@example.com', role: 'Admin' },
  { id: '5', name: 'Eve Wilson', email: 'eve@example.com', role: 'Editor' }
]

const meta: Meta = {
  title: 'SuperTable/Basic',
  parameters: {
    layout: 'padded'
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['sm', 'md', 'lg'],
      description: 'Table size variant',
      table: { defaultValue: { summary: 'md' } }
    },
    striped: {
      control: 'boolean',
      description: 'Whether to show striped rows',
      table: { defaultValue: { summary: 'false' } }
    },
    showBorder: {
      control: 'boolean',
      description: 'Whether to show table borders',
      table: { defaultValue: { summary: 'false' } }
    },
    interactive: {
      control: 'boolean',
      description: 'Whether rows have a hover highlight',
      table: { defaultValue: { summary: 'false' } }
    }
  },
  args: {
    size: 'md',
    striped: false,
    showBorder: false,
    interactive: false
  }
}

export default meta
type Story = StoryObj<typeof meta>

/**
 * A minimal table showing the basic building blocks:
 * `Root`, `Head`, `Th`, `Body`, `Row`, and `Cell`.
 *
 * Use the **Controls** panel below to toggle `size`, `striped`, `showBorder`, and `interactive`.
 */
export const Minimal: Story = {
  render: ({ size, striped, showBorder, interactive }) => (
    <SuperTable.Root size={size} striped={striped} showColumnBorder={showBorder} interactive={interactive}>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
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

/**
 * Table with styled cells, badges, and custom column widths.
 */
export const Styled: Story = {
  args: {
    size: 'sm',
    striped: true
  },
  render: ({ size, striped, showBorder, interactive }) => (
    <SuperTable.Root size={size} striped={striped} showColumnBorder={showBorder} interactive={interactive}>
      <SuperTable.Head>
        <SuperTable.Th width="200px">Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th textAlign="right" width="120px">Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body>
        {users.map(user => (
          <SuperTable.Row key={user.id}>
            <SuperTable.Cell fontWeight="medium">{user.name}</SuperTable.Cell>
            <SuperTable.Cell color="fg.muted">{user.email}</SuperTable.Cell>
            <SuperTable.Cell textAlign="right">
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
 * Table with no data rows, showing the empty state.
 */
export const WithEmptyState: Story = {
  render: () => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.Empty>
        <HStack justify="center" py={8}>
          <Text color="fg.muted">No users found</Text>
        </HStack>
      </SuperTable.Empty>
    </SuperTable.Root>
  )
}

/**
 * Using `Table.ScrollArea` for horizontal scrolling on narrow viewports.
 */
export const WithScrollArea: Story = {
  render: () => (
    <SuperTable.Root maxW="400px">
      <SuperTable.ScrollArea>
        <SuperTable.Head>
          <SuperTable.Th minW="150px">Name</SuperTable.Th>
          <SuperTable.Th minW="200px">Email</SuperTable.Th>
          <SuperTable.Th minW="100px">Role</SuperTable.Th>
          <SuperTable.Th minW="120px">Status</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          {users.map(user => (
            <SuperTable.Row key={user.id}>
              <SuperTable.Cell>{user.name}</SuperTable.Cell>
              <SuperTable.Cell>{user.email}</SuperTable.Cell>
              <SuperTable.Cell>{user.role}</SuperTable.Cell>
              <SuperTable.Cell>Active</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.Body>
      </SuperTable.ScrollArea>
    </SuperTable.Root>
  )
}
