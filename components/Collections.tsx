import { getCollections } from "@/lib/actions/actions";
import PaginatedCollections from "../components/PaginatedCollections";

const Collections = async () => {
  const collections = await getCollections();

  return (
    <section className="max-w-7xl font-sans mx-auto my-10 px-6 text-gray-900 bg-white">
      <h2 className="text-4xl font-bold text-center mb-5 tracking-wide">
        Collections
      </h2>
      <PaginatedCollections collections={collections || []} />
    </section>
  );
};

export default Collections;
