import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import logo from "../../assets/img/logo.png";
import searchIcon from "../../assets/img/search.png";
import categoriesIcon from "../../assets/img/categories.png";
import signinIcon from "../../assets/img/signin.png";
import favoriteIcon from "../../assets/img/favorite.png";
import cartIcon from "../../assets/img/cart.png";
import menuIcon from "../../assets/img/menu.png";
import { useCartStore } from "../../stores/cartStore";
import { useCartDrawerStore } from "../../stores/cartDrawerStore";


function Navbar() {
  const [isOpenSearch, setIsOpenSearch] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const items = useCartStore((state) => state.items);
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMobileMenuOpen]);

  return (
    <header className="container  fixed top-0 left-0 mt-7 right-0 bg-white py-8 z-50 h-20">
      <div className="fixed top-0 left-0 w-full bg-black text-white text-center py-2 flex items-center justify-center z-[9999]">
      <span className="text-sm sm:text-base">
        New season coming! Discount 10% for all product! Checkout Now!
      </span>
      <span className="ml-3 text-xs bg-gray-700 rounded-full px-2 py-0.5">
        20:40
      </span>
    </div>

      <div className="flex items-center justify-between gap-4 ">
        <div className="flex items-center flex-grow justify-between">
          <div className="flex justify-between items-center flex-1">
            <Link to="/" className="w-fit">
              <img
                src={logo}
                alt="John Lewis logo"
                className="h-[26px] w-[140px] md:h-8 md:w-[170px]"
              />
            </Link>

            <div className="relative flex items-center w-20 md:w-64">
              {isOpenSearch && (
                <input
                  type="text"
                  placeholder="Search products..."
                  className="w-full border border-gray-300 rounded-full px-4 pr-10  py-1 shadow-sm focus:outline-none focus:ring-1 focus:ring-black transition-all duration-300"
                />
              )}
              <button
                onClick={() => setIsOpenSearch(!isOpenSearch)}
                aria-label={isOpenSearch ? "Close search" : "Open search"}
                className="absolute right-2 rounded-full hover:bg-gray-100 transition"
              >
                <img src={searchIcon} alt="Search" className="w-5 h-5" />
              </button>
            </div>
          </div>
          {/* Desktop Navigation */}

          
          <nav className="hidden md:flex items-center gap-8 ml-8">
            <Link
              to="/"
              className="flex items-center gap-1 text-dark font-medium text-base"
            >
              Categories
              <img src={categoriesIcon} alt="Categories" className="h-5 w-5" />
            </Link>

            <Link
              to="/"
              className="flex items-center gap-1 text-dark font-medium text-base"
            >
              <img src={signinIcon} alt="Sign in" className="h-5 w-5" />
              Sign in
            </Link>

            <Link to="/" className="flex items-center gap-1">
              <img src={favoriteIcon} alt="Favorites" className="h-5 w-5" />
            </Link>

            <Link
              to="/"
              className="relative flex items-center"
              onClick={(e) => {
                e.preventDefault();
                useCartDrawerStore.getState().open();
              }}
            >
              <img src={cartIcon} alt="Cart" className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-darkPrice text-white text-xs rounded-full px-1.5 h-4 min-w-[16px] flex items-center justify-center">
                  {items.length}
                </span>
              )}
            </Link>
          </nav>
        </div>

        {/* Mobile Icons , hiiden in Desktop */}
        <div className="flex items-center gap-5 md:hidden">
          <Link
            to="/"
            className="relative flex items-center"
            onClick={(e) => {
              e.preventDefault();
              useCartDrawerStore.getState().open();
            }}
          >
            <img src={cartIcon} alt="Cart" className="h-5 w-5" />
            {items.length > 0 && (
              <span className="absolute -top-1 -right-1 bg-darkPrice text-white text-xs rounded-full px-1.5 h-4 min-w-[16px] flex items-center justify-center">
                {items.length}
              </span>
            )}
          </Link>

          <button
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
            className="p-2 rounded-md focus:outline-none focus:ring-1 focus:ring-black"
          >
            <img src={menuIcon} alt="Menu" className="h-5 w-5" />
          </button>
        </div>

        {/* Mobile Side Navigation Drawer */}
        {isMobileMenuOpen && (
          <>
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
              aria-hidden="true"
            />

            <aside
              className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg z-50 transform transition-transform duration-300 ease-in-out translate-x-0`}
            >
              <div className="flex items-center justify-between p-4 border-b">
                <Link to="/" className="w-fit">
                  <img
                    src={logo}
                    alt="John Lewis logo"
                    className="h-[26px] w-[140px]"
                  />
                </Link>

                <button
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label="Close menu"
                  className="p-2 rounded-md focus:outline-none text-gray-400 focus:ring-2 focus:ring-black"
                >
                  Close
                </button>
              </div>

              <nav
                className="flex flex-col p-4 gap-8 justify-end"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <Link
                  to="/"
                  className="flex items-center justify-between gap-1 text-dark font-medium text-base"
                >
                  <img
                    src={categoriesIcon}
                    alt="Categories"
                    className="h-5 w-5"
                  />
                  <span className="font-medium">Categories</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center gap-1 justify-between text-dark font-medium text-base"
                >
                  <img src={signinIcon} alt="Sign in" className="h-5 w-5" />
                  <span className="font-medium"> Sign in</span>
                </Link>

                <Link
                  to="/"
                  className="flex items-center justify-between gap-1"
                >
                  <img src={favoriteIcon} alt="Favorites" className="h-5 w-5" />
                  <span className="font-medium">Favorites</span>
                </Link>
              </nav>
            </aside>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;
