import { useState } from "react";
import ReviewFilters from "./ReviewFilters";
import ReviewList from "./ReviewList";

function Reviews() {
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  return (
    <>
      <div className="grid col-span-1 md:grid-cols-4 gap-5">
        {/* Desktop filters (sidebar) */}
        <div className="col-span-1 hidden md:block">
          <ReviewFilters />
        </div>

        {/* Reviews + Mobile filter trigger */}
        <div className="col-span-3">
          <ReviewList onOpenFilters={() => setMobileFiltersOpen(true)} />
        </div>
      </div>

      {/* Mobile Filters Sheet */}
      {mobileFiltersOpen && (
        <div className="fixed inset-0 z-50 md:hidden">
          {/* Backdrop */}
          <button
            aria-label="Close filters"
            onClick={() => setMobileFiltersOpen(false)}
            className="absolute inset-0 bg-black/40"
          />

          {/* Bottom sheet */}
          <div className="absolute inset-x-0 bottom-0 max-h-[80vh] rounded-t-2xl bg-white shadow-2xl border-t p-4 overflow-y-auto">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-lg font-semibold text-darkText">Reviews Filter</h3>
              <button
                onClick={() => setMobileFiltersOpen(false)}
                className="rounded-md border px-3 py-1 text-sm hover:bg-gray-50"
              >
                Close
              </button>
            </div>
            <ReviewFilters />
          </div>
        </div>
      )}
    </>
  );
}

export default Reviews;
