"use client"
import { useState, useEffect } from 'react'
import { Volume2, VolumeX } from 'lucide-react'
import { useAudio } from './AudioContext'

function Navbar() {
  const [activeLink, setActiveLink] = useState('Home')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const navLinks = ['Home', 'Blogs', 'About', 'Contact']
  const { isMuted, toggleMute } = useAudio()
  const [intenseBlink, setIntenseBlink] = useState(true)
  const [shouldBlink, setShouldBlink] = useState(true)

  const handleMuteClick = () => {
    setIntenseBlink(false)
    setShouldBlink(false)
    toggleMute()
  }

  useEffect(() => {
    const intenseTimer = setTimeout(() => setIntenseBlink(false), 10000)
    const stopTimer = setTimeout(() => setShouldBlink(false), 20000)
    return () => { clearTimeout(intenseTimer); clearTimeout(stopTimer) }
  }, [])

  return (
    <nav
      className="navbar fixed top-0 left-0 right-0 z-50 px-3 sm:px-6 py-3 sm:py-4 transition-all duration-300"
      style={{
        background: 'rgba(9, 20, 16, 0.8)',
        boxShadow: '0 4px 24px rgba(0, 0, 0, 0.25)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        borderBottom: '1px solid rgba(74, 106, 74, 0.2)',
      }}
    >
      <div className="max-w-7xl mx-auto flex items-center">
        {/* Logo */}
        <div className="flex items-center cursor-pointer group shrink-0">
          <span
            className="font-display font-bold text-base sm:text-xl tracking-tight"
            style={{
              background: 'linear-gradient(135deg, #D4983A 0%, #E8C060 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
            }}
          >
            THARUN
          </span>
          <span className="font-display font-light text-base sm:text-xl ml-1 sm:ml-1.5 tracking-wide" style={{ color: '#B8D2C5' }}>
            BLOGS
          </span>
        </div>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-0.5 ml-auto">
          {navLinks.map((link) => (
            <li key={link}>
              <button
                onClick={() => setActiveLink(link)}
                className="relative px-5 py-2 font-body font-medium text-sm tracking-wide transition-all duration-300"
              >
                <span
                  className="relative z-10 transition-colors duration-300"
                  style={{ color: activeLink === link ? '#E8C060' : 'rgba(184, 210, 197, 0.8)' }}
                >
                  {link}
                </span>
                {/* Active indicator */}
                {activeLink === link && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] rounded-full"
                    style={{
                      background: 'linear-gradient(90deg, #D4983A 0%, #E8C060 100%)',
                    }}
                  />
                )}
                {/* Hover indicator */}
                {activeLink !== link && (
                  <span
                    className="absolute bottom-0 left-3 right-3 h-[2px] opacity-0 group-hover:opacity-20 transition-opacity duration-300 rounded-full"
                    style={{ background: '#B8D2C5' }}
                  />
                )}
              </button>
            </li>
          ))}
        </ul>

        {/* Mute toggle */}
        <button
          onClick={handleMuteClick}
          className={`ml-2 sm:ml-4 p-2 sm:p-2.5 rounded-lg hover:bg-white/10 transition-colors duration-200 focus:outline-none ${
            isMuted && intenseBlink ? 'animate-blink-strong' : isMuted && shouldBlink ? 'animate-pulse' : ''
          }`}
          aria-label={isMuted ? 'Unmute waterfall sound' : 'Mute waterfall sound'}
          title={isMuted ? 'Unmute waterfall sound' : 'Mute waterfall sound'}
          style={{ color: shouldBlink && isMuted ? '#E8C060' : '#B8D2C5' }}
        >
          {isMuted ? <VolumeX size={20} className="sm:w-[22px] sm:h-[22px]" /> : <Volume2 size={20} className="sm:w-[22px] sm:h-[22px]" />}
        </button>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden focus:outline-none"
          aria-label="Toggle menu"
        >
          <div className="w-6 h-5 flex flex-col justify-between">
            <span
              className={`w-full h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'rotate-45 translate-y-2' : ''}`}
              style={{ background: '#B8D2C5' }}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${mobileMenuOpen ? 'opacity-0' : ''}`}
              style={{ background: '#B8D2C5' }}
            />
            <span
              className={`w-full h-0.5 transition-all duration-300 ${mobileMenuOpen ? '-rotate-45 -translate-y-2' : ''}`}
              style={{ background: '#B8D2C5' }}
            />
          </div>
        </button>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div
          className="md:hidden mt-3 rounded-xl p-3 space-y-1"
          style={{
            background: 'rgba(9, 20, 16, 0.95)',
            backdropFilter: 'blur(18px)',
            WebkitBackdropFilter: 'blur(18px)',
            border: '1px solid rgba(74, 106, 74, 0.2)',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
            animation: 'fade-up 0.2s ease-out both',
          }}
        >
          {navLinks.map((link) => (
            <button
              key={link}
              onClick={() => { setActiveLink(link); setMobileMenuOpen(false); }}
              className={`w-full text-left px-4 py-3 rounded-lg font-body font-medium text-sm tracking-wide transition-all duration-200 ${
                activeLink === link ? 'bg-white/10' : 'hover:bg-white/5'
              }`}
              style={{ color: activeLink === link ? '#E8C060' : 'rgba(184, 210, 197, 0.8)' }}
            >
              {link}
            </button>
          ))}
        </div>
      )}
    </nav>
  )
}

export default Navbar
