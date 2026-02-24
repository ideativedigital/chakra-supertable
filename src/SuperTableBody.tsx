import { Table, TableBodyProps } from '@chakra-ui/react'

/**
 * Props for the SuperTableBody component.
 * Extends all Chakra UI TableBodyProps.
 */
export type SuperTableBodyProps = TableBodyProps

/**
 * Table body component.
 * A wrapper around Chakra's Table.Body for consistency.
 *
 * @param props - All Chakra UI TableBodyProps are supported
 *
 * @example
 * ```tsx
 * <SuperTable.Root>
 *   <SuperTable.Head>...</SuperTable.Head>
 *   <SuperTable.Body>
 *     {items.map(item => (
 *       <SuperTable.Row key={item.id}>...</SuperTable.Row>
 *     ))}
 *   </SuperTable.Body>
 * </SuperTable.Root>
 * ```
 */
export const SuperTableBody = (props: SuperTableBodyProps) => {
  return <Table.Body {...props} />
}
