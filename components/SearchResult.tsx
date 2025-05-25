"use client";

import { useState, useRef, useEffect } from "react";
import { ShoppingCart, Star, ChevronDown } from "lucide-react";

const products = [
  {
    id: 1,
    title: "Celestia Vine",
    price: 4500.99,
    image: "../assets/jewelries/2.png",
    category: "Necklace",
    rating: 4.5,
  },
  {
    id: 2,
    title: "Aurelia Wings",
    price: 1500.99,
    image: "../assets/jewelries/14.png",
    category: "Earrings",
    rating: 4.0,
  },
  {
    id: 3,
    title: "Silver Frost",
    price: 1900.99,
    image: "../assets/jewelries/25.png",
    category: "Ring",
    rating: 5,
  },
  {
    id: 4,
    title: "Memento Mori",
    price: 4500.99,
    image: "../assets/jewelries/52.png",
    category: "Necklace",
    rating: 4.5,
  },
  {
    id: 5,
    title: "Titan Aureus",
    price: 2500.99,
    image: "../assets/jewelries/73.png",
    category: "Bracelet",
    rating: 4.5,
  },
];

const categories = ["All", "Ring", "Necklace", "Earrings", "Bracelet"];

const sortOptions = [
  { value: "relevance", label: "Sort by Relevance" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
];

function renderStars(rating: number) {
  const stars = [];
  const fullStars = Math.floor(rating);
  const hasHalfStar = rating - fullStars >= 0.25 && rating - fullStars < 0.75;
  const emptyStars = 5 - fullStars - (hasHalfStar ? 1 : 0);

  for (let i = 0; i < fullStars; i++) {
    stars.push(
      <Star
        key={`full-${i}`}
        size={16}
        className="text-gray-900"
        strokeWidth={1.5}
        fill="currentColor"
      />
    );
  }

  if (hasHalfStar) {
    stars.push(
      <div key="half" className="relative w-4 h-4">
        <Star
          size={16}
          className="text-gray-400 absolute top-0 left-0"
          strokeWidth={1.5}
          fill="none"
        />
        <Star
          size={16}
          className="text-gray-900 absolute top-0 left-0"
          strokeWidth={1.5}
          fill="currentColor"
          style={{ clipPath: "inset(0 50% 0 0)" }}
        />
      </div>
    );
  }

  for (let i = 0; i < emptyStars; i++) {
    stars.push(
      <Star
        key={`empty-${i}`}
        size={16}
        className="text-gray-400"
        strokeWidth={1.5}
        fill="none"
      />
    );
  }

  return <div className="flex space-x-1">{stars}</div>;
}

function CustomSelect({
  options,
  selected,
  onChange,
}: {
  options: { value: string; label: string }[];
  selected: string;
  onChange: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedLabel =
    options.find((opt) => opt.value === selected)?.label || "Select";

  return (
    <div
      ref={ref}
      className="relative w-44 select-none"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Escape") setOpen(false);
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          setOpen(!open);
        }
      }}
    >
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className="cursor-pointer w-full bg-transparent border-b border-gray-300 py-1.5 px-2 flex items-center justify-between text-sm text-gray-700 focus:outline-none focus:border-gray-900 transition-colors duration-300 rounded-none"
      >
        <span className="cursor-pointer truncate">{selectedLabel}</span>
        <ChevronDown
          size={16}
          className={`cursor-pointer ml-2 text-gray-400 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          tabIndex={-1}
          className="absolute z-50 mt-1 max-h-52 w-full overflow-auto rounded-md bg-white border border-gray-300 shadow-lg focus:outline-none scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100"
        >
          {options.map(({ value, label }) => (
            <li
              key={value}
              role="option"
              aria-selected={selected === value}
              onClick={() => {
                onChange(value);
                setOpen(false);
              }}
              tabIndex={0}
              className={`cursor-pointer px-3 py-2 text-sm ${
                selected === value
                  ? "bg-gray-300 text-gray-900 font-semibold"
                  : "text-gray-700 hover:bg-gray-100"
              }`}
            >
              {label}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}

export default function SearchResult() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);
  const [sort, setSort] = useState("relevance");

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((cat) => cat !== "All");
        return prev.includes(category)
          ? withoutAll.filter((cat) => cat !== category)
          : [...withoutAll, category];
      });
    }
  };

  const isAllSelected = selectedCategories.includes("All");
  const filteredProducts = isAllSelected
    ? products
    : products.filter((p) => selectedCategories.includes(p.category));

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    return 0;
  });

  const handleAddToCart = (productId: number) => {
    alert(`Added product ${productId} to cart!`);
  };

  return (
    <div className="min-h-screen bg-white text-gray-900 max-w-7xl mx-auto px-4 py-10">
      <div className="flex flex-col lg:flex-row gap-8">
        <aside className="hidden lg:block lg:w-64 border-r border-gray-200 pr-6">
          <h2 className="text-xl text-gray-800 font-bold uppercase tracking-wide mb-4">
            Categories
          </h2>
          <div className="space-y-3">
            {categories.map((cat) => (
              <label
                key={cat}
                className="flex items-center space-x-2 text-lg text-gray-700"
              >
                <input
                  type="checkbox"
                  checked={selectedCategories.includes(cat)}
                  onChange={() => handleCategoryChange(cat)}
                  className="cursor-pointer h-4 w-4 text-gray-900 border-gray-300 rounded"
                />
                <span>{cat}</span>
              </label>
            ))}
          </div>
        </aside>

        <main className="flex-1 flex flex-col space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <h2 className="text-xl text-gray-800 font-bold uppercase tracking-wide">
              Search Results
            </h2>
            <div className="flex items-center gap-4 flex-wrap">
              <div className="block lg:hidden">
                <CustomSelect
                  options={categories.map((c) => ({
                    value: c,
                    label: c,
                  }))}
                  selected={selectedCategories[0]}
                  onChange={(val) => handleCategoryChange(val)}
                />
              </div>
              <CustomSelect
                options={sortOptions}
                selected={sort}
                onChange={setSort}
              />
            </div>
          </div>

          <section className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 justify-center">
            {sortedProducts.map(({ id, title, price, image, rating }) => (
              <article
                key={id}
                className="shadow-lg bg-[#F0F0F0] cursor-pointer group relative flex flex-col rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
              >
                <img
                  src={image}
                  alt={title}
                  loading="lazy"
                  className="w-full h-55 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium truncate">{title}</h3>
                  <div className="mt-1">{renderStars(rating)}</div>
                  <p className="mt-1 text-base font-semibold">
                    ₱{price.toFixed(2)}
                  </p>
                </div>
                <button
                  onClick={() => handleAddToCart(id)}
                  className="cursor-pointer absolute bottom-3 right-3 bg-gray-900 text-white rounded-full p-2 shadow focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-gray-900 hover:bg-[#4E71FF]"
                  aria-label="Add to cart"
                >
                  <ShoppingCart size={18} />
                </button>
              </article>
            ))}
          </section>

          <div className="text-center text-gray-900">
            Total Results: {sortedProducts.length}
          </div>
        </main>
      </div>
    </div>
  );
}
