import { Table } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useSuperTableContext } from './SuperTableContext'

/**
 * Props for the SuperTableEmpty component.
 */
export type SuperTableEmptyProps = {
  /** Content to display when the table is empty */
  children: ReactNode
  /** Column span override (defaults to header count) */
  colSpan?: number
}

/**
 * Empty state component.
 * Rendered when the table has no items and is not loading or filtering.
 *
 * Use this for "no data" messaging when the table is in its initial empty state.
 *
 * @param props - Props including children content and optional colSpan
 *
 * @example
 * ```tsx
 * <SuperTable.Root>
 *   <SuperTable.Head>...</SuperTable.Head>
 *   <SuperTable.Body>{items.map(...)}</SuperTable.Body>
 *   <SuperTable.Empty>
 *     <VStack py={8}>
 *       <Icon as={FaInbox} boxSize={12} color="gray.400" />
 *       <Text color="gray.500">No items yet</Text>
 *       <Button>Add your first item</Button>
 *     </VStack>
 *   </SuperTable.Empty>
 * </SuperTable.Root>
 * ```
 */
export const SuperTableEmpty = ({ children, colSpan }: SuperTableEmptyProps) => {
  const { nbItems, headers, loading, filtering } = useSuperTableContext()

  if (nbItems > 0 || loading || filtering) return null

  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={colSpan ?? headers}>{children}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}
