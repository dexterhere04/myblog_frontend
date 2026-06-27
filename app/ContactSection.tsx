"use client";
import React, { useState } from "react";
import { Github, Linkedin, MessageCircle, Send } from "lucide-react";

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });

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
      {/* Forest stream divider */}
      <div className="relative h-24 overflow-hidden" style={{ background: '#0D1F1A' }}>
        <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 1440 100" preserveAspectRatio="none">
          <path d="M0,40 C240,70 480,20 720,50 C960,80 1200,30 1440,50 L1440,100 L0,100 Z" fill="#1A2E22" />
        </svg>
      </div>

      <div className="py-16 sm:py-20" style={{ background: '#1A2E22' }}>
        <div className="max-w-3xl mx-auto px-4 sm:px-6">
          <div className="text-center mb-8 sm:mb-12">
            <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase" style={{ color: '#6A8A72' }}>Contact</span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-4" style={{ color: '#E8E0D0' }}>Let&apos;s Connect</h2>
            <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto px-2" style={{ color: '#8AA89A' }}>
              Questions, collaboration, or just a friendly hello — feel free to reach out.
            </p>
          </div>

          <div className="flex justify-center gap-4 sm:gap-6 mb-10 sm:mb-14">
            {[Github, Linkedin, MessageCircle].map((Icon, i) => (
              <div key={i} className="flex items-center gap-2 px-3 sm:px-5 py-2 sm:py-3 rounded-full shadow-md"
                style={{
                  background: 'rgba(232, 224, 208, 0.1)',
                  border: '1px solid rgba(74, 106, 74, 0.3)',
                  color: '#C49A4A',
                }}>
                <Icon size={16} />
              </div>
            ))}
          </div>

          <div className="rounded-2xl p-4 sm:p-6 md:p-8 shadow-lg"
            style={{
              background: '#F0E8D8',
              border: '1px solid rgba(45, 74, 58, 0.2)',
            }}>
            <input name="name" placeholder="Your Name" value={formData.name} onChange={handleChange}
              className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base placeholder-gray-500"
              style={{
                border: '1px solid rgba(45, 74, 58, 0.2)',
                background: '#FAF6EE',
                color: '#1A2E22',
              }} />
            <input name="email" placeholder="Email Address" value={formData.email} onChange={handleChange}
              className="w-full mb-3 sm:mb-4 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base placeholder-gray-500"
              style={{
                border: '1px solid rgba(45, 74, 58, 0.2)',
                background: '#FAF6EE',
                color: '#1A2E22',
              }} />
            <textarea name="message" rows={4} placeholder="Message" value={formData.message} onChange={handleChange}
              className="w-full mb-4 sm:mb-6 px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg text-sm sm:text-base placeholder-gray-500 resize-none"
              style={{
                border: '1px solid rgba(45, 74, 58, 0.2)',
                background: '#FAF6EE',
                color: '#1A2E22',
              }} />
            <div className="text-center">
              <button onClick={handleSubmit}
                className="px-6 sm:px-8 md:px-10 py-2.5 sm:py-3 rounded-full font-semibold shadow-md flex items-center gap-2 mx-auto text-sm sm:text-base transition-all duration-300 hover:scale-105"
                style={{
                  background: 'linear-gradient(135deg, #C49A4A, #E8C87A)',
                  color: '#06120E',
                }}>
                <Send size={16} /> Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
