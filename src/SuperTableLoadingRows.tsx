import { Table } from '@chakra-ui/react'
import { useSuperTableContext } from './SuperTableContext'
import { SuperTableLoadingCellType } from './SuperTableLoadingCell'
import { SuperTableLoadingRow } from './SuperTableLoadingRow'

/**
 * Props for the SuperTableLoadingRows component.
 */
export type SuperTableLoadingRowsProps = {
  /**
   * Pattern of skeleton types for each column.
   * @example ['avatar', 'line', 'text', 'badge', 'icon']
   */
  pattern: SuperTableLoadingCellType[]
  /**
   * Number of loading rows to display.
   * @default 3
   */
  count?: number
}

/**
 * Renders multiple skeleton loading rows with a specified pattern.
 * Only visible when the table is in loading state and has no items.
 *
 * This is the recommended way to show loading states in SuperTable.
 *
 * @param props - Props including pattern and row count
 *
 * @example
 * ```tsx
 * <SuperTable.Root loading={loading}>
 *   <SuperTable.Head>
 *     <SuperTable.Th>Avatar</SuperTable.Th>
 *     <SuperTable.Th>Name</SuperTable.Th>
 *     <SuperTable.Th>Email</SuperTable.Th>
 *     <SuperTable.Th>Status</SuperTable.Th>
 *   </SuperTable.Head>
 *   <SuperTable.Body>
 *     {users.map(user => (...))}
 *   </SuperTable.Body>
 *   <SuperTable.LoadingRows
 *     pattern={['avatar', 'line', 'text', 'badge']}
 *     count={5}
 *   />
 * </SuperTable.Root>
 * ```
 */
export const SuperTableLoadingRows = ({ pattern, count = 3 }: SuperTableLoadingRowsProps) => {
  const { loading, nbItems } = useSuperTableContext()

  if (!loading || nbItems > 0) return null

  return (
    <Table.Body>
      {Array.from({ length: count }).map((_, i) => (
        <SuperTableLoadingRow key={`loading-row-${i}`} pattern={pattern} />
      ))}
    </Table.Body>
  )
}
