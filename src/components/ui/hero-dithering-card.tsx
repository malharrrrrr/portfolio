import { ArrowRight } from "lucide-react"
import { Suspense, lazy, useState } from "react"
import headshotGimmick from "../../../assets/headshot-gimmick.png"

const Dithering = lazy(() =>
  import("@paper-design/shaders-react").then((mod) => ({ default: mod.Dithering })),
)

type CTASectionProps = {
  badge: string
  title: string
  subtitle: string
  metaLabel?: string
  secondaryLabel?: string
  onCtaClick?: () => void
  secondaryHref?: string
}

export function CTASection({
  badge,
  title,
  subtitle,
  metaLabel,
  secondaryLabel,
  onCtaClick,
  secondaryHref,
}: CTASectionProps) {
  const [isHovered, setIsHovered] = useState(false)
  const [glowPosition, setGlowPosition] = useState({ x: 50, y: 28 })

  const titleLines = title.split("\n")

  return (
    <section className="flex w-full items-center justify-center py-6 md:py-10">
      <div
        className="relative w-full"
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onMouseMove={(event) => {
          const bounds = event.currentTarget.getBoundingClientRect()
          const x = ((event.clientX - bounds.left) / bounds.width) * 100
          const y = ((event.clientY - bounds.top) / bounds.height) * 100
          setGlowPosition({ x, y })
        }}
      >
        <div className="relative flex min-h-[660px] flex-col items-center justify-center overflow-hidden rounded-3xl border border-border/80 bg-surface/60 p-8 shadow-2xl backdrop-blur-xl duration-500 md:p-14">
          <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-30 dark:mix-blend-screen">
              <Dithering
                colorBack="#00000000"
                colorFront="#38bdf8"
                shape="warp"
                type="4x4"
                speed={isHovered ? 0.6 : 0.2}
                className="size-full"
                minPixelRatio={1}
              />
            </div>
          </Suspense>

          <div
            className="pointer-events-none absolute inset-0 z-[1] transition-opacity duration-300"
            style={{
              opacity: isHovered ? 1 : 0.8,
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(56, 189, 248, 0.25) 0%, rgba(99, 102, 241, 0.14) 26%, transparent 60%)`,
            }}
          />

          <div className="relative z-10 mx-auto grid w-full max-w-full items-center gap-12 py-8 lg:grid-cols-[32%_68%] lg:gap-14">
            <div className="flex items-center justify-center">
              <div className="relative flex h-64 w-64 items-center justify-center rounded-full p-1.5 bg-gradient-to-tr from-sky-400/40 via-indigo-500/30 to-cyan-300/50 shadow-[0_0_60px_-10px_rgba(56,189,248,0.4)] backdrop-blur-md md:h-72 md:w-72 lg:h-[22rem] lg:w-[22rem] transition-transform duration-500 hover:scale-[1.02]">
                <div className="relative h-full w-full overflow-hidden rounded-full bg-surface/90">
                  <img
                    src={headshotGimmick}
                    alt="Malhar Kamble portrait"
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/30 via-transparent to-transparent" />
                </div>
              </div>
            </div>

            <div className="flex flex-col items-start text-left">
              <div className="mb-6 inline-flex items-center gap-2.5 rounded-full border border-primary/25 bg-primary/10 px-4 py-2 font-mono text-[0.88rem] font-medium uppercase tracking-[0.16em] text-primary shadow-[0_0_20px_-3px_rgba(56,189,248,0.25)] backdrop-blur-sm">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
                </span>
                {badge}
              </div>

              {metaLabel ? (
                <p className="mb-4 font-mono text-[1rem] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                  {metaLabel}
                </p>
              ) : null}

              <h1 className="font-display text-[clamp(3.8rem,6.2vw,6.4rem)] font-extrabold leading-[0.94] tracking-[-0.035em] text-foreground">
                {titleLines.map((line, idx) => (
                  <span key={idx} className="block">
                    {idx === 1 ? (
                      <span className="bg-gradient-to-r from-sky-400 via-cyan-400 to-indigo-400 dark:from-sky-300 dark:via-cyan-300 dark:to-indigo-300 bg-clip-text text-transparent">
                        {line}
                      </span>
                    ) : (
                      line
                    )}
                  </span>
                ))}
              </h1>

              <p className="mt-8 max-w-3xl text-[1.12rem] leading-9 text-muted-foreground md:text-[1.32rem]">
                {subtitle}
              </p>

              <div className="mt-10 flex flex-wrap items-center gap-4">
                <button
                  type="button"
                  onClick={onCtaClick}
                  className="group relative inline-flex h-13 items-center justify-center gap-3 overflow-hidden rounded-xl bg-primary px-8 font-mono text-[0.95rem] font-semibold uppercase tracking-[0.1em] text-primary-foreground shadow-[0_0_25px_-5px_rgba(56,189,248,0.5)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_0_35px_-5px_rgba(56,189,248,0.7)] active:scale-95 cursor-pointer"
                >
                  <span className="relative z-10">Get in Touch</span>
                  <ArrowRight className="relative z-10 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                {secondaryLabel && secondaryHref ? (
                  <a
                    href={secondaryHref}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex h-13 items-center justify-center gap-3 rounded-xl border border-border/90 bg-surface/80 px-8 font-mono text-[0.95rem] font-medium uppercase tracking-[0.1em] text-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary/60 hover:text-primary hover:shadow-lg"
                  >
                    {secondaryLabel}
                  </a>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
