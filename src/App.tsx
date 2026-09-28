import {
  ArrowUpRight,
  ChevronRight,
  ExternalLink,
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Sparkles,
  Twitter,
} from "lucide-react"
import { useEffect, useMemo, useState } from "react"
import { ThemeToggle } from "@/components/theme-toggle"
import { CTASection } from "@/components/ui/hero-dithering-card"

const navItems = [
  { label: "Experience", href: "#experience" },
  { label: "Projects", href: "#projects" },
  { label: "Skills", href: "#skills" },
  { label: "Education", href: "#education" },
  { label: "Contact", href: "#contact" },
]

const experience = [
  {
    role: "AI / ML Intern",
    company: "TurboML",
    duration: "Jun - Aug 2025",
    points: [
      "Built a CNN-based computer vision model to detect and classify plant leaf diseases.",
      "Improved ResNet accuracy from 78% to 92% through data augmentation and fine-tuning.",
      "Deployed the model in a Flask web app for real-time disease prediction.",
    ],
  },
]

const projects = [
  {
    id: "P - 01",
    name: "Argos - Disaster Management Platform",
    date: "2026",
    points: [
      "Developed a disaster management platform to enable real-time reporting and coordination during emergencies.",
      "Implemented incident reporting, location tracking, and resource allocation features to improve response efficiency.",
      "Explored offline-first capabilities using Service Workers and local storage for functionality during low connectivity scenarios.",
    ],
  },
  {
    id: "P - 02",
    name: "Organchain - Blockchain-based Organ Donation System",
    date: "2026",
    points: [
      "Designed a blockchain-powered platform to ensure secure, transparent, and tamper-proof organ donor records.",
      "Used smart contract concepts to improve trust, traceability, and fairness in organ allocation workflows.",
      "Explored decentralized identity and data integrity principles for handling sensitive healthcare information.",
    ],
  },
  {
    id: "P - 03",
    name: "Marathi Voice Cloning TTS Model",
    date: "July 2025",
    points: [
      "Trained a Marathi Text-to-Speech model using a single-speaker dataset of roughly 60 minutes of audio.",
      "Explored speech synthesis techniques without transcripts and under limited GPU resources.",
      "Gained hands-on experience with model training pipelines and speech datasets.",
    ],
  },
  {
    id: "P - 04",
    name: "Smart Home Automation System",
    date: "April 2025",
    points: [
      "Developed a Java application using OOP concepts, Swing for GUI, and multithreading for automation.",
      "Implemented custom exceptions for robust error handling and activity logging.",
      "Designed modular, reusable device management with encapsulation, inheritance, and interfaces.",
    ],
  },
]

const skillGroups = [
  {
    title: "Programming",
    items: ["Python", "C", "C++"],
  },
  {
    title: "Web Development",
    items: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    title: "Databases",
    items: ["PostgreSQL", "MongoDB"],
  },
  {
    title: "ML & Data",
    items: ["NumPy", "Pandas", "scikit-learn", "TensorFlow", "PyTorch"],
  },
  {
    title: "Blockchain",
    items: ["Solidity", "Ethereum", "Hardhat", "Ethers.js", "IPFS"],
  },
  {
    title: "Tools & OS",
    items: ["Git", "Linux", "Shell Scripting", "Flask", "Service Workers", "Local Storage"],
  },
  {
    title: "Languages",
    items: ["English", "Hindi", "Marathi"],
  },
]

const certifications = [
  {
    name: "CS50x: Introduction to Computer Science",
    issuer: "Harvard University",
    year: "2025",
  },
  {
    name: "Joy of Programming in Java",
    issuer: "NPTEL",
    year: "2024",
  },
  {
    name: "Neural Network Mathematics: Understanding the Mathematics of a Neuron",
    issuer: "SkillSoft",
    year: "Nov 2024",
  },
]

const socialLinks = [
  {
    label: "GitHub",
    href: "https://github.com/malharrrrrr",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/malhar-kamble-a3512324b/",
    icon: Linkedin,
  },
  {
    label: "X / Twitter",
    href: "https://x.com/malhar_kamble",
    icon: Twitter,
  },
]

