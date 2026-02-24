import userEvent from '@testing-library/user-event'
import { describe, expect, it, vi } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableTh', () => {
  it('should render children', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Column Name</SuperTable.Th>
        </SuperTable.Head>
      </SuperTable.Root>
    )

    expect(screen.getByText('Column Name')).toBeInTheDocument()
  })

  it('should render inside th element', () => {
    render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th data-testid="th">Header</SuperTable.Th>
        </SuperTable.Head>
      </SuperTable.Root>
    )

    expect(screen.getByTestId('th').tagName).toBe('TH')
  })

  describe('sortable', () => {
    it('should show sort icon when sortable', () => {
      const onSort = vi.fn().mockResolvedValue(undefined)

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th sortable onSort={onSort}>
              Sortable Column
            </SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      // Should have an SVG icon
      const th = screen.getByText('Sortable Column').closest('th')
      expect(th?.querySelector('svg')).toBeInTheDocument()
    })

    it('should call onSort when clicked', async () => {
      const user = userEvent.setup()
      const onSort = vi.fn().mockResolvedValue(undefined)

      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th sortable onSort={onSort} sortDirection="none">
              Sortable Column
            </SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      const th = screen.getByText('Sortable Column').closest('th')
      await user.click(th!)

      expect(onSort).toHaveBeenCalledWith('asc')
    })

    it('should cycle through sort directions', async () => {
      const user = userEvent.setup()
      const onSort = vi.fn().mockResolvedValue(undefined)

      const { rerender } = render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th sortable onSort={onSort} sortDirection="none">
              Column
            </SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      const th = screen.getByText('Column').closest('th')

      // none -> asc
      await user.click(th!)
      expect(onSort).toHaveBeenLastCalledWith('asc')

      // Rerender with asc
      rerender(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th sortable onSort={onSort} sortDirection="asc">
              Column
            </SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      // asc -> desc
      await user.click(th!)
      expect(onSort).toHaveBeenLastCalledWith('desc')

      // Rerender with desc
      rerender(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th sortable onSort={onSort} sortDirection="desc">
              Column
            </SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      // desc -> none
      await user.click(th!)
      expect(onSort).toHaveBeenLastCalledWith('none')
    })

    it('should not show sort icon when not sortable', () => {
      render(
        <SuperTable.Root>
          <SuperTable.Head>
            <SuperTable.Th>Non-sortable</SuperTable.Th>
          </SuperTable.Head>
        </SuperTable.Root>
      )

      const th = screen.getByText('Non-sortable').closest('th')
      // Non-sortable headers don't have the HStack wrapper with icon
      expect(th?.querySelector('svg')).not.toBeInTheDocument()
    })
  })
})
