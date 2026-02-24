/**
 * chakra-supertable
 *
 * A composable, feature-rich table component for React with Chakra UI.
 *
 * @packageDocumentation
 */

// Context and hooks
import type { SuperTableContextType, SuperTableProps } from './SuperTableContext'
import {
  SuperTableContext, useSuperTable, useSuperTableContext, useSuperTableHeaders,
  useSuperTableRegisterRow
} from './SuperTableContext'

// Components
import { Table } from '@chakra-ui/react'
import type { SuperTableBodyProps } from './SuperTableBody'
import { SuperTableBody } from './SuperTableBody'
import type { SuperTableCellProps } from './SuperTableCell'
import { SuperTableCell } from './SuperTableCell'
import type { SuperTableEmptyProps } from './SuperTableEmpty'
import { SuperTableEmpty } from './SuperTableEmpty'
import type { SuperTableHeadProps } from './SuperTableHead'
import { SuperTableHead } from './SuperTableHead'
import type { SuperTableLoadingProps } from './SuperTableLoading'
import { SuperTableLoading } from './SuperTableLoading'
import type { SuperTableLoadingCellType } from './SuperTableLoadingCell'
import type { SuperTableLoadingRowProps } from './SuperTableLoadingRow'
import { SuperTableLoadingRow } from './SuperTableLoadingRow'
import type { SuperTableLoadingRowsProps } from './SuperTableLoadingRows'
import { SuperTableLoadingRows } from './SuperTableLoadingRows'
import { SuperTableRoot } from './SuperTableRoot'
import { SuperTableRow } from './SuperTableRow'
import type { SuperTableSearchBarProps } from './SuperTableSearchBar'
import { SuperTableSearchBar } from './SuperTableSearchBar'
import type { SuperTableSearchFieldProps } from './SuperTableSearchField'
import { SuperTableSearchField } from './SuperTableSearchField'
import { SuperTableSearching } from './SuperTableSearching'
import type {
  SuperTableSectionCollapseTriggerProps,
  SuperTableSectionContentProps,
  SuperTableSectionHeaderProps,
  SuperTableSectionProps,
  SuperTableSectionTitleProps,
  SuperTableSimpleSectionProps
} from './SuperTableSection'
import {
  SuperTableSection,
  SuperTableSectionCollapseTrigger,
  SuperTableSectionContent,
  SuperTableSectionHeader,
  SuperTableSectionTitle,
  SuperTableSimpleSection
} from './SuperTableSection'
import type { SortDirection, SuperTableThProps } from './SuperTableTh'
import { SuperTableTh } from './SuperTableTh'

/**
 * SuperTable compound component.
 *
 * A composable table with built-in support for:
 * - Loading states with skeleton patterns
 * - Empty and search-empty states
 * - Collapsible sections
 * - Automatic column counting for colSpan
 *
 * @example
 * ```tsx
 * import { SuperTable } from 'chakra-supertable'
 *
 * function UsersTable({ users, loading, searchQuery }) {
 *   return (
 *     <SuperTable.Root loading={loading} filtering={!!searchQuery}>
 *       <SuperTable.Head>
 *         <SuperTable.Th>Name</SuperTable.Th>
 *         <SuperTable.Th>Email</SuperTable.Th>
 *         <SuperTable.Th>Status</SuperTable.Th>
 *       </SuperTable.Head>
 *
 *       <SuperTable.Body>
 *         {users.map(user => (
 *           <SuperTable.Row key={user.id}>
 *             <SuperTable.Cell>{user.name}</SuperTable.Cell>
 *             <SuperTable.Cell>{user.email}</SuperTable.Cell>
 *             <SuperTable.Cell>{user.status}</SuperTable.Cell>
 *           </SuperTable.Row>
 *         ))}
 *       </SuperTable.Body>
 *
 *       <SuperTable.Empty>No users found</SuperTable.Empty>
 *       <SuperTable.Searching>No results match your search</SuperTable.Searching>
 *       <SuperTable.LoadingRows pattern={['line', 'text', 'badge']} count={5} />
 *     </SuperTable.Root>
 *   )
 * }
 * ```
 */
export const SuperTable = {
  /** Root component - provides context and wraps the table */
  Root: SuperTableRoot,
  /** Header wrapper - counts children for colSpan */
  Head: SuperTableHead,
  /** Header cell */
  Th: SuperTableTh,
  /** Composable section primitive (context provider) */
  Section: SuperTableSection,
  /** Section header row (Table.Row + click/keyboard handlers) */
  SectionHeader: SuperTableSectionHeader,
  /** Section title text */
  SectionTitle: SuperTableSectionTitle,
  /** Section collapse/expand trigger button */
  SectionCollapseTrigger: SuperTableSectionCollapseTrigger,
  /** Section content wrapper (hides when collapsed) */
  SectionContent: SuperTableSectionContent,
  /** Convenience section with string title */
  SimpleSection: SuperTableSimpleSection,
  /** Data row - registers itself for item counting */
  Row: SuperTableRow,
  /** Table cell */
  Cell: SuperTableCell,
  /** Table body wrapper */
  Body: SuperTableBody,
  /** Single skeleton loading row */
  LoadingRow: SuperTableLoadingRow,
  /** Multiple skeleton loading rows */
  LoadingRows: SuperTableLoadingRows,
  /** Empty state (no data) */
  Empty: SuperTableEmpty,
  /** Search empty state (no results) */
  Searching: SuperTableSearching,
  /** Custom loading state */
  Loading: SuperTableLoading,
  /** Search bar container */
  SearchBar: SuperTableSearchBar,
  /** Search input field with icon */
  SearchField: SuperTableSearchField,

  Caption: Table.Caption,

  ScrollArea: Table.ScrollArea,
}

export type { SortDirection, SuperTableBodyProps, SuperTableCellProps, SuperTableContextType, SuperTableEmptyProps, SuperTableHeadProps, SuperTableLoadingCellType, SuperTableLoadingProps, SuperTableLoadingRowProps, SuperTableLoadingRowsProps, SuperTableProps, SuperTableSearchBarProps, SuperTableSearchFieldProps, SuperTableSectionCollapseTriggerProps, SuperTableSectionContentProps, SuperTableSectionHeaderProps, SuperTableSectionProps, SuperTableSectionTitleProps, SuperTableSimpleSectionProps, SuperTableThProps }

export { SuperTableContext, useSuperTable, useSuperTableContext, useSuperTableHeaders, useSuperTableRegisterRow }
