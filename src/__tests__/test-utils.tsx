import { ChakraProvider, defaultSystem } from '@chakra-ui/react'
import { render, RenderOptions } from '@testing-library/react'
import { ReactElement, ReactNode } from 'react'

const AllProviders = ({ children }: { children: ReactNode }) => {
  return <ChakraProvider value={defaultSystem}>{children}</ChakraProvider>
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>) =>
  render(ui, { wrapper: AllProviders, ...options })

export * from '@testing-library/react'
export { customRender as render }

