"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const TermsConditions = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData: FAQ[] = [
    {
      question: "Acceptance of Terms",
      answer:
        "By accessing and using Bhen Jewelry's services, you agree to be bound by these Terms and Conditions.",
    },
    {
      question: "Use of Services",
      answer:
        "You agree to use Bhen Jewelry's services only for lawful purposes and in accordance with these Terms and Conditions.",
    },
    {
      question: "Intellectual Property",
      answer:
        "All content and materials available on Bhen Jewelry's services are the property of Bhen Jewelry and are protected by applicable intellectual property laws.",
    },
    {
      question: "Limitation of Liability",
      answer:
        "Bhen Jewelry shall not be liable for any indirect, incidental, special, consequential or punitive damages resulting from your use of our services.",
    },
    {
      question: "Governing Law",
      answer:
        "These Terms and Conditions shall be governed by and construed in accordance with the laws of the jurisdiction in which Bhen Jewelry operates.",
    },
    {
      question: "Changes to Terms",
      answer:
        "We reserve the right to modify these terms at any time. Any changes will be posted on this page, and your continued use of the services signifies your acceptance of the updated terms of Bhen Jewelry.",
    },
  ];

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">
            Terms & Conditions
          </h2>
          <p className="mt-4 text-gray-600 text-lg">
            Read these carefully before using our services.
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

export default TermsConditions;
