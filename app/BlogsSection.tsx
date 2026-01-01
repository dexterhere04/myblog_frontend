"use client";
import React, { useState } from "react";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function BlogsSection() {
  const [hoveredCard, setHoveredCard] = useState(null);

  const blogs = [
    {
      id: 1,
      title: "The Art of Minimalist Design",
      description:
        "Explore how less can truly be more in modern design principles and user experience.",
      category: "Design",
      date: "Dec 28, 2024",
      readTime: "5 min read",
      image: "linear-gradient(135deg, #e0c097 0%, #d1b38a 100%)",
    },
    {
      id: 2,
      title: "Building Scalable React Applications",
      description:
        "Best practices and patterns for creating maintainable and performant React apps.",
      category: "Development",
      date: "Dec 25, 2024",
      readTime: "8 min read",
      image: "linear-gradient(135deg, #d8b58a 0%, #c9a574 100%)",
    },
    {
      id: 3,
      title: "The Future of Web Development",
      description:
        "Discover emerging trends and technologies shaping the next generation of web apps.",
      category: "Technology",
      date: "Dec 22, 2024",
      readTime: "6 min read",
      image: "linear-gradient(135deg, #d9c2a3 0%, #cbb295 100%)",
    },
    {
      id: 4,
      title: "Mastering CSS Grid Layouts",
      description:
        "A comprehensive guide to creating flexible and responsive layouts with CSS Grid.",
      category: "CSS",
      date: "Dec 20, 2024",
      readTime: "7 min read",
      image: "linear-gradient(135deg, #e3ccb0 0%, #d4bb9c 100%)",
    },
    {
      id: 5,
      title: "UI/UX Design Principles",
      description:
        "Essential principles every designer should know to create intuitive interfaces.",
      category: "Design",
      date: "Dec 18, 2024",
      readTime: "5 min read",
      image: "linear-gradient(135deg, #ead6b8 0%, #d8c09f 100%)",
    },
    {
      id: 6,
      title: "JavaScript Performance Tips",
      description:
        "Optimize your JavaScript code for better performance and user experience.",
      category: "Development",
      date: "Dec 15, 2024",
      readTime: "6 min read",
      image: "linear-gradient(135deg, #d5bfa4 0%, #c3aa8c 100%)",
    },
  ];

  return (
    <section className="pt-10 pb-20 bg-[#d3c0a5]">
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <div className="text-center mb-20">
          <span className="text-sm font-semibold tracking-widest uppercase text-gray-600">
            From the Journal
          </span>
          <h2 className="text-5xl font-bold mt-3 mb-5 text-gray-900">
            Latest Insights
          </h2>
          <p className="text-gray-700 text-lg max-w-2xl mx-auto leading-relaxed">
            Thoughtful writing on design, development, and modern technology —
            curated for clarity and depth.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="group bg-[#8b7355] overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer"
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
              }}
              onMouseEnter={() => setHoveredCard(blog.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {/* Window Frame - Top */}
              <div className="bg-[#6b5742] h-3 border-b-2 border-[#4a3c2e]"></div>
              
              {/* Window with shutters effect */}
              <div className="relative">
                {/* Left Shutter Border */}
                <div className="absolute left-0 top-0 bottom-0 w-3 bg-[#6b5742] border-r-2 border-[#4a3c2e] z-10"></div>
                
                {/* Right Shutter Border */}
                <div className="absolute right-0 top-0 bottom-0 w-3 bg-[#6b5742] border-l-2 border-[#4a3c2e] z-10"></div>
                
                {/* Window Glass/Image */}
                <div
                  className="h-52 relative"
                  style={{ background: blog.image }}
                >
                  <div className="absolute inset-0 bg-black/5" />
                  
                  {/* Window pane divider */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-full h-0.5 bg-[#6b5742]/30"></div>
                  </div>
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="h-full w-0.5 bg-[#6b5742]/30"></div>
                  </div>
                </div>
              </div>

              {/* Window Frame - Bottom */}
              <div className="bg-[#6b5742] h-3 border-t-2 border-[#4a3c2e]"></div>

              {/* Shop Content Area */}
              <div className="p-6 bg-[#f5ede3]">
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {blog.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>

                <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-gray-700 transition-colors">
                  {blog.title}
                </h3>

                <p className="text-gray-600 mb-5 leading-relaxed line-clamp-2">
                  {blog.description}
                </p>

                <div className="flex items-center text-gray-900 font-medium">
                  <span className="text-sm">Read article</span>
                  <ArrowRight
                    size={16}
                    className={`ml-2 transition-transform duration-300 ${
                      hoveredCard === blog.id ? "translate-x-1" : ""
                    }`}
                  />
                </div>
              </div>

              {/* Beach Shop Bottom - Wooden planks */}
              <div className="bg-[#8b7355] border-t-4 border-[#6b5742]">
                <div className="h-2 bg-gradient-to-b from-[#8b7355] to-[#7a6449]"></div>
                {/* Plank lines */}
                <div className="flex gap-8 px-6 pb-3">
                  <div className="flex-1 h-1 bg-[#6b5742] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#6b5742] rounded-full"></div>
                  <div className="flex-1 h-1 bg-[#6b5742] rounded-full"></div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <button className="px-10 py-4 bg-[#6b5742] text-white rounded-full font-semibold transition-all duration-300 hover:bg-[#5a4936] shadow-lg">
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;