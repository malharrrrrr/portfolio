import { ArrowRight } from "lucide-react"
import { Suspense, lazy, useState } from "react"

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

  return (
    <section className="flex w-full items-center justify-center py-12">
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
        <div className="relative flex min-h-[640px] flex-col items-center justify-center overflow-hidden border border-border bg-surface/90 shadow-[0_24px_80px_-32px_rgba(196,75,10,0.22)] duration-500">
          <Suspense fallback={<div className="absolute inset-0 bg-muted/20" />}>
            <div className="pointer-events-none absolute inset-0 z-0 opacity-40 mix-blend-multiply dark:opacity-30 dark:mix-blend-screen">
              <Dithering
                colorBack="#00000000"
                colorFront="#EC4E02"
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
              background: `radial-gradient(circle at ${glowPosition.x}% ${glowPosition.y}%, rgba(196, 75, 10, 0.24) 0%, rgba(196, 75, 10, 0.12) 18%, transparent 52%)`,
            }}
          />

          <div className="relative z-10 mx-auto flex max-w-5xl flex-col items-center px-6 py-12 text-center md:px-10">
            <div className="mb-8 inline-flex items-center gap-2 border border-primary/15 bg-primary/6 px-5 py-2.5 font-mono text-[1.04rem] uppercase tracking-[0.18em] text-primary backdrop-blur-sm">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex h-2 w-2 rounded-full bg-primary"></span>
              </span>
              {badge}
            </div>

            {metaLabel ? (
              <p className="mb-6 font-mono text-[1.12rem] uppercase tracking-[0.12em] text-muted-foreground">
                {metaLabel}
              </p>
            ) : null}

            <h1 className="font-serif text-[clamp(4.2rem,9vw,7.3rem)] leading-[0.9] font-normal tracking-[-0.04em] text-foreground">
              {title}
            </h1>

            <p className="mt-8 max-w-3xl text-[1.16rem] leading-10 text-muted-foreground md:text-[1.5rem]">
              {subtitle}
            </p>

            <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
              <button
                type="button"
                onClick={onCtaClick}
                className="group relative inline-flex h-14 items-center justify-center gap-3 overflow-hidden bg-primary px-9 font-mono text-[1rem] uppercase tracking-[0.1em] text-primary-foreground transition-all duration-300 hover:-translate-y-0.5 hover:bg-primary/90 active:scale-95"
              >
                <span className="relative z-10">Get in Touch</span>
                <ArrowRight className="relative z-10 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              {secondaryLabel && secondaryHref ? (
                <a
                  href={secondaryHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex h-14 items-center justify-center gap-3 border border-border bg-background/55 px-9 font-mono text-[1rem] uppercase tracking-[0.1em] text-foreground transition hover:-translate-y-0.5 hover:border-primary hover:text-primary"
                >
                  {secondaryLabel}
                </a>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
