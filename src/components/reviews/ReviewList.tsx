import { useMemo, useState } from "react";
import StarRating from "../rating/StarRating";
import like from "../../assets/img/like.png";
import dislike from "../../assets/img/dislike.png";
import filterIcon from "../../assets/img/filter.png";
import avatar1 from "../../assets/img/Ellipse 14.png";
import avatar2 from "../../assets/img/Ellipse 141.png";
import avatar3 from "../../assets/img/Ellipse 142.png";
import avatar4 from "../../assets/img/Frame 193.png";



const DEFAULT_TABS = ["All Reviews", "Photos & Videos", "With Description"];
const REVIEWS_PER_PAGE = 3;

// Mock reviews (same design data)
const MOCK_REVIEWS = [
  {
    review: "Surprised by the comfort—lightweight and supportive.",
    rate: 4.6,
    date: "Jan 14, 2025 10:12 AM",
    name: "Youssef Kamal",
    like: 27,
    user_avatar: avatar1,
    hasMedia: true,
    hasText: true,
  },
  {
    review: "Good value for money. Stitching looks solid.",
    rate: 4.3,
    date: "Feb 02, 2025 05:40 PM",
    name: "Mariam Nasser",
    like: 19,
    user_avatar: avatar2,
    hasMedia: false,
    hasText: true,
  },
  {
    review: "Delivered on time. Packaging was neat and secure.",
    rate: 4.1,
    date: "Feb 18, 2025 11:05 AM",
    name: "Karim Fouad",
    like: 15,
    user_avatar: avatar3,
    hasMedia: false,
    hasText: true,
  },
  {
    review: "Color runs slightly darker than photos, but still stylish.",
    rate: 3.8,
    date: "Mar 03, 2025 07:22 PM",
    name: "Nour Adel",
    like: 8,
    user_avatar: avatar4,
    hasMedia: true,
    hasText: true,
  },
  {
    review: "Excellent grip and very comfy for long walks.",
    rate: 4.9,
    date: "Mar 21, 2025 09:33 AM",
    name: "Hadi Selim",
    like: 42,
    user_avatar: avatar3,
    hasMedia: false,
    hasText: true,
  },
];
type ReviewsSectionProps = {
  tabs?: string[];
  onOpenFilters?: () => void; // NEW
};

export default function ReviewList({ tabs = DEFAULT_TABS, onOpenFilters }: ReviewsSectionProps) {
  const [selectedTab, setSelectedTab] = useState(tabs[0]);
  const [currentPage, setCurrentPage] = useState(1);

  // Filter based on selected tab (keeps same UI)
  const filtered = useMemo(() => {
    if (selectedTab === "Photos & Videos") return MOCK_REVIEWS.filter(r => r.hasMedia);
    if (selectedTab === "With Description") return MOCK_REVIEWS.filter(r => r.hasText && r.review?.trim());
    return MOCK_REVIEWS;
  }, [selectedTab]);

  // Pagination
  const totalPages = Math.ceil(filtered.length / REVIEWS_PER_PAGE) || 1;
  const startIndex = (currentPage - 1) * REVIEWS_PER_PAGE;
  const paginated = filtered.slice(startIndex, startIndex + REVIEWS_PER_PAGE);

  const handleTab = (tab: string) => {
    setSelectedTab(tab);
    setCurrentPage(1);
  };

  const handlePageClick = (page: number) => setCurrentPage(page);

  return (
    <section className="mt-6">
      {/* Header with mobile filter button */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-[1rem] md:text-[1.25rem] font-semibold text-darkText">
          Review Lists
        </h2>


      </div>

      {/* Tabs */}
      <div className="flex items-center justify-between gap-3 items-start">
     
        <div
          role="tablist"
          className="grid grid-flow-col auto-cols-max grid-rows-2 gap-2"
        >
          {tabs.map((tab) => {
            const isSelected = selectedTab === tab;
            return (
              <button
                key={tab}
                role="tab"
                aria-selected={isSelected}
                onClick={() => {
                  setSelectedTab(tab);
                  setCurrentPage(1);
                }}
                className={`w-auto text-[0.75rem] md:text-sm font-medium transition-colors duration-200
                      border px-[10px] md:px-[20px] py-[10px] rounded-md
                      ${isSelected
                    ? "text-dark border-dark bg-[#EBEBEB]"
                    : "text-darkPrice border-[#E6E6E6] hover:text-grayLink"}`}
              >
                {tab}
              </button>
            );
          })}
        </div>

        {/* Filter icon on the right  */}
        {onOpenFilters && (
          <button
            type="button"
            onClick={onOpenFilters}
            className="md:hidden border border-[#E6E6E6] rounded-md p-2 hover:bg-gray-50 transition-shadows"
            aria-label="Open filters"
          >
            <img
              src={filterIcon}
              alt="Filters"
              className="w-5 h-5 md:w-6 md:h-6 object-contain"
            />
          </button>
        )}
      </div>


      {/* Reviews List (same Feedback design) */}
      <div className="md:m-8">
        {paginated.map((el, index) => (
          <div key={`${el.name}-${index}`} className="flex flex-col gap-2 my-6">
            <StarRating rating={el.rate || 0} />
            <h3 className="text-darkPrice font-semibold text-sm md:text-[1.125rem]">
              {el.review}
            </h3>
            <p className="md:text-sm text-[0.75rem] text-[#818B9C]">{el.date}</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <img
                  src={el.user_avatar}
                  alt="avatar"
                  className="h-8 w-8 rounded-full"
                />
                <p className="text-base font-medium text-darkPrice">{el.name}</p>
              </div>

              <div className="flex gap-2 items-center">
                <button className="flex gap-2 items-center border border-[#E4E9EE] md:p-3 p-[10px] rounded-md md:rounded-lg">
                  <img src={like} alt="like" className="h-6 w-6" />
                  <p>{el.like}</p>
                </button>
                <button className="border border-[#E4E9EE] md:p-3 p-[10px] rounded-md md:rounded-lg">
                  <img src={dislike} alt="dislike" className="h-6 w-6" />
                </button>
              </div>
            </div>

            <div className="container">
              <hr className="m-0 border-t-[0.5px] border-dashed border-[#A3A3A3]" />
            </div>
          </div>
        ))}

        {/* Empty state */}
        {filtered.length === 0 && (
          <div className="text-sm text-gray-500 mt-6">No reviews found.</div>
        )}

        {/* Pagination */}
        {filtered.length > 0 && (
          <div className="flex justify-center gap-2 mt-6">
            {Array.from({ length: totalPages }, (_, i) => {
              const pageNumber = i + 1;
              const isActive = currentPage === pageNumber;
              return (
                <button
                  key={pageNumber}
                  onClick={() => handlePageClick(pageNumber)}
                  className={`w-10 h-10 rounded-lg border text-sm font-medium ${isActive
                    ? "text-darkPrice border-darkPrice"
                    : "text-gray-600 border-[#E4E9EE] hover:bg-gray-100"
                    }`}
                >
                  {pageNumber}
                </button>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
