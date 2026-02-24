import {
  HStack,
  IconButton,
  IconButtonProps,
  Table,
  Text,
  TextProps
} from '@chakra-ui/react'
import React, {
  createContext,
  KeyboardEvent,
  ReactNode,
  useContext,
  useEffect,
  useId,
  useState
} from 'react'
import { LuChevronRight } from 'react-icons/lu'
import { useSuperTableContext } from './SuperTableContext'

// ---------------------------------------------------------------------------
// Context
// ---------------------------------------------------------------------------

/**
 * Internal context for section collapse state.
 * Used by SuperTableRow to animate opacity during expand/collapse.
 */
type SectionContextType = {
  /** Whether the section is currently collapsed */
  isCollapsed: boolean
  /** Whether the section can be collapsed */
  collapsible: boolean
  /** Unique ID used for ARIA attributes */
  sectionId: string
  /** Toggle the collapsed state */
  toggle: () => void
}

/**
 * Context for tracking section expand/collapse state.
 * @internal
 */
export const SuperTableSectionContext = createContext<SectionContextType>({
  isCollapsed: false,
  collapsible: false,
  sectionId: '',
  toggle: () => { }
})

/**
 * Hook to access the section context.
 * Used internally by SuperTableRow for opacity animation.
 * @internal
 */
export const useSuperTableSectionContext = () => useContext(SuperTableSectionContext)

// ---------------------------------------------------------------------------
// SectionTitle
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSectionTitle component.
 */
export type SuperTableSectionTitleProps = TextProps & {
  /** Title content */
  children: ReactNode
}

/**
 * Section title component.
 * Renders the title text within a section header.
 *
 * @param props - Text props including children
 *
 * @example
 * ```tsx
 * <SuperTable.Section collapsible>
 *   <SuperTable.SectionHeader>
 *     <SuperTable.SectionTitle>Active Users</SuperTable.SectionTitle>
 *     <SuperTable.SectionCollapseTrigger />
 *   </SuperTable.SectionHeader>
 *   <SuperTable.SectionContent>
 *     {users.map(user => ...)}
 *   </SuperTable.SectionContent>
 * </SuperTable.Section>
 * ```
 */
export const SuperTableSectionTitle = ({ children, ...props }: SuperTableSectionTitleProps) => {
  return <Text {...props}>{children}</Text>
}

// ---------------------------------------------------------------------------
// SectionCollapseTrigger
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSectionCollapseTrigger component.
 */
export type SuperTableSectionCollapseTriggerProps = Omit<IconButtonProps, 'onClick' | 'aria-label' | 'aria-expanded'>

/**
 * Section collapse trigger component.
 * Renders a button to toggle the section's collapsed state.
 * Only renders when the section is collapsible.
 *
 * @param props - Button props (onClick is handled internally)
 *
 * @example
 * ```tsx
 * <SuperTable.SectionHeader>
 *   <SuperTable.SectionTitle>Active Users</SuperTable.SectionTitle>
 *   <SuperTable.SectionCollapseTrigger />
 * </SuperTable.SectionHeader>
 * ```
 */
export const SuperTableSectionCollapseTrigger = (props: SuperTableSectionCollapseTriggerProps) => {
  const { isCollapsed, collapsible, toggle } = useSuperTableSectionContext()

  if (!collapsible) return null

  return (
    <IconButton
      variant="subtle"
      size="sm"
      aria-label={isCollapsed ? 'Expand section' : 'Collapse section'}
      aria-expanded={!isCollapsed}
      onClick={e => {
        e.stopPropagation()
        e.preventDefault()
        toggle()
      }}
      tabIndex={-1}
      {...props}
    >
      <LuChevronRight
        style={{
          transition: 'transform 0.2s ease',
          transform: isCollapsed ? 'none' : 'rotate(90deg)'
        }}
      />
    </IconButton>
  )
}

// ---------------------------------------------------------------------------
// SectionHeader
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSectionHeader component.
 */
