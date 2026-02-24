import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableLoading', () => {
  it('should render when loading and no items', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Loading>Loading...</SuperTable.Loading>
      </SuperTable.Root>
    )

    expect(screen.getByText('Loading...')).toBeInTheDocument()
  })

  it('should not render when not loading', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Loading>Loading...</SuperTable.Loading>
      </SuperTable.Root>
    )

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should not render when there are items', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Data</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
        <SuperTable.Loading>Loading...</SuperTable.Loading>
      </SuperTable.Root>
    )

    expect(screen.queryByText('Loading...')).not.toBeInTheDocument()
  })

  it('should use header count for colSpan', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
          <SuperTable.Th>Col 3</SuperTable.Th>
          <SuperTable.Th>Col 4</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Loading>Loading</SuperTable.Loading>
      </SuperTable.Root>
    )

    const cell = screen.getByText('Loading').closest('td')
    expect(cell).toHaveAttribute('colspan', '4')
  })

  it('should allow custom colSpan', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.Loading colSpan={6}>Loading</SuperTable.Loading>
      </SuperTable.Root>
    )

    const cell = screen.getByText('Loading').closest('td')
    expect(cell).toHaveAttribute('colspan', '6')
  })
})
