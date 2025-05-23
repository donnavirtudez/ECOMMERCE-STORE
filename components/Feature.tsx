import { ThumbsUp, Star, CreditCard } from "lucide-react";

const Feature = () => {
  return (
    <div className="bg-[#2D2D2D] p-12">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 text-center">
          <div className="rounded-xl p-6 flex items-center bg-[#373737] shadow-md">
            <ThumbsUp className="w-12 h-12 text-gray-200" />
            <div className="ml-4 sm:ml-6 text-left">
              <h3 className="text-xl text-gray-200 font-semibold mb-2">
                Affordable
              </h3>
              <p className="text-gray-300">
                We offer high-quality products at the best prices.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 flex items-center bg-[#373737] shadow-md">
            <Star className="w-12 h-12 text-gray-200" />
            <div className="ml-4 sm:ml-6 text-left">
              <h3 className="text-xl text-gray-200 font-semibold mb-2">
                Excellent Online Service
              </h3>
              <p className="text-gray-300">
                We provide top-notch service with quick delivery.
              </p>
            </div>
          </div>

          <div className="rounded-xl p-6 flex items-center bg-[#373737] shadow-md">
            <CreditCard className="w-12 h-12 text-gray-200" />
            <div className="ml-4 sm:ml-6 text-left">
              <h3 className="text-xl text-gray-200 font-semibold mb-2">
                Flexible Payment
              </h3>
              <p className="text-gray-300">
                Enjoy various payment options that work for you.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Feature;
