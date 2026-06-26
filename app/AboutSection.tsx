import { Gem, Mountain, Anvil, Pickaxe } from "lucide-react"

function AboutSection() {
  const skills = [
    {
      icon: <Gem size={32} />,
      title: "Development",
      description: "Crafting solid foundations with precision and care, like a gem cutter shaping raw materials",
    },
    {
      icon: <Mountain size={32} />,
      title: "Design",
      description: "Building towering experiences that stand the test of time with architectural excellence",
    },
    {
      icon: <Pickaxe size={32} />,
      title: "Problem Solving",
      description: "Mining deep to uncover innovative solutions hidden beneath complex challenges",
    },
    {
      icon: <Anvil size={32} />,
      title: "Collaboration",
      description: "Forging strong partnerships and hammering out ideas with teams to create lasting results",
    },
  ]

  return (
    <section className="pt-24 sm:pt-32 md:pt-36 bg-[#4a4a4a] relative overflow-hidden">
      <div className="absolute top-0 left-0 w-full h-40 sm:h-48 md:h-56 -mt-1 pointer-events-none">
        <svg className="absolute top-32 sm:top-40 md:top-48 w-full h-20 sm:h-24" viewBox="0 0 1440 120" preserveAspectRatio="none">
          <path
            d="M0,30 L40,50 L90,20 L140,60 L190,30 L240,70 L290,40
               L340,80 L390,50 L440,90 L490,60 L540,100 L590,70
               L640,110 L690,80 L740,120 L1440,120 L1440,0 L0,0 Z"
            fill="#4a4a4a"
          />
        </svg>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        <div className="text-center mb-12 sm:mb-16 md:mb-20">
          <span className="inline-block text-xs sm:text-sm font-bold tracking-widest uppercase text-[#d4a574] bg-[#2a2a2a] px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border-2 border-[#d4a574]">
            About Me
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 sm:mt-6 mb-4 sm:mb-6 text-white" style={{ textShadow: "4px 4px 0px #2a2a2a" }}>
            Solid as a Rock
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-200 leading-relaxed max-w-3xl mx-auto px-2">
            Building unshakeable digital foundations with the strength of granite and the precision of a diamond cutter.
            Every project is carved with dedication and polished to perfection.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-center mb-12 sm:mb-16 md:mb-20">
          <div className="relative">
            <div className="bg-[#5a5a5a] p-4 sm:p-6 rounded-2xl border-6 sm:border-8 border-[#2a2a2a] relative">
              <div className="relative bg-[#6b6b6b] rounded-xl overflow-hidden border-3 sm:border-4 border-[#3a3a3a]">
                <div className="aspect-square flex items-center justify-center bg-gradient-to-br from-[#6b6b6b] to-[#5a5a5a]">
                  <div className="text-center p-4 sm:p-6 md:p-8">
                    <div className="w-32 h-32 sm:w-40 sm:h-40 md:w-48 md:h-48 mx-auto mb-4 sm:mb-6 rounded-full bg-[#4a4a4a] flex items-center justify-center border-4 sm:border-6 border-[#2a2a2a]">
                      <Mountain size={64} className="text-[#d4a574] w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20" />
                    </div>
                    <p
                      className="text-white font-black text-sm sm:text-base md:text-xl tracking-wider"
                      style={{ textShadow: "2px 2px 0px #2a2a2a" }}
                    >
                      YOUR MONUMENT
                    </p>
                  </div>
                </div>
              </div>

              <div className="absolute top-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 sm:border-l-4 border-t-2 sm:border-t-4 border-[#d4a574] rounded-tl-lg"></div>
              <div className="absolute top-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 sm:border-r-4 border-t-2 sm:border-t-4 border-[#d4a574] rounded-tr-lg"></div>
              <div className="absolute bottom-2 left-2 w-4 h-4 sm:w-6 sm:h-6 border-l-2 sm:border-l-4 border-b-2 sm:border-b-4 border-[#d4a574] rounded-bl-lg"></div>
              <div className="absolute bottom-2 right-2 w-4 h-4 sm:w-6 sm:h-6 border-r-2 sm:border-r-4 border-b-2 sm:border-b-4 border-[#d4a574] rounded-br-lg"></div>
            </div>
          </div>

          <div className="space-y-4 sm:space-y-6">
            <div className="bg-[#5a5a5a] rounded-2xl p-4 sm:p-6 md:p-8 border-4 sm:border-6 border-[#2a2a2a] relative">
              <h3 className="text-2xl sm:text-3xl font-black text-white mb-3 sm:mb-4" style={{ textShadow: "3px 3px 0px #2a2a2a" }}>
                Carved in Stone
              </h3>
              <p className="text-gray-200 leading-relaxed mb-3 sm:mb-4 text-base sm:text-lg">
                Like ancient monuments built to last millennia, my work is crafted with unwavering dedication and
                precision. Each line of code is chiseled with purpose, each design element carved with intention.
              </p>
              <p className="text-gray-200 leading-relaxed text-base sm:text-lg">
                When not forging digital landscapes, I&apos;m exploring geological wonders, mining for knowledge in technical
                documentation, or contemplating the solid foundations that make great software endure.
              </p>

              <div className="mt-4 sm:mt-6 h-1.5 sm:h-2 bg-[#d4a574] rounded-full"></div>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div className="bg-[#5a5a5a] border-4 sm:border-6 border-[#2a2a2a] rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#d4a574] mb-1 sm:mb-2" style={{ textShadow: "3px 3px 0px #2a2a2a" }}>
                  3+
                </div>
                <div className="text-xs sm:text-sm text-white font-bold tracking-wide uppercase">Years Forging</div>
              </div>
              <div className="bg-[#5a5a5a] border-4 sm:border-6 border-[#2a2a2a] rounded-xl p-4 sm:p-6 text-center">
                <div className="text-3xl sm:text-4xl md:text-5xl font-black text-[#d4a574] mb-1 sm:mb-2" style={{ textShadow: "3px 3px 0px #2a2a2a" }}>
                  20+
                </div>
                <div className="text-xs sm:text-sm text-white font-bold tracking-wide uppercase">Monuments Built</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-16 sm:pb-20">
          {skills.map((skill, index) => (
            <div key={index} className="flex flex-col items-center group cursor-pointer">
              <div className="bg-[#5a5a5a] border-4 sm:border-6 border-[#2a2a2a] rounded-xl p-4 sm:p-6 w-full text-center transition-transform duration-300 hover:translate-y-[-8px] relative">
                <div className="flex justify-center mb-3 sm:mb-4 text-[#d4a574]">{skill.icon}</div>
                <h4 className="text-lg sm:text-xl font-black text-white mb-2 sm:mb-3" style={{ textShadow: "2px 2px 0px #2a2a2a" }}>
                  {skill.title}
                </h4>
                <p className="text-gray-200 text-xs sm:text-sm leading-relaxed">{skill.description}</p>

                <div className="absolute top-3 sm:top-4 right-3 sm:right-4 w-2 h-2 sm:w-3 sm:h-3 bg-[#d4a574] rounded-full"></div>
              </div>

              <div className="w-3/4 h-3 sm:h-4 bg-[#3a3a3a] border-3 sm:border-4 border-[#2a2a2a] rounded-b-xl mt-2"></div>
              <div className="w-1/2 h-2 sm:h-3 bg-[#2a2a2a] border-2 sm:border-3 border-[#1a1a1a] rounded-b-lg mt-1"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default AboutSection
