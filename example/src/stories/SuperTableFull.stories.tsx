import { Badge, Button, Text, VStack } from '@chakra-ui/react'
import type { Meta, StoryObj } from '@storybook/react'
import { expect, userEvent, waitFor, within } from '@storybook/test'
import { SuperTable } from 'chakra-super-table'
import { useCallback, useEffect, useState } from 'react'

const meta: Meta = {
  title: 'SuperTable/FullIntegration',
  parameters: {
    layout: 'padded'
  }
}

export default meta
type Story = StoryObj

type Product = {
  id: string
  name: string
  category: string
  price: number
  stock: number
}

const allProducts: Product[] = [
  { id: '1', name: 'Wireless Keyboard', category: 'Electronics', price: 79.99, stock: 45 },
  { id: '2', name: 'USB-C Hub', category: 'Electronics', price: 49.99, stock: 120 },
  { id: '3', name: 'Ergonomic Chair', category: 'Furniture', price: 499.99, stock: 12 },
  { id: '4', name: 'Standing Desk', category: 'Furniture', price: 699.99, stock: 8 },
  { id: '5', name: 'Monitor Arm', category: 'Accessories', price: 89.99, stock: 67 },
  { id: '6', name: 'Desk Lamp', category: 'Accessories', price: 39.99, stock: 200 },
  { id: '7', name: 'Webcam HD', category: 'Electronics', price: 129.99, stock: 34 },
  { id: '8', name: 'Noise Cancelling Headphones', category: 'Electronics', price: 349.99, stock: 56 }
]

