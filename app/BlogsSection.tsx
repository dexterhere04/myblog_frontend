"use client";
import { Calendar, Clock, ArrowRight } from "lucide-react";

function BlogsSection() {
  const blogs = [
    { id: 1, title: "The Art of Minimalist Design", description: "Explore how less can truly be more when it comes to creating impactful digital experiences that resonate with users.", category: "Design", date: "Dec 28, 2024", readTime: "5 min read", image: "linear-gradient(135deg, #2D4A3A 0%, #1E3A2A 100%)" },
    { id: 2, title: "Building Scalable React Applications", description: "Best practices and patterns for building applications that grow gracefully with your user base and feature set.", category: "Development", date: "Dec 25, 2024", readTime: "8 min read", image: "linear-gradient(135deg, #1E3A2A 0%, #142E22 100%)" },
    { id: 3, title: "The Future of Web Development", description: "Discover emerging trends and technologies shaping the future of how we build for the web.", category: "Technology", date: "Dec 22, 2024", readTime: "6 min read", image: "linear-gradient(135deg, #3A5A4A 0%, #2D4A3A 100%)" },
    { id: 4, title: "Mastering CSS Grid Layouts", description: "A comprehensive guide to mastering CSS Grid from basic concepts to advanced layout techniques.", category: "CSS", date: "Dec 20, 2024", readTime: "7 min read", image: "linear-gradient(135deg, #2D4A3A 0%, #1E3A2A 100%)" },
    { id: 5, title: "UI/UX Design Principles", description: "Essential principles every designer should know to create intuitive and delightful user experiences.", category: "Design", date: "Dec 18, 2024", readTime: "5 min read", image: "linear-gradient(135deg, #4A6A4A 0%, #2D4A3A 100%)" },
    { id: 6, title: "JavaScript Performance Tips", description: "Optimize your JavaScript code for better performance and smoother user experiences.", category: "Development", date: "Dec 15, 2024", readTime: "6 min read", image: "linear-gradient(135deg, #1E3A2A 0%, #142E22 100%)" },
  ];

  return (
    <section className="pt-0 pb-16 sm:pb-20" style={{ background: '#0D1F1A' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="text-xs sm:text-sm font-semibold tracking-widest uppercase" style={{ color: '#6A8A72' }}>Forest Floor</span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mt-2 sm:mt-3 mb-3 sm:mb-5" style={{ color: '#E8E0D0' }}>Latest Insights</h2>
          <p className="text-sm sm:text-base lg:text-lg max-w-2xl mx-auto leading-relaxed px-2" style={{ color: '#8AA89A' }}>
            Thoughtful writing on design, development, and modern technology — curated for clarity and depth.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 md:gap-10">
          {blogs.map((blog) => (
            <article key={blog.id}
              className="group overflow-hidden transition-all duration-300 hover:-translate-y-1 cursor-pointer rounded-2xl"
              style={{
                boxShadow: "0 10px 30px rgba(0, 0, 0, 0.25)",
                background: '#1A2E22',
              }}
            >
              <div className="h-1" style={{ background: 'linear-gradient(90deg, #C49A4A, #E8C87A)' }}></div>
              <div className="h-48 relative overflow-hidden" style={{ background: blog.image }}>
                <div className="absolute inset-0 bg-black/10" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                  <div className="w-full h-full" style={{
                    background: `
                      radial-gradient(ellipse 120px 80px at 20% 30%, transparent 0%, transparent 100%),
                      radial-gradient(ellipse 100px 60px at 70% 40%, transparent 0%, transparent 100%),
                      radial-gradient(ellipse 90px 70px at 50% 50%, transparent 0%, transparent 100%)
                    `,
                  }} />
                </div>
              </div>
              <div className="px-5 sm:px-6 pt-4 sm:pt-5 pb-5 sm:pb-6" style={{ background: '#F0E8D8' }}>
                <div className="flex items-center gap-3 sm:gap-4 text-xs sm:text-sm mb-2 sm:mb-3" style={{ color: '#6A7A6A' }}>
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    <span className="hidden sm:inline">{blog.date}</span>
                    <span className="sm:hidden">{blog.date.split(',')[0]}</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {blog.readTime}
                  </span>
                </div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2 transition-colors" style={{ color: '#1A2E22' }}>{blog.title}</h3>
                <p className="mb-3 sm:mb-5 leading-relaxed line-clamp-2 text-sm sm:text-base" style={{ color: '#5A6A5A' }}>{blog.description}</p>
                <div className="flex items-center font-medium" style={{ color: '#C49A4A' }}>
                  <span className="text-xs sm:text-sm">Read article</span>
                  <ArrowRight size={16} className="ml-2 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12 sm:mt-16">
          <button className="px-6 sm:px-8 md:px-10 py-3 sm:py-4 rounded-full font-semibold transition-all duration-300 shadow-lg text-sm sm:text-base"
            style={{
              background: 'linear-gradient(135deg, #C49A4A, #E8C87A)',
              color: '#06120E',
            }}>
            View All Posts
          </button>
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
