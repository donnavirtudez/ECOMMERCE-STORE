"use client";

import { useState, useEffect } from "react";
import { X } from "lucide-react";

const images1: string[] = [
  "https://i.pinimg.com/736x/4b/da/a1/4bdaa11f84b501b532be049e5b333d37.jpg",
  "https://i.pinimg.com/736x/1a/6e/fd/1a6efd1f9c2a475b6702e4045fe80752.jpg",
  "https://i.pinimg.com/736x/ef/ac/4b/efac4bb5366d8a5c0ba022a7f0c8eff1.jpg",
  "https://i.pinimg.com/736x/28/11/b1/2811b1359f8274024d64f5f296fdff9b.jpg",
  "https://i.pinimg.com/736x/9b/f0/5b/9bf05ba0647c80a56e95a009655248b9.jpg",
];

const images2: string[] = [
  "https://i.pinimg.com/736x/4b/a1/a1/4ba1a19a4354feb3974ef2bb01259f53.jpg",
  "https://i.pinimg.com/736x/0f/db/f1/0fdbf1e5868bd3ead62db66f02e29692.jpg",
  "https://i.pinimg.com/736x/77/61/54/776154b16adda939c0c6addb3ffabb56.jpg",
  "https://i.pinimg.com/736x/a9/e7/24/a9e724b7ca8a995deb11a684ca0393da.jpg",
  "https://i.pinimg.com/736x/5c/28/66/5c28664a7770f7c0d8ccb6a6369f4f96.jpg",
];

interface JewelryShowcaseProps {
  images: string[];
}

const JewelryShowcase: React.FC<JewelryShowcaseProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (images.length === 0) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    }, 2000);

    return () => clearInterval(interval);
  }, [images]);

  if (images.length === 0) {
    return (
      <div className="w-full aspect-square flex items-center justify-center bg-[#2D2D2D] text-black">
        No images to display
      </div>
    );
  }

  return (
    <>
      <div
        className="relative w-full aspect-square bg-[#2D2D2D] overflow-hidden flex justify-center items-center cursor-pointer"
        onClick={() => setIsModalOpen(true)}
      >
        <img
          src={images[currentIndex]}
          alt={`Jewelry model ${currentIndex + 1}`}
          className="w-full h-full object-cover transition-transform duration-500 opacity-80"
        />

        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
          {images.map((_, idx) => (
            <button
              key={idx}
              onClick={(e) => {
                e.stopPropagation();
                setCurrentIndex(idx);
              }}
              className={`w-3 h-3 rounded-full ${
                currentIndex === idx ? "bg-gray-500" : "bg-gray-300"
              } cursor-pointer`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {isModalOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-80 flex justify-center items-center z-50"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="relative max-w-4xl max-h-[90vh] p-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="fixed top-4 right-4 text-white cursor-pointer z-60"
              onClick={() => setIsModalOpen(false)}
              aria-label="Close modal"
            >
              <X className="w-7 h-7" />
            </button>

            <img
              src={images[currentIndex]}
              alt={`Jewelry model large ${currentIndex + 1}`}
              className="max-w-full max-h-[80vh] object-contain"
            />
          </div>
        </div>
      )}
    </>
  );
};

const TwoCarouselsSideBySide: React.FC = () => {
  return (
    <div className="flex w-full bg-[#2D2D2D]">
      <div className="w-1/2 p-2">
        <JewelryShowcase images={images1} />
      </div>
      <div className="w-1/2 p-2">
        <JewelryShowcase images={images2} />
      </div>
    </div>
  );
};

export default TwoCarouselsSideBySide;
