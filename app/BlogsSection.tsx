import React from "react";

function BlogsSection() {
  return (
    <section className="py-24 bg-[#d3c0a5]">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl font-bold text-center mb-14 text-gray-900">
          Latest Blogs
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {/* Blog cards go here */}
        </div>
      </div>
    </section>
  );
}

export default BlogsSection;
