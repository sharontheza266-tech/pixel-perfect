import { ArrowRight, CheckCircle2, Mail, NotebookPen, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden">
      <div aria-hidden className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-32 left-1/4 size-[28rem] rounded-full bg-primary/20 blur-3xl animate-blob" />
        <div className="absolute top-20 right-0 size-[24rem] rounded-full bg-electric/20 blur-3xl animate-blob [animation-delay:-5s]" />
        <div className="absolute inset-0 bg-[radial-gradient(var(--border)_1px,transparent_1px)] [background-size:24px_24px] [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />
      </div>
      <div className="mx-auto max-w-7xl px-4 pt-20 pb-16 text-center sm:px-6 md:pt-28">
        <span className="inline-flex items-center gap-2 rounded-full border border-border glass px-4 py-1.5 text-xs font-medium text-accent-foreground shadow-soft">
          <Sparkles className="size-3.5 text-primary" /> AI-powered productivity, simplified
        </span>
        <h1 className="mx-auto mt-6 max-w-4xl text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl">
          Turn busywork into <span className="text-gradient">progress</span> with AI.
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-lg text-muted-foreground">
          Write better emails, transform meetings into actionable notes, and organize your day with an intelligent AI task planner.
        </p>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="lg" className="rounded-full bg-brand px-8 shadow-glow transition-transform hover:-translate-y-0.5">
            <a href="#demo">Start for Free <ArrowRight className="size-4" /></a>
          </Button>
          <Button asChild size="lg" variant="outline" className="rounded-full px-8">
            <a href="#how-it-works">See How It Works</a>
          </Button>
        </div>

        <div className="relative mx-auto mt-16 max-w-5xl rounded-3xl border border-border glass p-3 shadow-glow">
          <div className="rounded-2xl border border-border bg-card p-4 text-left sm:p-6">
            <div className="mb-4 flex gap-1.5"><span className="size-3 rounded-full bg-destructive/60" /><span className="size-3 rounded-full bg-warning/70" /><span className="size-3 rounded-full bg-success/70" /></div>
            <div className="grid gap-4 md:grid-cols-3">
              <PreviewCard icon={<Mail className="size-4" />} title="Smart Email">
                <div className="space-y-2 text-xs text-muted-foreground">
                  <div className="flex gap-1.5"><Chip>Follow-up</Chip><Chip>Professional</Chip></div>
                  <p className="rounded-lg bg-muted p-3 leading-relaxed">Hi Sarah, I wanted to follow up on our conversation and see if you had a chance to review the proposal…</p>
                </div>
              </PreviewCard>
              <PreviewCard icon={<NotebookPen className="size-4" />} title="Meeting Notes">
                <ul className="space-y-2 text-xs text-muted-foreground">
                  <li className="rounded-lg bg-muted p-2"><b className="text-foreground">Decision:</b> Launch beta on May 12</li>
                  <li className="rounded-lg bg-muted p-2"><b className="text-foreground">Action:</b> Dana to finalize pricing</li>
                  <li className="rounded-lg bg-muted p-2"><b className="text-foreground">Key point:</b> Onboarding needs polish</li>
                </ul>
              </PreviewCard>
              <PreviewCard icon={<CheckCircle2 className="size-4" />} title="Task Planner">
                <ul className="space-y-2 text-xs">
                  {[["Prepare Q3 deck", "High"], ["Review hiring plan", "Medium"], ["Inbox zero", "Low"]].map(([t, p]) => (
                    <li key={t} className="flex items-center justify-between rounded-lg bg-muted p-2">
                      <span>{t}</span><Chip>{p}</Chip>
                    </li>
                  ))}
                </ul>
              </PreviewCard>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function PreviewCard({ icon, title, children }: { icon: React.ReactNode; title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border p-4 transition-all hover:-translate-y-1 hover:shadow-soft">
      <div className="mb-3 flex items-center gap-2 text-sm font-semibold">
        <span className="grid size-7 place-items-center rounded-md bg-accent text-primary">{icon}</span>{title}
      </div>
      {children}
    </div>
  );
}

export function Chip({ children }: { children: React.ReactNode }) {
  return <span className="rounded-full bg-accent px-2 py-0.5 text-[11px] font-medium text-accent-foreground">{children}</span>;
}
