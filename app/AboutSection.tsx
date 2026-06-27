import { Sprout, TreePine, Leaf, Sun } from "lucide-react"

function AboutSection() {
  const skills = [
    {
      icon: <Sprout size={32} />,
      title: "Development",
      description: "Nurturing code from seedling ideas into robust applications that flourish in production",
    },
    {
      icon: <TreePine size={32} />,
      title: "Design",
      description: "Growing user experiences that reach toward clarity, with every interaction thoughtfully placed",
    },
    {
      icon: <Leaf size={32} />,
      title: "Problem Solving",
      description: "Finding elegant solutions in the undergrowth of complexity, one clean pattern at a time",
    },
    {
      icon: <Sun size={32} />,
      title: "Collaboration",
      description: "Creating the right conditions for teams to thrive, where every contribution helps the whole ecosystem grow",
    },
  ]

  return (
    <section className="pt-24 sm:pt-32 md:pt-36 relative overflow-hidden" style={{ background: '#142E22' }}>
      {/* Root system divider */}
      <div className="absolute top-0 left-0 w-full h-40 sm:h-48 md:h-56 -mt-1 pointer-events-none">
        <svg className="absolute top-32 sm:top-40 md:top-48 w-full h-20 sm:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,30 L60,45 L120,20 L180,55 L240,30 L300,60 L360,40
               L420,70 L480,45 L540,80 L600,55 L660,90 L720,65
               L780,100 L1440,120 L1440,0 L0,0 Z"
            fill="#142E22"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2"
            style={{
              color: '#C49A4A',
              background: 'rgba(6, 18, 14, 0.6)',
              borderColor: '#C49A4A',
            }}>
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6 mb-4 sm:mb-6"
            style={{
              color: '#E8E0D0',
              textShadow: "4px 4px 0px #06120E",
            }}>
            Deep Roots
          </h2>
          <p className="text-base sm:text-lg md:text-xl leading-relaxed max-w-3xl mx-auto px-2" style={{ color: '#8AA89A' }}>
            Building with the patience of a forest — strong foundations, steady growth, and a canopy-wide view of what&apos;s possible.
            Every project is planted with care and cultivated to thrive.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative">
            <div className="p-4 sm:p-6 rounded-2xl relative"
              style={{
                background: '#1A2E22',
                border: '6px solid #06120E',
              }}>
              <div className="relative rounded-xl overflow-hidden"
                style={{
                  background: '#1E3A2A',
                  border: '4px solid #0D1F1A',
                }}>
                <div className="aspect-square flex items-center justify-center"
                  style={{ background: 'linear-gradient(135deg, #1E3A2A, #2D4A3A)' }}>
                  <div className="text-center p-4 sm:p-6 md:p-8">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full flex items-center justify-center"
                      style={{
                        background: '#142E22',
                        border: '4px solid #06120E',
                      }}>
                      <TreePine size={64} className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" style={{ color: '#C49A4A' }} />
                    </div>
                    <p
                      className="text-white font-black text-sm sm:text-base md:text-xl tracking-wider"
                      style={{ textShadow: "2px 2px 0px #06120E" }}
                    >
                      GROWING STRONG
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 rounded-tl-lg" style={{ borderColor: '#C49A4A' }} />
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 rounded-tr-lg" style={{ borderColor: '#C49A4A' }} />
              <div className="absolute bottom-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 rounded-bl-lg" style={{ borderColor: '#C49A4A' }} />
              <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 rounded-br-lg" style={{ borderColor: '#C49A4A' }} />
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="rounded-2xl p-4 sm:p-6 md:p-8 relative"
              style={{
                background: '#1A2E22',
                border: '6px solid #06120E',
              }}>
              <h3 className="text-2xl sm:text-3xl font-black mb-3 sm:mb-4"
                style={{
                  color: '#E8E0D0',
                  textShadow: "3px 3px 0px #06120E",
                }}>
                Growing Strong
              </h3>
              <p className="leading-relaxed mb-3 sm:mb-4 text-base sm:text-lg" style={{ color: '#B8D0C8' }}>
                Like an ancient forest that thrives season after season, my work is cultivated with patience and
                intention. Each line of code is a new ring in the trunk, each design decision a branch reaching
                toward clarity.
              </p>
              <p className="leading-relaxed text-base sm:text-lg" style={{ color: '#8AA89A' }}>
                When not growing digital landscapes, I&apos;m exploring the forest of technical documentation,
                planting seeds for new projects, or finding the clearing where everything clicks into place.
              </p>

              <div className="mt-4 sm:mt-6 h-1.5 sm:h-2 rounded-full" style={{ background: 'linear-gradient(90deg, #C49A4A, #E8C87A)' }} />
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="rounded-xl p-4 sm:p-6 text-center"
                style={{
                  background: '#1A2E22',
                  border: '6px solid #06120E',
                }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2"
                  style={{
                    color: '#C49A4A',
                    textShadow: "3px 3px 0px #06120E",
                  }}>
                  3+
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wide uppercase" style={{ color: '#8AA89A' }}>Years Growing</div>
              </div>
              <div className="rounded-xl p-4 sm:p-6 text-center"
                style={{
                  background: '#1A2E22',
                  border: '6px solid #06120E',
                }}>
                <div className="text-3xl sm:text-4xl md:text-5xl font-black mb-1 sm:mb-2"
                  style={{
                    color: '#C49A4A',
                    textShadow: "3px 3px 0px #06120E",
                  }}>
                  20+
                </div>
                <div className="text-xs sm:text-sm font-bold tracking-wide uppercase" style={{ color: '#8AA89A' }}>Projects Cultivated</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-16 sm:pb-20">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="rounded-xl p-4 sm:p-6 w-full text-center transition-transform duration-300 hover:translate-y-[-8px] relative"
                style={{
                  background: '#1A2E22',
                  border: '6px solid #06120E',
                }}>
                <div className="flex justify-center mb-3 sm:mb-4" style={{ color: '#C49A4A' }}>{skill.icon}</div>
                <h4 className="text-lg sm:text-xl font-black mb-2 sm:mb-3"
                  style={{
                    color: '#E8E0D0',
                    textShadow: "2px 2px 0px #06120E",
                  }}>
                  {skill.title}
                </h4>
                <p className="text-xs sm:text-sm leading-relaxed" style={{ color: '#8AA89A' }}>{skill.description}</p>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 rounded-full" style={{ background: '#C49A4A' }} />
              </div>

              <div className="w-3/4 h-3 sm:h-4 rounded-b-xl mt-2"
                style={{
                  background: '#0D1F1A',
                  border: '3px solid #06120E',
                }} />
              <div className="w-1/2 h-2 sm:h-3 rounded-b-lg mt-1"
                style={{
                  background: '#06120E',
                  border: '2px solid #07120E',
                }} />
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
