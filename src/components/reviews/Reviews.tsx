 
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";

function Reviews() {
  return (
    <div className="grid col-span-1 md:grid-cols-4 gap-5">
     
        <div className="col-span-1">
          <ReviewFilters />
        </div>
      
      <div className="col-span-3">
        <ReviewList />
      </div>
    </div>
  );
}

export default Reviews;
