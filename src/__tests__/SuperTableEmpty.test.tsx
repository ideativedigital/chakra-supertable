import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableEmpty', () => {
  it('should render when no items and not loading/filtering', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>No data available</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.getByText('No data available')).toBeInTheDocument()
  })

  it('should not render when there are items', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Data</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
        <SuperTable.Empty>No data available</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No data available')).not.toBeInTheDocument()
  })

  it('should not render when loading', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>No data available</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No data available')).not.toBeInTheDocument()
  })

  it('should not render when filtering', () => {
    render(
      <SuperTable.Root filtering>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>No data available</SuperTable.Empty>
      </SuperTable.Root>
    )

    expect(screen.queryByText('No data available')).not.toBeInTheDocument()
  })

  it('should use header count for colSpan', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
          <SuperTable.Th>Col 3</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty>Empty</SuperTable.Empty>
      </SuperTable.Root>
    )

    const cell = screen.getByText('Empty').closest('td')
    expect(cell).toHaveAttribute('colspan', '3')
  })

  it('should allow custom colSpan', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Empty colSpan={5}>Empty</SuperTable.Empty>
      </SuperTable.Root>
    )

    const cell = screen.getByText('Empty').closest('td')
    expect(cell).toHaveAttribute('colspan', '5')
  })
})
