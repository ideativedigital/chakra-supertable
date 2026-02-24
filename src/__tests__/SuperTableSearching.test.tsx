import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableSearching', () => {
  it('should render when filtering and no items', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Searching>No results found</SuperTable.Searching>
      </SuperTable.Root>
    )

    expect(screen.getByText('No results found')).toBeInTheDocument()
  })

  it('should not render when not filtering', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Searching>No results found</SuperTable.Searching>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No results found')).not.toBeInTheDocument()
  })

  it('should not render when there are items', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Data</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
        <SuperTable.Searching>No results found</SuperTable.Searching>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No results found')).not.toBeInTheDocument()
  })

  it('should not render when loading', () => {
    render(
      <SuperTable.Root filtering loading>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Searching>No results found</SuperTable.Searching>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No results found')).not.toBeInTheDocument()
  })

  it('should use header count for colSpan', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Searching>No results</SuperTable.Searching>
      </SuperTable.Root>
    )

    const cell = screen.getByText('No results').closest('td')
    expect(cell).toHaveAttribute('colspan', '2')
  })

  it('should allow custom colSpan', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Searching colSpan={4}>No results</SuperTable.Searching>
      </SuperTable.Root>
    )

    const cell = screen.getByText('No results').closest('td')
    expect(cell).toHaveAttribute('colspan', '4')
  })
})
