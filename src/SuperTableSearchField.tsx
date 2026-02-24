import { CloseButton, Input, InputGroup, InputProps } from '@chakra-ui/react'
import { forwardRef, useCallback, useEffect, useRef, useState } from 'react'
import { LuSearch } from 'react-icons/lu'

/**
 * Props for the SuperTableSearchField component.
 * Extends all Chakra UI InputProps except value/onChange which are managed internally.
 */
export type SuperTableSearchFieldProps = Omit<InputProps, 'value' | 'onChange'> & {
  /**
   * Callback fired with sanitized (trimmed) search value after throttle delay.
   * Use this to trigger filtering/searching.
   */
  onSearch?: (value: string) => void
  /**
   * Throttle delay in milliseconds before onSearch is called.
   * @default 300
   */
  throttle?: number
  /**
   * Initial search value.
   * @default ''
   */
  defaultValue?: string
}

/**
 * Sanitizes search input by trimming whitespace.
 */
const sanitizeSearch = (value: string): string => {
  return value.trim()
}

/**
 * Search input field with search icon, clear button, and built-in throttling.
 * Designed to be used with SuperTableSearchBar for table filtering.
 *
 * Features:
 * - Built-in throttle (default 300ms)
 * - Sanitized search value (trimmed)
 * - Clear button appears when there's input
 * - Search icon indicator
 *
 * @param props - SearchField props including onSearch callback and throttle delay
 *
 * @example Basic usage
 * ```tsx
 * <SuperTable.SearchField
 *   placeholder="Search users..."
 *   onSearch={(query) => setFilter(query)}
 * />
 * ```
 *
 * @example With custom throttle
 * ```tsx
 * <SuperTable.SearchField
 *   placeholder="Search..."
 *   throttle={500}
 *   onSearch={(query) => {
 *     setSearchQuery(query)
 *     fetchResults(query)
 *   }}
 * />
 * ```
 *
 * @example Full integration
 * ```tsx
 * const [search, setSearch] = useState('')
 *
 * <SuperTable.SearchBar>
 *   <SuperTable.SearchField
 *     placeholder="Search users..."
 *     onSearch={setSearch}
 *   />
 * </SuperTable.SearchBar>
 * <SuperTable.Root filtering={!!search}>
 *   <SuperTable.Body>
 *     {users.filter(u => u.name.includes(search)).map(...)}
 *   </SuperTable.Body>
 *   <SuperTable.Searching>No results found</SuperTable.Searching>
 * </SuperTable.Root>
 * ```
 */
export const SuperTableSearchField = forwardRef<HTMLInputElement, SuperTableSearchFieldProps>(
  ({ onSearch, throttle = 300, defaultValue = '', ...props }, ref) => {
    const [value, setValue] = useState(defaultValue)
    const internalRef = useRef<HTMLInputElement>(null)
    const inputRef = ref || internalRef
    const throttleRef = useRef<ReturnType<typeof setTimeout> | null>(null)

    // Cleanup throttle on unmount
    useEffect(() => {
      return () => {
        if (throttleRef.current) {
          clearTimeout(throttleRef.current)
        }
      }
    }, [])

    const handleChange = useCallback(
      (e: React.ChangeEvent<HTMLInputElement>) => {
        const newValue = e.target.value
        setValue(newValue)

        // Clear existing throttle
        if (throttleRef.current) {
          clearTimeout(throttleRef.current)
        }

        // Schedule onSearch with sanitized value
        throttleRef.current = setTimeout(() => {
          onSearch?.(sanitizeSearch(newValue))
        }, throttle)
      },
      [onSearch, throttle]
    )

    const handleClear = useCallback(() => {
      setValue('')

      // Clear any pending throttle and immediately call onSearch
      if (throttleRef.current) {
        clearTimeout(throttleRef.current)
      }
      onSearch?.('')

      // Focus the input
      if (typeof inputRef === 'object' && inputRef?.current) {
        inputRef.current.focus()
      }
    }, [onSearch, inputRef])

    const showClearButton = value.length > 0

    const endElement = showClearButton ? (
      <CloseButton
        size="xs"
        onClick={handleClear}
        me="-2"
        aria-label="Clear search"
      />
    ) : undefined

    return (
      <InputGroup
        flex="1"
        maxW="sm"
        startElement={<LuSearch />}
        endElement={endElement}
      >
        <Input
          ref={inputRef}
          placeholder="Search..."
          value={value}
          onChange={handleChange}
          {...props}
        />
      </InputGroup>
    )
  }
)

SuperTableSearchField.displayName = 'SuperTableSearchField'
