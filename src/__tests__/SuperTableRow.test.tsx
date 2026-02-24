import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableRow', () => {
  it('should render children', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Cell 1</SuperTable.Cell>
            <SuperTable.Cell>Cell 2</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByText('Cell 1')).toBeInTheDocument()
    expect(screen.getByText('Cell 2')).toBeInTheDocument()
  })

  it('should register itself and increment item count', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Row 1</SuperTable.Cell>
          </SuperTable.Row>
          <SuperTable.Row>
            <SuperTable.Cell>Row 2</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
        <SuperTable.Empty>No items</SuperTable.Empty>
      </SuperTable.Root>
    )

    // Empty should not be visible because there are rows
    expect(screen.queryByText('No items')).not.toBeInTheDocument()
  })

  it('should render inside tr element', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row data-testid="row">
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('row').tagName).toBe('TR')
  })

  it('should pass props to tr', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row data-testid="row" className="custom-row">
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('row')).toHaveClass('custom-row')
  })
})
