import { useEffect, useMemo, useState } from "react";
import Zoom from "react-medium-image-zoom";
import "react-medium-image-zoom/dist/styles.css";  
import share from "../../assets/img/share.png";
import favorite from "../../assets/img/like.png";
import arrowLeft from "../../assets/img/arrowleft.png";
import arrowRight from "../../assets/img/arrowright.png";

type GalleryProps = {
  thumb?: string | null;
  images?: string[] | null;
};

export default function ProductImage({ thumb, images }: GalleryProps) {
    console.log(thumb , images)
  const list = useMemo(() => {
    const arr = [thumb, ...(images || [])].filter(Boolean) as string[];
    const unique = Array.from(new Set(arr));
    return unique.map((src) => ({ value: src }));
  }, [thumb, images]);

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    setCurrentIndex(0);
  }, [thumb, images]);

  const prevImage = () => setCurrentIndex((i) => Math.max(0, i - 1));
  const nextImage = () => setCurrentIndex((i) => Math.min(list.length - 1, i + 1));

  return (
    <div className="flex-1 h-full justify-between flex-col">
      <div className="flex gap-8">
        {/* Main Zoom Image */}
        <div className="relative group flex-1">
          {/* Fixed-height container = stable layout for Zoom */}
          <div className="w-full h-[500px] md:h-[560px] rounded-lg overflow-hidden bg-gray-100 flex items-center justify-center">
            {list.length > 0 ? (
              // This wrapper ensures the Zoom div can stretch to full height
              <div className="h-full w-full flex items-center justify-center">
                <Zoom zoomMargin={40}>
                  <img
                    src={list[currentIndex].value}
                    alt={`Product ${currentIndex + 1}`}
                    loading="lazy"
                    className="block max-w-full max-h-full object-contain select-none"
                    draggable={false}
                  />
                </Zoom>
              </div>
            ) : (
              <div className="text-gray-400 h-full flex items-center">No image</div>
            )}
          </div>
        </div>

        {/* Side Buttons */}
        <div className="w-fit flex flex-col justify-between">
          <div className="flex flex-col gap-2">
            <button
              aria-label="Share"
              className="flex justify-center items-center bg-grayLight p-2 h-[52px] w-[52px] rounded-lg hover:bg-white transition-colors duration-200"
            >
              <img src={share} alt="Share" className="h-5 w-5" />
            </button>
            <button
              aria-label="Favorite"
              className="flex justify-center items-center bg-grayLight p-2 h-[52px] w-[52px] rounded-lg hover:bg-white transition-colors duration-200"
            >
              <img src={favorite} alt="Favorite" className="h-5 w-5" />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            <button
              onClick={prevImage}
              disabled={currentIndex === 0}
              aria-label="Previous image"
              className={`flex justify-center items-center p-2 h-[52px] w-[52px] rounded-lg transition-colors duration-200 ${
                currentIndex === 0 ? "bg-gray-300 cursor-not-allowed" : "bg-grayLight hover:bg-white"
              }`}
            >
              <img src={arrowLeft} alt="Previous" className="h-5 w-5" />
            </button>

            <button
              onClick={nextImage}
              disabled={currentIndex === list.length - 1 || list.length === 0}
              aria-label="Next image"
              className={`flex justify-center items-center p-2 h-[52px] w-[52px] rounded-lg transition-colors duration-200 ${
                currentIndex === list.length - 1 || list.length === 0
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-grayLight hover:bg-white"
              }`}
            >
              <img src={arrowRight} alt="Next" className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      <div className="flex gap-3 mt-4 justify-center">
        {list.map((img, i) => (
          <button
            key={i}
            onClick={() => setCurrentIndex(i)}
            aria-label={`Select image ${i + 1}`}
            className={`relative rounded-md overflow-hidden transition-all duration-200 ${
              currentIndex === i
                ? "ring-2 ring-primary scale-105"
                : "hover:opacity-80 hover:ring-1 hover:ring-gray-300"
            }`}
          >
            <div className="absolute inset-0 bg-gray-100" />
            <img
              src={img.value}
              alt={`Thumbnail ${i + 1}`}
              className="relative z-10 h-16 w-16 object-contain bg-gray-100"
              loading="lazy"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
