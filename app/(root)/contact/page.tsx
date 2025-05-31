"use client";

import { useState } from "react";
import { Mail, Phone, MapPin } from "lucide-react";
import emailjs from "@emailjs/browser";
import { toast } from "react-toastify";

const ContactUs = () => {
  const [subject, setSubject] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const isValidEmail = (email: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const clearForm = () => {
    setSubject("");
    setEmail("");
    setName("");
    setMessage("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!subject || !email || !name || !message) {
      toast.error("Please fill in all the fields.");
      return;
    }

    if (!isValidEmail(email)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);

    const serviceID = "service_r93wo3u";
    const templateID = "template_usx001g";
    const publicKey = "nG3hySnt5t0YAQ1Ef";

    const templateParams = {
      name,
      email,
      subject,
      message,
    };

    try {
      await emailjs.send(serviceID, templateID, templateParams, publicKey);
      toast.success("Message sent successfully!");
    } catch (error) {
      console.error("Email send error:", error);
      toast.error("Failed to send the message.");
    } finally {
      clearForm();
      setLoading(false);
    }
  };

  return (
    <section className="bg-white py-10 px-4 sm:px-6 lg:px-20">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-5">
          <h2 className="text-3xl font-bold text-gray-800">Contact Us</h2>
          <p className="mt-4 text-gray-600 text-lg">
            Fill out the form to hear from us.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-stretch">
          <div className="bg-white p-8 rounded-lg shadow-lg">
            <h3 className="text-2xl font-semibold text-gray-800 mb-4">
              Get In Touch
            </h3>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="subject" className="block text-gray-800">
                  Subject
                </label>
                <input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Enter your subject"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#616161]"
                  required
                />
              </div>
              <div>
                <label htmlFor="email" className="block text-gray-800">
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="Enter your email address"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#616161]"
                  required
                />
              </div>

              <div>
                <label htmlFor="name" className="block text-gray-800">
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Enter your name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#616161]"
                  required
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-gray-800">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  placeholder="Write your message here"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="h-32 w-full px-4 py-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#616161]"
                  required
                ></textarea>
              </div>

              <div>
                <button
                  type="submit"
                  className={`cursor-pointer w-full py-3 px-4 bg-black text-white rounded hover:bg-zinc-800 focus:outline-none focus:ring-2 focus:ring-[#616161] ${
                    loading ? "opacity-50 cursor-not-allowed" : ""
                  }`}
                  disabled={loading}
                >
                  {loading ? "Sending..." : "Send Message"}
                </button>
              </div>
            </form>
          </div>

          <div className="bg-white p-8 rounded-lg shadow-lg flex flex-col justify-between">
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <Mail className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800 text-m">
                  bhenjewelry@company.com
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Phone className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800 text-m">+639876543210</span>
              </div>
              <div className="flex items-center space-x-4">
                <MapPin className="w-5 h-5 text-gray-800" />
                <span className="text-gray-800 text-m">
                  Molino VI, Bacoor City, Cavite
                </span>
              </div>
            </div>
            <div className="mt-4 flex-1 rounded-lg overflow-hidden h-64 lg:h-full">
              <iframe
                title="Google Maps Location"
                width="100%"
                height="100%"
                frameBorder="0"
                className="w-full h-full"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                referrerPolicy="no-referrer-when-downgrade"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3860.9361130046377!2d120.97526037510406!3d14.60374938589912!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3397c9900043a3f5%3A0x623be62e0caa51e7!2sMolino%20VI%2C%20Bacoor%2C%20Cavite!5e0!3m2!1sen!2sph!4v1716276249477!5m2!1sen!2sph"
              ></iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
