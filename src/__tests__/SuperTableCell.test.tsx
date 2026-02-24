import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableCell', () => {
  it('should render children', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Cell content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByText('Cell content')).toBeInTheDocument()
  })

  it('should render inside td element', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell data-testid="cell">Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('cell').tagName).toBe('TD')
  })

  it('should pass props to td', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell data-testid="cell" colSpan={2}>
              Content
            </SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('cell')).toHaveAttribute('colspan', '2')
  })
})
