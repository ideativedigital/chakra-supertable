import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableHead', () => {
  it('should render header cells', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Name</SuperTable.Th>
          <SuperTable.Th>Email</SuperTable.Th>
        </SuperTable.Head>
      </SuperTable.Root>
    )

    expect(screen.getByText('Name')).toBeInTheDocument()
    expect(screen.getByText('Email')).toBeInTheDocument()
  })

  it('should count children for header count', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
          <SuperTable.Th>Col 3</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Empty>No items</SuperTable.Empty>
      </SuperTable.Root>
    )

    // Empty should have colSpan of 3 (number of headers)
    const emptyCell = screen.getByText('No items').closest('td')
    expect(emptyCell).toHaveAttribute('colspan', '3')
  })

  it('should render inside thead element', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Header</SuperTable.Th>
        </SuperTable.Head>
      </SuperTable.Root>
    )

    const header = screen.getByText('Header')
    expect(header.closest('thead')).toBeInTheDocument()
  })
})
