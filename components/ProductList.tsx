import { getProducts } from "@/lib/actions/actions";
import ProductCard from "./ProductCard";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <section className="bg-[#2d2d2d] py-12 px-6 overflow-hidden select-none">
      <h2 className="text-4xl font-sans text-gray-200 font-bold text-center tracking-wide">
        Products
      </h2>
      {!products || products.length === 0 ? (
        <p className="text-bold text-center text-gray-200 mt-5">
          No products found
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-5">
          {products.map((product: ProductType) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </section>
  );
};

export default ProductList;
