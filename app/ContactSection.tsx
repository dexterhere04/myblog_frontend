"use client";
import { useState } from "react";
import { Github, Linkedin, MessageCircle, Send, Mail, ArrowUpRight, User, CheckCircle, AlertCircle } from "lucide-react";

const socials = [
  { Icon: Github, label: "GitHub", href: "https://github.com/dexterhere04" },
  { Icon: Linkedin, label: "LinkedIn", href: "https://www.linkedin.com/in/tharun-sdr/" },
  { Icon: MessageCircle, label: "Email", href: "mailto:sdrtharun@gmail.com" },
];

const WEB3FORMS_KEY = process.env.NEXT_PUBLIC_WEB3FORMS_ACCESS_KEY ?? "";

type SubmitStatus = "idle" | "sending" | "success" | "error";

function ContactSection() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [focused, setFocused] = useState<string | null>(null);
  const [status, setStatus] = useState<SubmitStatus>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const resetForm = () => {
    setFormData({ name: "", email: "", message: "" });
    setStatus("idle");
    setErrorMsg("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMsg("");

    if (!WEB3FORMS_KEY) {
      const subject = encodeURIComponent("Website Inquiry");
      const body = encodeURIComponent(
        `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
      );
      window.location.href = `mailto:sdrtharun@gmail.com?subject=${subject}&body=${body}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          access_key: WEB3FORMS_KEY,
          name: formData.name,
          email: formData.email,
          message: formData.message,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setStatus("success");
      } else {
        setStatus("error");
        setErrorMsg(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setErrorMsg("Network error. Please check your connection and try again.");
    }
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
    <section id="contact" className="relative scroll-mt-24" style={{ background: "var(--pine)" }}>
      {/* Main content with cedar tones */}
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
                Contact
              </span>
              <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #DEAE4A, transparent)" }} />
            </div>

            <h2
              className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight"
              style={{ color: "var(--parchment)" }}
            >
              Get in Touch
            </h2>

            <p
              className="font-body text-sm sm:text-base max-w-lg mx-auto leading-relaxed px-2"
              style={{ color: "var(--sage)" }}
            >
              For project inquiries, collaboration, or general questions, please reach out by email.
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

            {status === "success" ? (
              <div className="text-center py-8 sm:py-12">
                <CheckCircle size={48} className="mx-auto mb-4" style={{ color: "#4F7A42" }} />
                <h3
                  className="font-display text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "var(--pine)" }}
                >
                  Message Sent
                </h3>
                <p
                  className="font-body text-sm sm:text-base mb-6"
                  style={{ color: "#5E6E5E" }}
                >
                  Thank you for reaching out. I&apos;ll get back to you soon.
                </p>
                <button
                  onClick={resetForm}
                  className="font-body font-semibold px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                  style={{
                    background: "transparent",
                    color: "#D4983A",
                    border: "2px solid #D4983A",
                    borderRadius: "9999px",
                  }}
                >
                  Send Another
                </button>
              </div>
            ) : status === "error" ? (
              <div className="text-center py-8 sm:py-12">
                <AlertCircle size={48} className="mx-auto mb-4" style={{ color: "#C07840" }} />
                <h3
                  className="font-display text-xl sm:text-2xl font-bold mb-2"
                  style={{ color: "var(--pine)" }}
                >
                  Something Went Wrong
                </h3>
                <p
                  className="font-body text-sm sm:text-base mb-2"
                  style={{ color: "#5E6E5E" }}
                >
                  {errorMsg}
                </p>
                <p
                  className="font-body text-sm mb-6"
                  style={{ color: "#8A8A74" }}
                >
                  You can also email me directly at{" "}
                  <a href="mailto:sdrtharun@gmail.com" className="underline" style={{ color: "#D4983A" }}>
                    sdrtharun@gmail.com
                  </a>
                </p>
                <button
                  onClick={resetForm}
                  className="font-body font-semibold px-6 sm:px-8 py-2.5 sm:py-3 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
                  style={{
                    background: "linear-gradient(135deg, #D4983A 0%, #DEAE4A 100%)",
                    color: "#191714",
                    borderRadius: "9999px",
                    boxShadow: "0 4px 20px rgba(196, 154, 74, 0.2)",
                  }}
                >
                  Try Again
                </button>
              </div>
            ) : (
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
                    required
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
                    required
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
                  required
                  className="w-full mb-6 px-4 py-3.5 text-sm sm:text-base font-body transition-all duration-200 placeholder-gray-400 resize-none"
                  style={{ ...inputStyle("message"), borderRadius: "12px" }}
                />

                <div className="text-center">
                  <button
                    type="submit"
                    disabled={status === "sending"}
                    className="group inline-flex items-center gap-2 sm:gap-2.5 px-6 sm:px-10 py-3 sm:py-3.5 font-body font-semibold text-sm sm:text-base transition-all duration-300 hover:-translate-y-0.5 w-full sm:w-auto justify-center disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                    style={{
                      background: "linear-gradient(135deg, #D4983A 0%, #DEAE4A 100%)",
                      color: "#191714",
                      borderRadius: "9999px",
                      boxShadow: "0 4px 20px rgba(196, 154, 74, 0.2)",
                    }}
                  >
                    {status === "sending" ? (
                      <>
                        <svg className="animate-spin h-4 w-4" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Sending...</span>
                      </>
                    ) : (
                      <>
                        <Send size={15} className="transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                        <span>Send Inquiry</span>
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export default ContactSection;
