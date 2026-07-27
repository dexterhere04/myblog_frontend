"use client";
import { Calendar, Clock, ArrowRight, Sparkles, Leaf, Code } from "lucide-react";

const blogs = [
  {
    id: 1,
    title: "The Art of Minimalist Design",
    description: "Explore how less can truly be more when it comes to creating impactful digital experiences that resonate with users.",
    category: "Design",
    date: "Dec 28, 2024",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #2C4E3B 0%, #1A3023 40%, #3C5C4A 100%)",
    accent: "#D4983A",
    icon: Leaf,
  },
  {
    id: 2,
    title: "Building Scalable React Applications",
    description: "Best practices and patterns for building applications that grow gracefully with your user base and feature set.",
    category: "Development",
    date: "Dec 25, 2024",
    readTime: "8 min read",
    gradient: "linear-gradient(135deg, #1A3023 0%, #183025 60%, #2E4C3B 100%)",
    accent: "#79A668",
    icon: Code,
  },
  {
    id: 3,
    title: "The Future of Web Development",
    description: "Discover emerging trends and technologies shaping the future of how we build for the web and interact online.",
    category: "Technology",
    date: "Dec 22, 2024",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #3C5843 0%, #2C4E3B 40%, #1A3023 100%)",
    accent: "#DEAE4A",
    icon: Sparkles,
  },
  {
    id: 4,
    title: "Mastering CSS Grid Layouts",
    description: "A comprehensive guide to mastering CSS Grid from basic concepts to advanced layout techniques.",
    category: "CSS",
    date: "Dec 20, 2024",
    readTime: "7 min read",
    gradient: "linear-gradient(135deg, #2E4C3B 0%, #1A3023 50%, #3C5C4A 100%)",
    accent: "#C07840",
    icon: Leaf,
  },
  {
    id: 5,
    title: "UI/UX Design Principles",
    description: "Essential principles every designer should know to create intuitive and delightful user experiences.",
    category: "Design",
    date: "Dec 18, 2024",
    readTime: "5 min read",
    gradient: "linear-gradient(135deg, #4E6E4B 0%, #2E4C3B 40%, #1A3023 100%)",
    accent: "#D4983A",
    icon: Sparkles,
  },
  {
    id: 6,
    title: "JavaScript Performance Tips",
    description: "Optimize your JavaScript code for better performance and smoother user experiences in production.",
    category: "Development",
    date: "Dec 15, 2024",
    readTime: "6 min read",
    gradient: "linear-gradient(135deg, #1A3023 0%, #183025 50%, #2C4E3B 100%)",
    accent: "#79A668",
    icon: Code,
  },
];

function CardImage({ gradient, Icon, accent }: { gradient: string; Icon: typeof Leaf; accent: string }) {
  return (
    <div className="h-40 sm:h-52 relative overflow-hidden" style={{ background: gradient }}>
      <div className="absolute inset-0 bg-black/10" />
      <div className="absolute inset-0 flex items-center justify-center opacity-[0.07]">
        <Icon size={120} strokeWidth={1} style={{ color: "#F7EFDE" }} />
      </div>
      <div className="absolute top-0 left-0 w-full h-px opacity-30"
        style={{ background: `linear-gradient(90deg, transparent, ${accent}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-16"
        style={{ background: "linear-gradient(to top, rgba(10,26,20,0.4), transparent)" }} />
    </div>
  )
}

function BlogCard({ blog, index }: { blog: typeof blogs[0]; index: number }) {
  return (
    <article
      className="group cursor-pointer"
      style={{
        animation: `fade-up 0.6s ease-out both`,
        animationDelay: `${0.1 + index * 0.07}s`,
      }}
    >
      <div
        className="overflow-hidden transition-all duration-400 hover:-translate-y-1"
        style={{
          borderRadius: "16px",
          background: "var(--pine)",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.3)",
        }}
      >
        {/* Accent line */}
        <div className="h-[3px]" style={{
          background: `linear-gradient(90deg, ${blog.accent}, ${blog.accent}88, transparent)`,
        }} />

        {/* Image area */}
        <CardImage gradient={blog.gradient} Icon={blog.icon} accent={blog.accent} />

        {/* Content */}
        <div className="px-4 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-7" style={{
          background: "linear-gradient(180deg, #F1E5CD 0%, #EDE2CE 100%)",
        }}>
          {/* Category pill */}
          <span
            className="inline-block px-3 py-1 rounded-full text-[11px] sm:text-xs tracking-wider uppercase font-body mb-3"
            style={{
              background: `${blog.accent}18`,
              color: blog.accent,
              border: `1px solid ${blog.accent}30`,
            }}
          >
            {blog.category}
          </span>

          {/* Title */}
          <h3
            className="font-display text-lg sm:text-xl font-semibold mb-2.5 leading-snug tracking-tight group-hover:opacity-80 transition-opacity duration-300"
            style={{ color: "var(--pine)" }}
          >
            {blog.title}
          </h3>

          {/* Description */}
          <p
            className="mb-4 sm:mb-5 leading-relaxed line-clamp-2 text-sm sm:text-base font-body"
            style={{ color: "#5E6E5E" }}
          >
            {blog.description}
          </p>

          {/* Metadata row */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3 text-xs sm:text-sm font-body"
              style={{ color: "#8A8A74" }}>
              <span className="flex items-center gap-1.5">
                <Calendar size={13} />
                <span className="hidden sm:inline">{blog.date}</span>
                <span className="sm:hidden">{blog.date.split(",")[0]}</span>
              </span>
              <span className="flex items-center gap-1.5">
                <Clock size={13} />
                {blog.readTime}
              </span>
            </div>

            <div className="flex items-center font-body font-medium text-sm transition-colors duration-300"
              style={{ color: blog.accent }}>
              <span className="mr-1.5 opacity-0 group-hover:opacity-100 transition-all duration-300 group-hover:mr-2">
                Read
              </span>
              <ArrowRight size={15} className="transition-transform duration-300 group-hover:translate-x-1" />
            </div>
          </div>
        </div>
      </div>
    </article>
  )
}

export default function BlogsSection() {
  return (
    <section className="pt-8 sm:pt-16 pb-14 sm:pb-24" style={{ background: "var(--mid-forest)" }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Section header */}
        <div className="text-center mb-10 sm:mb-20 animate-fade-up">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #79A668)" }} />
            <span
              className="text-[11px] sm:text-xs tracking-[0.25em] uppercase font-body"
              style={{ color: "var(--moss-light)" }}
            >
              Forest Floor
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #79A668, transparent)" }} />
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl font-bold mt-3 mb-4 tracking-tight"
            style={{ color: "var(--parchment)" }}
          >
            Latest Insights
          </h2>

          <p
            className="font-body text-sm sm:text-base max-w-xl mx-auto leading-relaxed px-2"
            style={{ color: "var(--sage)" }}
          >
            Thoughtful writing on design, development, and modern technology — curated for clarity and depth.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {blogs.map((blog, i) => (
            <BlogCard key={blog.id} blog={blog} index={i} />
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-10 sm:mt-18 animate-fade-up stagger-5">
          <button
            className="font-body font-semibold px-8 sm:px-10 py-3.5 sm:py-4 transition-all duration-300 hover:-translate-y-0.5 text-sm sm:text-base"
            style={{
              background: "linear-gradient(135deg, #D4983A 0%, #DEAE4A 100%)",
              color: "#191714",
              borderRadius: "9999px",
              boxShadow: "0 4px 20px rgba(196, 154, 74, 0.2)",
            }}
          >
            View All Posts &rarr;
          </button>
        </div>
      </div>
    </section>
  );
}
