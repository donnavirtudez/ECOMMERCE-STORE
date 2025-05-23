"use client";

import { useState } from "react";

interface FAQ {
  question: string;
  answer: string;
}

const PrivacyPolicy = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const toggleAnswer = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  const faqData: FAQ[] = [
    {
      question: "Information Collection",
      answer:
        "We collect the personal details you provide, such as your name, email address, and contact information. We also gather some data automatically, including how you use our services and information about your device.",
    },
    {
      question: "Use of Information",
      answer:
        "We use your information to operate and improve our services, personalize your experience, and communicate important updates or permitted marketing messages.",
    },
    {
      question: "Information Sharing",
      answer:
        "We do not sell or rent your personal information. We may share it with trusted partners when necessary to deliver our services, comply with legal obligations, or when you give us permission.",
    },
    {
      question: "Data Security",
      answer:
        "We take appropriate security measures to protect your personal information from unauthorized access, loss, misuse, or disclosure.",
    },
    {
      question: "Your Rights",
      answer:
        "You have the right to access, correct, or delete your personal information. You may also request that we stop or limit how we use it. Please contact us to exercise these rights or if you need assistance.",
    },
    {
      question: "Changes to This Policy",
      answer:
        "We may update this Privacy Policy from time to time to reflect changes in our practices or legal requirements. Please review this page periodically to stay informed.",
    },
  ];

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Privacy Policy</h2>
          <p className="mt-4 text-gray-600 text-lg">
            This policy explains how we handle your data.
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

export default PrivacyPolicy;
