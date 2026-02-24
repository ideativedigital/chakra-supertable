import userEvent from '@testing-library/user-event'
import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen, waitFor } from './test-utils'

describe('SuperTableSimpleSection', () => {
  it('should render section title', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.SimpleSection title="Section Title">
          <SuperTable.Row>
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
      </SuperTable.Root>
    )

    expect(screen.getByText('Section Title')).toBeInTheDocument()
  })

  it('should render children', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.SimpleSection title="Section">
          <SuperTable.Row>
            <SuperTable.Cell>Row content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
      </SuperTable.Root>
    )

    expect(screen.getByText('Row content')).toBeInTheDocument()
  })

  describe('collapsible', () => {
    it('should show collapse trigger when collapsible', () => {
      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Section" collapsible>
            <SuperTable.Row>
              <SuperTable.Cell>Content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      expect(screen.getByRole('button', { name: /collapse section/i })).toBeInTheDocument()
    })

    it('should hide children when collapsed', async () => {
      const user = userEvent.setup()

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Section" collapsible>
            <SuperTable.Row>
              <SuperTable.Cell>Hidden content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      // Initially visible
      expect(screen.getByText('Hidden content')).toBeInTheDocument()

      // Click to collapse
      const trigger = screen.getByRole('button', { name: /collapse section/i })
      await user.click(trigger)

      // Should be hidden after fade-out animation completes
      await waitFor(() => {
        expect(screen.queryByText('Hidden content')).not.toBeInTheDocument()
      })
    })

    it('should expand when collapsed and clicked', async () => {
      const user = userEvent.setup()

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Section" collapsible defaultCollapsed>
            <SuperTable.Row>
              <SuperTable.Cell>Content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      // Initially hidden
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
      })

      // Click to expand
      const trigger = screen.getByRole('button', { name: /expand section/i })
      await user.click(trigger)

      // Should be visible
      await waitFor(() => {
        expect(screen.getByText('Content')).toBeInTheDocument()
      })
    })

    it('should toggle on row click when collapsible', async () => {
      const user = userEvent.setup()

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Click me" collapsible>
            <SuperTable.Row>
              <SuperTable.Cell>Content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      // Click on the section title row
      await user.click(screen.getByText('Click me'))

      // Should be hidden after fade-out animation completes
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
      })
    })

    it('should toggle on Enter key when collapsible', async () => {
      const user = userEvent.setup()

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Section" collapsible>
            <SuperTable.Row>
              <SuperTable.Cell>Content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      // Focus the section row and press Enter
      const sectionRow = screen.getByRole('button', { name: /collapse section/i }).closest('tr')
      sectionRow?.focus()
      await user.keyboard('{Enter}')

      // Should be hidden after fade-out animation completes
      await waitFor(() => {
        expect(screen.queryByText('Content')).not.toBeInTheDocument()
      })
    })

    it('should start collapsed when defaultCollapsed is true', async () => {
      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Header</SuperTable.Th>
          </SuperTable.Head>
          <SuperTable.SimpleSection title="Section" collapsible defaultCollapsed>
            <SuperTable.Row>
              <SuperTable.Cell>Hidden</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SimpleSection>
        </SuperTable.Root>
      )

      await waitFor(() => {
        expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
      })
    })
  })

  it('should not show collapse trigger when not collapsible', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.SimpleSection title="Section">
          <SuperTable.Row>
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
      </SuperTable.Root>
    )

    expect(screen.queryByRole('button')).not.toBeInTheDocument()
  })

  it('should use header count for colSpan', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
          <SuperTable.Th>Col 3</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.SimpleSection title="Section">
          <SuperTable.Row>
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.SimpleSection>
      </SuperTable.Root>
    )

    const sectionHeader = screen.getByText('Section').closest('th')
    expect(sectionHeader).toHaveAttribute('colspan', '3')
  })
})

describe('SuperTableSection (composable)', () => {
  it('should render with SectionHeader and SectionContent', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Section collapsible>
          <SuperTable.SectionHeader>
            <SuperTable.SectionTitle>Composable Title</SuperTable.SectionTitle>
            <SuperTable.SectionCollapseTrigger />
          </SuperTable.SectionHeader>
          <SuperTable.SectionContent>
            <SuperTable.Row>
              <SuperTable.Cell>Row content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SectionContent>
        </SuperTable.Section>
      </SuperTable.Root>
    )

    expect(screen.getByText('Composable Title')).toBeInTheDocument()
    expect(screen.getByText('Row content')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /collapse section/i })).toBeInTheDocument()
  })

  it('should collapse content when trigger is clicked', async () => {
    const user = userEvent.setup()

    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Section collapsible>
          <SuperTable.SectionHeader>
            <SuperTable.SectionTitle>Title</SuperTable.SectionTitle>
            <SuperTable.SectionCollapseTrigger />
          </SuperTable.SectionHeader>
          <SuperTable.SectionContent>
            <SuperTable.Row>
              <SuperTable.Cell>Content</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SectionContent>
        </SuperTable.Section>
      </SuperTable.Root>
    )

    expect(screen.getByText('Content')).toBeInTheDocument()

    await user.click(screen.getByRole('button', { name: /collapse section/i }))

    // Should be hidden after fade-out animation completes
    await waitFor(() => {
      expect(screen.queryByText('Content')).not.toBeInTheDocument()
    })
    // Header stays visible
    expect(screen.getByText('Title')).toBeInTheDocument()
  })

  it('should toggle on header row click', async () => {
    const user = userEvent.setup()

    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Section collapsible>
          <SuperTable.SectionHeader>
            <SuperTable.SectionTitle>Click me</SuperTable.SectionTitle>
            <SuperTable.SectionCollapseTrigger />
          </SuperTable.SectionHeader>
          <SuperTable.SectionContent>
            <SuperTable.Row>
              <SuperTable.Cell>Hidden</SuperTable.Cell>
            </SuperTable.Row>
          </SuperTable.SectionContent>
        </SuperTable.Section>
      </SuperTable.Root>
    )

    await user.click(screen.getByText('Click me'))

    // Should be hidden after fade-out animation completes
    await waitFor(() => {
      expect(screen.queryByText('Hidden')).not.toBeInTheDocument()
    })
  })
})
