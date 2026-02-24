import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import type { Preview } from '@storybook/react'
import React from 'react'

const preview: Preview = {
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <ChakraProvider value={defaultSystem}>
        <Story />
      </ChakraProvider>
    )
  ],
  parameters: {
    controls: {
      expanded: true,
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i
      }
    },
    docs: {
      source: {
        type: 'code'
      }
    },
    options: {
      storySort: {
        order: ['Introduction', 'SuperTable', ['Basic', 'Loading', 'Empty', 'Section', 'Sortable', 'Search', 'FullIntegration']]
      }
    }
  }
}

export default preview
