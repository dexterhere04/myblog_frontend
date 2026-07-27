"use client";
import { useState } from "react";
import { Github, Linkedin, MessageCircle, Send, Mail, ArrowUpRight, User } from "lucide-react";

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://linkedin.com" },
  { Icon: MessageCircle, label: "Message", href: "#" },
];

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);

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

  const inputStyle = (name: string) => ({
    border: focused === name
      ? "1.5px solid #D4983A"
      : "1.5px solid rgba(92, 64, 51, 0.2)",
    background: "#FCF7ED",
    color: "#191714",
    outline: "none",
    boxShadow: focused === name
      ? "0 0 0 3px rgba(196, 154, 74, 0.12)"
      : "none",
  });

  return (
    <section className="relative" style={{ background: "var(--pine)" }}>
      {/* Main content — warmer section with cedar tones */}
      <div className="py-12 sm:py-20 relative overflow-hidden">
        {/* Background decorative pattern */}
        <div className="absolute inset-0 pointer-events-none opacity-[0.03]"
          style={{
            backgroundImage: `
              radial-gradient(circle at 20% 80%, #DEAE4A 1px, transparent 1px),
              radial-gradient(circle at 80% 20%, #DEAE4A 1px, transparent 1px),
              radial-gradient(circle at 40% 40%, #D4983A 1px, transparent 1px)
            `,
            backgroundSize: "120px 120px, 160px 160px, 100px 100px",
          }}
        />

        <div className="max-w-3xl mx-auto px-4 sm:px-6 relative z-10">
          {/* Header */}
          <div className="text-center mb-8 sm:mb-16">
            <div className="flex justify-center items-center gap-3 mb-4">
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #DEAE4A)" }} />
              <span
                className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-body"
                style={{ color: "var(--honey)" }}
              >
                Reach Out
              </span>
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #DEAE4A, transparent)" }} />
            </div>

            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight"
              style={{ color: "var(--parchment)" }}
            >
              Let&apos;s Connect
            </h2>

            <p
              className="font-body text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-2"
              style={{ color: "var(--sage)" }}
            >
              Questions, collaboration, or just a friendly hello — feel free to reach out.
            </p>
          </div>

          {/* Social pills */}
          <div className="flex justify-center gap-2 sm:gap-4 mb-10 sm:mb-16 flex-wrap">
            {socials.map(({ Icon, label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-2 sm:gap-2.5 px-4 sm:px-5 py-2 sm:py-2.5 transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  background: "rgba(251, 247, 239, 0.06)",
                  border: "1.5px solid rgba(196, 154, 74, 0.25)",
                  borderRadius: "9999px",
                  color: "#D4983A",
                }}
              >
                <Icon size={15} className="transition-colors duration-300 group-hover:text-[#DEAE4A]" />
                <span className="font-body text-sm tracking-wide">{label}</span>
                <ArrowUpRight size={12} className="opacity-0 group-hover:opacity-100 transition-all duration-300 -ml-1 group-hover:ml-0" />
              </a>
            ))}
          </div>

          {/* Form card */}
          <div
            className="p-4 sm:p-8 md:p-10 relative grain-overlay"
            style={{
              background: "linear-gradient(180deg, #F1E5CD 0%, #EBDFC8 100%)",
              borderRadius: "20px",
              border: "1.5px solid rgba(92, 64, 51, 0.15)",
              boxShadow: "0 8px 40px rgba(0, 0, 0, 0.2)",
            }}
          >
            {/* Decorative corner accents */}
            <div className="hidden sm:block absolute top-3 left-3 w-6 h-6 border-l-2 border-t-2 rounded-tl-md opacity-30"
              style={{ borderColor: "#D4983A" }} />
            <div className="hidden sm:block absolute top-3 right-3 w-6 h-6 border-r-2 border-t-2 rounded-tr-md opacity-30"
              style={{ borderColor: "#D4983A" }} />
            <div className="hidden sm:block absolute bottom-3 left-3 w-6 h-6 border-l-2 border-b-2 rounded-bl-md opacity-30"
              style={{ borderColor: "#D4983A" }} />
            <div className="hidden sm:block absolute bottom-3 right-3 w-6 h-6 border-r-2 border-b-2 rounded-br-md opacity-30"
              style={{ borderColor: "#D4983A" }} />

            <form onSubmit={handleSubmit}>
              <div className="relative mb-4">
                <User size={14} className="absolute left-4 top-4 pointer-events-none" style={{ color: "#C07840" }} />
                <input
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onFocus={() => setFocused("name")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3.5 text-sm sm:text-base font-body transition-all duration-200 placeholder-gray-400"
                  style={{ ...inputStyle("name"), borderRadius: "12px" }}
                />
              </div>

              <div className="relative mb-4">
                <Mail size={14} className="absolute left-4 top-4 pointer-events-none" style={{ color: "#C07840" }} />
                <input
                  name="email"
                  type="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  onFocus={() => setFocused("email")}
                  onBlur={() => setFocused(null)}
                  className="w-full pl-10 pr-4 py-3.5 text-sm sm:text-base font-body transition-all duration-200 placeholder-gray-400"
                  style={{ ...inputStyle("email"), borderRadius: "12px" }}
                />
              </div>

              <textarea
                name="message"
                rows={4}
                placeholder="Your Message..."
                value={formData.message}
                onChange={handleChange}
                onFocus={() => setFocused("message")}
                onBlur={() => setFocused(null)}
                className="w-full mb-6 px-4 py-3.5 text-sm sm:text-base font-body transition-all duration-200 placeholder-gray-400 resize-none"
                style={{ ...inputStyle("message"), borderRadius: "12px" }}
              />

              <div className="text-center">
                <button
                  type="submit"
                  className="group inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-10 py-3 sm:py-3.5 font-body font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center"
                  style={{
                    background: "linear-gradient(135deg, #D4983A 0%, #DEAE4A 100%)",
                    color: "#191714",
                    borderRadius: "9999px",
                    boxShadow: "0 4px 20px rgba(196, 154, 74, 0.2)",
                  }}
                >
                  <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                  <span>Send Message</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
