import Navigation from "../components/layout/Navigation";
import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import ProductReviews from "../components/reviews/ProductReviews";
import ProductSection from "../components/product/ProductSection";
import ProductDetail from "../components/product/productDetails";
import { CartDrawer, CartIcon } from "../components/cart/cartUI";

function ProductPage() {
  const crumbs = [
    "Homepage",
    "Women",
    "Women's Shirts & Tops",
    "Long Sleeve Overshirt, Khaki, 6",
  ];

  return (
    <div className="flex flex-col min-h-screen font-clash">

      <Navbar />


      <CartDrawer />
      <CartIcon />

      
      <main className="flex-grow mt-28">
        <div className="container">
          <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
        </div>
        <Navigation items={crumbs} />

        
        <section className="container flex flex-col md:flex-row md:gap-10 lg:gap-32 h-fit mb-20">
          <ProductDetail />
        </section>

        <div className="container">
          <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
        </div>
        <section className="container">
          <ProductSection title="Related Products" />
        </section>

        <div className="container">
          <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
        </div>
        <section className="container">
          <ProductReviews />
        </section>

        <div className="container">
          <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
        </div>
        <section className="container mb-20">
          <ProductSection title="Popular this week" />
        </section>
      </main>

      
      <Footer />
    </div>
  );
}

export default ProductPage;
