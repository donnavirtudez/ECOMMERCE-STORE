"use client";

import React, { useRef, useEffect, useState } from "react";

const jewelryItems = [
  {
    id: 1,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/1.png",
    price: 499.0,
  },
  {
    id: 2,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/2.png",
    price: 299.99,
  },
  {
    id: 3,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/14.png",
    price: 399.5,
  },
  {
    id: 4,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/53.png",
    price: 199.99,
  },
  {
    id: 5,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/59.png",
    price: 349.99,
  },
  {
    id: 6,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/62.png",
    price: 999.99,
  },
  {
    id: 7,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/21.png",
    price: 1100.0,
  },
  {
    id: 8,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/52.png",
    price: 1150.0,
  },
  {
    id: 9,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/73.png",
    price: 1200.0,
  },
  {
    id: 10,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/37.png",
    price: 1200.0,
  },
  {
    id: 11,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/13.png",
    price: 1200.0,
  },
  {
    id: 12,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/12.png",
    price: 1200.0,
  },
  {
    id: 13,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/25.png",
    price: 1200.0,
  },
  {
    id: 14,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/41.png",
    price: 1200.0,
  },
  {
    id: 15,
    name: "Bhen Jewelry",
    image: "../assets/jewelries/23.png",
    price: 1200.0,
  },
];

const gap = 24;
const cardWidthPx = 192;
const cardWidthPlusGap = cardWidthPx + gap;
const totalItems = jewelryItems.length;
const totalWidth = totalItems * cardWidthPlusGap;

const scrollSpeed = 3.5;

const TopSeller: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollPos = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let animationFrameId: number;

    const step = () => {
      if (!isHovered) {
        scrollPos.current += scrollSpeed;
        if (scrollPos.current >= totalWidth) {
          scrollPos.current = 0;
        }
        container.scrollLeft = scrollPos.current;
      }

      animationFrameId = requestAnimationFrame(step);
    };

    animationFrameId = requestAnimationFrame(step);

    return () => cancelAnimationFrame(animationFrameId);
  }, [isHovered]);

  return (
    <section className="bg-[#2d2d2d] py-12 px-6 overflow-hidden select-none">
      <h2 className="text-4xl font-sans text-gray-200 font-bold text-center tracking-wide">
        Top Picks
      </h2>
      <p className="text-center text-gray-200 mb-5 max-w-xl mx-auto text-base leading-relaxed">
        Discover our signature collection — timeless elegance.
      </p>

      <div
        ref={containerRef}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        className="relative overflow-hidden whitespace-nowrap cursor-pointer"
        style={{
          userSelect: "none",
          height: "17rem",
        }}
      >
        {[...jewelryItems, ...jewelryItems].map((item, index) => (
          <div
            key={`${item.id}-${index}`}
            className="inline-block w-48 mr-6 bg-[#1f1f1f] rounded-lg text-white relative overflow-hidden transition-all duration-300 hover:before:absolute hover:before:bottom-0 hover:before:left-0 hover:before:w-full hover:before:h-1 hover:before:bg-gray-200 hover:before:content-['']"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-48 object-cover rounded-t-lg"
              loading="lazy"
            />
            <div className="p-3 text-center">
              <p className="font-medium text-gray-200">{item.name}</p>
              <p className="text-sm text-gray-400">₱{item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TopSeller;
