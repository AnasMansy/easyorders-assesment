import Rating from "../rating/Rating"; 
import Reviews from "./Reviews";

const ProductReviews = () => {
  return (
    <section className="container my-20">
      {/* Section Title */}
      <h2 className="text-darkPrice font-semibold text-[1.5rem] md:text-[1.75rem] leading-[120%] mb-6">
        Product Reviews
      </h2>
      {/* Average Rating */}
      
        <Rating /> 
      {/* Reviews List */}
      <Reviews />
    </section>
  );
};

export default ProductReviews;
