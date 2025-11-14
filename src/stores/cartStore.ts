
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import type { Product, ProductVariant } from "../types/product";

export type CartItem = {
  id: string;  
  productId: string;
  name: string;
  image: string;
  variantLabel?: string;  
  price: number;
  salePrice: number;
  quantity: number;
  maxQuantity?: number;
};

type CartState = {
  items: CartItem[];
  isOpen: boolean;
};

type CartActions = {
  open: () => void;
  close: () => void;
  addItem: (product: Product, variant: ProductVariant | null, qty: number) => void;
  removeItem: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;

 
  count: () => number;
  subtotal: () => number;
};

const variantLabel = (variant: ProductVariant | null) =>
  variant
    ? variant.variation_props.map((vp) => `${vp.variation}: ${vp.variation_prop}`).join(" / ")
    : undefined;

const variantKey = (product: Product, variant: ProductVariant | null) =>
  variant?.id ?? product.id;  

export const useCartStore = create<CartState & CartActions>()(
  immer(
    persist(
      (set, get) => ({
        items: [],
        isOpen: false,

        open: () => set((s) => { s.isOpen = true; }),
        close: () => set((s) => { s.isOpen = false; }),

        addItem: (product, variant, qty) => {
          const id = variantKey(product, variant);
          set((s) => {
            const idx = s.items.findIndex((it) => it.id === id);
            const price = variant ? variant.price : product.price;
            const salePrice = variant ? variant.sale_price : product.sale_price;

            if (idx >= 0) {
              s.items[idx].quantity = Math.min(
                (s.items[idx].quantity ?? 0) + qty,
                s.items[idx].maxQuantity ?? 99
              );
            } else {
              s.items.push({
                id,
                productId: product.id,
                name: product.name,
                image: product.thumb ?? product.images?.[0],
                variantLabel: variantLabel(variant),
                price,
                salePrice,
                quantity: Math.max(1, Math.min(qty, 99)),
                maxQuantity: variant?.quantity ?? 99,
              });
            }
          });
        },

        removeItem: (id) => set((s) => {
          s.items = s.items.filter((it) => it.id !== id);
        }),

        updateQty: (id, qty) => set((s) => {
          const it = s.items.find((i) => i.id === id);
          if (!it) return;
          const max = it.maxQuantity ?? 99;
          it.quantity = Math.max(1, Math.min(qty, max));
        }),

        clear: () => set((s) => { s.items = []; }),

        count: () => get().items.reduce((sum, it) => sum + it.quantity, 0),

        subtotal: () =>
          get().items.reduce((sum, it) => {
            const unit = it.salePrice && it.salePrice > 0 ? it.salePrice : it.price;
            return sum + unit * it.quantity;
          }, 0),
      }),
      {
        name: "cart-store",
        storage: createJSONStorage(() => localStorage),  
      }
    )
  )
);
