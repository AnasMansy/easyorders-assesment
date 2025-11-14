import { describe, it, expect, beforeEach, vi } from 'vitest'
import axios from 'axios'
import { useProductStore } from './productStores' // your path/name
vi.mock('axios')

const productFixture = {
  id: 'p1',
  name: 'Achilles Pro',
  price: 190,
  sale_price: 160,
  thumb: 't.jpg',
  images: ['a.jpg'],
  description: '<p>nice</p>',
  variations: [
    { id: 'v-color', name: 'color', type: 'image', props: [
      { id: 'c1', name: 'black', value: 'b.jpg' },
      { id: 'c2', name: 'brown', value: 'br.jpg' },
    ]},
    { id: 'v-size', name: 'size', type: 'button', props: [
      { id: 's1', name: '40' },
      { id: 's2', name: '42' },
    ]},
  ],
  variants: [
    {
      id: 'pv1',
      price: 190,
      sale_price: 0,
      quantity: 0,
      variation_props: [
        { variation: 'color', variation_prop: 'black' },
        { variation: 'size',  variation_prop: '40' },
      ],
    },
    {
      id: 'pv2',
      price: 190,
      sale_price: 150,
      quantity: 5,
      variation_props: [
        { variation: 'color', variation_prop: 'brown' },
        { variation: 'size',  variation_prop: '42' },
      ],
    },
  ],
} as any

beforeEach(() => {
  // reset persisted state
  useProductStore.setState({
    product: null,
    loading: false,
    error: null,
    selectedVariations: {},
    selectedVariant: null,
  })
  sessionStorage.clear()
})

describe('product store', () => {
  it('fetchProduct sets product and resets selection', async () => {
    // @ts-ignore
    axios.get.mockResolvedValueOnce({ data: productFixture })
    await useProductStore.getState().fetchProduct('Sneakers12')

    const s = useProductStore.getState()
    expect(s.product?.name).toBe('Achilles Pro')
    expect(s.selectedVariations).toEqual({})
    expect(s.selectedVariant).toBeNull()
  })

  it('selects variations and matches variant', () => {
    useProductStore.setState({ product: productFixture })

    const s = useProductStore.getState()
    s.setSelectedVariation('color', 'brown')
    s.setSelectedVariation('size', '42')

    const match = s.findMatchingVariant()
    expect(match?.id).toBe('pv2')
    expect(s.getCurrentPrice()).toBe(190)
    expect(s.getCurrentSalePrice()).toBe(150)
    expect(s.isVariantAvailable()).toBe(true)
  })

  it('incomplete selection returns null match and not available', () => {
    useProductStore.setState({ product: productFixture })

    const s = useProductStore.getState()
    s.setSelectedVariation('color', 'black') // size missing

    expect(s.findMatchingVariant()).toBeNull()
    expect(s.isVariantAvailable()).toBe(false)
    // falls back to product price/sale
    expect(s.getCurrentPrice()).toBe(190)
    expect(s.getCurrentSalePrice()).toBe(160)
  })
})
