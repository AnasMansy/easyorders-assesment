import { useEffect, useState } from "react";
import star from "../../assets/img/star.png";
import type { Variation, Product } from "../../types/product";
import ColorSelector from "../utilits/ColorSelector";
import SizeSelector from "../utilits/SizeSelector";

type ProductInfoProps = {
  product: Product;
  variations: Variation[];
  selectedVariations: Record<string, string>;
  setSelectedVariation: (variationType: string, value: string) => void;

  price: number;
  salePrice: number;
  available: boolean;

  onAddToCart: () => void;
  openCart: () => void;
  canAddToCart?: boolean;
  requiredVariationNames?: string[];
};

export default function ProductInfo({
  product,
  variations,
  selectedVariations,
  setSelectedVariation,
  price,
  salePrice,
  available,
  onAddToCart,
  openCart,
  canAddToCart = false,
  requiredVariationNames = [],
}: ProductInfoProps) {
  const hasSale = salePrice > 0 && salePrice < price;
  const [expanded, setExpanded] = useState(false);
  const [showStockHint, setShowStockHint] = useState(false);
  const [showValidationHint, setShowValidationHint] = useState(false);

  // Pick category label
  const categoryLabel = product.categories?.[0]?.name ?? "Mules";

  // Find specific variations by name
  const colorVar = variations.find((v) => v.name === "color");
  const sizeVar = variations.find((v) => v.name === "size");

  const selectedColor = colorVar ? selectedVariations[colorVar.name] ?? null : null;
  const selectedSize = sizeVar ? selectedVariations[sizeVar.name] ?? null : null;

  // Missing variation names for message
  const missing = requiredVariationNames.filter((n) => !selectedVariations[n]);

  // Hide validation hint once selections are complete
  useEffect(() => {
    if (canAddToCart) {
      setShowValidationHint(false);
    }
  }, [canAddToCart]);

  const handleAddClick = () => {
    if (!canAddToCart) {
      setShowValidationHint(true);
      return;
    }
    onAddToCart();
    setShowStockHint(true);
  };

  useEffect(() => {
    const handleToggle = () => setExpanded((v) => !v);
    window.addEventListener("toggle-description", handleToggle);
    return () => window.removeEventListener("toggle-description", handleToggle);
  }, []);

  return (
    <div className="flex-1 mt-14 md:mt-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-7">
          {/* Category */}
          <div>
            <p className="text-graysecondary text-[13px] md:text-base font-medium text-nowrap">
              {categoryLabel}
            </p>
            <h1 className="font-semibold text-[23px] md:text-[36px] text-darkText leading-[120%] tracking-[-0.5%]">
              {product.name}
            </h1>
          </div>

          {/* Prices + Sold + Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {hasSale ? (
                <>
                  <p className="text-grayPrice line-through font-medium text-sm md:text-[18px] leading-[120%]">
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                      maximumFractionDigits: 0,
                    }).format(price)}
                  </p>

                  <p className="text-darkPrice font-semibold text-[1.25rem] md:text-[28px] leading-[120%]">
                    {new Intl.NumberFormat("en-GB", {
                      style: "currency",
                      currency: "GBP",
                      maximumFractionDigits: 0,
                    }).format(salePrice)}
                  </p>
                </>
              ) : (
                <p className="text-darkPrice font-semibold text-[1.25rem] md:text-[28px] leading-[120%]">
                  {new Intl.NumberFormat("en-GB", {
                    style: "currency",
                    currency: "GBP",
                    maximumFractionDigits: 0,
                  }).format(price)}
                </p>
              )}
            </div>

            <div className="flex items-center">
              <p className="text-grayPrice font-normal text-base md:text-[20px] leading-[120%] text-nowrap">
                <span>{Intl.NumberFormat().format(1200)}</span> Sold
                <span className="mx-2 text-[#E0E0E0]">•</span>
              </p>
              <div className="flex items-center gap-2">
                <img src={star} alt="star" className="h-5 md:h-6 w-5 md:w-6" />
                <p className="font-semibold text-darkPrice text-[1.25rem] md:text-[24px]">
                  4.6
                </p>
              </div>
            </div>
          </div>

          <div className="container">
            <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
          </div>
        </div>

        {/* Description */}
        <div>
          <h2 className="mb-[10px] font-bold text-[1.125rem] md:text-[1.25rem]">
            Description:
          </h2>
          <div className="prose prose-sm max-w-none">
            <div className="relative">
              <div
                className={!expanded ? "overflow-hidden md:pr-20" : "pr-0"}
                style={
                  !expanded
                    ? {
                      display: "-webkit-box",
                      WebkitLineClamp: 4,
                      WebkitBoxOrient: "vertical",
                      overflow: "hidden",
                    }
                    : undefined
                }
              >
                <span
                  className="font-normal text-[16px] leading-[130%] tracking-[0]"
                  dangerouslySetInnerHTML={{ __html: product.description }}
                />
                {expanded && (
                  <button
                    type="button"
                    onClick={() => setExpanded((v) => !v)}
                    className="font-normal text-[16px] leading-[130%] tracking-[0] inline ml-2 underline text-gray-800 hover:text-black align-bottom"
                  >
                    See less
                  </button>
                )}
              </div>

              {!expanded && (
                <>
                  <div className="pointer-events-none md:absolute bottom-0 right-0 h-[1.35em] w-28 bg-gradient-to-l from-white to-transparent" />
                  <button
                    type="button"
                    onClick={() => setExpanded(true)}
                    className="font-normal text-[16px] leading-[130%] tracking-[0] absolute bottom-0 right-0 underline text-gray-800 hover:text-black px-1"
                    style={{ verticalAlign: "bottom" }}
                  >
                    … See more
                  </button>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Variations */}
        {colorVar && (
          <div className="flex flex-col gap-3">
            <h3 className="font-medium text-[1.125rem] md:text-[1.25rem] text-graysecondary">
              {colorVar.name}:{" "}
              <span className="text-[#292929] font-semibold">
                {selectedColor ?? "None"}
              </span>
            </h3>

            <ColorSelector
              variation={colorVar}
              selected={selectedColor}
              onSelect={(val) => setSelectedVariation(colorVar.name, val)}
              limit={3}
            />
          </div>
        )}

        {sizeVar && (
          <div className="flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <h3 className="font-medium text-[1.125rem] md:text-[1.25rem] text-graysecondary">
                {sizeVar.name}:{" "}
                <span className="text-[#292929] font-semibold">
                  {selectedSize ?? "None"}
                </span>
              </h3>

              <button
                type="button"
                className="font-clash font-medium text-graysecondary text-sm leading-[120%] underline-offset-4 hover:underline"
              >
                View Size Chart
              </button>
            </div>

            <SizeSelector
              variation={sizeVar}
              selected={selectedSize}
              onSelect={(val) => setSelectedVariation(sizeVar.name, val)}
              limit={3}
            />
          </div>
        )}

        {/* Validation hint  */}
        {showValidationHint && !canAddToCart && missing.length > 0 && (
          <div className="text-sm mt-2 text-red-600">
            Please select {missing.join(" and ")} before adding to cart.
          </div>
        )}

        {/* Stock hint  */}
        {showStockHint && (
          <div className="text-sm mt-2">
            {available ? (
              <span className="text-green-600">In stock</span>
            ) : variations?.length ? (
              <span className="text-red-600">Select a variant to check stock</span>
            ) : (
              <span className="text-green-600">In stock</span>
            )}
          </div>
        )}

        {/* CTAs */}
        <div className="flex w-full gap-3 flex-col sm:flex-row mt-4">
          <button
  onClick={handleAddClick}
  className={`flex-1 w-full rounded-xl text-white
              py-3 sm:py-3.5 md:py-4
              text-sm sm:text-base md:text-lg
              font-semibold transition
              bg-black hover:bg-gray-900"
                  : "bg-gray-400 cursor-not-allowed `}
>
  Add To Cart
</button>


         <button
  onClick={openCart}
  className="flex-1 w-full rounded-xl border border-black text-black
             py-3 sm:py-3.5 md:py-4
             text-sm sm:text-base md:text-lg
             font-semibold transition hover:bg-black hover:text-white"
>
  Checkout Now
</button>


        </div>
      </div>

      <button
        type="button"
        className="font-clash font-medium text-sm underline text-left mt-6 text-grayDes hover:text-gray-700 transition"
        style={{
          fontSize: "16px",
          lineHeight: "120%",
          letterSpacing: "0%",
          textDecorationStyle: "solid",
        }}
      >
        Delivery T&C
      </button>
      <div />
    </div>
  );
}
