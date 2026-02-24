import { HStack, Spinner, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { SuperTable } from 'chakra-supertable'

type LoadingArgs = {
  loading: boolean
  count: number
  pattern: string
}

const meta: Meta<LoadingArgs> = {
  title: 'SuperTable/Loading',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj<LoadingArgs>

/**
 * Default loading state with skeleton rows using the `LoadingRows` component.
 * Toggle `loading` to see skeletons appear/disappear, and adjust `count` to change the number of rows.
 */
export const SkeletonRows: Story = {
  args: {
    loading: true,
    count: 5,
    pattern: 'line,text,badge'
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Whether the table is in loading state',
      table: { defaultValue: { summary: 'true' } }
    },
    count: {
      control: { type: 'number', min: 1, max: 20 },
      description: 'Number of skeleton rows to render',
      table: { defaultValue: { summary: '3' } }
    },
    pattern: {
      control: 'text',
      description: 'Comma-separated skeleton types: line, text, circle, avatar, badge, button, icon',
      table: { defaultValue: { summary: 'line,text,badge' } }
    }
  },
  render: ({ loading, count, pattern }) => {
    const parsedPattern = (pattern as string)
      .split(',')
      .map((s: string) => s.trim())
      .filter(Boolean) as Array<'line' | 'text' | 'circle' | 'avatar' | 'badge' | 'button' | 'icon'>

    return (
      <SuperTable.Root loading={loading}>
        <SuperTable.Head>
          {parsedPattern.map((type, i) => (
            <SuperTable.Th key={i}>{type}</SuperTable.Th>
          ))}
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.LoadingRows pattern={parsedPattern} count={count} />
      </SuperTable.Root>
    )
  }
}

/**
 * Demonstrates all available skeleton pattern types:
 * `line`, `text`, `circle`, `avatar`, `badge`, `button`, `icon`.
 */
export const AllPatternTypes: Story = {
  render: () => (
    <SuperTable.Root loading>
      <SuperTable.Head>
        <SuperTable.Th>Avatar</SuperTable.Th>
        <SuperTable.Th>Line</SuperTable.Th>
        <SuperTable.Th>Text</SuperTable.Th>
        <SuperTable.Th>Badge</SuperTable.Th>
        <SuperTable.Th>Button</SuperTable.Th>
        <SuperTable.Th>Circle</SuperTable.Th>
        <SuperTable.Th>Icon</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.LoadingRows
        pattern={['avatar', 'line', 'text', 'badge', 'button', 'circle', 'icon']}
        count={3}
      />
    </SuperTable.Root>
  )
}

/**
 * Custom loading state using the `Loading` component with a spinner.
 * Use this instead of `LoadingRows` when you want a completely custom loading UI.
 */
export const CustomSpinner: Story = {
  render: () => (
    <SuperTable.Root loading>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body />
      <SuperTable.Loading>
        <VStack py={12} gap={3}>
          <Spinner size="xl" color="blue.500" />
          <Text color="fg.muted">Loading users...</Text>
        </VStack>
      </SuperTable.Loading>
    </SuperTable.Root>
  )
}

/**
 * When data rows are present, `LoadingRows` are automatically hidden
 * even if `loading` is `true`. This allows background refetching
 * without disrupting the currently displayed data.
 */
export const LoadingWithExistingData: Story = {
  args: {
    loading: true
  },
  argTypes: {
    loading: {
      control: 'boolean',
      description: 'Toggle loading state -- skeleton rows stay hidden because data rows exist',
      table: { defaultValue: { summary: 'true' } }
    }
  },
  render: ({ loading }) => (
    <SuperTable.Root loading={loading}>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
      </SuperTable.Head>
      <SuperTable.Body>
        <SuperTable.Row>
          <SuperTable.Cell>Alice Johnson</SuperTable.Cell>
          <SuperTable.Cell>alice@example.com</SuperTable.Cell>
        </SuperTable.Row>
        <SuperTable.Row>
          <SuperTable.Cell>Bob Smith</SuperTable.Cell>
          <SuperTable.Cell>bob@example.com</SuperTable.Cell>
        </SuperTable.Row>
      </SuperTable.Body>
      <SuperTable.LoadingRows pattern={['line', 'text']} count={3} />
      <HStack justify="center" py={2}>
        <Text fontSize="xs" color="fg.muted">
          loading={String(loading)} -- skeleton rows are hidden because data rows exist
        </Text>
      </HStack>
    </SuperTable.Root>
  )
}
