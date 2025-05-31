"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

interface ProductType {
  _id: string;
  title: string;
  description: string;
  media: string[];
  category: string;
  collections: string[];
  tags: string[];
  price: number;
  cost: number;
  sizes: string[];
  colors: string[];
  createdAt: string;
  updatedAt: string;
}

interface CollectionType {
  _id: string;
  title: string;
  products: number;
  image: string;
}

const sortOptions = [
  { value: "relevance", label: "Sort by Relevance" },
  { value: "priceLow", label: "Price: Low to High" },
  { value: "priceHigh", label: "Price: High to Low" },
  { value: "alphaAsc", label: "Alphabetical: A to Z" },
  { value: "alphaDesc", label: "Alphabetical: Z to A" },
];

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

export default function SearchResult({
  initialProducts,
  query,
  collections,
}: {
  initialProducts: ProductType[];
  query: string;
  collections: CollectionType[];
}) {
  const uniqueCategories = Array.from(
    new Set(initialProducts.map((p) => p.category).filter(Boolean))
  );

  const categories = ["All", ...uniqueCategories];

  const [selectedCategories, setSelectedCategories] = useState<string[]>([
    "All",
  ]);

  const [mobileSelectedCategory, setMobileSelectedCategory] = useState("All");

  const [sort, setSort] = useState("relevance");

  const handleCategoryChange = (category: string) => {
    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories((prev) => {
        const withoutAll = prev.filter((cat) => cat !== "All");
        if (prev.includes(category)) {
          const filtered = withoutAll.filter((cat) => cat !== category);
          return filtered.length === 0 ? ["All"] : filtered;
        } else {
          return [...withoutAll, category];
        }
      });
    }
  };

  const handleMobileCategoryChange = (category: string) => {
    setMobileSelectedCategory(category);

    if (category === "All") {
      setSelectedCategories(["All"]);
    } else {
      setSelectedCategories([category]);
    }
  };

  const isAllSelected = selectedCategories.includes("All");
  const filteredDesktopProducts = isAllSelected
    ? initialProducts
    : initialProducts.filter((p) => selectedCategories.includes(p.category));

  const filteredMobileProducts =
    mobileSelectedCategory === "All"
      ? initialProducts
      : initialProducts.filter((p) => p.category === mobileSelectedCategory);

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 1024);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const filteredProducts = isMobile
    ? filteredMobileProducts
    : filteredDesktopProducts;

  const sortedProducts = [...filteredProducts].sort((a, b) => {
    if (sort === "priceLow") return a.price - b.price;
    if (sort === "priceHigh") return b.price - a.price;
    if (sort === "alphaAsc")
      return a.title.localeCompare(b.title, undefined, { sensitivity: "base" });
    if (sort === "alphaDesc")
      return b.title.localeCompare(a.title, undefined, { sensitivity: "base" });
    return 0;
  });

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
                className="flex items-center space-x-2 text-lg text-gray-700 cursor-pointer"
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
              Search Results for <span>"{query}"</span>
            </h2>

            <div className="flex items-center gap-4 flex-wrap">
              <div className="block lg:hidden">
                <CustomSelect
                  options={categories.map((c) => ({
                    value: c,
                    label: c,
                  }))}
                  selected={mobileSelectedCategory}
                  onChange={handleMobileCategoryChange}
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
            {sortedProducts.map(({ _id, title, price, media }) => (
              <article
                key={_id}
                className="shadow-lg bg-[#F0F0F0] cursor-pointer group relative flex flex-col rounded-lg border border-gray-200 overflow-hidden shadow-sm transition-transform hover:-translate-y-1"
              >
                <img
                  src={media[0]}
                  alt={title}
                  loading="lazy"
                  className="w-full h-55 object-cover rounded-t-lg"
                />
                <div className="p-4 flex flex-col flex-grow">
                  <h3 className="text-lg font-medium truncate">{title}</h3>
                  <p className="mt-1 text-base font-semibold">
                    ₱{price.toFixed(2)}
                  </p>
                </div>
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
