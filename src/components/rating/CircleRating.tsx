type CircleRatingProps = {
  rating: number;
  max?: number;
  size?: number;           
  strokeWidth?: number;   
  color?: string;          
  backgroundColor?: string;  
  className?: string;
};

export default function CircleRatingAlt({
  rating,
  max = 5,
  size = 80,
  strokeWidth = 4,
  color = "#FFA439",
  backgroundColor = "#e5e7eb",
  className = "",
}: CircleRatingProps) {
  const clamped = Math.max(0, Math.min(rating, max));
  const pct = (clamped / max) * 100;
 
  const style: React.CSSProperties = {
    width: size,
    height: size,
    background: `conic-gradient(${color} ${pct}%, ${backgroundColor} 0)`,
    WebkitMask: `radial-gradient(farthest-side, transparent calc(50% - ${strokeWidth}px), #000 calc(50% - ${strokeWidth}px))`,
    mask: `radial-gradient(farthest-side, transparent calc(50% - ${strokeWidth}px), #000 calc(50% - ${strokeWidth}px))`,
    borderRadius: "50%",
  };

  return (
    <div
      className={`relative inline-flex items-center justify-center ${className}`}
      style={{ width: size, height: size }}
      role="img"
      aria-label={`Rating ${clamped.toFixed(1)} out of ${max}`}
      title={`${clamped.toFixed(1)} / ${max}`}
    >
      <div style={style} />
      <div
        className="absolute inset-0 flex items-center justify-center font-semibold text-[#0B0F0E]"
        style={{
          fontSize: Math.max(12, Math.round(size * 0.25)),
          lineHeight: 1,
        }}
      >
        {clamped.toFixed(1)}
      </div>
    </div>
  );
}
