import { getCollections } from "@/lib/actions/actions";

type CollectionType = {
  _id: string;
  title: string;
  image: string;
  description?: string;
};

const Collections = async () => {
  const collections: CollectionType[] = await getCollections();

  console.log("Fetched Collections:", collections);

  return (
    <section className="max-w-7xl font-sans mx-auto my-10 px-6 text-gray-900 bg-white">
      <h2 className="text-4xl font-bold text-center mb-5 tracking-wide">
        Collections
      </h2>

      {!collections || collections.length === 0 ? (
        <p className="text-bold text-center text-gray-900 mt-5">
          No products found
        </p>
      ) : (
        <div className="flex flex-wrap justify-center gap-4 w-full max-w-6xl mx-auto">
          {collections.map(({ _id, title, image }) => (
            <a
              href={`/collections/${_id}`}
              key={_id}
              className="
                relative 
                group 
                cursor-pointer 
                rounded-lg 
                overflow-hidden 

                w-[calc(50%-1rem)]     
                sm:w-[250px]           
              "
            >
              <img
                src={image}
                alt={title}
                className="w-full h-72 object-cover transition-transform duration-300 group-hover:scale-105"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-center items-center text-center px-4">
                <h3 className="text-gray-200 text-xl font-semibold mb-0">
                  {title}
                </h3>
              </div>
            </a>
          ))}
        </div>
      )}
    </section>
  );
};

export default Collections;
