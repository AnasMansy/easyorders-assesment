
import RatingFilter from "../rating/RatingFilters";
import ReviewTopics from "./ReviewTopics";

const ReviewFilters = () => {
  return (
<aside className="mt-6 rounded-md border border-dashed border-[#BBBBBB] p-6 h-fit">
      {/* Section Title */}
      <h2 className="font-semibold text-[1.25rem] text-lightDark mb-4">
        Reviews Filter
      </h2>

      <div className="container">
        <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
      </div>
      <RatingFilter className="my-4" />

      <div className="container">
        <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
      </div>

      <ReviewTopics />
    </aside>
  );
};

export default ReviewFilters;
