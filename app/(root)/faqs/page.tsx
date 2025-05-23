"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const FAQs = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData: FAQ[] = [
    {
      question: "What is Bhen Jewelry?",
      answer:
        "Bhen Jewelry offers unique, high-quality, handmade jewelry pieces that combine elegance with timeless designs.",
    },
    {
      question: "What types of jewelry do you sell?",
      answer:
        "We offer a wide range of jewelry, including rings, necklaces, earrings, bracelets, and custom-made pieces.",
    },
    {
      question: "Are your materials ethically sourced?",
      answer:
        "Yes, we prioritize using ethically sourced materials, including conflict-free diamonds and sustainably sourced metals.",
    },
    {
      question: "Do you offer custom or personalized jewelry?",
      answer:
        "Absolutely! We offer custom design services. Contact us to create a unique piece tailored to your style and preferences.",
    },
    {
      question: "How do I determine my correct size?",
      answer:
        "You can search for size charts online or visit a local jeweler for a professional measurement.",
    },
    {
      question: "How do I care for my jewelry?",
      answer:
        "Store jewelry in a dry place, away from sunlight and moisture. Use a soft cloth for cleaning and avoid chemicals or abrasive materials.",
    },
    {
      question: "Is your packaging eco-friendly?",
      answer:
        "Yes, we use recyclable and sustainable packaging to minimize environmental impact.",
    },
    {
      question: "Will I receive a certificate of authenticity?",
      answer:
        "Yes, all fine jewelry purchases include a certificate of authenticity and material details.",
    },
  ];

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Answers to common questions about our service.
          </p>
        </div>
        <div className="space-y-6">
          {faqData.map((faq, index: number) => (
            <div key={index} className="border-b border-gray-300 pb-4">
              <div
                className="flex items-center cursor-pointer text-lg font-medium text-gray-700 hover:text-[#4E71FF]"
                onClick={() => toggleAnswer(index)}
              >
                <span
                  className={`transform transition-transform duration-300 mr-4 text-lg ${
                    activeIndex === index ? "rotate-45" : ""
                  }`}
                >
                  +
                </span>
                {faq.question}
              </div>
              {activeIndex === index && (
                <div className="mt-2 text-gray-500 text-base text-justify">
                  {faq.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FAQs;
