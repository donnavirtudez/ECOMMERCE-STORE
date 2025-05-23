"use client";

import useCart from "@/lib/hooks/useCart";
import { UserButton, useUser } from "@clerk/nextjs";
import { CircleUserRound, Menu, Search, ShoppingCart } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { user } = useUser();
  const cart = useCart();

  const navbarRef = useRef<HTMLDivElement>(null);
  const [dropdownMenu, setDropdownMenu] = useState(false);
  const [query, setQuery] = useState("");
  const [isSticky, setIsSticky] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!navbarRef.current) return;

      if (window.scrollY > navbarRef.current.offsetTop) {
        setIsSticky(true);
      } else {
        setIsSticky(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div
      ref={navbarRef}
      className={`${
        isSticky ? "fixed top-0 left-0 right-0 z-50" : "relative"
      } bg-[#F0F0F0] py-2 px-10 flex gap-2 justify-between items-center max-sm:px-2`}
    >
      <Link href="/">
        <Image src="/BJ.png" alt="logo" width={150} height={70} />
      </Link>

      <div className="flex gap-15 text-m max-lg:hidden">
        <Link
          href="/"
          className={`hover:text-[#4E71FF] ${
            pathname === "/" ? "text-[#4E71FF]" : ""
          }`}
        >
          Home
        </Link>
        <Link
          href={user ? "/wishlist" : "/sign-in"}
          className={`hover:text-[#4E71FF] ${
            pathname === "/wishlist" ? "text-[#4E71FF]" : ""
          }`}
        >
          Wishlist
        </Link>
        <Link
          href={user ? "/orders" : "/sign-in"}
          className={`hover:text-[#4E71FF] ${
            pathname === "/orders" ? "text-[#4E71FF]" : ""
          }`}
        >
          Orders
        </Link>
      </div>

      <div className="flex gap-3 border border-gray-300 px-3 py-1 items-center rounded focus-within:outline-none focus-within:ring-2 focus-within:ring-[#616161]">
        <input
          className="outline-none max-sm:max-w-[120px]"
          placeholder="Search..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter" && query.trim() !== "") {
              router.push(`/search/${query.trim()}`);
            }
          }}
        />
        <button
          disabled={query.trim() === ""}
          onClick={() => router.push(`/search/${query.trim()}`)}
        >
          <Search className="cursor-pointer h-4 w-4 hover:text-[#4E71FF] text-gray-800" />
        </button>
      </div>

      <div className="relative flex gap-3 items-center">
        <Link
          href="/cart"
          className={`border-gray-300 flex items-center gap-1 rounded px-2 py-1 max-md:hidden group hover:text-[#4E71FF] ${
            pathname === "/cart" ? "text-[#4E71FF]" : ""
          }`}
        >
          <ShoppingCart className="text-gray-800 group-hover:text-[#4E71FF]" />
          <p className="text-m group-hover:text-[#4E71FF]">
            ({cart.cartItems.length})
          </p>
        </Link>

        <Menu
          className="cursor-pointer hover:text-[#4E71FF] lg:hidden"
          onClick={() => setDropdownMenu(!dropdownMenu)}
        />

        {dropdownMenu && (
          <div className="absolute top-10 right-5 flex flex-col gap-3 p-3 rounded bg-[#FFFFFF] shadow-xl text-m lg:hidden">
            <Link
              href="/"
              className={`hover:text-[#4E71FF] text-center w-full ${
                pathname === "/" ? "text-[#4E71FF]" : ""
              }`}
            >
              Home
            </Link>
            <Link
              href={user ? "/wishlist" : "/sign-in"}
              className={`hover:text-[#4E71FF] text-center w-full ${
                pathname === "/wishlist" ? "text-[#4E71FF]" : ""
              }`}
            >
              Wishlist
            </Link>
            <Link
              href={user ? "/orders" : "/sign-in"}
              className={`hover:text-[#4E71FF] text-center w-full ${
                pathname === "/orders" ? "text-[#4E71FF]" : ""
              }`}
            >
              Orders
            </Link>
            <Link
              href="/cart"
              className={`flex items-center gap-1 rounded px-2 py-1 group text-center w-full hover:text-[#4E71FF] ${
                pathname === "/cart" ? "text-[#4E71FF]" : ""
              }`}
            >
              <ShoppingCart className="text-gray-800 group-hover:text-[#4E71FF]" />
              <p className="text-m group-hover:text-[#4E71FF]">
                ({cart.cartItems.length})
              </p>
            </Link>
          </div>
        )}

        {user ? (
          <UserButton afterSignOutUrl="/sign-in" />
        ) : (
          <Link href="/sign-in">
            <CircleUserRound className="text-gray-800 hover:text-[#4E71FF]" />
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
