import CircleRating from "./CircleRating";
import RatingBars from "./RatingBars";
import StarRating from "./StarRating";
const ratings = {
  5: 2823,4: 38,3: 4,2: 0, 1: 0,
};
function Rating() {
  return (
    <div className="mt-6 rounded-md border border-dashed border-[#BBBBBB] grid md:grid-cols-6 grid-cols-2 gap-2 p-6">
      <div className="col-span-2 flex gap-4">
        <CircleRating rating={4.5} size={80} strokeWidth={-12} />
        <div className="mt-4">
          <StarRating rating={5} />
          <p className="md:text-[1rem] text-[0.75rem] font-normal text-grayLink mt-2">
            from 1,25k reviews
          </p>
        </div>
      </div>
      <div className="md:col-span-4 col-span-2">
        <RatingBars ratings={ratings} />
      </div>
    </div>

  );
}

export default Rating;
