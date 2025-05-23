"use client";

import { useState } from "react";

const AboutUs = () => {
  const images = [
    "https://i.pinimg.com/736x/18/f0/06/18f006f607fb5b04d211e8fd78e535dd.jpg",
    "https://i.pinimg.com/736x/1e/30/ae/1e30ae90cfbede32b6de26e52dc30e9a.jpg",
    "https://i.pinimg.com/736x/50/79/3c/50793c0b16e451d5beb310a54634bde0.jpg",
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">
            About Bhen Jewelry
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Crafted with passion, worn with pride.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          <div className="space-y-6">
            <p className="text-gray-700 text-base leading-relaxed text-justify">
              Bhen Jewelry is a passion-driven brand committed to crafting
              timeless, high-quality pieces that reflect elegance and
              individuality. Founded with the vision of making luxury
              accessible, we carefully select materials that ensure both beauty
              and durability.
            </p>
            <p className="text-gray-700 text-base leading-relaxed text-justify">
              Our collection ranges from everyday classics to stunning statement
              pieces — all designed to celebrate your uniqueness. Each piece
              tells a story, and we are honored to be a part of yours.
            </p>
            <p className="text-gray-700 text-base leading-relaxed text-justify">
              As a proudly local business, we value our community and
              continuously strive to deliver jewelry that not only enhances your
              style but also stands the test of time.
            </p>
            <p className="text-gray-700 text-base leading-relaxed text-justify">
              We are passionate about sustainable practices and strive to make
              choices that benefit both the planet and the people we serve. Our
              commitment to sustainability is reflected in our carefully sourced
              materials and our efforts to minimize waste throughout the design
              and production process.
            </p>
            <p className="text-gray-700 text-base leading-relaxed text-justify">
              At Bhen Jewelry, we believe that jewelry is more than just an
              accessory — it is a way to express who you are. Whether you are
              looking for something that complements your daily life or a
              special piece for a milestone moment, we are here to help you find
              jewelry that speaks to you and your journey.
            </p>
          </div>

          <div className="relative flex justify-center items-center space-x-4">
            <div className="cursor-pointer overflow-hidden rounded-lg w-full max-w-md">
              <img
                src={images[currentIndex]}
                alt="Elegant jewelry"
                className="w-full h-[600px] rounded-lg shadow-lg transform transition-transform duration-500 hover:scale-125 hover:shadow-2xl"
              />
            </div>

            <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex ? "bg-gray-500" : "bg-gray-300"
                  } cursor-pointer`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
