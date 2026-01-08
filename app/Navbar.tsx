"use client"
import React, { useState } from 'react'

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navLinks = ['Home', 'Blogs', 'About', 'Contact']

  return (
    <nav 
      className="navbar fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 py-3 sm:py-4 text-white transition-all duration-300"
      style={{
        background: 'rgba(255, 255, 255, 0.08)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.1)',
        backdropFilter: 'blur(16px)',
        WebkitBackdropFilter: 'blur(16px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.15)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center relative">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group">
          <span className="font-bold text-lg sm:text-xl tracking-wide"
            style={{
              background: 'linear-gradient(135deg, #FFD700 0%, #FFA500 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}>
            THARUN
          </span>
          <span className="font-light text-lg sm:text-xl ml-1 tracking-wide">BLOGS</span>
        </div>

        {/* Desktop Navigation */}
        <ul className="hidden md:flex items-center space-x-1 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActiveLink(link)}
                className="relative px-6 py-2 font-medium text-sm tracking-wide transition-all duration-300 group"
              >
                <span className="relative z-10">{link}</span>
                {activeLink === link && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #FFD700 0%, #FFA500 100%)',
                      boxShadow: '0 0 8px rgba(255, 165, 0, 0.5)',
                    }}
                  />
                )}
                {activeLink !== link && (
                  <span
                    className="absolute bottom-0 left-0 right-0 h-0.5 bg-white opacity-0 group-hover:opacity-30 transition-opacity duration-300"
                  />
                )}
              </button>
            </li>
          ))}
        </ul>


        {/* Mobile Menu Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none ml-auto"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'rotate-45 translate-y-2' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? 'opacity-0' : ''
              }`}
            />
            <span
              className={`w-full h-0.5 bg-white transition-all duration-300 ${
                mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''
              }`}
            />
          </div>
        </button>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-3 sm:mt-4 rounded-xl p-3 sm:p-4 space-y-1"
          style={{
            background: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(16px)',
            WebkitBackdropFilter: 'blur(16px)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.15)',
            animation: 'fadeIn 0.2s ease-out',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => {
                setActiveLink(link)
                setMobileMenuOpen(false)
              }}
              className={`w-full text-left px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-medium text-sm tracking-wide transition-all duration-200 ${
                activeLink === link ? 'bg-white bg-opacity-20' : 'hover:bg-white hover:bg-opacity-10'
              }`}
            >
              {link}
            </button>
          ))}
          <button
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg font-semibold text-sm tracking-wide transition-all duration-200 mt-2"
            style={{
              background: 'linear-gradient(135deg, #FFA500 0%, #FFD700 100%)',
              color: '#1a1a1a',
            }}
          >
            Get Started
          </button>
        </div>
      )}

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(-8px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </nav>
  )
}

export default Navbar