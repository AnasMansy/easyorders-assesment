import React, { useState } from "react";
import fullStar from "../../assets/img/star2.png";
import arrowup from "../../assets/img/arrowup.png";

interface RatingFilterProps {
  onChange?: (selected: number[]) => void;
  maxRating?: number; 
  className?: string; 
}

const RatingFilter: React.FC<RatingFilterProps> = ({
  onChange,
  maxRating = 5,
  className = "",
}) => {
  const [collapsed, setCollapsed] = useState(false);
  const [selectedRatings, setSelectedRatings] = useState<number[]>([]);

  const toggleCollapse = () => setCollapsed((prev) => !prev);

  const toggleRating = (rating: number) => {
    const newSelected = selectedRatings.includes(rating)
      ? selectedRatings.filter((r) => r !== rating)
      : [...selectedRatings, rating];

    setSelectedRatings(newSelected);
    onChange?.(newSelected);
  };

  return (
    <div className={`my-6 ${className}`}>
      {/* Header */}
      <button
        onClick={toggleCollapse}
        className="flex justify-between items-center w-full font-semibold text-lg mb-4"
        aria-expanded={!collapsed}
        aria-controls="rating-list"
      >
        <span>Rating</span>
        <span
          className={`transform transition-transform duration-300 ${
            collapsed ? "rotate-0" : "rotate-180"
          }`}
          aria-hidden="true"
        >
          <img src={arrowup} className="w-2 h-2" alt="Toggle" />
        </span>
      </button>

 
      {!collapsed && (
        <div id="rating-list" className="flex flex-col gap-3">
          {[...Array(maxRating)].map((_, i) => {
            const rating = maxRating - i;
            return (
              <label
                key={rating}
                className="flex items-center gap-2 cursor-pointer select-none"
              >
                <input
                  type="checkbox"
                  checked={selectedRatings.includes(rating)}
                  onChange={() => toggleRating(rating)}
                  className="w-5 h-5"
                />
                <div className="flex gap-1">
                  <img src={fullStar} alt="star" className="w-[18px] h-[18px]" />
                </div>
                <span className="text-base font-semibold text-rating">{rating}</span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default RatingFilter;
