import { Sprout, TreePine, Sun, Flower2 } from "lucide-react"

const skills = [
  {
    icon: <Sprout size={28} />,
    title: "Development",
    description: "Nurturing code from seedling ideas into robust applications that flourish in production.",
    accent: "#79A668",
  },
  {
    icon: <TreePine size={28} />,
    title: "Design",
    description: "Growing user experiences that reach toward clarity, with every interaction thoughtfully placed.",
    accent: "#D4983A",
  },
  {
    icon: <Flower2 size={28} />,
    title: "Problem Solving",
    description: "Finding elegant solutions in the undergrowth of complexity, one clean pattern at a time.",
    accent: "#DEAE4A",
  },
  {
    icon: <Sun size={28} />,
    title: "Collaboration",
    description: "Creating the conditions for teams to thrive, where every contribution helps the whole ecosystem grow.",
    accent: "#C07840",
  },
]

function SpecimenCard({ skill }: { skill: typeof skills[0] }) {
  return (
    <div className="flex flex-col items-center group cursor-pointer">
      <div
        className="p-5 sm:p-6 w-full text-center transition-all duration-300 hover:-translate-y-1.5 relative"
        style={{
          background: "var(--pine)",
          border: "5px solid var(--deep-forest)",
          borderRadius: "14px",
          boxShadow: "0 4px 20px rgba(0,0,0,0.2)",
        }}
      >
        {/* Icon */}
        <div className="flex justify-center mb-4" style={{ color: skill.accent }}>
          {skill.icon}
        </div>

        {/* Title */}
        <h4
          className="font-display text-lg sm:text-xl font-bold mb-2.5 tracking-tight"
          style={{ color: "var(--parchment)" }}
        >
          {skill.title}
        </h4>

        {/* Description */}
        <p
          className="font-body text-xs sm:text-sm leading-relaxed"
          style={{ color: "var(--sage)" }}
        >
          {skill.description}
        </p>

        {/* Accent dot */}
        <div
          className="absolute top-3 right-3 w-2.5 h-2.5 rounded-full"
          style={{ background: skill.accent }}
        />
      </div>

      {/* Stacked bases for specimen-mount effect */}
      <div
        className="w-3/4 h-3 rounded-b-lg mt-1.5"
        style={{ background: "var(--mid-forest)", border: "2px solid var(--deep-forest)" }}
      />
      <div
        className="w-1/2 h-2 rounded-b-md mt-1"
        style={{ background: "var(--deep-forest)", border: "1px solid #07120E" }}
      />
    </div>
  )
}

