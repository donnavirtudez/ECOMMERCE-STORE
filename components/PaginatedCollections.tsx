"use client";

import { useState } from "react";

type CollectionType = {
  _id: string;
  title: string;
  image: string;
  description?: string;
};

const PaginatedCollections = ({
  collections,
}: {
  collections: CollectionType[];
}) => {
  const [currentPage, setCurrentPage] = useState(0);
  const COLLECTIONS_PER_PAGE = 8;

  const totalPages = Math.ceil(collections.length / COLLECTIONS_PER_PAGE);
  const startIndex = currentPage * COLLECTIONS_PER_PAGE;
  const visibleCollections = collections.slice(
    startIndex,
    startIndex + COLLECTIONS_PER_PAGE
  );

  if (!collections || collections.length === 0) {
    return (
      <p className="font-bold text-center text-gray-900 mt-5">
        No collections found
      </p>
    );
  }

  return (
    <>
      <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl mx-auto">
        {visibleCollections.map(({ _id, title, image }) => (
          <a
            href={`/collections/${_id}`}
            key={_id}
            className="
              relative 
              group 
              cursor-pointer 
              rounded-lg 
              overflow-hidden 
              w-[calc(50%-1rem)]     
              sm:w-[250px]
            "
          >
            <img
              src={image}
              alt={title}
              className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4">
              <h3 className="text-gray-200 text-xl font-semibold mb-0">
                {title}
              </h3>
            </div>
          </a>
        ))}
      </div>

      <div className="flex justify-center mt-8 space-x-3">
        {Array.from({ length: totalPages }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index)}
            className={`w-3 h-3 rounded-full ${
              index === currentPage ? "bg-gray-500" : "bg-gray-300"
            } transition-colors cursor-pointer`}
            aria-label={`Go to page ${index + 1}`}
          />
        ))}
      </div>
    </>
  );
};

export default PaginatedCollections;
