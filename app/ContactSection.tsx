"use client";
import React, { useState } from "react";
import { Github, Linkedin, MessageCircle, Send } from "lucide-react";

function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("Message from Portfolio");
    const body = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );
    window.location.href = `mailto:sdrtharun@gmail.com?subject=${subject}&body=${body}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <section className="relative">
      {/* Sand wave */}
      <div className="relative h-24 bg-[#d3c0a5] overflow-hidden">
        <svg
          className="absolute bottom-0 w-full h-full"
          viewBox="0 0 1440 100"
          preserveAspectRatio="none"
        >
          <path
            d="M0,60 C240,90 480,30 720,60 C960,90 1200,30 1440,60 L1440,100 L0,100 Z"
            fill="#f7f3ee"
          />
        </svg>
      </div>

      {/* Main contact */}
      <div className="py-20 bg-[#f7f3ee]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-sm font-semibold tracking-widest uppercase text-gray-600">
              Contact
            </span>
            <h2 className="text-4xl font-bold mt-3 mb-4 text-gray-900">
              Let’s Connect
            </h2>
            <p className="text-lg text-gray-700 max-w-2xl mx-auto">
              Questions, collaboration, or just a friendly hello — feel free to reach out.
            </p>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-6 mb-14">
            {[Github, Linkedin, MessageCircle].map((Icon, i) => (
              <div
                key={i}
                className="flex items-center gap-2 px-5 py-3 rounded-full bg-white/80 border border-[#d3c0a5] text-gray-800 shadow-sm"
              >
                <Icon size={18} />
              </div>
            ))}
          </div>

          {/* Form */}
          <div className="bg-[#fffdf9] rounded-2xl p-8 shadow-lg border border-[#e8dcc8]">
            <input
              name="name"
              placeholder="Your Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border border-[#e8dcc8] rounded-lg"
            />
            <input
              name="email"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleChange}
              className="w-full mb-4 px-4 py-3 border border-[#e8dcc8] rounded-lg"
            />
            <textarea
              name="message"
              rows={4}
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              className="w-full mb-6 px-4 py-3 border border-[#e8dcc8] rounded-lg"
            />
            <div className="text-center">
              <button
                onClick={handleSubmit}
                className="px-10 py-3 bg-[#6b5742] text-white rounded-full font-semibold shadow-md"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
