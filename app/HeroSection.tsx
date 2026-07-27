"use client"

function HeroSection() {
  return (
    <section className="flex flex-col items-center justify-center text-center pt-20 sm:pt-24 pb-20 sm:pb-36 relative z-10 min-h-screen">
      <div className="relative z-20 max-w-4xl px-4 sm:px-6 w-full">

        {/* Decorative label */}
        <div className="flex flex-col items-center mb-8 sm:mb-14 animate-fade-up">
          <span
            className="inline-block px-4 sm:px-5 py-1.5 sm:py-2 rounded-full text-[10px] sm:text-xs tracking-[0.2em] uppercase font-body"
            style={{
              background: "rgba(212, 168, 75, 0.12)",
              border: "1px solid rgba(212, 168, 75, 0.25)",
              color: "#DEAE4A",
              letterSpacing: "0.25em",
            }}
          >
            A Clearing in the Forest
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-display text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-6 sm:mb-12 leading-[1.1] tracking-tight animate-fade-up stagger-1"
          style={{ color: "#F7EFDE" }}
        >
          Welcome to{" "}
          <span className="block mt-2 sm:mt-3 pb-[0.12em]"
            style={{
              background: "linear-gradient(135deg, #E8C060 0%, #D4983A 40%, #F0DA9A 70%, #C07840 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
              backgroundSize: "200% 200%",
            }}
          >
            Tharun Blogs
          </span>
        </h1>

        {/* Subtitle */}
        <p
          className="font-body text-sm sm:text-lg md:text-xl max-w-xl mx-auto mb-8 sm:mb-14 leading-relaxed px-1 sm:px-2 animate-fade-up stagger-2"
          style={{ color: "rgba(251, 247, 239, 0.85)" }}
        >
          Step into a space where ideas take root and grow — thoughtful words on
          web development, programming, and the technology shaping tomorrow.
        </p>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center animate-fade-up stagger-3 w-full sm:w-auto">
          <a href="#"
            className="group relative inline-flex items-center gap-2 font-body font-semibold py-3 sm:py-4 px-6 sm:px-10 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto justify-center"
            style={{
              background: "linear-gradient(135deg, #D4983A 0%, #DEAE4A 100%)",
              color: "#191714",
              borderRadius: "9999px",
              boxShadow: "0 4px 20px rgba(196, 154, 74, 0.25)",
            }}
          >
            <span>Explore the Grove</span>
            <span className="inline-block transition-transform duration-300 group-hover:translate-x-1">&rarr;</span>
          </a>

          <a href="#"
            className="font-body font-semibold py-3 sm:py-4 px-6 sm:px-10 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base w-full sm:w-auto text-center"
            style={{
              background: "rgba(196, 154, 74, 0.1)",
              backdropFilter: "blur(12px)",
              WebkitBackdropFilter: "blur(12px)",
              border: "1.5px solid rgba(196, 154, 74, 0.35)",
              borderRadius: "9999px",
              color: "#F7EFDE",
            }}
          >
            Stay in the Canopy
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