export default function AboutSection() {
  return (
    <section className="pt-3 sm:pt-6 md:pt-8 relative overflow-hidden" style={{ background: "var(--dark-forest)" }}>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 relative z-10">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-20">
          <div className="flex justify-center items-center gap-3 mb-4">
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, transparent, #D4983A)" }} />
            <span
              className="inline-block px-4 py-1.5 text-[11px] sm:text-xs tracking-[0.25em] uppercase font-body"
              style={{
                color: "#D4983A",
                background: "rgba(196, 154, 74, 0.08)",
                border: "1.5px solid rgba(196, 154, 74, 0.3)",
                borderRadius: "9999px",
              }}
            >
              About Me
            </span>
            <div className="w-8 h-px" style={{ background: "linear-gradient(90deg, #D4983A, transparent)" }} />
          </div>

          <h2
            className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mt-4 mb-5 tracking-tight"
            style={{ color: "var(--parchment)" }}
          >
            Deep Roots
          </h2>

          <p
            className="font-body text-base sm:text-lg max-w-2xl mx-auto leading-relaxed px-2"
            style={{ color: "var(--sage)" }}
          >
            Building with the patience of a forest — strong foundations, steady growth,
            and a canopy-wide view of what&apos;s possible. Every project is planted
            with care and cultivated to thrive.
          </p>
        </div>

        {/* Bio + Stats row */}
        <div className="grid md:grid-cols-2 gap-8 sm:gap-12 items-start mb-14 sm:mb-20">
          {/* Image frame */}
          <div className="relative">
            <div
              className="p-3 sm:p-6 relative"
              style={{
                background: "var(--pine)",
                border: "5px solid var(--deep-forest)",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
              }}
            >
              <div
                className="relative overflow-hidden"
                style={{
                  background: "var(--pine-light)",
                  border: "3px solid var(--mid-forest)",
                  borderRadius: "12px",
                }}
              >
                <div
                  className="aspect-square flex items-center justify-center"
                  style={{ background: "linear-gradient(135deg, #1A3023 0%, #2E4C3B 50%, #1A3023 100%)" }}
                >
                  <div className="text-center p-6 sm:p-8 md:p-10">
                    <div
                      className="w-20 h-20 sm:w-36 sm:h-36 md:w-44 md:h-44 mx-auto mb-3 sm:mb-6 rounded-full flex items-center justify-center"
                      style={{
                        background: "var(--dark-forest)",
                        border: "3px solid var(--deep-forest)",
                      }}
                    >
                      <TreePine size={40} className="sm:w-16 sm:h-16 md:w-20 md:h-20" style={{ color: "#D4983A" }} />
                    </div>
                    <p
                      className="font-display font-black text-xs sm:text-base md:text-xl tracking-wider"
                      style={{ color: "var(--parchment)" }}
                    >
                      GROWING STRONG
                    </p>
                  </div>
                </div>
              </div>

              {/* Corner accents */}
              <div className="absolute top-2 left-2 w-5 h-5 border-l-[3px] border-t-[3px] rounded-tl-md"
                style={{ borderColor: "#D4983A" }} />
              <div className="absolute top-2 right-2 w-5 h-5 border-r-[3px] border-t-[3px] rounded-tr-md"
                style={{ borderColor: "#D4983A" }} />
              <div className="absolute bottom-2 left-2 w-5 h-5 border-l-[3px] border-b-[3px] rounded-bl-md"
                style={{ borderColor: "#D4983A" }} />
              <div className="absolute bottom-2 right-2 w-5 h-5 border-r-[3px] border-b-[3px] rounded-br-md"
                style={{ borderColor: "#D4983A" }} />
            </div>
          </div>

          {/* Bio text + stats */}
          <div className="space-y-5 sm:space-y-6">
            <div
              className="p-4 sm:p-6 md:p-8 relative"
              style={{
                background: "var(--pine)",
                border: "5px solid var(--deep-forest)",
                borderRadius: "16px",
                boxShadow: "0 6px 24px rgba(0,0,0,0.25)",
              }}
            >
              <h3
                className="font-display text-xl sm:text-3xl font-bold mb-3 sm:mb-4 tracking-tight"
                style={{ color: "var(--parchment)" }}
              >
                Growing Strong
              </h3>

              <p className="font-body leading-relaxed mb-3 sm:mb-4 text-xs sm:text-base" style={{ color: "var(--mist)" }}>
                Like an ancient forest that thrives season after season, my work is cultivated with patience and
                intention. Each line of code is a new ring in the trunk, each design decision a branch reaching
                toward clarity.
              </p>

              <p className="font-body leading-relaxed text-xs sm:text-base" style={{ color: "var(--sage)" }}>
                When not growing digital landscapes, I&apos;m exploring the forest of technical documentation,
                planting seeds for new projects, or finding the clearing where everything clicks into place.
              </p>

              <div className="mt-5 h-1.5 rounded-full"
                style={{ background: "linear-gradient(90deg, #D4983A 0%, #DEAE4A 50%, transparent 100%)" }}
              />
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              <div
                className="p-3 sm:p-5 text-center"
                style={{
                  background: "var(--pine)",
                  border: "5px solid var(--deep-forest)",
                  borderRadius: "14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-1"
                  style={{ color: "#D4983A" }}
                >
                  3+
                </div>
                <div
                  className="font-body text-[10px] sm:text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--sage)" }}
                >
                  Years Growing
                </div>
              </div>

              <div
                className="p-3 sm:p-5 text-center"
                style={{
                  background: "var(--pine)",
                  border: "5px solid var(--deep-forest)",
                  borderRadius: "14px",
                  boxShadow: "0 4px 16px rgba(0,0,0,0.2)",
                }}
              >
                <div
                  className="font-display text-3xl sm:text-4xl md:text-5xl font-black mb-1"
                  style={{ color: "#D4983A" }}
                >
                  20+
                </div>
                <div
                  className="font-body text-[10px] sm:text-xs font-bold tracking-widest uppercase"
                  style={{ color: "var(--sage)" }}
                >
                  Projects Cultivated
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Skills grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 pb-18 sm:pb-22">
          {skills.map((skill) => (
            <SpecimenCard key={skill.title} skill={skill} />
          ))}
        </div>
      </div>
    </section>
  )
}
