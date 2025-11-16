 // src/components/product/SizeTiles.tsx
import type { Variation } from "../../types/product";

type Props = {
  variation?: Variation;
  selected?: string | null;
  onSelect: (value: string) => void;
  limit?: number; // optionally render only first N items
};

export default function SizeSelector({ variation, selected, onSelect, limit }: Props) {
  if (!variation?.props?.length) return null;

  const items = limit ? variation.props.slice(0, limit) : variation.props;

  return (
    <div className="flex gap-3 flex-wrap">
      {items.map((p) => {
        const sizeName = p.name ?? "";
        const isSelected = (selected ?? "").toLowerCase() === sizeName.toLowerCase();

        return (
          <button
            key={p.id}
            onClick={() => onSelect(sizeName)}
            className={`w-[74px] h-10 rounded-lg transition-all duration-300 flex items-center justify-center ${
              isSelected
                ? "shadow-[0_0_0_6px_white_inset] p-1 border border-darkPrice"
                : "border border-gray-300 p-0"
            }`}
            title={sizeName}
            aria-pressed={isSelected}
            aria-label={`size: ${sizeName}`}
          >
            <span className="text-sm font-medium capitalize text-[#292929]">
              {sizeName}
            </span>
          </button>
        );
      })}
    </div>
  );
}
 