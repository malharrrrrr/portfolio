import { Moon, Sun } from "lucide-react"

type ThemeToggleProps = {
  theme: "light" | "dark"
  onToggle: () => void
}

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const isLight = theme === "light"

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label="Toggle color mode"
      className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-border/80 bg-surface/80 text-muted-foreground backdrop-blur-md transition-all duration-300 hover:border-primary/60 hover:text-primary hover:shadow-[0_0_15px_-3px_rgba(56,189,248,0.3)] cursor-pointer"
    >
      {isLight ? (
        <Moon className="h-4 w-4 transition-transform duration-300 hover:rotate-12" />
      ) : (
        <Sun className="h-4 w-4 transition-transform duration-300 hover:rotate-45" />
      )}
    </button>
  )
}
