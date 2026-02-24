import { Badge } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { SuperTable } from 'chakra-super-table'

type SectionArgs = {
  collapsible: boolean
  alphaCollapsed: boolean
  betaCollapsed: boolean
}

const meta: Meta<SectionArgs> = {
  title: 'SuperTable/Section',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj<SectionArgs>

const teamAlpha = [
  { id: '1', name: 'Alice Johnson', role: 'Lead', status: 'Active' },
  { id: '2', name: 'Bob Smith', role: 'Developer', status: 'Active' },
  { id: '3', name: 'Charlie Brown', role: 'Designer', status: 'Away' }
]

const teamBeta = [
  { id: '4', name: 'Diana Prince', role: 'Lead', status: 'Active' },
  { id: '5', name: 'Eve Wilson', role: 'Developer', status: 'Active' }
]

const teamGamma = [
  { id: '6', name: 'Frank Castle', role: 'Lead', status: 'Active' },
  { id: '7', name: 'Grace Hopper', role: 'Developer', status: 'Away' },
  { id: '8', name: 'Hank Pym', role: 'QA', status: 'Active' },
  { id: '9', name: 'Iris West', role: 'Designer', status: 'Active' }
]

// ---------------------------------------------------------------------------
// SimpleSection stories
// ---------------------------------------------------------------------------

/**
 * `SimpleSection` is the easiest way to create a collapsible section.
 * Just pass a `title` string and it handles the header layout automatically.
 *
 * Toggle `collapsible` to enable/disable collapse behavior.
 */
export const Simple: Story = {
  args: {
    collapsible: true
  },
  argTypes: {
    collapsible: {
      control: 'boolean',
      description: 'Whether sections can be collapsed',
      table: { defaultValue: { summary: 'true' } }
    }
  },
  render: ({ collapsible }: { collapsible: boolean }) => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.SimpleSection title="Team Alpha" collapsible={collapsible}>
        {teamAlpha.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>
              <Badge colorPalette={m.status === 'Active' ? 'green' : 'orange'}>{m.status}</Badge>
            </SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>

      <SuperTable.SimpleSection title="Team Beta" collapsible={collapsible}>
        {teamBeta.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>
              <Badge colorPalette={m.status === 'Active' ? 'green' : 'orange'}>{m.status}</Badge>
            </SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>

      <SuperTable.SimpleSection title="Team Gamma" collapsible={collapsible}>
        {teamGamma.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>
              <Badge colorPalette={m.status === 'Active' ? 'green' : 'orange'}>{m.status}</Badge>
            </SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>
    </SuperTable.Root>
  )
}

/**
 * A `SimpleSection` can start collapsed using `defaultCollapsed`.
 */
export const SimpleDefaultCollapsed: Story = {
  args: {
    alphaCollapsed: false,
    betaCollapsed: true
  },
  argTypes: {
    alphaCollapsed: {
      control: 'boolean',
      description: 'Whether Team Alpha starts collapsed',
      table: { defaultValue: { summary: 'false' } }
    },
    betaCollapsed: {
      control: 'boolean',
      description: 'Whether Team Beta starts collapsed',
      table: { defaultValue: { summary: 'true' } }
    }
  },
  render: ({ alphaCollapsed, betaCollapsed }: { alphaCollapsed: boolean, betaCollapsed: boolean }) => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.SimpleSection title="Team Alpha" collapsible defaultCollapsed={alphaCollapsed}>
        {teamAlpha.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>{m.status}</SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>

      <SuperTable.SimpleSection title="Team Beta" collapsible defaultCollapsed={betaCollapsed}>
        {teamBeta.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>{m.status}</SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>
    </SuperTable.Root>
  )
}

/**
 * `SimpleSection` without `collapsible` renders static group headers.
 */
export const SimpleNonCollapsible: Story = {
  render: () => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.SimpleSection title="Team Alpha">
        {teamAlpha.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>{m.status}</SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>

      <SuperTable.SimpleSection title="Team Beta">
        {teamBeta.map(m => (
          <SuperTable.Row key={m.id}>
            <SuperTable.Cell>{m.name}</SuperTable.Cell>
            <SuperTable.Cell>{m.role}</SuperTable.Cell>
            <SuperTable.Cell>{m.status}</SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.SimpleSection>
    </SuperTable.Root>
  )
}

// ---------------------------------------------------------------------------
// Composable Section stories
// ---------------------------------------------------------------------------

/**
 * The composable `Section` gives you full control over the header layout.
 * Combine `SectionHeader`, `SectionTitle`, `SectionCollapseTrigger`,
 * and `SectionContent` to build custom section headers.
 *
 * This example adds a member count badge next to the title.
 */
export const Composable: Story = {
  render: () => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.Section collapsible>
        <SuperTable.SectionHeader>
          <SuperTable.SectionTitle fontWeight="bold">
            Team Alpha <Badge ms={2}>{teamAlpha.length} members</Badge>
          </SuperTable.SectionTitle>
          <SuperTable.SectionCollapseTrigger />
        </SuperTable.SectionHeader>
        <SuperTable.SectionContent>
          {teamAlpha.map(m => (
            <SuperTable.Row key={m.id}>
              <SuperTable.Cell>{m.name}</SuperTable.Cell>
              <SuperTable.Cell>{m.role}</SuperTable.Cell>
              <SuperTable.Cell>{m.status}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.SectionContent>
      </SuperTable.Section>

      <SuperTable.Section collapsible>
        <SuperTable.SectionHeader>
          <SuperTable.SectionTitle fontWeight="bold">
            Team Gamma <Badge ms={2}>{teamGamma.length} members</Badge>
          </SuperTable.SectionTitle>
          <SuperTable.SectionCollapseTrigger />
        </SuperTable.SectionHeader>
        <SuperTable.SectionContent>
          {teamGamma.map(m => (
            <SuperTable.Row key={m.id}>
              <SuperTable.Cell>{m.name}</SuperTable.Cell>
              <SuperTable.Cell>{m.role}</SuperTable.Cell>
              <SuperTable.Cell>{m.status}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.SectionContent>
      </SuperTable.Section>
    </SuperTable.Root>
  )
}

/**
 * The composable API lets you place the trigger on the left side,
 * add icons, or any custom layout you need.
 */
export const ComposableTriggerOnLeft: Story = {
  render: () => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Role</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.Section collapsible>
        <SuperTable.SectionHeader justify="start" gap={2}>
          <SuperTable.SectionCollapseTrigger />
          <SuperTable.SectionTitle fontWeight="bold">Team Alpha</SuperTable.SectionTitle>
          <Badge colorPalette="green">{teamAlpha.length}</Badge>
        </SuperTable.SectionHeader>
        <SuperTable.SectionContent>
          {teamAlpha.map(m => (
            <SuperTable.Row key={m.id}>
              <SuperTable.Cell>{m.name}</SuperTable.Cell>
              <SuperTable.Cell>{m.role}</SuperTable.Cell>
              <SuperTable.Cell>{m.status}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.SectionContent>
      </SuperTable.Section>

      <SuperTable.Section collapsible defaultCollapsed>
        <SuperTable.SectionHeader justify="start" gap={2}>
          <SuperTable.SectionCollapseTrigger />
          <SuperTable.SectionTitle fontWeight="bold">Team Beta</SuperTable.SectionTitle>
          <Badge colorPalette="blue">{teamBeta.length}</Badge>
        </SuperTable.SectionHeader>
        <SuperTable.SectionContent>
          {teamBeta.map(m => (
            <SuperTable.Row key={m.id}>
              <SuperTable.Cell>{m.name}</SuperTable.Cell>
              <SuperTable.Cell>{m.role}</SuperTable.Cell>
              <SuperTable.Cell>{m.status}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.SectionContent>
      </SuperTable.Section>
    </SuperTable.Root>
  )
}