export type SuperTableSectionHeaderProps = Omit<React.ComponentProps<typeof HStack>, 'children'> & {
  /** Header content, typically SectionTitle and SectionCollapseTrigger */
  children: ReactNode
  /** Column span override (defaults to header count from context) */
  colSpan?: number
}

/**
 * Section header component.
 * Renders a `Table.Row > Table.ColumnHeader` containing a horizontal layout
 * for the section title and collapse trigger.
 *
 * Handles click and keyboard (Enter / Space) events to toggle collapse.
 *
 * @param props - HStack props plus optional colSpan override
 *
 * @example
 * ```tsx
 * <SuperTable.Section collapsible>
 *   <SuperTable.SectionHeader>
 *     <SuperTable.SectionTitle fontWeight="bold">Active Users</SuperTable.SectionTitle>
 *     <Badge>5</Badge>
 *     <SuperTable.SectionCollapseTrigger />
 *   </SuperTable.SectionHeader>
 *   <SuperTable.SectionContent>
 *     {users.map(user => ...)}
 *   </SuperTable.SectionContent>
 * </SuperTable.Section>
 * ```
 */
export const SuperTableSectionHeader = ({ children, colSpan, ...props }: SuperTableSectionHeaderProps) => {
  const { headers } = useSuperTableContext()
  const { isCollapsed, collapsible, sectionId, toggle } = useSuperTableSectionContext()

  const handleKeyDown = (e: KeyboardEvent<HTMLTableRowElement>) => {
    if (collapsible && (e.key === 'Enter' || e.key === ' ')) {
      e.preventDefault()
      toggle()
    }
  }

  return (
    <Table.Body>
      <Table.Row
        cursor={collapsible ? 'pointer' : undefined}
        onClick={toggle}
        onKeyDown={handleKeyDown}
        tabIndex={collapsible ? 0 : undefined}
        role={collapsible ? 'button' : undefined}
        aria-expanded={collapsible ? !isCollapsed : undefined}
        aria-controls={collapsible ? `section-content-${sectionId}` : undefined}
      >
        <Table.ColumnHeader colSpan={colSpan ?? headers}>
          <HStack justify="space-between" flex={1} {...props}>
            {children}
          </HStack>
        </Table.ColumnHeader>
      </Table.Row>
    </Table.Body>
  )
}

// ---------------------------------------------------------------------------
// SectionContent
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSectionContent component.
 */
export type SuperTableSectionContentProps = {
  /** Row children to render when the section is expanded */
  children: ReactNode
}

/**
 * Section content wrapper.
 * Renders children with a fade animation when expanding/collapsing.
 * Content is unmounted after the fade-out animation completes.
 *
 * @param props - Children to render
 *
 * @example
 * ```tsx
 * <SuperTable.Section collapsible>
 *   <SuperTable.SectionHeader>
 *     <SuperTable.SectionTitle>Users</SuperTable.SectionTitle>
 *     <SuperTable.SectionCollapseTrigger />
 *   </SuperTable.SectionHeader>
 *   <SuperTable.SectionContent>
 *     {users.map(user => (
 *       <SuperTable.Row key={user.id}>...</SuperTable.Row>
 *     ))}
 *   </SuperTable.SectionContent>
 * </SuperTable.Section>
 * ```
 */
export const SuperTableSectionContent = ({ children }: SuperTableSectionContentProps) => {
  const { isCollapsed, sectionId } = useSuperTableSectionContext()
  const [mounted, setMounted] = useState(!isCollapsed)

  useEffect(() => {
    if (!isCollapsed) {
      setMounted(true)
    } else {
      const id = setTimeout(() => setMounted(false), 200)
      return () => clearTimeout(id)
    }
  }, [isCollapsed])

  if (!mounted) return null

  return (
    <Table.Body
      id={`section-content-${sectionId}`}
      animationName={isCollapsed ? 'fade-out' : 'fade-in'}
      animationDuration="moderate"
    >
      {children}
    </Table.Body>
  )
}

