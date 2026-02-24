import { Table, TableRowProps } from '@chakra-ui/react'
import { useSuperTableRegisterRow } from './SuperTableContext'

/**
 * Props for the SuperTableRow component.
 * Extends all Chakra UI TableRowProps.
 */
export type SuperTableRowProps = TableRowProps

/**
 * Table row component that registers itself for item counting.
 * The item count is used to determine when to show Empty/Searching/Loading states.
 *
 * @param props - All Chakra UI TableRowProps are supported
 *
 * @example
 * ```tsx
 * <SuperTable.Body>
 *   {users.map(user => (
 *     <SuperTable.Row key={user.id}>
 *       <SuperTable.Cell>{user.name}</SuperTable.Cell>
 *       <SuperTable.Cell>{user.email}</SuperTable.Cell>
 *     </SuperTable.Row>
 *   ))}
 * </SuperTable.Body>
 * ```
 */
export const SuperTableRow = ({ children, ...props }: SuperTableRowProps) => {
  useSuperTableRegisterRow()

  return (
    <Table.Row {...props}>
      {children}
    </Table.Row>
  )
}
