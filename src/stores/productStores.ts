
import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { immer } from "zustand/middleware/immer";
import axios from "axios";
import type { Product, ProductVariant } from "../types/product";

type ProductState = {
  product: Product | null;
  loading: boolean;
  error: string | null;
  selectedVariations: Record<string, string>;  
  selectedVariant: ProductVariant | null;
};

type ProductActions = {
  fetchProduct: (slug: string) => Promise<void>;
  setSelectedVariation: (variationType: string, value: string) => void;
  clearSelectedVariations: () => void;

  // Computed helpers
  findMatchingVariant: () => ProductVariant | null;
  getCurrentPrice: () => number;
  getCurrentSalePrice: () => number;
  isVariantAvailable: () => boolean;
};
const BASE_URL = process.env.REACT_APP_API_BASE_URL!;
console.log("BASE_URL:ssssssssdfsdfsdf", process.env.REACT_APP_API_BASE_URL);


export const useProductStore = create<ProductState & ProductActions>()(
  immer(
    persist(
      (set, get) => ({
        product: null,
        loading: false,
        error: null,
        selectedVariations: {},
        selectedVariant: null,

        fetchProduct: async (slug: string) => {
          set((s) => {
            s.loading = true;
            s.error = null;
          });
          try {
            const res = await axios.get<Product>(
              `${BASE_URL}/products/slug/clear-theme/${slug}?join=reviews`
            );
            set((s) => {
              s.product = res.data;
              s.selectedVariations = {};
              s.selectedVariant = null;
            });
          } catch (e: any) {
            set((s) => {
              s.error = e?.message ?? "Failed to load product";
            });
          } finally {
            set((s) => {
              s.loading = false;
            });
          }
        },

        setSelectedVariation: (variationType, value) => {
          set((s) => {
            s.selectedVariations[variationType] = value;
          });
          // update selectedVariant if fully matched
          const variant = get().findMatchingVariant();
          set((s) => {
            s.selectedVariant = variant;
          });
        },

        clearSelectedVariations: () => {
          set((s) => {
            s.selectedVariations = {};
            s.selectedVariant = null;
          });
        },

        findMatchingVariant: () => {
          const { product, selectedVariations } = get();
          if (!product) return null;
          const neededKeys = product?.variations?.map((v) => v.name);
         
          const isComplete = neededKeys.every((k) => !!selectedVariations[k]);
          if (!isComplete) return null;

          
          const match = product.variants.find((variant) =>
            variant.variation_props.every(
              (vp) => selectedVariations[vp.variation] === vp.variation_prop
            )
          );
          return match ?? null;
        },

        getCurrentPrice: () => {
          const { product, selectedVariant } = get();
          if (!product) return 0;
          return (selectedVariant?.price ?? product.price) || 0;
        },

        getCurrentSalePrice: () => {
          const { product, selectedVariant } = get();
          if (!product) return 0;
          const sale =
            (selectedVariant?.sale_price ?? product.sale_price) || 0;
          return sale;
        },

        isVariantAvailable: () => {
          const v = get().findMatchingVariant();
          return !!v && v.quantity > 0;
        },
      }),
      {
        name: "product-store",  
        storage: createJSONStorage(() => sessionStorage),  
        partialize: (state) => ({
          product: state.product,
          selectedVariations: state.selectedVariations,
          selectedVariant: state.selectedVariant,
        }),
      }
    )
  )
);
