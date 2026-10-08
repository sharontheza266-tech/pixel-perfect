import { useEffect, useState } from "react";
import { Menu, Moon, Sparkles, Sun, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  ["Features", "#features"],
  ["How It Works", "#how-it-works"],
  ["Pricing", "#pricing"],
  ["Testimonials", "#testimonials"],
];

export function Logo() {
  return (
    <a href="#top" className="flex items-center gap-2 font-semibold tracking-tight">
      <span className="grid size-8 place-items-center rounded-lg bg-brand text-primary-foreground shadow-glow">
        <Sparkles className="size-4" />
      </span>
      SmartWork <span className="text-gradient">AI</span>
    </a>
  );
}

export function Navbar() {
  const [open, setOpen] = useState(false);
  const [dark, setDark] = useState(false);
  useEffect(() => {
    setDark(document.documentElement.classList.contains("dark") || localStorage.getItem("theme") === "dark");
  }, []);
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("theme", dark ? "dark" : "light");
  }, [dark]);

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 glass">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6" aria-label="Main">
        <Logo />
        <ul className="hidden items-center gap-8 text-sm text-muted-foreground md:flex">
          {links.map(([l, h]) => (
            <li key={h}><a href={h} className="transition-colors hover:text-foreground">{l}</a></li>
          ))}
        </ul>
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" aria-label="Toggle dark mode" onClick={() => setDark((d) => !d)}>
            {dark ? <Sun className="size-4" /> : <Moon className="size-4" />}
          </Button>
          <Button asChild className="hidden rounded-full bg-brand shadow-glow md:inline-flex"><a href="#pricing">Get Started</a></Button>
          <Button variant="ghost" size="icon" className="md:hidden" aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)}>
            {open ? <X className="size-5" /> : <Menu className="size-5" />}
          </Button>
        </div>
      </nav>
      {open && (
        <div className="border-t border-border px-4 pb-4 md:hidden">
          <ul className="flex flex-col py-2">
            {links.map(([l, h]) => (
              <li key={h}><a href={h} onClick={() => setOpen(false)} className="block py-3 text-sm">{l}</a></li>
            ))}
          </ul>
          <div className="flex gap-2">
            <Button asChild className="flex-1 bg-brand"><a href="#pricing" onClick={() => setOpen(false)}>Get Started</a></Button>
          </div>
        </div>
      )}
    </header>
  );
}
