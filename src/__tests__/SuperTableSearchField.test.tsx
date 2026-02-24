import userEvent from '@testing-library/user-event'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { SuperTable } from '../index'
import { render, screen } from './test-utils'

describe('SuperTableSearchField', () => {
  beforeEach(() => {
    vi.useFakeTimers({ shouldAdvanceTime: true })
  })

  afterEach(() => {
    vi.runOnlyPendingTimers()
    vi.useRealTimers()
  })

  it('should render input with placeholder', () => {
    render(<SuperTable.SearchField placeholder="Search users..." />)

    expect(screen.getByPlaceholderText('Search users...')).toBeInTheDocument()
  })

  it('should render with default placeholder', () => {
    render(<SuperTable.SearchField />)

    expect(screen.getByPlaceholderText('Search...')).toBeInTheDocument()
  })

  it('should render search icon', () => {
    const { container } = render(<SuperTable.SearchField />)

    // LuSearch icon should be present
    expect(container.querySelector('svg')).toBeInTheDocument()
  })

  it('should update input value on type', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<SuperTable.SearchField placeholder="Search..." />)

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'hello')

    expect(input).toHaveValue('hello')
  })

  it('should show clear button when value is present', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<SuperTable.SearchField />)

    const input = screen.getByPlaceholderText('Search...')

    // Initially no clear button
    expect(screen.queryByRole('button', { name: /clear/i })).not.toBeInTheDocument()

    // Type something
    await user.type(input, 'test')

    // Clear button should appear
    expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
  })

  it('should clear input when clear button is clicked', async () => {
    const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

    render(<SuperTable.SearchField />)

    const input = screen.getByPlaceholderText('Search...')
    await user.type(input, 'test')

    expect(input).toHaveValue('test')

    const clearButton = screen.getByRole('button', { name: /clear/i })
    await user.click(clearButton)

    expect(input).toHaveValue('')
  })

  describe('onSearch callback', () => {
    it('should call onSearch with sanitized value after throttle', async () => {
      const onSearch = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(<SuperTable.SearchField onSearch={onSearch} throttle={300} />)

      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, '  hello world  ')

      // onSearch should not be called yet (throttled)
      expect(onSearch).not.toHaveBeenCalled()

      // Advance timers past throttle
      vi.advanceTimersByTime(300)

      // onSearch should be called with trimmed value
      expect(onSearch).toHaveBeenCalledWith('hello world')
    })

    it('should use default throttle of 300ms', async () => {
      const onSearch = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(<SuperTable.SearchField onSearch={onSearch} />)

      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'test')

      // Not called yet at 200ms
      vi.advanceTimersByTime(200)
      expect(onSearch).not.toHaveBeenCalled()

      // Called at 300ms
      vi.advanceTimersByTime(100)
      expect(onSearch).toHaveBeenCalledWith('test')
    })

    it('should use custom throttle value', async () => {
      const onSearch = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(<SuperTable.SearchField onSearch={onSearch} throttle={500} />)

      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'test')

      // Not called yet at 400ms
      vi.advanceTimersByTime(400)
      expect(onSearch).not.toHaveBeenCalled()

      // Called at 500ms
      vi.advanceTimersByTime(100)
      expect(onSearch).toHaveBeenCalledWith('test')
    })

    it('should reset throttle on each keystroke', async () => {
      const onSearch = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(<SuperTable.SearchField onSearch={onSearch} throttle={300} />)

      const input = screen.getByPlaceholderText('Search...')

      await user.type(input, 't')
      vi.advanceTimersByTime(200)

      await user.type(input, 'e')
      vi.advanceTimersByTime(200)

      await user.type(input, 's')
      vi.advanceTimersByTime(200)

      await user.type(input, 't')

      // Should not have been called yet
      expect(onSearch).not.toHaveBeenCalled()

      // Wait for full throttle after last keystroke
      vi.advanceTimersByTime(300)

      // Should be called once with final value
      expect(onSearch).toHaveBeenCalledTimes(1)
      expect(onSearch).toHaveBeenCalledWith('test')
    })

    it('should call onSearch immediately with empty string on clear', async () => {
      const onSearch = vi.fn()
      const user = userEvent.setup({ advanceTimers: vi.advanceTimersByTime })

      render(<SuperTable.SearchField onSearch={onSearch} throttle={300} />)

      const input = screen.getByPlaceholderText('Search...')
      await user.type(input, 'test')

      // Wait for throttle
      vi.advanceTimersByTime(300)
      expect(onSearch).toHaveBeenCalledWith('test')

      // Clear
      const clearButton = screen.getByRole('button', { name: /clear/i })
      await user.click(clearButton)

      // Should be called immediately without waiting for throttle
      expect(onSearch).toHaveBeenCalledWith('')
    })
  })

  describe('defaultValue', () => {
    it('should initialize with defaultValue', () => {
      render(<SuperTable.SearchField defaultValue="initial" />)

      expect(screen.getByPlaceholderText('Search...')).toHaveValue('initial')
    })

    it('should show clear button with defaultValue', () => {
      render(<SuperTable.SearchField defaultValue="initial" />)

      expect(screen.getByRole('button', { name: /clear/i })).toBeInTheDocument()
    })
  })

  it('should pass other props to input', () => {
    render(<SuperTable.SearchField disabled data-testid="search-input" />)

    const input = screen.getByTestId('search-input')
    expect(input).toBeDisabled()
  })
})
