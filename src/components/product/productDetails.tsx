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

  const onAddToCart = () => {
    if (!product) return;

    if (product.variations?.length) {
      const allChosen = product.variations.every((v) => selectedVariations[v.name]);
      if (!allChosen) {
        alert("Please choose all variations (e.g., color and size).");
        return;
      }
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
    <div className="container mx-auto px-4 py-8 grid md:grid-cols-2 gap-10">
 


      <ProductImage thumb={product.thumb} images={product.images} />

    
      <ProductInfo
        product={product}
        variations={product.variations || []}
        selectedVariations={selectedVariations}
        setSelectedVariation={setSelectedVariation}
        price={price}
        salePrice={salePrice}
        available={available}
        onAddToCart={onAddToCart}
        openCart={openCart}
      />
    </div>
  );
}
