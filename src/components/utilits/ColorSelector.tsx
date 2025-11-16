 
import type { Variation } from "../../types/product";

type Props = {
  variation?: Variation;
  selected?: string | null;
  onSelect: (value: string) => void;
  limit?: number;  
};

export default function ColorSelector({ variation, selected, onSelect, limit }: Props) {
  if (!variation?.props?.length) return null;

  const items = limit ? variation.props.slice(0, limit) : variation.props;

  return (
    <div className="flex gap-3 flex-wrap">
      {items.map((p) => {
        const colorName = p.name ?? "";
        const isSelected = (selected ?? "").toLowerCase() === colorName.toLowerCase();
        const looksLikeColor = p.value && /^#|rgb|hsl|var\(/i.test(p.value);
        const bg = looksLikeColor ? p.value! : colorName;

        return (
          <button
            key={p.id}
            onClick={() => onSelect(colorName)}
            className={`w-[74px] h-10 rounded-lg transition-all duration-300 ${
              isSelected
                ? "shadow-[0_0_0_6px_white_inset] p-1 border border-darkPrice"
                : "border border-gray-300 p-0"
            }`}
            style={{
              backgroundColor: String(bg).toLowerCase(),
              outlineOffset: "3px",
            }}
            title={colorName}
            aria-pressed={isSelected}
            aria-label={`color: ${colorName}`}
          />
        );
      })}
    </div>
  );
}
