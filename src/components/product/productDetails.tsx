import { useEffect } from "react";
import { useProductStore } from "../../stores/productStores";
import { useCartStore } from "../../stores/cartStore";
import { useCartDrawerStore } from "../../stores/cartDrawerStore"; // ✅ add this
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

  const addItem = useCartStore((s) => s.addItem);              // ✅ items
  const openCartDrawer = useCartDrawerStore((s) => s.open);    // ✅ drawer open

  useEffect(() => {
    fetchProduct("Sneakers12");
  }, []);

  // Names we require
  const requiredVariationNames =
    product?.variations
      ?.filter((v) => v.name === "color" || v.name === "size")
      .map((v) => v.name) ?? [];

  const isSelectionComplete = requiredVariationNames.every(
    (name) => !!selectedVariations[name]
  );

  const onAddToCart = () => {
    if (!product) return;
    if (!isSelectionComplete) return;

    const currentVariant = findMatchingVariant();
    addItem(product, currentVariant, 1);
    openCartDrawer(); // ✅ open drawer after add
  };

  if (loading) return <div className="p-6">Loading product…</div>;
  if (error) return <div className="p-6 text-red-500">{error}</div>;
  if (!product) return <div className="p-6">No product found.</div>;

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
        openCart={openCartDrawer}                 // ✅ use drawer store
        canAddToCart={isSelectionComplete}
        requiredVariationNames={requiredVariationNames}
      />
    </div>
  );
}
