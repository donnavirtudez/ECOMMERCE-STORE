"use client";

import { useState } from "react";
import { Mail } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const Footer = () => {
  const pathname = usePathname();
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearForm = () => {
    setEmail("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email) {
      toast.error("Please fill in the field.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const serviceID = "service_r93wo3u";
    const templateID = "template_c0459mr";
    const publicKey = "nG3hySnt5t0YAQ1Ef";

    const templateParams = {
      email,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success("Subscribed successfully!");
    } catch (error) {
      console.error("FAILED", error);
      toast.error("Subscription failed.");
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return (
    <footer className="bg-[#F0F0F0] text-gray-700">
      <div className="max-w-7xl mx-auto px-6 py-6 grid grid-cols-1 md:grid-cols-4 gap-10">
        <div>
          <h2 className="text-2xl font-bold text-black">Bhen Jewelry</h2>
          <p className="text-m leading-relaxed text-justify">
            Handcrafted jewelry that celebrates elegance, individuality, and
            timeless beauty.
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black">Company</h3>
          <ul className="space-y-2 text-m">
            <li>
              <Link
                href="/about"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/about" ? "text-[#4E71FF]" : ""
                }`}
              >
                About Us
              </Link>
            </li>
            <li>
              <Link
                href="/team"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/team" ? "text-[#4E71FF]" : ""
                }`}
              >
                Our Team
              </Link>
            </li>
            <li>
              <Link
                href="/contact"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/contact" ? "text-[#4E71FF]" : ""
                }`}
              >
                Contact Us
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black">Support</h3>
          <ul className="space-y-2 text-m">
            <li>
              <Link
                href="/faqs"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/faqs" ? "text-[#4E71FF]" : ""
                }`}
              >
                FAQs
              </Link>
            </li>
            <li>
              <Link
                href="/privacy-policy"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/privacy-policy" ? "text-[#4E71FF]" : ""
                }`}
              >
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link
                href="/terms-conditions"
                className={`hover:text-[#4E71FF] ${
                  pathname === "/terms-conditions" ? "text-[#4E71FF]" : ""
                }`}
              >
                Terms & Conditions
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-black">Newsletter</h3>
          <p className="text-m leading-relaxed text-justify">
            Subscribe for updates
          </p>
          <form onSubmit={handleSubmit} className="flex flex-col space-y-2">
            <div className="relative flex items-center">
              <Mail
                size={20}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500"
              />
              <input
                type="email"
                id="email"
                name="email"
                placeholder="Your email"
                className="pl-10 px-3 py-2 bg-white text-m text-[#000000] border border-gray-300 rounded focus:outline-none focus:ring focus:ring-[#616161] focus:border-[#616161] w-full box-border"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <button
              type="submit"
              disabled={loading}
              className={`cursor-pointer bg-[#000000] text-white text-m py-2 rounded hover:bg-zinc-800 ${
                loading ? "opacity-50 cursor-not-allowed" : ""
              }`}
            >
              {loading ? "Subscribing..." : "Subscribe"}
            </button>
          </form>
        </div>
      </div>

      <div className="border-t border-gray-300 py-6 text-center text-m text-gray-700">
        &copy; 2025 Bhen Jewelry. All rights reserved.
        <br />
        Bides | Dimailig | Fernandez | Macaranas | Quelang | Virtudez
      </div>
    </footer>
  );
};

export default Footer;
