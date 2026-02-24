import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableRoot', () => {
  it('should render children', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Body>
          <tr>
            <td>Test content</td>
          </tr>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByText('Test content')).toBeInTheDocument()
  })

  it('should render a table element', () => {
    render(
      <SuperTable.Root data-testid="table">
        <SuperTable.Body>
          <tr>
            <td>Content</td>
          </tr>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('table')).toBeInTheDocument()
  })

  it('should provide context to children', () => {
    render(
      <SuperTable.Root loading={true}>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Loading>Loading content</SuperTable.Loading>
      </SuperTable.Root>
    )

    expect(screen.getByText('Loading content')).toBeInTheDocument()
  })

  it('should pass table props to underlying Table.Root', () => {
    render(
      <SuperTable.Root size="sm" variant="outline" data-testid="table">
        <SuperTable.Body>
          <tr>
            <td>Content</td>
          </tr>
        </SuperTable.Body>
      </SuperTable.Root>
    )

    const table = screen.getByTestId('table')
    expect(table).toBeInTheDocument()
  })
})
