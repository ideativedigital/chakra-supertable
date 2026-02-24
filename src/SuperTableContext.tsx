import type { TableRootProps } from '@chakra-ui/react'
import React, { useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react'

/**
 * Props for the SuperTable root component.
 */
export type SuperTableProps = TableRootProps & {
  /**
   * Whether the table is in a loading state.
   * When true, loading indicators and skeleton rows will be displayed.
   */
  loading?: boolean
  /**
   * Whether the table is being filtered.
   * Affects which empty state is shown (Empty vs Searching).
   */
  filtering?: boolean
}

/**
 * Context type for SuperTable internal state management.
 */
export type SuperTableContextType = {
  /** Number of header columns in the table */
  headers: number
  /** Set the number of header columns */
  setHeaders: (count: number) => void
  /** Whether the table is currently loading */
  loading: boolean
  /** Set the loading state */
  setLoading: (loading: boolean) => void
  /** Whether the table is being filtered */
  filtering: boolean
  /** Number of data items/rows in the table */
  nbItems: number
  /** Register a new item/row */
  addItem: () => void
  /** Unregister an item/row */
  removeItem: () => void
}

/**
 * React context for SuperTable state management.
 * Provides header count, loading state, filtering state, and item count.
 */
export const SuperTableContext = React.createContext<SuperTableContextType>({
  headers: 0,
  setHeaders: () => { },
  setLoading: () => { },
  loading: false,
  filtering: false,
  nbItems: 0,
  addItem: () => { },
  removeItem: () => { }
})

/**
 * Hook to access the SuperTable context.
 * Must be used within a SuperTable.Root component.
 *
 * @returns The SuperTable context value
 *
 * @example
 * ```tsx
 * const { loading, nbItems } = useSuperTableContext()
 * ```
 */
export const useSuperTableContext = () => useContext(SuperTableContext)

/**
 * Hook to create the SuperTable context value.
 * Used internally by SuperTableRoot.
 *
 * @param props - The SuperTable props
 * @returns The context value to provide
 */
export const useSuperTable = (props: SuperTableProps): SuperTableContextType => {
  const [headers, setHeaders] = useState<number>(0)
  const [loading, setLoading] = useState<boolean>(props.loading ?? false)
  const [nbItems, setNbItems] = useState<number>(0)

  useEffect(() => {
    setLoading(props.loading ?? false)
  }, [props.loading])

  const addItem = useCallback(() => setNbItems(n => n + 1), [])
  const removeItem = useCallback(() => setNbItems(n => n - 1), [])

  return useMemo(
    () => ({
      headers,
      setHeaders,
      loading: loading || false,
      setLoading,
      filtering: props.filtering || false,
      nbItems,
      addItem,
      removeItem
    }),
    [headers, loading, props.filtering, nbItems, addItem, removeItem]
  )
}

/**
 * Hook to get the current header count.
 *
 * @returns The number of header columns
 *
 * @example
 * ```tsx
 * const headerCount = useSuperTableHeaders()
 * ```
 */
export const useSuperTableHeaders = () => useSuperTableContext().headers

/**
 * Hook to register a row in the table.
 * Automatically increments the item count on mount and decrements on unmount.
 * Used internally by SuperTableRow.
 */
export const useSuperTableRegisterRow = () => {
  const { addItem, removeItem } = useSuperTableContext()
  const mountedRef = useRef(false)

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true
      addItem()
    }
    return () => {
      removeItem()
    }
  }, [addItem, removeItem])
}
