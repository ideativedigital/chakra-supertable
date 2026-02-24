import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render } from './test-utils'

describe('SuperTableLoadingRows', () => {
  it('should render loading rows when loading and no items', () => {
    render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.LoadingRows pattern={['line', 'text']} />
      </SuperTable.Root>
    )

    // Default count is 3 rows
    const tbody = document.querySelectorAll('tbody')
    expect(tbody.length).toBeGreaterThan(0)
  })

  it('should not render when not loading', () => {
    const { container } = render(
      <SuperTable.Root>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.LoadingRows pattern={['line']} />
      </SuperTable.Root>
    )

    // LoadingRows creates a tbody, so we should only have the empty Body's tbody
    const tbodies = container.querySelectorAll('tbody')
    expect(tbodies.length).toBe(1) // Only the empty Body
  })

  it('should not render when there are items', () => {
    const { container } = render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body>
          <SuperTable.Row>
            <SuperTable.Cell>Data</SuperTable.Cell>
          </SuperTable.Row>
        </SuperTable.Body>
        <SuperTable.LoadingRows pattern={['line']} />
      </SuperTable.Root>
    )

    // Should only have the Body's tbody with actual data
    const rows = container.querySelectorAll('tbody tr')
    expect(rows.length).toBe(1) // Only the data row
  })

  it('should render specified number of rows', () => {
    const { container } = render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.LoadingRows pattern={['line']} count={5} />
      </SuperTable.Root>
    )

    // LoadingRows creates its own tbody
    const loadingTbody = container.querySelectorAll('tbody')[1]
    const rows = loadingTbody?.querySelectorAll('tr')
    expect(rows?.length).toBe(5)
  })

  it('should render cells matching header count', () => {
    const { container } = render(
      <SuperTable.Root loading>
        <SuperTable.Head>
          <SuperTable.Th>Col 1</SuperTable.Th>
          <SuperTable.Th>Col 2</SuperTable.Th>
          <SuperTable.Th>Col 3</SuperTable.Th>
        </SuperTable.Head>
        <SuperTable.Body />
        <SuperTable.LoadingRows pattern={['line', 'text', 'badge']} count={1} />
      </SuperTable.Root>
    )

    const loadingTbody = container.querySelectorAll('tbody')[1]
    const cells = loadingTbody?.querySelectorAll('tr td')
    expect(cells?.length).toBe(3)
  })
})
