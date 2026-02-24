import { Table, TableCellProps } from '@chakra-ui/react'

/**
 * Props for the SuperTableCell component.
 * Extends all Chakra UI TableCellProps.
 */
export type SuperTableCellProps = TableCellProps

/**
 * Table cell component.
 * A wrapper around Chakra's Table.Cell for consistency.
 *
 * @param props - All Chakra UI TableCellProps are supported
 *
 * @example
 * ```tsx
 * <SuperTable.Row>
 *   <SuperTable.Cell>John Doe</SuperTable.Cell>
 *   <SuperTable.Cell color="gray.500">john@example.com</SuperTable.Cell>
 *   <SuperTable.Cell textAlign="right">
 *     <Button size="sm">Edit</Button>
 *   </SuperTable.Cell>
 * </SuperTable.Row>
 * ```
 */
export const SuperTableCell = (props: SuperTableCellProps) => {
  return <Table.Cell {...props} />
}
