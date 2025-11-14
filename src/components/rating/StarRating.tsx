import star from "../../assets/img/star2.png";

interface StarRatingProps {
  rating: number;
  maxStars?: number;
  size?: number;
  className?: string;
}

export default function StarRating({
  rating,
  maxStars = 5,
  size = 20,
  className = "",
}: StarRatingProps) {
  const starStyle = {
    width: `${size}px`,
    height: `${size}px`,
    backgroundImage: `url(${star})`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  const filledWidth = (rating / maxStars) * 100;

  return (
    <div className={`relative flex items-center gap-2 ${className}`}>
      
      <div className="flex gap-[2px]">
        {Array.from({ length: maxStars }).map((_, idx) => (
          <div
            key={idx}
            style={{ ...starStyle, opacity: 0.2 }}
          />
        ))}
      </div> 
      <div
        className="absolute top-0 left-0 flex gap-[2px] overflow-hidden"
        style={{ width: `${filledWidth}%` }}
      >
        {Array.from({ length: maxStars }).map((_, idx) => (
          <div key={idx} style={starStyle} />
        ))}
      </div>
    </div>
  );
}
