"use client";

import { useState } from "react";
import HeartFavorite from "./HeartFavorite";
import { MinusCircle, PlusCircle } from "lucide-react";

import useCart from "@/lib/hooks/useCart";

const ProductInfo = ({ productInfo }: { productInfo: ProductType }) => {
  const [selectedColor, setSelectedColor] = useState<string>(
    productInfo.colors[0]
  );
  const [selectedSize, setSelectedSize] = useState<string>(
    productInfo.sizes[0]
  );
  const [quantity, setQuantity] = useState<number>(1);

  const cart = useCart();

  return (
    <div className="max-w-[400px] flex flex-col gap-4">
      <div className="flex justify-between items-center">
        <p className="text-lg font-bold">{productInfo.title}</p>
        <HeartFavorite product={productInfo} />
      </div>

      <div className="flex gap-2">
        <p className="text-base-medium font-bold text-grey-2">Category:</p>
        <p className="text-base-bold text-gray-700">{productInfo.category}</p>
      </div>

      <p className="text-heading3-bold text-gray-700">₱{productInfo.price}</p>

      <div className="flex flex-col gap-2">
        <p className="text-base-medium font-bold text-grey-2">Description:</p>
        <p className="text-small-medium text-justify text-gray-700">
          {productInfo.description}
        </p>
      </div>

      {productInfo.colors.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2 font-bold">Colors:</p>
          <div className="flex gap-2">
            {productInfo.colors.map((color, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedColor === color && "bg-black text-white"
                }`}
                onClick={() => setSelectedColor(color)}
              >
                {color}
              </p>
            ))}
          </div>
        </div>
      )}

      {productInfo.sizes.length > 0 && (
        <div className="flex flex-col gap-2">
          <p className="text-base-medium text-grey-2 font-bold">Sizes:</p>
          <div className="flex gap-2">
            {productInfo.sizes.map((size, index) => (
              <p
                key={index}
                className={`border border-black px-2 py-1 rounded-lg cursor-pointer ${
                  selectedSize === size && "bg-black text-white"
                }`}
                onClick={() => setSelectedSize(size)}
              >
                {size}
              </p>
            ))}
          </div>
        </div>
      )}

      <div className="flex flex-col gap-2">
        <p className="text-base-medium text-grey-2 font-bold">Quantity:</p>
        <div className="flex gap-4 items-center">
          <MinusCircle
            className="text-gray-700 hover:text-black cursor-pointer"
            onClick={() => quantity > 1 && setQuantity(quantity - 1)}
          />
          <p className="text-base-bold text-gray-700">{quantity}</p>
          <PlusCircle
            className="text-gray-700 hover:text-black cursor-pointer"
            onClick={() => setQuantity(quantity + 1)}
          />
        </div>
      </div>

      <button
        className="cursor-pointer text-gray-700 outline text-base-bold py-3 rounded-lg hover:bg-black hover:text-white"
        onClick={() => {
          cart.addItem({
            item: productInfo,
            quantity,
            color: selectedColor,
            size: selectedSize,
          });
        }}
      >
        Add To Cart
      </button>
    </div>
  );
};

export default ProductInfo;
