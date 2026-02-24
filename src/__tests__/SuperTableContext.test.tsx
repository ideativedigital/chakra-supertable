import { act, renderHook } from '@testing-library/react'
import { ReactNode } from 'react'
import { describe, expect, it } from 'vitest'
import {
  SuperTableContext,
  SuperTableContextType,
  useSuperTable,
  useSuperTableContext,
  useSuperTableHeaders,
  useSuperTableRegisterRow
} from '../SuperTableContext'

describe('SuperTableContext', () => {
  describe('useSuperTable', () => {
    it('should initialize with default values', () => {
      const { result } = renderHook(() => useSuperTable({}))

      expect(result.current.headers).toBe(0)
      expect(result.current.loading).toBe(false)
      expect(result.current.filtering).toBe(false)
      expect(result.current.nbItems).toBe(0)
    })

    it('should initialize with loading prop', () => {
      const { result } = renderHook(() => useSuperTable({ loading: true }))

      expect(result.current.loading).toBe(true)
    })

    it('should initialize with filtering prop', () => {
      const { result } = renderHook(() => useSuperTable({ filtering: true }))

      expect(result.current.filtering).toBe(true)
    })

    it('should update loading state when prop changes', () => {
      const { result, rerender } = renderHook(
        ({ loading }) => useSuperTable({ loading }),
        { initialProps: { loading: false } }
      )

      expect(result.current.loading).toBe(false)

      rerender({ loading: true })
      expect(result.current.loading).toBe(true)

      rerender({ loading: false })
      expect(result.current.loading).toBe(false)
    })

    it('should set headers via setHeaders', () => {
      const { result } = renderHook(() => useSuperTable({}))

      act(() => {
        result.current.setHeaders(5)
      })

      expect(result.current.headers).toBe(5)
    })

    it('should increment nbItems via addItem', () => {
      const { result } = renderHook(() => useSuperTable({}))

      act(() => {
        result.current.addItem()
      })

      expect(result.current.nbItems).toBe(1)

      act(() => {
        result.current.addItem()
        result.current.addItem()
      })

      expect(result.current.nbItems).toBe(3)
    })

    it('should decrement nbItems via removeItem', () => {
      const { result } = renderHook(() => useSuperTable({}))

      act(() => {
        result.current.addItem()
        result.current.addItem()
        result.current.addItem()
      })

      expect(result.current.nbItems).toBe(3)

      act(() => {
        result.current.removeItem()
      })

      expect(result.current.nbItems).toBe(2)
    })
  })

  describe('useSuperTableContext', () => {
    it('should return default context values when not in provider', () => {
      const { result } = renderHook(() => useSuperTableContext())

      expect(result.current.headers).toBe(0)
      expect(result.current.loading).toBe(false)
      expect(result.current.filtering).toBe(false)
      expect(result.current.nbItems).toBe(0)
    })

    it('should return provided context values', () => {
      const contextValue: SuperTableContextType = {
        headers: 3,
        setHeaders: () => { },
        loading: true,
        setLoading: () => { },
        filtering: true,
        nbItems: 10,
        addItem: () => { },
        removeItem: () => { }
      }

      const wrapper = ({ children }: { children: ReactNode }) => (
        <SuperTableContext.Provider value={contextValue}>
          {children}
        </SuperTableContext.Provider>
      )

      const { result } = renderHook(() => useSuperTableContext(), { wrapper })

      expect(result.current.headers).toBe(3)
      expect(result.current.loading).toBe(true)
      expect(result.current.filtering).toBe(true)
      expect(result.current.nbItems).toBe(10)
    })
  })

  describe('useSuperTableHeaders', () => {
    it('should return header count from context', () => {
      const contextValue: SuperTableContextType = {
        headers: 5,
        setHeaders: () => { },
        loading: false,
        setLoading: () => { },
        filtering: false,
        nbItems: 0,
        addItem: () => { },
        removeItem: () => { }
      }

      const wrapper = ({ children }: { children: ReactNode }) => (
        <SuperTableContext.Provider value={contextValue}>
          {children}
        </SuperTableContext.Provider>
      )

      const { result } = renderHook(() => useSuperTableHeaders(), { wrapper })

      expect(result.current).toBe(5)
    })
  })

  describe('useSuperTableRegisterRow', () => {
    it('should call addItem on mount and removeItem on unmount', () => {
      let itemCount = 0
      const contextValue: SuperTableContextType = {
        headers: 0,
        setHeaders: () => { },
        loading: false,
        setLoading: () => { },
        filtering: false,
        nbItems: 0,
        addItem: () => { itemCount++ },
        removeItem: () => { itemCount-- }
      }

      const wrapper = ({ children }: { children: ReactNode }) => (
        <SuperTableContext.Provider value={contextValue}>
          {children}
        </SuperTableContext.Provider>
      )

      const { unmount } = renderHook(() => useSuperTableRegisterRow(), { wrapper })

      expect(itemCount).toBe(1)

      unmount()

      expect(itemCount).toBe(0)
    })
  })
})
