import star from "../../assets/img/star2.png";

type RatingDistribution = {
  [rating: number]: number;
};

type RatingBarsProps = {
  ratings: RatingDistribution;
  maxRating?: number;
  barColor?: string; 
  bgColor?: string; 
  className?: string; 
};

export default function RatingBars({
  ratings,
  maxRating = 5,
  barColor = "#000",
  bgColor = "#E4E9EE",
  className = "",
}: RatingBarsProps) {
  const total = Object.values(ratings).reduce((a, b) => a + b, 0);

  return (
    <div className={`flex flex-col gap-2 w-full mt-6 md:mt-0 ${className}`}>
      {[...Array(maxRating)].map((_, i) => {
        const rate = maxRating - i;
        const count = ratings[rate] || 0;
        const percent = total ? (count / total) * 100 : 0;

        return (
          <div key={rate} className="flex items-center gap-2">
            {/* Star and rating */}
            <div className="flex gap-2 items-center mr-4 min-w-[50px]">
              <p className="text-blackRate font-medium text-[1rem]">{rate.toFixed(1)}</p>
              <img src={star} alt="star" className="w-4 h-4 object-contain" />
            </div>

            {/* Progress bar */}
            <div className="flex-1 h-2 rounded-full overflow-hidden bg-[var(--bg)]" style={{ backgroundColor: bgColor }}>
              <div
                className="h-full rounded-full"
                style={{ width: `${percent}%`, backgroundColor: barColor }}
              />
            </div>

            {/* Count */}
            <div className="text-blackRate font-medium text-[1rem] w-20 text-right">
              {count.toLocaleString()}
            </div>
          </div>
        );
      })}
    </div>
  );
}
