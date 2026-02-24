import { Button, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { SuperTable } from 'chakra-supertable'

const meta: Meta = {
  title: 'SuperTable/EmptyStates',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj

/**
 * The `Empty` component renders when there are no rows and `filtering` is false.
 * Customize the content inside to match your app's design language.
 */
export const EmptyState: Story = {
  args: {
    title: 'No users yet',
    subtitle: 'Get started by adding your first user.',
    buttonLabel: 'Add User'
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary empty state heading'
    },
    subtitle: {
      control: 'text',
      description: 'Secondary descriptive text'
    },
    buttonLabel: {
      control: 'text',
      description: 'Call-to-action button label'
    }
  },
  render: ({ title, subtitle, buttonLabel }) => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.Empty>
        <VStack py={10} gap={3}>
          <Text fontSize="lg" fontWeight="medium">{title}</Text>
          <Text color="fg.muted">{subtitle}</Text>
          <Button size="sm" colorPalette="blue">{buttonLabel}</Button>
        </VStack>
      </SuperTable.Empty>
    </SuperTable.Root>
  )
}

/**
 * The `Searching` component renders when there are no rows and `filtering` is true.
 * Use this to show "no results" messaging.
 */
export const SearchingState: Story = {
  args: {
    title: 'No results found',
    subtitle: 'Try adjusting your search or filters.',
    buttonLabel: 'Clear filters'
  },
  argTypes: {
    title: {
      control: 'text',
      description: 'Primary no-results heading'
    },
    subtitle: {
      control: 'text',
      description: 'Secondary help text'
    },
    buttonLabel: {
      control: 'text',
      description: 'Action button label'
    }
  },
  render: ({ title, subtitle, buttonLabel }) => (
    <SuperTable.Root filtering>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.Searching>
        <VStack py={10} gap={3}>
          <Text fontSize="lg" fontWeight="medium">{title}</Text>
          <Text color="fg.muted">{subtitle}</Text>
          <Button variant="outline" size="sm">{buttonLabel}</Button>
        </VStack>
      </SuperTable.Searching>
    </SuperTable.Root>
  )
}

/**
 * Both `Empty` and `Searching` can coexist. The table context determines
 * which one to show based on the `filtering` prop.
 *
 * Toggle `filtering` in the Controls panel to switch between the two states.
 */
export const BothStates: Story = {
  args: {
    filtering: false,
    loading: false
  },
  argTypes: {
    filtering: {
      control: 'boolean',
      description: 'Toggle to switch between Empty and Searching states',
      table: { defaultValue: { summary: 'false' } }
    },
    loading: {
      control: 'boolean',
      description: 'When true, neither empty state is shown (loading takes priority)',
      table: { defaultValue: { summary: 'false' } }
    }
  },
  render: ({ filtering, loading }) => (
    <SuperTable.Root filtering={filtering} loading={loading}>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.Empty>
        <VStack py={10} gap={2}>
          <Text fontWeight="medium">No users yet</Text>
          <Text color="fg.muted" fontSize="sm">Add users to see them here.</Text>
        </VStack>
      </SuperTable.Empty>
      <SuperTable.Searching>
        <VStack py={10} gap={2}>
          <Text fontWeight="medium">No results</Text>
          <Text color="fg.muted" fontSize="sm">Your search did not match any users.</Text>
        </VStack>
      </SuperTable.Searching>
      <SuperTable.LoadingRows pattern={['line', 'text', 'badge']} count={3} />
    </SuperTable.Root>
  )
}
