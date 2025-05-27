import { getProducts } from "@/lib/actions/actions";
import PaginatedProductList from "../components/PaginatedProductList";

const ProductList = async () => {
  const products = await getProducts();

  return (
    <section className="bg-[#2d2d2d] py-12 px-6 overflow-hidden select-none">
      <h2 className="text-4xl font-sans text-gray-200 font-bold text-center tracking-wide">
        Products
      </h2>
      <PaginatedProductList products={products || []} />
    </section>
  );
};

export default ProductList;
