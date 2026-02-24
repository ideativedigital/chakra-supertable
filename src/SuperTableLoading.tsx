import { Table } from '@chakra-ui/react'
import { ReactNode } from 'react'
import { useSuperTableContext } from './SuperTableContext'

/**
 * Props for the SuperTableLoading component.
 */
export type SuperTableLoadingProps = {
  /** Custom loading content to display */
  children: ReactNode
  /** Column span override (defaults to header count) */
  colSpan?: number
}

/**
 * Custom loading state component.
 * Rendered when the table is loading and has no items.
 *
 * Use this for custom loading indicators (spinners, progress bars, etc.)
 * instead of or in addition to SuperTable.LoadingRows.
 *
 * @param props - Props including children content and optional colSpan
 *
 * @example
 * ```tsx
 * <SuperTable.Root loading={loading}>
 *   <SuperTable.Head>...</SuperTable.Head>
 *   <SuperTable.Body>{items.map(...)}</SuperTable.Body>
 *   <SuperTable.Loading>
 *     <VStack py={8}>
 *       <Spinner size="xl" />
 *       <Text color="gray.500">Loading data...</Text>
 *     </VStack>
 *   </SuperTable.Loading>
 * </SuperTable.Root>
 * ```
 */
export const SuperTableLoading = ({ children, colSpan }: SuperTableLoadingProps) => {
  const { nbItems, headers, loading } = useSuperTableContext()

  if (nbItems > 0 || !loading) return null

  return (
    <Table.Body>
      <Table.Row>
        <Table.Cell colSpan={colSpan ?? headers}>{children}</Table.Cell>
      </Table.Row>
    </Table.Body>
  )
}
