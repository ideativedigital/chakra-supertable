import { Table, TableRowProps } from '@chakra-ui/react'
import { useSuperTableContext, useSuperTableHeaders } from './SuperTableContext'
import { SuperTableLoadingCellMap, SuperTableLoadingCellType } from './SuperTableLoadingCell'

/**
 * Props for the SuperTableLoadingRow component.
 */
export type SuperTableLoadingRowProps = TableRowProps & {
  /**
   * Pattern of skeleton types for each column.
   * If not provided or shorter than header count, defaults to 'line'.
   */
  pattern?: SuperTableLoadingCellType[]
}

/**
 * Single skeleton loading row.
 * Renders skeleton cells based on the provided pattern.
 * Only visible when the table is in loading state.
 *
 * @param props - Row props including the skeleton pattern
 *
 * @example
 * ```tsx
 * // Usually used via SuperTable.LoadingRows, but can be used directly:
 * <SuperTable.LoadingRow pattern={['avatar', 'line', 'text', 'badge']} />
 * ```
 */
export const SuperTableLoadingRow = ({ pattern, ...props }: SuperTableLoadingRowProps) => {
  const headers = useSuperTableHeaders()
  const { loading } = useSuperTableContext()

  if (!loading) return null

  return (
    <Table.Row {...props}>
      {Array.from({ length: headers }).map((_, i) => (
        <Table.Cell key={i}>
          {SuperTableLoadingCellMap[pattern?.[i] ?? 'line']}
        </Table.Cell>
      ))}
    </Table.Row>
  )
}
