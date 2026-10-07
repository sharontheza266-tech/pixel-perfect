import { Button } from "@/components/ui/button";
import { Chip } from "./Hero";

export function SectionHeading({ eyebrow, title, sub }: { eyebrow: string; title: string; sub?: string }) {
  return (
    <div className="mx-auto max-w-2xl text-center">
      <p className="text-sm font-semibold uppercase tracking-widest text-primary">{eyebrow}</p>
      <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-5xl">{title}</h2>
      {sub && <p className="mt-4 text-muted-foreground">{sub}</p>}
    </div>
  );
}

function Card({ icon, title, desc, cta, children }: { icon: string; title: string; desc: string; cta: string; children: React.ReactNode }) {
  return (
    <article className="group flex flex-col rounded-3xl border border-border bg-card p-6 shadow-soft transition-all duration-300 hover:-translate-y-1 hover:shadow-glow sm:p-8">
      <span className="grid size-12 place-items-center rounded-2xl bg-accent text-2xl" aria-hidden>{icon}</span>
      <h3 className="mt-5 text-xl font-semibold">{title}</h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{desc}</p>
      <div className="my-6 flex-1 rounded-2xl bg-muted p-4 text-sm">{children}</div>
      <Button asChild className="rounded-full bg-brand"><a href="#demo">{cta}</a></Button>
    </article>
  );
}

export function FeatureCards() {
  return (
    <section id="features" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Features" title="Everything you need to work smarter." />
      <div className="mt-16 grid gap-6 lg:grid-cols-3">
        <Card icon="✉️" title="Smart Email Generator" cta="Generate Email" desc="Create polished, professional emails in seconds. Choose the tone, purpose, and audience and let AI do the writing.">
          <div className="space-y-2 text-xs">
            {[["Email type", "Follow-up"], ["Tone", "Professional"], ["Length", "Concise"]].map(([k, v]) => (
              <div key={k} className="flex justify-between rounded-lg bg-card px-3 py-2"><span className="text-muted-foreground">{k}</span><span className="font-medium">{v}</span></div>
            ))}
            <p className="rounded-lg border border-primary/20 bg-card p-3 leading-relaxed">“Hi Sarah, I wanted to follow up on our conversation and see if you had a chance to review the proposal. I’d be happy to answer any questions.”</p>
          </div>
        </Card>
        <Card icon="📝" title="Meeting Notes Summarizer" cta="Summarize Meeting" desc="Turn lengthy meeting transcripts into concise summaries, decisions, key discussion points, and action items.">
          <dl className="space-y-3 text-xs">
            <div><dt className="font-semibold">Key Discussion Points</dt><dd className="text-muted-foreground">Q3 roadmap, onboarding flow, budget</dd></div>
            <div><dt className="font-semibold">Decisions</dt><dd className="text-muted-foreground">Ship beta on May 12</dd></div>
            <div><dt className="font-semibold">Action Items</dt><dd className="text-muted-foreground">Dana → pricing · Leo → QA plan</dd></div>
            <div><dt className="font-semibold">Participants</dt><dd className="mt-1 flex -space-x-2">{["D", "L", "M", "S"].map((p) => <span key={p} className="grid size-6 place-items-center rounded-full border-2 border-muted bg-brand text-[10px] font-bold text-primary-foreground">{p}</span>)}</dd></div>
          </dl>
        </Card>
        <Card icon="✅" title="AI Task Planner" cta="Plan My Tasks" desc="Turn your goals into an organized action plan. AI prioritizes tasks, estimates effort, and helps you focus on what matters most.">
          <div className="grid grid-cols-2 gap-2 text-xs">
            {[["High Priority", "4", "text-destructive"], ["In Progress", "3", "text-electric"], ["Completed", "12", "text-success"], ["Due Today", "2", "text-warning"]].map(([k, v, c]) => (
              <div key={k} className="rounded-lg bg-card p-3"><p className={`text-2xl font-bold ${c}`}>{v}</p><p className="text-muted-foreground">{k}</p></div>
            ))}
            <div className="col-span-2 flex items-center justify-between rounded-lg bg-card p-2"><span>Finalize launch brief</span><Chip>High</Chip></div>
          </div>
        </Card>
      </div>
    </section>
  );
}
