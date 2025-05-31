"use client";

import Loader from "@/components/Loader";
import ProductCard from "@/components/ProductCard";
import { getProductDetails } from "@/lib/actions/actions";
import { useUser } from "@clerk/nextjs";
import { useEffect, useState } from "react";

const Wishlist = () => {
  const { user } = useUser();

  const [loading, setLoading] = useState(true);
  const [signedInUser, setSignedInUser] = useState<UserType | null>(null);
  const [wishlist, setWishlist] = useState<ProductType[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 8;

  const getUser = async () => {
    try {
      const res = await fetch("/api/users");
      const data = await res.json();
      setSignedInUser(data);
      setLoading(false);
    } catch (err) {
      console.log("[users_GET]", err);
    }
  };

  useEffect(() => {
    if (user) {
      getUser();
    }
  }, [user]);

  const getWishlistProducts = async () => {
    setLoading(true);

    if (!signedInUser) return;

    const wishlistProducts = await Promise.all(
      signedInUser.wishlist.map(async (productId) => {
        const res = await getProductDetails(productId);
        return res;
      })
    );

    setWishlist(wishlistProducts);
    setLoading(false);
  };

  useEffect(() => {
    if (signedInUser) {
      getWishlistProducts();
    }
  }, [signedInUser]);

  const updateSignedInUser = (updatedUser: UserType) => {
    setSignedInUser(updatedUser);
  };

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = wishlist.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(wishlist.length / itemsPerPage);

  return loading ? (
    <Loader />
  ) : (
    <div className="flex flex-col min-h-screen bg-white text-gray-800 overflow-x-hidden">
      <div className="flex-grow max-w-6xl mx-auto p-4 sm:p-6 md:p-8">
        <h1 className="text-xl font-semibold mb-4 text-center">Wishlist</h1>
        <hr className="mb-4 border-gray-200" />

        {wishlist.length === 0 ? (
          <p className="text-center text-gray-500 text-base py-10">
            No items in your wishlist
          </p>
        ) : (
          <>
            <div className="flex flex-wrap gap-5 mx-auto justify-center">
              {currentItems.map((product) => (
                <ProductCard
                  key={product._id}
                  product={product}
                  updateSignedInUser={updateSignedInUser}
                />
              ))}
            </div>

            <div className="flex justify-center mt-8 space-x-2">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentPage(i + 1)}
                  className={`px-3 py-1 border rounded transition-colors duration-200 ${
                    currentPage === i + 1
                      ? "bg-black text-white"
                      : "bg-white text-gray-800 hover:bg-gray-100"
                  } cursor-pointer`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export const dynamic = "force-dynamic";

export default Wishlist;
