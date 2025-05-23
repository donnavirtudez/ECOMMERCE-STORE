import { Star, StarOff } from "lucide-react";

const reviewsData = [
  {
    id: 1,
    name: "Rubyjane K.",
    rating: 5,
    comment:
      "Bhen Jewelry has beautiful and unique designs that really stand out. Shipping was fast, and the packaging was lovely!",
  },
  {
    id: 2,
    name: "Roseanne P.",
    rating: 4.5,
    comment:
      "The craftsmanship is amazing, and their customer service is very helpful. Definitely worth buying from them again.",
  },
  {
    id: 3,
    name: "Lalisa M.",
    rating: 5,
    comment:
      "The jewelry from Bhen is elegant and durable — I wear mine all the time without any issues. Highly recommend!",
  },
  {
    id: 4,
    name: "Jisoo K.",
    rating: 4,
    comment:
      "The quality exceeded my expectations, and the delivery was prompt. I’m already planning to buy more!",
  },
];

const HalfStar = ({ size = 20, color = "currentColor" }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 24 24"
    fill="none"
    stroke={color}
    strokeWidth="1.5"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="inline-block"
  >
    <defs>
      <linearGradient id="halfGradient">
        <stop offset="50%" stopColor={color} />
        <stop offset="50%" stopColor="transparent" />
      </linearGradient>
    </defs>
    <path
      fill="url(#halfGradient)"
      stroke="none"
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
    />
    <path
      d="M12 2l3.09 6.26L22 9.27l-5 4.87L18.18 22 12 18.56 5.82 22 7 14.14 2 9.27l6.91-1.01L12 2z"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Stars = ({ rating }: { rating: number }) => {
  return (
    <div className="flex space-x-1 text-gray-600">
      {[...Array(5)].map((_, i) => {
        const starIndex = i + 1;
        if (starIndex <= Math.floor(rating)) {
          return (
            <Star
              key={i}
              size={20}
              stroke="none"
              fill="currentColor"
              className="text-gray-700"
            />
          );
        } else if (starIndex === Math.ceil(rating) && rating % 1 !== 0) {
          return <HalfStar key={i} size={20} color="#4B5563" />;
        } else {
          return <StarOff key={i} size={20} stroke="#9CA3AF" />;
        }
      })}
    </div>
  );
};

const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

const Reviews = () => {
  return (
    <section className="max-w-7xl mx-auto font-sans my-10 px-6 text-gray-900 bg-white">
      <h2 className="text-4xl font-bold text-center mb-5 tracking-wide">
        Customer Reviews
      </h2>

      <div className="grid gap-10 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {reviewsData.map(({ id, name, rating, comment }) => (
          <article
            key={id}
            className="bg-white rounded-2xl shadow-lg p-8 relative"
          >
            <div className="absolute top-6 left-6 text-gray-400 text-7xl select-none">
              “
            </div>

            <div className="flex items-center mb-6 space-x-4">
              <div className="w-14 h-14 rounded-full bg-gray-300 flex items-center justify-center text-gray-700 font-bold text-xl select-none">
                {getInitials(name)}
              </div>
              <div>
                <p className="font-semibold text-lg text-gray-900">{name}</p>
                <Stars rating={rating} />
              </div>
            </div>

            <p className="text-gray-700 text-base text-justify leading-relaxed relative z-10">
              {comment}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
};

export default Reviews;
