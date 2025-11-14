import { describe, it, expect, beforeEach } from 'vitest'
import { useCartStore } from './cartStore'

const baseProduct = {
  id: 'p1',
  name: 'Sneaker',
  price: 200,
  sale_price: 0,
  thumb: 't.jpg',
  images: [],
} as any

const variantA = {
  id: 'vA',
  price: 250,
  sale_price: 220,
  quantity: 50,
  variation_props: [
    { variation: 'color', variation_prop: 'black' },
    { variation: 'size', variation_prop: '40' },
  ],
} as any

beforeEach(() => {
  // fully reset persisted state between tests
  useCartStore.setState({ items: [], isOpen: false })
  localStorage.clear()
})

describe('cart store', () => {
  it('adds a new item (product without variant)', () => {
    useCartStore.getState().addItem(baseProduct, null, 2)
    const items = useCartStore.getState().items
    expect(items).toHaveLength(1)
    expect(items[0]).toMatchObject({
      id: 'p1',                // variantKey falls back to product.id
      productId: 'p1',
      name: 'Sneaker',
      quantity: 2,
      price: 200,
      salePrice: 0,
    })
  })

  it('merges same variant by id and increases qty', () => {
    const add = useCartStore.getState().addItem
    add(baseProduct, variantA, 1)
    add(baseProduct, variantA, 3)
    const item = useCartStore.getState().items[0]
    expect(item.id).toBe('vA')     // variantKey uses variant.id
    expect(item.quantity).toBe(4)  // merged
    expect(item.variantLabel).toContain('color: black')
    expect(item.variantLabel).toContain('size: 40')
  })

  it('subtotal uses salePrice when > 0 else price', () => {
    const { addItem, subtotal } = useCartStore.getState()
    // sale item: 220 * 2
    addItem(baseProduct, variantA, 2)
    // non-sale item: 200 * 1
    addItem(baseProduct, null, 1)

    expect(subtotal()).toBe(220 * 2 + 200 * 1)
  })

  it('updateQty respects bounds (min 1, max by maxQuantity)', () => {
    const { addItem, updateQty } = useCartStore.getState()
    // variant has quantity 50 -> maxQuantity 50
    addItem(baseProduct, variantA, 1)
    const id = useCartStore.getState().items[0].id

    updateQty(id, 0)    // below min
    expect(useCartStore.getState().items[0].quantity).toBe(1)

    updateQty(id, 999)  // above max
    expect(useCartStore.getState().items[0].quantity).toBe(50)
  })

  it('remove and clear work', () => {
    const s = useCartStore.getState()
    s.addItem(baseProduct, null, 1)
    const id = useCartStore.getState().items[0].id

    s.removeItem(id)
    expect(useCartStore.getState().items).toHaveLength(0)

    s.addItem(baseProduct, null, 2)
    s.addItem(baseProduct, variantA, 1)
    s.clear()
    expect(useCartStore.getState().items).toHaveLength(0)
  })
})
