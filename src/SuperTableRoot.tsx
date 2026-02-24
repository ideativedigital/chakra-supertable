import { Table } from '@chakra-ui/react'
import { SuperTableContext, SuperTableProps, useSuperTable } from './SuperTableContext'

/**
 * Root component for SuperTable.
 * Provides context for all child components and wraps content in Chakra's Table.Root.
 *
 * @param props - Table props including loading and filtering state
 *
 * @example
 * ```tsx
 * <SuperTable.Root loading={loading} filtering={!!searchQuery}>
 *   <SuperTable.Head>
 *     <SuperTable.Th>Name</SuperTable.Th>
 *     <SuperTable.Th>Email</SuperTable.Th>
 *   </SuperTable.Head>
 *   <SuperTable.Body>
 *     {users.map(user => (
 *       <SuperTable.Row key={user.id}>
 *         <SuperTable.Cell>{user.name}</SuperTable.Cell>
 *         <SuperTable.Cell>{user.email}</SuperTable.Cell>
 *       </SuperTable.Row>
 *     ))}
 *   </SuperTable.Body>
 *   <SuperTable.Empty>No users found</SuperTable.Empty>
 *   <SuperTable.LoadingRows pattern={['line', 'text']} />
 * </SuperTable.Root>
 * ```
 */
export const SuperTableRoot = (props: SuperTableProps) => {
  const { loading, children, filtering, interactive, ...tableProps } = props
  const ctx = useSuperTable(props)

  return (
    <SuperTableContext.Provider value={ctx}>
      <Table.Root {...tableProps} interactive={interactive && !ctx.loading && !loading && !ctx.nbItems}>{children}</Table.Root>
    </SuperTableContext.Provider>
  )
}
