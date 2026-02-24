# chakra-supertable

A composable, feature-rich table component for React with Chakra UI.

## Storybook

Live Storybook: `https://ideativedigital.github.io/super-table/`

[![Deploy Storybook](https://github.com/ideativedigital/super-table/actions/workflows/deploy-storybook.yml/badge.svg)](https://github.com/ideativedigital/super-table/actions/workflows/deploy-storybook.yml)

## Features

- **Composable API** - Build tables with flexible compound components
- **Loading States** - Built-in skeleton loading with customizable patterns
- **Empty States** - Separate components for empty and no-search-results states
- **Collapsible Sections** - Group rows with expandable/collapsible headers
- **Accessible** - Keyboard navigation and ARIA attributes
- **Type-safe** - Full TypeScript support

## Installation

```bash
npm install chakra-supertable
# or
pnpm add chakra-supertable
```

### Peer Dependencies

This package requires the following peer dependencies:

```bash
npm install react @chakra-ui/react @fortawesome/pro-regular-svg-icons @fortawesome/react-fontawesome
```

## Quick Start

```tsx
import { SuperTable } from "chakra-supertable";

function UsersTable({ users, isLoading }) {
  return (
    <SuperTable.Root isLoading={isLoading}>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Email</SuperTable.Th>
        <SuperTable.Th>Status</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.Body>
        {users.map((user) => (
          <SuperTable.Row key={user.id}>
            <SuperTable.Cell>{user.name}</SuperTable.Cell>
            <SuperTable.Cell>{user.email}</SuperTable.Cell>
            <SuperTable.Cell>{user.status}</SuperTable.Cell>
          </SuperTable.Row>
        ))}
      </SuperTable.Body>

      <SuperTable.Empty>No users found</SuperTable.Empty>
      <SuperTable.LoadingRows pattern={["line", "text", "badge"]} />
    </SuperTable.Root>
  );
}
```

## Components

### SuperTable.Root

The root component that provides context for all child components.

```tsx
<SuperTable.Root
  isLoading={boolean} // Shows loading states
  isFiltering={boolean} // Switches Empty to Searching state
  {...chakraTableProps} // All Chakra Table.Root props
>
  {children}
</SuperTable.Root>
```

### SuperTable.Head

Table header wrapper. Automatically counts children for `colSpan` calculations.

```tsx
<SuperTable.Head>
  <SuperTable.Th>Column 1</SuperTable.Th>
  <SuperTable.Th width="200px">Column 2</SuperTable.Th>
  <SuperTable.Th textAlign="right">Actions</SuperTable.Th>
</SuperTable.Head>
```

### SuperTable.Th

Table header cell. Accepts all Chakra `TableCellProps`.

### SuperTable.Body

Table body wrapper. Use for wrapping rows.

### SuperTable.Row

Table row that registers itself for item counting. The item count determines when to show Empty/Searching/Loading states.

```tsx
<SuperTable.Body>
  {items.map((item) => (
    <SuperTable.Row key={item.id}>
      <SuperTable.Cell>{item.name}</SuperTable.Cell>
    </SuperTable.Row>
  ))}
</SuperTable.Body>
```

### SuperTable.Cell

Table cell. Accepts all Chakra `TableCellProps`.

### SuperTable.Section

Collapsible table section with a title row.

```tsx
<SuperTable.Section title="Active Users" collapsible defaultCollapsed={false}>
  {activeUsers.map((user) => (
    <SuperTable.Row key={user.id}>...</SuperTable.Row>
  ))}
</SuperTable.Section>
```

**Props:**

- `title` - Section header content (string or ReactNode)
- `collapsible` - Enable collapse functionality
- `defaultCollapsed` - Initial collapsed state
- `colSpan` - Override automatic column span
- `expandButtonProps` - Props for the expand/collapse button

### SuperTable.LoadingRows

Renders skeleton loading rows. Only visible when `isLoading={true}` and no items exist.

```tsx
<SuperTable.LoadingRows
  pattern={["avatar", "line", "text", "badge", "icon"]}
  count={5}
/>
```

**Available pattern types:**

- `line` - Single line skeleton (default)
- `text` - Multi-line text skeleton
- `circle` - Small circle
- `avatar` - Large circle (40px)
- `badge` - Badge/tag shape
- `button` - Button shape
- `icon` - Small square

### SuperTable.Empty

Rendered when no items and not loading/filtering.

```tsx
<SuperTable.Empty>
  <VStack py={8}>
    <Text>No users yet</Text>
    <Button>Add User</Button>
  </VStack>
</SuperTable.Empty>
```

### SuperTable.Searching

Rendered when filtering returns no results (`isFiltering={true}` and no items).

```tsx
<SuperTable.Searching>
  <Text>No results for "{searchQuery}"</Text>
</SuperTable.Searching>
```

### SuperTable.Loading

Custom loading state component. Use for spinners or custom loading UI.

```tsx
<SuperTable.Loading>
  <Spinner size="xl" />
</SuperTable.Loading>
```

## Full Example

```tsx
import { SuperTable } from "chakra-supertable";
import { Badge, Button, HStack, Spinner, Text, VStack } from "@chakra-ui/react";

function ProductsTable({ products, isLoading, searchQuery }) {
  const isFiltering = !!searchQuery;

  return (
    <SuperTable.Root isLoading={isLoading} isFiltering={isFiltering}>
      <SuperTable.Head>
        <SuperTable.Th>Product</SuperTable.Th>
        <SuperTable.Th>Category</SuperTable.Th>
        <SuperTable.Th>Price</SuperTable.Th>
        <SuperTable.Th>Stock</SuperTable.Th>
        <SuperTable.Th textAlign="right">Actions</SuperTable.Th>
      </SuperTable.Head>

      {/* Grouped by category */}
      <SuperTable.Section title="Electronics" collapsible>
        {products
          .filter((p) => p.category === "electronics")
          .map((product) => (
            <SuperTable.Row key={product.id}>
              <SuperTable.Cell>{product.name}</SuperTable.Cell>
              <SuperTable.Cell>
                <Badge>{product.category}</Badge>
              </SuperTable.Cell>
              <SuperTable.Cell>${product.price}</SuperTable.Cell>
              <SuperTable.Cell>{product.stock}</SuperTable.Cell>
              <SuperTable.Cell textAlign="right">
                <HStack justify="end">
                  <Button size="sm">Edit</Button>
                  <Button size="sm" colorScheme="red">
                    Delete
                  </Button>
                </HStack>
              </SuperTable.Cell>
            </SuperTable.Row>
          ))}
      </SuperTable.Section>

      {/* Empty state */}
      <SuperTable.Empty>
        <VStack py={12} gap={4}>
          <Text fontSize="lg" color="gray.500">
            No products yet
          </Text>
          <Button colorScheme="blue">Add your first product</Button>
        </VStack>
      </SuperTable.Empty>

      {/* Search empty state */}
      <SuperTable.Searching>
        <VStack py={12} gap={4}>
          <Text color="gray.500">No products match "{searchQuery}"</Text>
          <Button variant="link">Clear search</Button>
        </VStack>
      </SuperTable.Searching>

      {/* Loading skeletons */}
      <SuperTable.LoadingRows
        pattern={["line", "badge", "line", "line", "button"]}
        count={5}
      />
    </SuperTable.Root>
  );
}
```

## Hooks

### useSuperTableContext

Access the table context from any child component.

```tsx
const { isLoading, nbItems, headers } = useSuperTableContext();
```

### useSuperTableHeaders

Get the current header count.

```tsx
const headerCount = useSuperTableHeaders();
```

## License

MIT
