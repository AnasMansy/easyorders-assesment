import { useEffect } from "react";
import { useProductStore } from "../../stores/productStores";  
import { useCartStore } from "../../stores/cartStore";
import ProductImage from "./ProductImage";
import ProductInfo from "./ProductInfo";

export default function ProductDetail() {
  const {
    product,
    loading,
    error,
    fetchProduct,
    selectedVariations,
    setSelectedVariation,
    getCurrentPrice,
    getCurrentSalePrice,
    isVariantAvailable,
    findMatchingVariant,
  } = useProductStore();

  const openCart = useCartStore((s) => s.open);
  const addItem = useCartStore((s) => s.addItem);
useEffect(() => {
    fetchProduct("Sneakers12");
  }, []);

  // Names we require (present only if the product actually has them)
  const requiredVariationNames =
    product?.variations?.filter(v => v.name === "color" || v.name === "size")
                         .map(v => v.name) ?? [];

  const isSelectionComplete = requiredVariationNames.every(
    (name) => !!selectedVariations[name]
  );

  const onAddToCart = () => {
    if (!product) return;

    // Block if selections are incomplete
    if (!isSelectionComplete) {
      // you can replace with toast/snackbar if you have one
      // e.g., toast.warn("Please select color and size");
      return;
    }

    const currentVariant = findMatchingVariant();
    addItem(product, currentVariant, 1);
    openCart();
  };

  if (loading) return <div className="p-6">Loading product…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">No product found.</div>;

  const price = getCurrentPrice();
  const salePrice = getCurrentSalePrice();
  const available = isVariantAvailable();

  return (
    <div className="container mx-auto px-4 pt-8 grid md:grid-cols-2 gap-10">
      <ProductImage thumb={product.thumb} images={product.images} />

      <ProductInfo
        product={product}
        variations={product.variations || []}
        selectedVariations={selectedVariations}
        setSelectedVariation={setSelectedVariation}
        price={getCurrentPrice()}
        salePrice={getCurrentSalePrice()}
        available={isVariantAvailable()}
        onAddToCart={onAddToCart}
        openCart={openCart}
        // NEW: pass whether user can add now
        canAddToCart={isSelectionComplete}
        requiredVariationNames={requiredVariationNames}
      />
    </div>
  );
}