"use client";

import Image from "next/image";
import Link from "next/link";
import HeartFavorite from "./HeartFavorite";

interface ProductCardProps {
  product: ProductType;
  updateSignedInUser?: (updatedUser: UserType) => void;
}

const ProductCard = ({ product, updateSignedInUser }: ProductCardProps) => {
  return (
    <Link
      href={`/products/${product._id}`}
      className="w-[250px] flex flex-col gap-2 rounded-lg mt-5 bg-white p-4 shadow-lg"
    >
      <Image
        src={product.media[0]}
        alt="product"
        width={250}
        height={300}
        className="h-[250px] rounded-lg object-cover"
      />
      <div>
        <p className="font-medium text-gray-800">{product.title}</p>
        <p className="text-md text-gray-600">{product.category}</p>
      </div>
      <div className="flex justify-between items-center">
        <p className="text-md text-gray-700">₱{product.price.toFixed(2)}</p>
        <HeartFavorite
          product={product}
          updateSignedInUser={updateSignedInUser}
        />
      </div>
    </Link>
  );
};

export default ProductCard;
