import { Table } from '@chakra-ui/react'
import { Children, ReactNode, useEffect } from 'react'
import { useSuperTableContext } from './SuperTableContext'

/**
 * Props for the SuperTableHead component.
 */
export type SuperTableHeadProps = {
  /** Header cells (SuperTable.Th components) */
  children: ReactNode
}

/**
 * Table header component.
 * Automatically counts children to determine the number of columns,
 * which is used for colSpan calculations in Empty, Searching, and Loading states.
 *
 * @param props - Component props containing header cells as children
 *
 * @example
 * ```tsx
 * <SuperTable.Head>
 *   <SuperTable.Th>Name</SuperTable.Th>
 *   <SuperTable.Th>Email</SuperTable.Th>
 *   <SuperTable.Th width="100px">Status</SuperTable.Th>
 * </SuperTable.Head>
 * ```
 */
export const SuperTableHead = ({ children }: SuperTableHeadProps) => {
  const { setHeaders } = useSuperTableContext()
  const childCount = Children.count(children)

  useEffect(() => {
    setHeaders(childCount)
  }, [childCount, setHeaders])

  return (
    <Table.Header>
      <Table.Row>{children}</Table.Row>
    </Table.Header>
  )
}
