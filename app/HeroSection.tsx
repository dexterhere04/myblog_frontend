import React from 'react'

function HeroSection() {
  return (
    <section className="hero-section flex flex-col items-center justify-start text-center pt-20 sm:pt-25 pb-5 relative z-10 min-h-screen">
      <div className="relative z-20 max-w-4xl px-4 sm:px-6">
        <div className="inline-block mb-4 sm:mb-6 px-3 sm:px-4 py-1.5 sm:py-2 rounded-full text-xs sm:text-sm font-semibold tracking-wide"
          style={{
            background: 'rgba(255, 255, 255, 0.25)',
            backdropFilter: 'blur(10px)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: '#fff',
            boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
          }}>
          Your Digital Paradise
        </div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold mb-4 sm:mb-6 leading-tight"
          style={{
            color: '#fff',
            textShadow: '2px 4px 12px rgba(0, 0, 0, 0.3), 0 0 40px rgba(255, 255, 255, 0.2)'
          }}>
          Welcome to<br/>
          <span style={{
            background: '#FFD76E',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>
            Tharun Blogs
          </span>
        </h1>

        <p className="text-base sm:text-lg md:text-xl lg:text-2xl max-w-2xl mx-auto mb-6 sm:mb-8 md:mb-10 leading-relaxed px-2"
          style={{ color: 'rgba(255, 255, 255, 0.95)', textShadow: '1px 2px 8px rgba(0, 0, 0, 0.3)' }}>
          Ride the wave of knowledge with insightful articles about web development,
          programming, and cutting-edge technology.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center">
          <a href="#"
            className="group relative text-white font-bold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
            style={{ background: '#E6C363' }}>
            <span className="relative z-10 text-black">Dive Into Blogs</span>
            <div className="absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: '#FFD76E' }}></div>
          </a>

          <a href="#"
            className="text-white font-semibold py-3 sm:py-4 px-6 sm:px-8 rounded-full transition-all duration-300 transform hover:scale-105 hover:-translate-y-1 text-sm sm:text-base"
            style={{
              background: 'rgba(255, 255, 255, 0.2)',
              backdropFilter: 'blur(10px)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)'
            }}>
            <span className="relative z-10">Subscribe Now</span>
          </a>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
