import { useState } from "react";
import { BarChart3, Check, Clock, FileText, Github, History, Home, Linkedin, ListChecks, Mail, MessageSquareText, NotebookPen, Settings, Target, Twitter, Zap, Lightbulb, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { SectionHeading } from "./FeatureCards";
import { Logo } from "./Navbar";
import { Chip } from "./Hero";

export function HowItWorks() {
  const steps = [
    ["01", "Tell AI what you need", "Enter an email request, meeting transcript, or goal."],
    ["02", "AI does the heavy lifting", "Our AI analyzes your input and creates useful, structured output."],
    ["03", "Review, edit, and act", "Customize the result and get straight to work."],
  ];
  return (
    <section id="how-it-works" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="How it works" title="Three steps. Zero busywork." />
      <ol className="mt-16 grid gap-6 md:grid-cols-3">
        {steps.map(([n, t, d]) => (
          <li key={n} className="relative rounded-3xl border border-border bg-card p-8 shadow-soft">
            <span className="text-5xl font-bold text-gradient">{n}</span>
            <h3 className="mt-4 text-lg font-semibold">{t}</h3>
            <p className="mt-2 text-sm text-muted-foreground">{d}</p>
          </li>
        ))}
      </ol>
    </section>
  );
}

export function Benefits() {
  const items = [
    [Clock, "Save hours every week", "Automate the writing and planning that eats your day."],
    [MessageSquareText, "Write clearer communication", "Consistent, on-tone emails every single time."],
    [FileText, "Never lose meeting decisions", "Every decision and owner captured automatically."],
    [ListChecks, "Auto-prioritize your workload", "AI ranks tasks by urgency and impact."],
    [Target, "Focus on high-impact work", "See exactly what matters most today."],
    [Lightbulb, "Turn ideas into plans", "Go from a messy thought to clear next steps."],
  ] as const;
  return (
    <section className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Benefits" title="Less busywork. More meaningful work." />
        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map(([Icon, t, d]) => (
            <div key={t} className="flex gap-4 rounded-2xl bg-card p-6 shadow-soft transition-transform hover:-translate-y-1">
              <span className="grid size-11 shrink-0 place-items-center rounded-xl bg-brand text-primary-foreground"><Icon className="size-5" /></span>
              <div><h3 className="font-semibold">{t}</h3><p className="mt-1 text-sm text-muted-foreground">{d}</p></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function DashboardPreview() {
  const nav = [[Home, "Overview"], [Mail, "Email Generator"], [NotebookPen, "Meeting Notes"], [CheckCircle2, "Task Planner"], [History, "History"], [Settings, "Settings"]] as const;
  const stats = [["Emails generated", "24", Mail], ["Meetings summarized", "8", NotebookPen], ["Tasks completed", "37", CheckCircle2], ["Productivity score", "92%", BarChart3]] as const;
  const [done, setDone] = useState<Record<string, boolean>>({ "Reply to client feedback": true });
  const focus = [["Finalize Q3 launch brief", "High"], ["Reply to client feedback", "High"], ["Review meeting action items", "Medium"], ["Plan next week's sprint", "Low"]];
  return (
    <section className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Dashboard" title="Your whole workday, in one place." />
      <div className="mt-16 overflow-hidden rounded-3xl border border-border bg-card shadow-glow">
        <div className="grid md:grid-cols-[220px_1fr]">
          <aside className="hidden border-r border-border bg-sidebar p-4 md:block">
            <div className="mb-6 px-2 text-sm"><Logo /></div>
            <ul className="space-y-1 text-sm">{nav.map(([I, l], i) => (
              <li key={l} className={`flex items-center gap-2.5 rounded-lg px-3 py-2 ${i === 0 ? "bg-sidebar-accent font-medium text-sidebar-accent-foreground" : "text-muted-foreground"}`}><I className="size-4" />{l}</li>
            ))}</ul>
          </aside>
          <div className="p-6 sm:p-8">
            <h3 className="text-2xl font-bold">Good morning 👋</h3>
            <p className="text-sm text-muted-foreground">Here's how your week is going.</p>
            <div className="mt-6 grid grid-cols-2 gap-4 lg:grid-cols-4">
              {stats.map(([l, v, I]) => (
                <div key={l} className="rounded-2xl border border-border p-4">
                  <I className="size-4 text-primary" /><p className="mt-3 text-2xl font-bold">{v}</p><p className="text-xs text-muted-foreground">{l}</p>
                </div>
              ))}
            </div>
            <div className="mt-6 rounded-2xl border border-border p-5">
              <h4 className="mb-3 flex items-center gap-2 font-semibold"><Zap className="size-4 text-primary" />Today's Focus</h4>
              <ul className="space-y-2">{focus.map(([t, p]) => (
                <li key={t}>
                  <label className="flex cursor-pointer items-center gap-3 rounded-lg bg-muted px-3 py-2.5 text-sm">
                    <input type="checkbox" className="size-4 accent-[var(--primary)]" checked={!!done[t]} onChange={() => setDone({ ...done, [t]: !done[t] })} />
                    <span className={`flex-1 ${done[t] ? "text-muted-foreground line-through" : ""}`}>{t}</span><Chip>{p}</Chip>
                  </label>
                </li>
              ))}</ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function Testimonials() {
  const t = [
    ["Sarah M.", "Marketing Manager", "SmartWork AI saves me hours every week. I especially love the meeting summaries and action items."],
    ["David K.", "Startup Founder", "The task planner turns my messy ideas into an organized plan almost instantly."],
    ["Jessica R.", "Sales Director", "The email generator has completely changed how quickly I can respond to clients."],
  ];
  return (
    <section id="testimonials" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        <SectionHeading eyebrow="Testimonials" title="Loved by busy people." sub="Sample testimonials from fictional users." />
        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {t.map(([n, r, q]) => (
            <figure key={n} className="flex flex-col rounded-3xl bg-card p-8 shadow-soft">
              <div className="text-warning" aria-label="5 stars">★★★★★</div>
              <blockquote className="mt-4 flex-1 leading-relaxed">“{q}”</blockquote>
              <figcaption className="mt-6 flex items-center gap-3">
                <span className="grid size-10 place-items-center rounded-full bg-brand font-semibold text-primary-foreground">{n[0]}</span>
                <div><p className="font-semibold">{n}</p><p className="text-xs text-muted-foreground">{r}</p></div>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}

export function Pricing() {
  const [yearly, setYearly] = useState(false);
  const plans = [
    { name: "Free", price: 0, cta: "Get Started", features: ["10 AI generations/month", "Basic email generator", "Meeting summaries", "Basic task planning"] },
    { name: "Pro", price: 19, cta: "Start Pro", popular: true, features: ["Unlimited AI generations", "Advanced email generation", "Unlimited meeting summaries", "AI task prioritization", "Productivity insights"] },
    { name: "Team", price: 49, cta: "Start Team Trial", features: ["Everything in Pro", "Team workspace", "Shared task planning", "Team meeting summaries", "Collaboration features", "Priority support"] },
  ];
  return (
    <section id="pricing" className="mx-auto max-w-7xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="Pricing" title="Simple, transparent pricing." />
      <div className="mt-8 flex items-center justify-center gap-3 text-sm">
        <span className={yearly ? "text-muted-foreground" : "font-medium"}>Monthly</span>
        <Switch checked={yearly} onCheckedChange={setYearly} aria-label="Toggle yearly billing" />
        <span className={yearly ? "font-medium" : "text-muted-foreground"}>Yearly <Chip>Save 20%</Chip></span>
      </div>
      <div className="mt-12 grid items-start gap-6 lg:grid-cols-3">
        {plans.map((p) => (
          <div key={p.name} className={`relative rounded-3xl border p-8 transition-transform hover:-translate-y-1 ${p.popular ? "border-primary bg-card shadow-glow lg:scale-105" : "border-border bg-card shadow-soft"}`}>
            {p.popular && <span className="absolute -top-3 left-1/2 -translate-x-1/2 rounded-full bg-brand px-3 py-1 text-xs font-semibold text-primary-foreground">Most Popular</span>}
            <h3 className="text-lg font-semibold">{p.name}</h3>
            <p className="mt-4"><span className="text-5xl font-bold">${yearly ? Math.round(p.price * 0.8) : p.price}</span><span className="text-muted-foreground">/month</span></p>
            {yearly && p.price > 0 && <p className="text-xs text-muted-foreground">billed yearly</p>}
            <Button className={`mt-6 w-full rounded-full ${p.popular ? "bg-brand" : ""}`} variant={p.popular ? "default" : "outline"}>{p.cta}</Button>
            <ul className="mt-8 space-y-3 text-sm">{p.features.map((f) => <li key={f} className="flex gap-2"><Check className="size-4 shrink-0 text-primary" />{f}</li>)}</ul>
          </div>
        ))}
      </div>
    </section>
  );
}

export function FAQ() {
  const q = [
    ["What is SmartWork AI?", "SmartWork AI is an AI productivity suite with three tools — an email generator, a meeting notes summarizer, and a task planner — designed to remove busywork from your day."],
    ["How does the AI email generator work?", "Tell it who you're writing to, why, and the tone you want. The AI drafts a polished email you can copy, edit, or regenerate."],
    ["Can I summarize recorded meetings?", "Yes. Upload or paste a transcript and get an executive summary, key points, decisions, and action items in seconds."],
    ["Can the AI automatically prioritize my tasks?", "Absolutely. Enter a goal, deadline, and available hours, and the AI builds a prioritized plan with time estimates."],
    ["Is my data secure?", "Your data is encrypted in transit and at rest, and we never use your content to train models."],
    ["Can I cancel my subscription?", "Yes, cancel anytime from your settings — no questions asked."],
    ["Is there a free plan?", "Yes! The Free plan includes 10 AI generations per month, no credit card required."],
  ];
  return (
    <section className="mx-auto max-w-3xl px-4 py-24 sm:px-6">
      <SectionHeading eyebrow="FAQ" title="Questions? Answers." />
      <Accordion type="single" collapsible className="mt-12">
        {q.map(([a, b]) => (
          <AccordionItem key={a} value={a}><AccordionTrigger className="text-left text-base">{a}</AccordionTrigger><AccordionContent className="text-muted-foreground">{b}</AccordionContent></AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}

export function FinalCTA() {
  return (
    <section className="px-4 pb-24 sm:px-6">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2rem] bg-brand px-6 py-20 text-center text-primary-foreground shadow-glow">
        <div aria-hidden className="absolute -top-20 -left-20 size-72 rounded-full bg-primary-foreground/10 blur-2xl animate-blob" />
        <div aria-hidden className="absolute -right-20 -bottom-20 size-72 rounded-full bg-primary-foreground/10 blur-2xl animate-blob [animation-delay:-6s]" />
        <h2 className="relative text-3xl font-bold tracking-tight sm:text-5xl">Ready to get more done?</h2>
        <p className="relative mx-auto mt-4 max-w-xl opacity-90">Let AI handle the busywork so you can focus on what matters.</p>
        <Button asChild size="lg" variant="secondary" className="relative mt-8 rounded-full px-8"><a href="#demo">Start for Free — No Credit Card Required</a></Button>
      </div>
    </section>
  );
}

export function Footer() {
  const links = ["Product", "Features", "Pricing", "Security", "Privacy", "Terms", "Contact"];
  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-7xl flex-col gap-8 px-4 py-12 sm:px-6 md:flex-row md:items-start md:justify-between">
        <div><Logo /><p className="mt-3 text-sm text-muted-foreground">Your intelligent productivity assistant.</p></div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-muted-foreground">{links.map((l) => <li key={l}><a href="#top" className="hover:text-foreground">{l}</a></li>)}</ul>
        <div className="flex gap-2">
          {([[Linkedin, "LinkedIn"], [Twitter, "X"], [Github, "GitHub"]] as const).map(([I, l]) => (
            <a key={l} href="#top" aria-label={l} className="grid size-9 place-items-center rounded-full border border-border transition-colors hover:bg-accent"><I className="size-4" /></a>
          ))}
        </div>
      </div>
      <p className="border-t border-border py-6 text-center text-xs text-muted-foreground">© 2026 SmartWork AI. All rights reserved.</p>
    </footer>
  );
}
