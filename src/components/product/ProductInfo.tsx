import { useState } from "react";
import star from "../../assets/img/star.png";
import type { Variation, Product } from "../../types/product";

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
}: ProductInfoProps) {
  const hasSale = salePrice > 0 && salePrice < price;
  const [expanded, setExpanded] = useState(false);

  // Pick category label (explicitly show "Mules" if present / fallback)
  const categoryLabel = product.categories?.[0]?.name ?? "Mules";

  // Find specific variations by name (no map rendering)
  const colorVar = variations.find((v) => v.name === "color");
  const sizeVar = variations.find((v) => v.name === "size");

  // Helper to render one color button (no map)
  const ColorBtn = (idx: number) => {
    const p = colorVar?.props?.[idx];
    if (!p) return null;
    const selected = selectedVariations[colorVar!.name] === p.name;
    return (
      <button
        key={p.id}
        onClick={() => setSelectedVariation(colorVar!.name, p.name)}
        className={`rounded-xl border px-3 py-2 text-sm transition ${
          selected ? "border-black" : "border-gray-200 hover:border-gray-400"
        }`}
        aria-pressed={selected}
        title={`color: ${p.name}`}
      >
        <div className="flex items-center gap-1">
          {p.value ? (
            <img
              src={p.value}
              alt={p.name}
              className="h-6 w-6 rounded-full object-cover border"
            />
          ) : (
            <span className="inline-block h-6 w-6 rounded-full bg-gray-200" />
          )}
          <span className="capitalize">{p.name}</span>
        </div>
      </button>
    );
  };

  // Helper to render one size button (no map)
  const SizeBtn = (idx: number) => {
    const p = sizeVar?.props?.[idx];
    if (!p) return null;
    const selected = selectedVariations[sizeVar!.name] === p.name;
    return (
      <button
        key={p.id}
        onClick={() => setSelectedVariation(sizeVar!.name, p.name)}
        className={`rounded-xl border px-3 py-2 text-sm transition ${
          selected ? "border-black" : "border-gray-200 hover:border-gray-400"
        }`}
        aria-pressed={selected}
        title={`size: ${p.name}`}
      >
        <span className="capitalize">{p.name}</span>
      </button>
    );
  };

  return (
    <div className="flex-1 mt-14 md:mt-0">
      <div className="flex flex-col gap-2">
        <div className="flex flex-col gap-7">
          {/* Category  */}
          <div>
            <p className="text-graysecondary text-[13px] md:text-base font-medium text-nowrap mb-3">
              {categoryLabel }
            </p>
            <h1 className="font-semibold text-[23px] md:text-[36px] text-darkText leading-[120%] tracking-[-0.5%]">
              {product.name  }
            </h1>
          </div>

          {/* Prices + Sold + Rating */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {hasSale ? (
                <>
                
                  <p className="text-grayPrice line-through font-medium text-sm md:text-[18px] leading-[120%]">
                    {new Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: "EGP",
                      maximumFractionDigits: 0,
                    }).format(price)}
                  </p>
                   
                  <p className="text-darkPrice font-semibold text-[1.25rem] md:text-[28px] leading-[120%]">
                    {new Intl.NumberFormat("en-EG", {
                      style: "currency",
                      currency: "EGP",
                      maximumFractionDigits: 0,
                    }).format(salePrice)}
                  </p>
                </>
              ) : (
                <p className="text-darkPrice font-semibold text-[1.25rem] md:text-[28px] leading-[120%]">
                  {new Intl.NumberFormat("en-EG", {
                    style: "currency",
                    currency: "EGP",
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

        {/* Description  */}
        <div>
          <h2 className="mb-[10px] font-bold text-[1.125rem] md:text-[1.25rem]">
            Description:
          </h2>

          <div className="prose prose-sm max-w-none">
            <div className="relative">
              <div
                className={!expanded ? "overflow-hidden" : ""}
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
                 
                dangerouslySetInnerHTML={{ __html: product.description }}
              />
              {!expanded && (
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-white to-transparent" />
              )}
            </div>

            <button
              type="button"
              onClick={() => setExpanded((v) => !v)}
              className="mt-2 text-sm font-medium underline text-gray-700 hover:text-black"
            >
              {expanded ? "See less" : "See more"}
            </button>
          </div>
        </div>

        {/* Variations  */}
        {/* color */}
        {colorVar && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-clash font-semibold text-graysecondary text-sm leading-[120%] ">
                {colorVar.name /* "color" */}
              </h3>
            </div>

            <div className="flex flex-wrap gap-2">
              {ColorBtn(0)}
              {ColorBtn(1)}
              {ColorBtn(2)}
              {/* add more manually if needed */}
            </div>
          </div>
        )}

        {/* size + view size chart */}
        {sizeVar && (
          <div>
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-clash font-semibold  text-graysecondary text-sm leading-[120%] capitalize">
                {sizeVar.name  }
              </h3>
              <button
                type="button"
                className="font-clash font-medium  text-graysecondary text-sm leading-[120%] underline-offset-4 hover:underline"
              >
                View Size Chart
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {SizeBtn(0)}
              {SizeBtn(1)}
              {SizeBtn(2)}
            </div>
          </div>
        )}

        {/* Stock hint */}
        <div className="text-sm">
          {available ? (
            <span className="text-green-600">In stock</span>
          ) : variations?.length ? (
            <span className="text-red-600">Select a variant to check stock</span>
          ) : (
            <span className="text-green-600">In stock</span>
          )}
        </div>

        {/* CTAs */}
        <div className="flex w-full gap-3">
  <button
    onClick={onAddToCart}
    className="
      flex-1 w-full rounded-xl bg-black text-white
      py-3 sm:py-3.5 md:py-4
      text-sm sm:text-base md:text-lg
      font-semibold transition hover:bg-gray-900
    "
  >
    Add to cart
  </button>

  <button
    onClick={openCart}
    className="
      flex-1 w-full rounded-xl border border-black text-black
      py-3 sm:py-3.5 md:py-4
      text-sm sm:text-base md:text-lg
      font-semibold transition hover:bg-black hover:text-white
    "
  >
    Checkout
  </button>
</div>
      </div>

      <div />
    </div>
  );
}  
