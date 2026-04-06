import {
  Github,
  GraduationCap,
  Linkedin,
  Mail,
  MapPin,
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
    name: "Marathi Voice Cloning TTS Model",
    date: "July 2025",
    points: [
      "Trained a Marathi Text-to-Speech model using a single-speaker dataset of roughly 60 minutes of audio.",
      "Explored speech synthesis techniques without transcripts and under limited GPU resources.",
      "Gained hands-on experience with model training pipelines and speech datasets.",
    ],
  },
  {
    id: "P - 02",
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
    title: "Tools & OS",
    items: ["Git", "Linux", "Shell Scripting", "Flask"],
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
    <div className="mb-14 flex items-end gap-6">
      <span className="font-mono text-[1rem] uppercase tracking-[0.16em] text-primary">{number}</span>
      <h2 className="font-serif text-[2.7rem] font-light tracking-[-0.02em] md:text-[3.3rem]">{title}</h2>
      <div className="h-px flex-1 bg-border" />
    </div>
  )
}

function App() {
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const [activeSection, setActiveSection] = useState("hero")

  useEffect(() => {
    const savedTheme = window.localStorage.getItem("portfolio-theme")
    const nextTheme = savedTheme === "dark" ? "dark" : "light"
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
    <div className="min-h-screen bg-background text-foreground">
      <div className="grain pointer-events-none fixed inset-0 z-[60] opacity-[0.03]" />

      <header className="fixed inset-x-0 top-0 z-50 border-b border-border bg-nav/88 backdrop-blur-xl">
        <div className="mx-auto flex h-[60px] max-w-[1600px] items-center justify-between px-6 md:px-10">
          <a href="#hero" className="font-serif text-[1.6rem] tracking-[0.02em]">
            Malhar <span className="text-primary">Kamble</span>
          </a>

          <div className="flex items-center gap-4">
            <nav className="hidden md:block">
              <ul className="flex items-center gap-8">
                {navItems.map((item) => {
                  const isActive = activeSection === item.href.slice(1)
                  return (
                    <li key={item.href}>
                      <a
                        href={item.href}
                        className={`font-mono text-[0.8rem] uppercase tracking-[0.14em] transition ${
                          isActive ? "text-primary" : "text-muted-foreground hover:text-primary"
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

      <main>
        <section id="hero" className="relative px-6 py-16 pt-28 md:px-10 md:py-20 md:pt-28">
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

            <div className="mt-6 border border-border bg-surface px-8 py-8 md:px-10">
              <p className="mb-8 font-mono text-[1rem] uppercase tracking-[0.16em] text-faint">
                // Quick Profile
              </p>

              <div className="mb-10 grid grid-cols-2 gap-8 md:grid-cols-4">
                <div>
                  <p className="font-serif text-6xl leading-none font-light text-foreground">
                    9.25<span className="text-primary"></span>
                  </p>
                  <p className="mt-3 text-[1.12rem] text-muted-foreground">Current CGPA</p>
                </div>
                <div>
                  <p className="font-serif text-6xl leading-none font-light text-foreground">2028</p>
                  <p className="mt-3 text-[1.12rem] text-muted-foreground">Expected Grad</p>
                </div>
                <div>
                  <p className="font-serif text-6xl leading-none font-light text-foreground">
                    3<span className="text-primary">+</span>
                  </p>
                  <p className="mt-3 text-[1.12rem] text-muted-foreground">Certifications</p>
                </div>
                <div>
                  <p className="font-serif text-6xl leading-none font-light text-foreground">
                    2<span className="text-primary">+</span>
                  </p>
                  <p className="mt-3 text-[1.12rem] text-muted-foreground">Projects</p>
                </div>
              </div>

              <div className="flex flex-wrap gap-3">
                {quickSkills.map((skill) => (
                  <span
                    key={skill}
                    className="bg-tag px-4 py-2.5 font-mono text-[1rem] uppercase tracking-[0.06em] text-tag-foreground transition hover:bg-primary hover:text-primary-foreground"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="experience" className="bg-background-alt px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="01" title="Experience" />

            {experience.map((item) => (
              <div
                key={item.role}
                className="grid gap-4 border-y border-border py-10 md:grid-cols-[200px_1fr] md:gap-12"
              >
                <div>
                  <p className="font-mono text-[1rem] uppercase tracking-[0.1em] text-primary">
                    {item.duration}
                  </p>
                  <p className="mt-2 text-[1.1rem] font-medium text-muted-foreground">{item.company}</p>
                </div>
                <div>
                  <h3 className="font-serif text-4xl font-normal text-foreground">{item.role}</h3>
                  <ul className="mt-5 space-y-3">
                    {item.points.map((point) => (
                      <li key={point} className="relative pl-5 text-[1.16rem] leading-10 text-muted-foreground">
                        <span className="absolute left-0 top-0 text-primary">-</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section id="projects" className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="02" title="Projects" />

            <div className="grid gap-px border border-border bg-border md:grid-cols-2">
              {projects.map((project) => (
                <article
                  key={project.name}
                  className="group bg-surface p-10 transition hover:bg-background-alt"
                >
                  <p className="mb-5 font-mono text-[0.96rem] uppercase tracking-[0.16em] text-faint">
                    {project.id}
                  </p>
                  <h3 className="font-serif text-[2.25rem] leading-tight font-normal text-foreground">
                    {project.name}
                  </h3>
                  <p className="mt-4 font-mono text-[0.96rem] uppercase tracking-[0.08em] text-primary">
                    {project.date}
                  </p>
                  <ul className="mt-5 space-y-3 text-[1.14rem] leading-10 text-muted-foreground">
                    {project.points.map((point) => (
                      <li key={point} className="relative pl-4">
                        <span className="absolute left-0 top-0 text-primary">·</span>
                        {point}
                      </li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="skills" className="bg-background-alt px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="03" title="Skills" />

            <div className="grid gap-px border border-border bg-border md:grid-cols-2 xl:grid-cols-3">
              {skillGroups.map((group) => (
                <article key={group.title} className="bg-surface px-8 py-9">
                  <p className="mb-5 font-mono text-[0.96rem] uppercase tracking-[0.16em] text-primary">
                    {group.title}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {group.items.map((item) => (
                      <span
                        key={item}
                        className="bg-tag px-3 py-2 font-mono text-[0.96rem] uppercase tracking-[0.06em] text-tag-foreground"
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

        <section id="education" className="px-6 py-20 md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <SectionHeader number="04" title="Education & Certifications" />

            <div className="grid gap-14 lg:grid-cols-2">
              <article>
                <h3 className="font-serif text-5xl leading-tight font-light text-foreground md:text-[3rem]">
                  B.Tech in
                  <br />
                  Computer Engineering
                </h3>
                <p className="mt-3 font-mono text-[1rem] uppercase tracking-[0.08em] text-muted-foreground">
                  University of Mumbai · 2024 - 2028
                </p>

                <span className="mt-5 inline-flex bg-tag px-4 py-2 font-mono text-[0.98rem] uppercase tracking-[0.08em] text-primary">
                  CGPA: 9.25
                </span>

                <p className="mt-6 font-mono text-[1.12rem] leading-10 tracking-[0.03em] text-faint">
                  Data Structures & Algorithms · Computer Networks
                  <br />
                  Operating Systems · Micro-processors
                  <br />
                  Probability & Statistics · Linear Algebra
                </p>

                <div className="mt-10 flex flex-wrap gap-3 text-sm text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    Mumbai, Maharashtra, India
                  </span>
                  <span className="inline-flex items-center gap-2">
                    <GraduationCap className="h-4 w-4 text-primary" />
                    Open to internships and collaborations
                  </span>
                </div>
              </article>

              <div className="space-y-5">
                {certifications.map((cert) => (
                  <article
                    key={cert.name}
                    className="border border-border border-l-2 border-l-primary bg-surface px-6 py-5 transition hover:translate-x-1"
                  >
                    <h3 className="text-[1.18rem] font-medium text-foreground">{cert.name}</h3>
                    <p className="mt-1 font-mono text-[0.92rem] uppercase tracking-[0.08em] text-faint">
                      {cert.issuer} · {cert.year}
                    </p>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="bg-ink px-6 py-20 text-ink-foreground md:px-10 md:py-28">
          <div className="mx-auto max-w-[1600px]">
            <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
              <div>
                <h2 className="font-serif text-[clamp(3rem,7vw,5.5rem)] leading-[0.96] font-light tracking-[-0.03em]">
                  Let&apos;s
                  <br />
                  <em className="text-primary not-italic">connect.</em>
                </h2>
                <p className="mt-6 max-w-[480px] text-[1.08rem] leading-9 text-ink-muted">
                  Open to internships, collaborations, and interesting conversations around AI,
                  ML, and software engineering.
                </p>
              </div>

              <div>
                <a
                  href="mailto:malhar.vikson@gmail.com"
                  className="block border-b border-white/20 pb-4 font-serif text-3xl font-light transition hover:border-primary hover:text-primary"
                >
                  malhar.vikson@gmail.com
                </a>
                <a
                  href="tel:+917715056658"
                  className="mt-8 block font-mono text-[1.05rem] uppercase tracking-[0.08em] text-ink-muted"
                >
                  +91 77150 56658
                </a>

                <ul className="mt-8 flex flex-wrap gap-4">
                  {socialLinks.map(({ label, href, icon: Icon }) => (
                    <li key={label}>
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-2 border border-white/20 px-5 py-3.5 font-mono text-[0.98rem] uppercase tracking-[0.08em] text-ink-foreground/70 transition hover:border-primary hover:text-primary"
                      >
                        <Icon className="h-4 w-4" />
                        {label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-20 flex flex-col gap-3 border-t border-white/10 pt-8 font-mono text-[0.94rem] uppercase tracking-[0.08em] text-ink-foreground/30 md:flex-row md:items-center md:justify-between">
              <span>Malhar Kamble - Computer Engineer</span>
              <span>Mumbai, Maharashtra · 2026</span>
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App
