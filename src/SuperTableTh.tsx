import { HStack, Spinner, Table, TableCellProps } from '@chakra-ui/react'
import { useState } from 'react'
import { LuArrowDown, LuArrowUp, LuArrowUpDown } from 'react-icons/lu'

/**
 * Sort direction for sortable columns.
 */
export type SortDirection = 'asc' | 'desc' | 'none'

/**
 * Base props shared by all SuperTableTh variants.
 */
type SuperTableThBaseProps = Omit<TableCellProps, 'onClick'> & {
  /** Content of the header cell */
  children?: React.ReactNode
}

/**
 * Props when the column is not sortable.
 */
type SuperTableThNonSortable = SuperTableThBaseProps & {
  sortable?: false
  sortDirection?: never
  onSort?: never
}

/**
 * Props when the column is sortable.
 * Requires onSort handler.
 */
type SuperTableThSortable = SuperTableThBaseProps & {
  /** Whether this column is sortable */
  sortable: true
  /** Current sort direction */
  sortDirection?: SortDirection
  /** Handler called when sort is triggered - required when sortable is true */
  onSort: (sortDirection: SortDirection) => Promise<void>
}

/**
 * Props for the SuperTableTh component.
 * Extends all Chakra UI TableCellProps with optional sorting support.
 */
export type SuperTableThProps = SuperTableThNonSortable | SuperTableThSortable

/**
 * Table header cell component.
 * A styled wrapper around Chakra's Table.ColumnHeader with optional sorting.
 *
 * @param props - All Chakra UI TableCellProps are supported, plus sorting props
 *
 * @example
 * ```tsx
 * // Non-sortable header
 * <SuperTable.Th>Name</SuperTable.Th>
 *
 * // Sortable header
 * <SuperTable.Th
 *   sortable
 *   sortDirection={sortConfig.column === 'email' ? sortConfig.direction : 'none'}
 *   onSort={() => handleSort('email')}
 * >
 *   Email
 * </SuperTable.Th>
 * ```
 */
export const SuperTableTh = (props: SuperTableThProps) => {
  const { sortable, sortDirection = 'none', onSort, children, ...rest } = props as SuperTableThSortable & SuperTableThBaseProps
  const [isSorting, setIsSorting] = useState(false)

  if (!sortable) {
    return <Table.ColumnHeader {...rest}>{children}</Table.ColumnHeader>
  }

  const SortIcon = sortDirection === 'asc'
    ? LuArrowUp
    : sortDirection === 'desc'
      ? LuArrowDown
      : LuArrowUpDown

  return (
    <Table.ColumnHeader
      {...rest}
      cursor="pointer"
      onClick={() => {
        setIsSorting(true)
        try {
          onSort(sortDirection === 'asc' ? 'desc' : sortDirection === 'desc' ? 'none' : 'asc').finally(() => setIsSorting(false))
        } catch (error) {
          console.error(error)
        }
        finally {
          setIsSorting(false)
        }
      }}
      _hover={{ bg: 'bg.muted' }}
      userSelect="none"
    >
      <HStack gap={1}>
        {children}
        {isSorting ? <Spinner size="xs" /> : <SortIcon style={{ opacity: sortDirection === 'none' ? 0.4 : 1 }} />}
      </HStack>
    </Table.ColumnHeader>
  )
}
