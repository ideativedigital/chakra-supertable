import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableBody', () => {
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

  it('should render inside tbody element', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body data-testid="body">
          <SuperTable.Row>
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('body').tagName).toBe('TBODY')
  })

  it('should pass props to tbody', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body data-testid="body" className="custom-class">
          <SuperTable.Row>
            <SuperTable.Cell>Content</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('body')).toHaveClass('custom-class')
  })
})
