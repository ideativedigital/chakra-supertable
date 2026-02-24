import { describe, expect, it } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableSearchBar', () => {
  it('should render children', () => {
    render(
      <SuperTable.SearchBar>
        <button>Action Button</button>
      </SuperTable.SearchBar>
    )

    expect(screen.getByText('Action Button')).toBeInTheDocument()
  })

  it('should render multiple children', () => {
    render(
      <SuperTable.SearchBar>
        <input placeholder="Search" />
        <button>Filter</button>
        <button>Export</button>
      </SuperTable.SearchBar>
    )

    expect(screen.getByPlaceholderText('Search')).toBeInTheDocument()
    expect(screen.getByText('Filter')).toBeInTheDocument()
    expect(screen.getByText('Export')).toBeInTheDocument()
  })

  it('should pass props to container', () => {
    render(
      <SuperTable.SearchBar data-testid="search-bar" className="custom">
        <span>Content</span>
      </SuperTable.SearchBar>
    )

    expect(screen.getByTestId('search-bar')).toHaveClass('custom')
  })

  it('should work with SearchField', () => {
    render(
      <SuperTable.SearchBar>
        <SuperTable.SearchField placeholder="Search users..." />
      </SuperTable.SearchBar>
    )

    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
  })
})