// ---------------------------------------------------------------------------
// Section (composable primitive)
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSection component.
 */
export type SuperTableSectionProps = {
  /** Whether the section can be collapsed */
  collapsible?: boolean
  /** Whether the section starts collapsed */
  defaultCollapsed?: boolean
  /** Section children (SectionHeader + SectionContent) */
  children: ReactNode
}

/**
 * Composable table section primitive.
 * Provides collapse context and wraps children in a `Table.Body`.
 *
 * Use with `SectionHeader`, `SectionContent`, `SectionTitle`,
 * and `SectionCollapseTrigger` for full control over the layout.
 *
 * For a simpler API with a string title, use `SimpleSection` instead.
 *
 * @param props - Section props including collapse settings
 *
 * @example
 * ```tsx
 * <SuperTable.Section collapsible>
 *   <SuperTable.SectionHeader>
 *     <SuperTable.SectionTitle fontWeight="bold">Active Users</SuperTable.SectionTitle>
 *     <Badge>{users.length}</Badge>
 *     <SuperTable.SectionCollapseTrigger />
 *   </SuperTable.SectionHeader>
 *   <SuperTable.SectionContent>
 *     {users.map(user => (
 *       <SuperTable.Row key={user.id}>
 *         <SuperTable.Cell>{user.name}</SuperTable.Cell>
 *       </SuperTable.Row>
 *     ))}
 *   </SuperTable.SectionContent>
 * </SuperTable.Section>
 * ```
 */
export const SuperTableSection = ({
  collapsible = false,
  defaultCollapsed,
  children,
}: SuperTableSectionProps) => {
  const sectionId = useId()
  const [collapsed, setCollapsed] = useState(defaultCollapsed ?? false)

  const toggle = () => {
    if (collapsible) {
      setCollapsed(v => !v)
    }
  }

  return (
    <SuperTableSectionContext.Provider value={{ isCollapsed: collapsed, collapsible, sectionId, toggle }}>
      {children}
    </SuperTableSectionContext.Provider>
  )
}

// ---------------------------------------------------------------------------
// SimpleSection (convenience wrapper)
// ---------------------------------------------------------------------------

/**
 * Props for the SuperTableSimpleSection component.
 */
export type SuperTableSimpleSectionProps = {
  /** Title displayed in the section header */
  title: string
  /** Whether the section can be collapsed */
  collapsible?: boolean
  /** Column span for the section header (defaults to header count) */
  colSpan?: number
  /** Whether the section starts collapsed */
  defaultCollapsed?: boolean
  /** Section row children */
  children: ReactNode
}

/**
 * Convenience section component with a string title.
 * Automatically composes `Section`, `SectionHeader`, `SectionTitle`,
 * `SectionCollapseTrigger`, and `SectionContent`.
 *
 * For full control over the header layout, use the composable
 * `Section` primitive with `SectionHeader` and `SectionContent` instead.
 *
 * @param props - Section props including title string and collapse settings
 *
 * @example
 * ```tsx
 * <SuperTable.SimpleSection title="Active Users" collapsible>
 *   {users.map(user => (
 *     <SuperTable.Row key={user.id}>
 *       <SuperTable.Cell>{user.name}</SuperTable.Cell>
 *     </SuperTable.Row>
 *   ))}
 * </SuperTable.SimpleSection>
 * ```
 */
export const SuperTableSimpleSection = ({
  title,
  collapsible = false,
  colSpan,
  defaultCollapsed,
  children,
}: SuperTableSimpleSectionProps) => {
  return (
    <SuperTableSection collapsible={collapsible} defaultCollapsed={defaultCollapsed}>
      <SuperTableSectionHeader colSpan={colSpan}>
        <SuperTableSectionTitle>{title}</SuperTableSectionTitle>
        <SuperTableSectionCollapseTrigger />
      </SuperTableSectionHeader>
      <SuperTableSectionContent>
        {children}
      </SuperTableSectionContent>
    </SuperTableSection>
  )
}
