import { Group, GroupProps } from '@chakra-ui/react'

/**
 * Props for the SuperTableSearchBar component.
 * Extends all Chakra UI GroupProps.
 */
export type SuperTableSearchBarProps = GroupProps

/**
 * Search bar container component.
 * A flexible container for search field, filters, and action buttons above the table.
 *
 * @param props - All Chakra UI GroupProps are supported
 *
 * @example
 * ```tsx
 * <SuperTable.SearchBar>
 *   <SuperTable.SearchField
 *     placeholder="Search users..."
 *     value={search}
 *     onChange={(e) => setSearch(e.target.value)}
 *   />
 *   <Button>Add User</Button>
 * </SuperTable.SearchBar>
 * <SuperTable.Root filtering={!!search}>
 *   ...
 * </SuperTable.Root>
 * ```
 *
 * @example With multiple filters
 * ```tsx
 * <SuperTable.SearchBar>
 *   <SuperTable.SearchField placeholder="Search..." />
 *   <Select placeholder="Status">
 *     <option value="active">Active</option>
 *     <option value="inactive">Inactive</option>
 *   </Select>
 *   <Button variant="outline">Export</Button>
 * </SuperTable.SearchBar>
 * ```
 */
export const SuperTableSearchBar = (props: SuperTableSearchBarProps) => {
  return <Group gap={3} mb={4} width="full" {...props} />
}
