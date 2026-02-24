import { Table } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useSuperTableContext } from './SuperTableContext'

/**
 * Props for the SuperTableSearching component.
 */
export type SuperTableSearchingProps = {
  /** Content to display when filtering returns no results */
  children: ReactNode
  /** Column span override (defaults to header count) */
  colSpan?: number
}

/**
 * Search/filter empty state component.
 * Rendered when filtering returns no results (filtering is true and no items).
 *
 * Use this for "no search results" messaging when the user has applied filters.
 *
 * @param props - Props including children content and optional colSpan
 *
 * @example
 * ```tsx
 * <SuperTable.Root filtering={!!searchQuery}>
 *   <SuperTable.Head>...</SuperTable.Head>
 *   <SuperTable.Body>{filteredItems.map(...)}</SuperTable.Body>
 *   <SuperTable.Searching>
 *     <VStack py={8}>
 *       <Icon as={FaSearch} boxSize={12} color="gray.400" />
 *       <Text color="gray.500">No results for "{searchQuery}"</Text>
 *       <Button variant="link" onClick={clearSearch}>
 *         Clear search
 *       </Button>
 *     </VStack>
 *   </SuperTable.Searching>
 * </SuperTable.Root>
 * ```
 */
export const SuperTableSearching = ({ children, colSpan }: SuperTableSearchingProps) => {
  const { nbItems, headers, loading, filtering } = useSuperTableContext()

  if (nbItems > 0 || loading || !filtering) return null

  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={colSpan ?? headers}>{children}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}
