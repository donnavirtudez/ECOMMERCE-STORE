import SearchResult from "@/components/SearchResult";
import { getSearchedProducts, getCollections } from "@/lib/actions/actions";

interface SearchPageProps {
  params: { query: string };
}

const SearchPage = async ({ params }: SearchPageProps) => {
  const decodedQuery = decodeURIComponent(params.query);

  const [searchedProducts, collections] = await Promise.all([
    getSearchedProducts(decodedQuery),
    getCollections(),
  ]);

  return (
    <SearchResult
      initialProducts={searchedProducts}
      query={decodedQuery}
      collections={collections}
    />
  );
};

export const dynamic = "force-dynamic";

export default SearchPage;