function SectionHeader({ number, title }: { number: string; title: string }) {
  return (
    <div className="mb-14 flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
      <div className="flex items-center gap-4">
        <span className="inline-flex items-center justify-center rounded-xl border border-primary/30 bg-primary/10 px-3.5 py-1 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]">
          {number}
        </span>
        <h2 className="font-display text-[2.4rem] font-bold tracking-[-0.025em] text-foreground md:text-[3.1rem]">
          {title}
        </h2>
      </div>
      <div className="hidden h-px flex-1 bg-gradient-to-r from-border via-primary/30 to-transparent md:mx-6 md:block" />
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("dark")
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme")
    const nextTheme = savedTheme === "light" ? "light" : "dark"
    setTheme(nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
  }, [])

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("section[id]"))
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]

        if (visible?.target?.id) {
          setActiveSection(visible.target.id)
        }
      },
      { rootMargin: "-20% 0px -55% 0px", threshold: [0.1, 0.3, 0.6] },
    )

    sections.forEach((section) => observer.observe(section))
    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
    document.documentElement.classList.toggle("dark", nextTheme === "dark")
    window.localStorage.setItem("portfolio-theme", nextTheme)
  }

  const quickSkills = useMemo(
    () => ["Python", "TensorFlow", "PyTorch", "React", "C / C++", "Flask", "MongoDB", "Git"],
    [],
  )

  return (
    <div className="min-h-screen bg-background text-foreground transition-colors duration-300">
      {/* Background Cyber Grid */}
      <div className="cyber-grid pointer-events-none fixed inset-0 z-0 opacity-100" />

      {/* Top Ambient Radial Aurora Spotlight */}
      <div
        className="pointer-events-none fixed inset-0 z-0 transition-opacity duration-500"
        style={{
          opacity: 0.85,
          background:
            "radial-gradient(circle at 50% 12%, rgba(56, 189, 248, 0.16) 0%, rgba(99, 102, 241, 0.08) 28%, transparent 65%)",
        }}
      />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border/80 bg-nav/75 backdrop-blur-xl transition-colors duration-300">
        <div className="mx-auto flex h-[68px] max-w-[1600px] items-center justify-between px-6 md:px-10">
          <a href="#hero" className="group flex items-center gap-2.5 font-display text-[1.35rem] font-bold tracking-tight">
            <span className="flex h-7 w-7 items-center justify-center rounded-lg border border-primary/30 bg-primary/10 font-mono text-xs font-bold text-primary shadow-[0_0_12px_-2px_rgba(56,189,248,0.4)]">
              MK
            </span>
            <span>
              Malhar{" "}
              <span className="bg-gradient-to-r from-sky-400 to-indigo-400 dark:from-sky-300 dark:to-indigo-300 bg-clip-text text-transparent">
                Kamble
              </span>
            </span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-2">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={`rounded-xl px-4 py-2 font-mono text-[0.82rem] font-medium uppercase tracking-[0.12em] transition-all duration-200 ${
                          isActive
                            ? "border border-primary/30 bg-primary/10 text-primary shadow-[0_0_15px_-4px_rgba(56,189,248,0.35)]"
                            : "text-muted-foreground hover:bg-surface/60 hover:text-foreground"
                        }`}
                      >
                        {item.label}
                      </a>
                    </li>
                  )
                })}
              </ul>
            </nav>
            <ThemeToggle theme={theme} onToggle={toggleTheme} />
          </div>
        </div>
      </header>

      <main className="relative z-10">
        <section id="hero" className="relative px-6 py-16 pt-28 md:px-10 md:py-20 md:pt-32">
          <div className="hero-circle hero-circle-1" />
          <div className="hero-circle hero-circle-2" />

          <div className="mx-auto max-w-[1600px]">
            <CTASection
              badge="Mumbai, Maharashtra"
              metaLabel="Computer Engineer · AI / ML"
              title={"Malhar\nKamble"}
              subtitle="Motivated Computer Engineering student with a strong interest in Artificial Intelligence, Machine Learning, and Software Development. Eager to apply academic knowledge and self-driven projects to real-world applications."
              secondaryLabel="GitHub"
              secondaryHref="https://github.com/malharrrrrr"
              onCtaClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            />

            {/* Quick Profile Bento Card */}
            <div className="mt-8 rounded-3xl border border-border/80 bg-surface/60 p-8 shadow-2xl backdrop-blur-xl transition-all duration-300 hover:border-primary/40 md:p-10">
              <div className="mb-6 flex items-center justify-between">
                <p className="flex items-center gap-2 font-mono text-[0.88rem] font-semibold uppercase tracking-[0.16em] text-primary">
                  <Sparkles className="h-4 w-4 text-primary" />
                  // Quick Profile
                </p>
                <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground">
                  Overview & Stats
                </span>
              </div>

              <div className="mb-10 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
                <div className="group rounded-2xl border border-border/70 bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.18)]">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                    9.25
                  </p>
                  <p className="mt-3 font-mono text-[0.92rem] font-medium uppercase tracking-[0.06em] text-muted-foreground group-hover:text-primary transition-colors">
                    Current CGPA
                  </p>
                </div>

                <div className="group rounded-2xl border border-border/70 bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.18)]">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                    2028
                  </p>
                  <p className="mt-3 font-mono text-[0.92rem] font-medium uppercase tracking-[0.06em] text-muted-foreground group-hover:text-primary transition-colors">
                    Expected Grad
                  </p>
                </div>

                <div className="group rounded-2xl border border-border/70 bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.18)]">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                    3<span className="text-primary">+</span>
                  </p>
                  <p className="mt-3 font-mono text-[0.92rem] font-medium uppercase tracking-[0.06em] text-muted-foreground group-hover:text-primary transition-colors">
                    Certifications
                  </p>
                </div>

                <div className="group rounded-2xl border border-border/70 bg-surface/75 p-6 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.18)]">
                  <p className="font-display text-5xl font-extrabold tracking-tight text-foreground md:text-6xl">
                    4<span className="text-primary">+</span>
                  </p>
                  <p className="mt-3 font-mono text-[0.92rem] font-medium uppercase tracking-[0.06em] text-muted-foreground group-hover:text-primary transition-colors">
                    Projects
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap gap-2.5">
                {quickSkills.map((skill) => (
                  <span
                    key={skill}
                    className="rounded-xl border border-border/80 bg-tag/90 px-4 py-2 font-mono text-[0.88rem] font-medium uppercase tracking-[0.06em] text-tag-foreground transition-all duration-200 hover:-translate-y-0.5 hover:border-primary hover:bg-primary hover:text-primary-foreground hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.4)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="bg-background-alt/50 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="01" title="Experience" />

            {experience.map((item) => (
              <div
                key={item.role}
                className="group relative rounded-3xl border border-border/80 bg-surface/65 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:border-primary/50 hover:shadow-[0_15px_40px_-10px_rgba(56,189,248,0.15)] md:p-12"
              >
                <div className="grid gap-6 md:grid-cols-[220px_1fr] md:gap-12">
                  <div>
                    <span className="inline-flex items-center gap-1.5 rounded-lg border border-primary/25 bg-primary/10 px-3 py-1 font-mono text-[0.88rem] font-semibold uppercase tracking-[0.1em] text-primary">
                      {item.duration}
                    </span>
                    <p className="mt-3 text-[1.2rem] font-semibold text-foreground">{item.company}</p>
                  </div>
                  <div>
                    <h3 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                      {item.role}
                    </h3>
                    <ul className="mt-6 space-y-3.5">
                      {item.points.map((point) => (
                        <li key={point} className="relative pl-6 text-[1.08rem] leading-relaxed text-muted-foreground">
                          <span className="absolute left-0 top-2.5 h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.6)]" />
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="02" title="Projects" />

            <div className="grid gap-6 md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="group relative flex flex-col justify-between rounded-3xl border border-border/80 bg-surface/60 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/60 hover:shadow-[0_20px_40px_-15px_rgba(56,189,248,0.2)] md:p-10"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <span className="rounded-lg border border-primary/30 bg-primary/10 px-3 py-1 font-mono text-[0.82rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_0_12px_-3px_rgba(56,189,248,0.25)]">
                        {project.id}
                      </span>
                      <span className="rounded-lg border border-border/70 bg-surface/80 px-3 py-1 font-mono text-[0.82rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                        {project.date}
                      </span>
                    </div>

                    <h3 className="mt-5 font-display text-[1.85rem] font-bold leading-tight tracking-tight text-foreground transition-colors duration-200 group-hover:text-primary">
                      {project.name}
                    </h3>

                    <ul className="mt-6 space-y-3 text-[1.04rem] leading-relaxed text-muted-foreground">
                      {project.points.map((point) => (
                        <li key={point} className="relative pl-5">
                          <span className="absolute left-0 top-0 font-bold text-primary">›</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="mt-8 flex items-center justify-between border-t border-border/60 pt-6">
                    <span className="font-mono text-xs uppercase tracking-widest text-muted-foreground group-hover:text-primary transition-colors">
                      Featured Project
                    </span>
                    <ArrowUpRight className="h-5 w-5 text-muted-foreground transition-all duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-primary" />
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Skills Section */}
        <section id="skills" className="bg-background-alt/50 px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="03" title="Skills" />

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <article
                  key={group.title}
                  className="rounded-3xl border border-border/80 bg-surface/65 p-8 shadow-xl backdrop-blur-xl transition-all duration-300 hover:-translate-y-1 hover:border-primary/50 hover:shadow-[0_15px_30px_-10px_rgba(56,189,248,0.15)]"
                >
                  <div className="mb-6 flex items-center gap-2.5">
                    <span className="h-2 w-2 rounded-full bg-primary shadow-[0_0_8px_rgba(56,189,248,0.8)]" />
                    <h3 className="font-mono text-[0.94rem] font-bold uppercase tracking-[0.14em] text-primary">
                      {group.title}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-xl border border-border/80 bg-tag/80 px-3.5 py-1.5 font-mono text-[0.86rem] font-medium tracking-[0.04em] text-tag-foreground transition-all duration-200 hover:border-primary/60 hover:bg-primary/10 hover:text-primary hover:scale-[1.03]"
                      >
                        {item}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Education & Certifications Section */}
        <section id="education" className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="04" title="Education & Certifications" />

            <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
              <article className="rounded-3xl border border-border/80 bg-surface/60 p-8 shadow-xl backdrop-blur-xl md:p-12">
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[0.88rem] font-bold uppercase tracking-[0.1em] text-primary shadow-[0_0_15px_-3px_rgba(56,189,248,0.25)]">
                  CGPA: 9.25
                </span>

                <h3 className="mt-6 font-display text-4xl font-extrabold leading-tight tracking-tight text-foreground md:text-5xl">
                  B.Tech in
                  <br />
                  Computer Engineering
                </h3>

                <p className="mt-3 font-mono text-[0.98rem] font-medium uppercase tracking-[0.08em] text-muted-foreground">
                  University of Mumbai · 2024 - 2028
                </p>

                <div className="mt-8 rounded-2xl border border-border/60 bg-surface/80 p-6 backdrop-blur-md">
                  <p className="font-mono text-xs uppercase tracking-widest text-primary mb-3">Core Coursework</p>
                  <p className="font-mono text-[0.96rem] leading-relaxed text-muted-foreground">
                    Data Structures & Algorithms · Computer Networks
                    <br />
                    Operating Systems · Micro-processors
                    <br />
                    Probability & Statistics · Linear Algebra
                  </p>
                </div>

                <div className="mt-8 flex flex-wrap gap-4 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-4 py-2 font-mono text-xs uppercase tracking-wider">
                    <MapPin className="h-4 w-4 text-primary" />
                    Mumbai, Maharashtra, India
                  </span>
                  <span className="inline-flex items-center gap-2 rounded-xl border border-border/80 bg-surface/80 px-4 py-2 font-mono text-xs uppercase tracking-wider">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Open to internships and collaborations
                  </span>
                </div>
              </article>

              <div className="space-y-4">
                <div className="mb-2 flex items-center justify-between px-2">
                  <span className="font-mono text-xs font-semibold uppercase tracking-widest text-primary">
                    Verified Certifications
                  </span>
                  <span className="font-mono text-xs text-muted-foreground">
                    {certifications.length} credentials
                  </span>
                </div>

                {certifications.map((cert) => (
                  <article
                    key={cert.name}
                    className="group relative overflow-hidden rounded-2xl border border-border/80 bg-surface/60 p-6 shadow-md backdrop-blur-xl transition-all duration-300 hover:translate-x-1.5 hover:border-primary/60 hover:shadow-[0_10px_25px_-5px_rgba(56,189,248,0.15)]"
                  >
                    <div className="absolute inset-y-0 left-0 w-1.5 bg-gradient-to-b from-sky-400 to-indigo-500 rounded-r" />
                    <div className="pl-3">
                      <h4 className="text-[1.14rem] font-semibold text-foreground transition-colors duration-200 group-hover:text-primary">
                        {cert.name}
                      </h4>
                      <p className="mt-1 font-mono text-[0.86rem] uppercase tracking-[0.08em] text-muted-foreground">
                        {cert.issuer} · {cert.year}
                      </p>
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section
          id="contact"
          className="relative z-10 overflow-hidden bg-ink px-6 py-24 text-ink-foreground md:px-10 md:py-32"
        >
          {/* Ambient Glows */}
          <div className="pointer-events-none absolute -bottom-24 right-0 h-[450px] w-[450px] rounded-full bg-primary/15 blur-[120px]" />
          <div className="pointer-events-none absolute top-10 left-10 h-[300px] w-[300px] rounded-full bg-indigo-500/10 blur-[100px]" />

          <div className="relative z-10 mx-auto max-w-[1600px]">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <span className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 font-mono text-[0.85rem] font-semibold uppercase tracking-[0.14em] text-primary shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)]">
                  Contact
                </span>
                <h2 className="mt-6 font-display text-[clamp(3.4rem,7vw,5.6rem)] font-extrabold leading-[0.95] tracking-[-0.035em]">
                  Let&apos;s
                  <br />
                  <span className="bg-gradient-to-r from-sky-400 via-cyan-300 to-indigo-400 bg-clip-text text-transparent">
                    connect.
                  </span>
                </h2>
                <p className="mt-6 max-w-[480px] text-[1.12rem] leading-relaxed text-ink-muted">
                  Open to internships, collaborations, and interesting conversations around AI,
                  ML, and software engineering.
                </p>
              </div>

              <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-8 shadow-2xl backdrop-blur-2xl md:p-12">
                <a
                  href="mailto:malhar.vikson@gmail.com"
                  className="group flex items-center justify-between border-b border-white/15 pb-6 font-display text-2xl font-bold tracking-tight text-ink-foreground transition-all hover:border-primary hover:text-primary md:text-3xl"
                >
                  <span className="flex items-center gap-3">
                    <Mail className="h-6 w-6 text-primary transition-transform duration-300 group-hover:scale-110" />
                    malhar.vikson@gmail.com
                  </span>
                  <ArrowUpRight className="h-6 w-6 text-ink-muted transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-primary" />
                </a>

                <a
                  href="tel:+917715056658"
                  className="mt-6 flex items-center gap-3 font-mono text-[1.05rem] uppercase tracking-[0.08em] text-ink-muted transition-colors hover:text-primary"
                >
                  <Phone className="h-4 w-4 text-primary" />
                  +91 77150 56658
                </a>

                <div className="mt-10">
                  <p className="mb-4 font-mono text-xs uppercase tracking-widest text-ink-muted">
                    Find Me Online
                  </p>
                  <ul className="flex flex-wrap gap-3">
                    {socialLinks.map(({ label, href, icon: Icon }) => (
                      <li key={label}>
                        <a
                          href={href}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex items-center gap-2.5 rounded-xl border border-white/15 bg-white/5 px-5 py-3 font-mono text-[0.92rem] uppercase tracking-[0.08em] text-ink-foreground backdrop-blur-md transition-all duration-300 hover:-translate-y-0.5 hover:border-primary hover:bg-primary/20 hover:text-primary hover:shadow-[0_0_20px_-3px_rgba(56,189,248,0.4)]"
                        >
                          <Icon className="h-4 w-4" />
                          {label}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-24 flex flex-col gap-4 border-t border-white/10 pt-8 font-mono text-[0.88rem] uppercase tracking-[0.1em] text-ink-foreground/40 md:flex-row md:items-center md:justify-between">
              <span>Malhar Kamble — Computer Engineer</span>
              <span>Mumbai, Maharashtra · 2026</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