function ProductsTable({
  simulateLoading = true,
  loadingDelay = 2000,
  searchThrottle = 200
}: {
  simulateLoading?: boolean
  loadingDelay?: number
  searchThrottle?: number
}) {
  const [loading, setLoading] = useState(simulateLoading)
  const [products, setProducts] = useState<Product[]>([])
  const [search, setSearch] = useState('')

  // Simulate initial data load
  useEffect(() => {
    if (!simulateLoading) {
      setProducts(allProducts)
      setLoading(false)
      return
    }
    const timer = setTimeout(() => {
      setProducts(allProducts)
      setLoading(false)
    }, loadingDelay)
    return () => clearTimeout(timer)
  }, [simulateLoading, loadingDelay])

  const filtered = search
    ? products.filter(
      p =>
        p.name.toLowerCase().includes(search.toLowerCase()) ||
        p.category.toLowerCase().includes(search.toLowerCase())
    )
    : products

  const handleClearSearch = useCallback(() => {
    setSearch('')
  }, [])

  return (
    <>
      <SuperTable.SearchBar>
        <SuperTable.SearchField
          placeholder="Search products..."
          onSearch={setSearch}
          throttle={searchThrottle}
        />
        <Button colorPalette="blue" size="sm">
          Add Product
        </Button>
      </SuperTable.SearchBar>

      <SuperTable.Root loading={loading} filtering={!!search}>
        <SuperTable.Head>
          <SuperTable.Th>Product</SuperTable.Th>
          <SuperTable.Th>Category</SuperTable.Th>
          <SuperTable.Th textAlign="right">Price</SuperTable.Th>
          <SuperTable.Th textAlign="right">Stock</SuperTable.Th>
        </SuperTable.Head>

        <SuperTable.Body>
          {filtered.map(product => (
            <SuperTable.Row key={product.id}>
              <SuperTable.Cell fontWeight="medium">{product.name}</SuperTable.Cell>
              <SuperTable.Cell>
                <Badge
                  colorPalette={
                    product.category === 'Electronics'
                      ? 'blue'
                      : product.category === 'Furniture'
                        ? 'purple'
                        : 'green'
                  }
                >
                  {product.category}
                </Badge>
              </SuperTable.Cell>
              <SuperTable.Cell textAlign="right">${product.price.toFixed(2)}</SuperTable.Cell>
              <SuperTable.Cell textAlign="right">{product.stock}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
        </SuperTable.Body>

        <SuperTable.LoadingRows pattern={['line', 'badge', 'line', 'line']} count={5} />

        <SuperTable.Empty>
          <VStack py={12} gap={3}>
            <Text fontSize="lg" fontWeight="medium">No products yet</Text>
            <Text color="fg.muted">Add your first product to get started.</Text>
            <Button colorPalette="blue" size="sm">Add Product</Button>
          </VStack>
        </SuperTable.Empty>

        <SuperTable.Searching>
          <VStack py={12} gap={3}>
            <Text fontSize="lg" fontWeight="medium">No results</Text>
            <Text color="fg.muted">No products match "{search}"</Text>
            <Button variant="outline" size="sm" onClick={handleClearSearch}>
              Clear search
            </Button>
          </VStack>
        </SuperTable.Searching>
      </SuperTable.Root>
    </>
  )
}

/**
 * Full integration example demonstrating the complete lifecycle:
 *
 * 1. **Loading** -- skeleton rows appear for the configured delay
 * 2. **Data loaded** -- products table fills in
 * 3. **Search** -- type to filter; no-results state appears when nothing matches
 *
 * Use the Controls panel to adjust loading delay, throttle, and toggle loading.
 */
export const CompleteLifecycle: Story = {
  args: {
    simulateLoading: true,
    loadingDelay: 2000,
    searchThrottle: 200
  },
  argTypes: {
    simulateLoading: {
      control: 'boolean',
      description: 'Whether to show the loading phase on mount',
      table: { defaultValue: { summary: 'true' } }
    },
    loadingDelay: {
      control: { type: 'number', min: 0, max: 10000, step: 500 },
      description: 'How long to show loading skeletons (ms)',
      table: { defaultValue: { summary: '2000' } }
    },
    searchThrottle: {
      control: { type: 'number', min: 0, max: 2000, step: 50 },
      description: 'Search input throttle delay (ms)',
      table: { defaultValue: { summary: '200' } }
    }
  },
  render: ({ simulateLoading, loadingDelay, searchThrottle }) => (
    <ProductsTable
      simulateLoading={simulateLoading}
      loadingDelay={loadingDelay}
      searchThrottle={searchThrottle}
    />
  )
}

/**
 * **Interaction test**: verifies skeleton rows appear during loading,
 * then data rows appear after loading completes.
 */
export const LoadingToData: Story = {
  render: () => <ProductsTable simulateLoading />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // During loading, skeleton rows should be present (no product names visible)
    expect(canvas.queryByText('Wireless Keyboard')).toBeNull()

    // Wait for data to load (2s timeout + buffer)
    await waitFor(
      () => {
        expect(canvas.getByText('Wireless Keyboard')).toBeInTheDocument()
      },
      { timeout: 5000 }
    )

    // All products should now be visible
    expect(canvas.getByText('USB-C Hub')).toBeInTheDocument()
    expect(canvas.getByText('Ergonomic Chair')).toBeInTheDocument()
    expect(canvas.getByText('Standing Desk')).toBeInTheDocument()
  }
}

/**
 * **Interaction test**: verifies search filtering works and shows
 * the "no results" state when nothing matches.
 */
export const SearchFiltering: Story = {
  render: () => <ProductsTable simulateLoading={false} />,
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // All products should be visible
    expect(canvas.getByText('Wireless Keyboard')).toBeInTheDocument()
    expect(canvas.getByText('Ergonomic Chair')).toBeInTheDocument()

    // Find the search input and type a query
    const searchInput = canvas.getByPlaceholderText('Search products...')
    await userEvent.type(searchInput, 'Electronics')

    // Wait for throttled search to filter
    await waitFor(
      () => {
        expect(canvas.getByText('Wireless Keyboard')).toBeInTheDocument()
        expect(canvas.getByText('USB-C Hub')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )

    // Furniture items should be filtered out
    await waitFor(
      () => {
        expect(canvas.queryByText('Ergonomic Chair')).toBeNull()
        expect(canvas.queryByText('Standing Desk')).toBeNull()
      },
      { timeout: 2000 }
    )

    // Clear and search for something with no results
    await userEvent.clear(searchInput)
    await userEvent.type(searchInput, 'xyznonexistent')

    // "No results" state should appear
    await waitFor(
      () => {
        expect(canvas.getByText('No results')).toBeInTheDocument()
      },
      { timeout: 2000 }
    )
  }
}

/**
 * **Interaction test**: verifies collapsible sections work correctly.
 */
export const SectionCollapse: Story = {
  render: () => (
    <SuperTable.Root>
      <SuperTable.Head>
        <SuperTable.Th>Name</SuperTable.Th>
        <SuperTable.Th>Category</SuperTable.Th>
        <SuperTable.Th>Price</SuperTable.Th>
      </SuperTable.Head>

      <SuperTable.SimpleSection title="Electronics" collapsible>
        {allProducts
          .filter(p => p.category === 'Electronics')
          .map(p => (
            <SuperTable.Row key={p.id}>
              <SuperTable.Cell>{p.name}</SuperTable.Cell>
              <SuperTable.Cell>{p.category}</SuperTable.Cell>
              <SuperTable.Cell>${p.price.toFixed(2)}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
      </SuperTable.SimpleSection>

      <SuperTable.SimpleSection title="Furniture" collapsible>
        {allProducts
          .filter(p => p.category === 'Furniture')
          .map(p => (
            <SuperTable.Row key={p.id}>
              <SuperTable.Cell>{p.name}</SuperTable.Cell>
              <SuperTable.Cell>{p.category}</SuperTable.Cell>
              <SuperTable.Cell>${p.price.toFixed(2)}</SuperTable.Cell>
            </SuperTable.Row>
          ))}
      </SuperTable.SimpleSection>
    </SuperTable.Root>
  ),
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement)

    // Both sections should be expanded initially
    expect(canvas.getByText('Wireless Keyboard')).toBeInTheDocument()
    expect(canvas.getByText('Ergonomic Chair')).toBeInTheDocument()

    // Click the Electronics section header to collapse it
    const electronicsHeader = canvas.getByText('Electronics')
    await userEvent.click(electronicsHeader)

    // Electronics items should be hidden after collapse
    await waitFor(() => {
      expect(canvas.queryByText('Wireless Keyboard')).toBeNull()
    })

    // Furniture items should still be visible
    expect(canvas.getByText('Ergonomic Chair')).toBeInTheDocument()

    // Click again to expand
    await userEvent.click(electronicsHeader)

    // Electronics items should be visible again
    await waitFor(() => {
      expect(canvas.getByText('Wireless Keyboard')).toBeInTheDocument()
    })
  }
}
