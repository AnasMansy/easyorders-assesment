import { describe, it, expect, beforeEach } from 'vitest'
import { useCartDrawerStore } from './cartDrawerStore'

beforeEach(() => {
  // reset store per test
  useCartDrawerStore.setState({ isOpen: false })
})

describe('cart drawer store', () => {
  it('opens and closes', () => {
    const s = useCartDrawerStore.getState()
    expect(s.isOpen).toBe(false)
    s.open()
    expect(useCartDrawerStore.getState().isOpen).toBe(true)
    s.close()
    expect(useCartDrawerStore.getState().isOpen).toBe(false)
  })

  it('toggles', () => {
    const s = useCartDrawerStore.getState()
    s.toggle()
    expect(useCartDrawerStore.getState().isOpen).toBe(true)
    s.toggle()
    expect(useCartDrawerStore.getState().isOpen).toBe(false)
  })
})
