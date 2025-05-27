"use client";

import { useState } from "react";
import ProductCard from "../components/ProductCard";

const PaginatedProductList = ({ products }: { products: ProductType[] }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const PRODUCTS_PER_PAGE = 8;

  const totalPages = Math.ceil(products.length / PRODUCTS_PER_PAGE);
  const startIndex = currentPage * PRODUCTS_PER_PAGE;
  const visibleProducts = products.slice(
    startIndex,
    startIndex + PRODUCTS_PER_PAGE
  );

  return (
    <>
      {products.length === 0 ? (
        <p className="text-bold text-center text-gray-200 mt-5">
          No products found
        </p>
      ) : (
        <>
          <div className="flex flex-wrap justify-center gap-5 mt-5">
            {visibleProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
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
      )}
    </>
  );
};

export default PaginatedProductList;
