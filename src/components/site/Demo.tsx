import { useState } from "react";
import { Copy, Loader2, Pencil, RefreshCw, Sparkles, Upload, ClipboardPaste } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { generateEmail, planTasks, summarizeMeeting, type MeetingSummary, type PlanTask } from "@/lib/ai";
import { SectionHeading } from "./FeatureCards";
import { Chip } from "./Hero";

function Thinking() {
  return (
    <div className="flex h-full min-h-60 flex-col items-center justify-center gap-3 text-sm text-muted-foreground" role="status">
      <div className="flex gap-1.5">{[0, 1, 2].map((i) => <span key={i} className="size-2.5 animate-bounce rounded-full bg-brand" style={{ animationDelay: `${i * 0.15}s` }} />)}</div>
      AI is thinking…
    </div>
  );
}
function Empty({ text }: { text: string }) {
  return <div className="flex min-h-60 flex-col items-center justify-center gap-2 text-center text-sm text-muted-foreground"><Sparkles className="size-6 text-primary" />{text}</div>;
}
function Err({ msg }: { msg?: string | undefined }) { return msg ? <p className="text-xs text-destructive">{msg}</p> : null; }
const copy = async (t: string) => { await navigator.clipboard.writeText(t); toast.success("Copied to clipboard"); };
const Panel = ({ children }: { children: React.ReactNode }) => <div className="rounded-2xl border border-border bg-card p-5 shadow-soft">{children}</div>;
const GenBtn = ({ loading, children }: { loading: boolean; children: React.ReactNode }) => (
  <Button type="submit" disabled={loading} className="w-full rounded-full bg-brand">{loading ? <Loader2 className="size-4 animate-spin" /> : <Sparkles className="size-4" />}{children}</Button>
);

export function EmailGenerator() {
  const [f, setF] = useState({ recipient: "", purpose: "", tone: "Professional", context: "" });
  const [errs, setErrs] = useState<{ [k: string]: string | undefined }>({});
  const [out, setOut] = useState("");
  const [loading, setLoading] = useState(false);
  const [editing, setEditing] = useState(false);
  const run = async () => {
    const e: { [k: string]: string } = {};
    if (!f.recipient.trim()) e["recipient"] = "Recipient is required";
    if (f.purpose.trim().length < 3) e["purpose"] = "Describe the purpose";
    setErrs(e); if (Object.keys(e).length) return;
    setLoading(true); setEditing(false);
    try { setOut(await generateEmail(f)); toast.success("Email generated"); } finally { setLoading(false); }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(); }} noValidate>
        <div className="space-y-1.5"><Label htmlFor="rec">Recipient</Label><Input id="rec" placeholder="Sarah Miller" value={f.recipient} onChange={(e) => setF({ ...f, recipient: e.target.value })} aria-invalid={!!errs["recipient"]} /><Err msg={errs["recipient"]} /></div>
        <div className="space-y-1.5"><Label htmlFor="pur">Purpose</Label><Input id="pur" placeholder="Following up on the proposal" value={f.purpose} onChange={(e) => setF({ ...f, purpose: e.target.value })} aria-invalid={!!errs["purpose"]} /><Err msg={errs["purpose"]} /></div>
        <div className="space-y-1.5"><Label>Tone</Label>
          <Select value={f.tone} onValueChange={(v) => setF({ ...f, tone: v })}><SelectTrigger aria-label="Tone"><SelectValue /></SelectTrigger>
            <SelectContent>{["Professional", "Friendly", "Persuasive", "Formal"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-1.5"><Label htmlFor="ctx">Additional context</Label><Textarea id="ctx" rows={4} placeholder="We met last Tuesday at the conference…" value={f.context} onChange={(e) => setF({ ...f, context: e.target.value })} /></div>
        <GenBtn loading={loading}>Generate Email</GenBtn>
      </form>
      <Panel>
        {loading ? <Thinking /> : out ? (
          <div className="space-y-4">
            <div className="flex items-center justify-between"><h4 className="font-semibold">Generated email</h4><Chip>{f.tone}</Chip></div>
            {editing ? <Textarea rows={12} value={out} onChange={(e) => setOut(e.target.value)} /> : <p className="whitespace-pre-line text-sm leading-relaxed">{out}</p>}
            <div className="flex flex-wrap gap-2">
              <Button size="sm" variant="outline" onClick={() => copy(out)}><Copy className="size-3.5" />Copy</Button>
              <Button size="sm" variant="outline" onClick={run}><RefreshCw className="size-3.5" />Regenerate</Button>
              <Button size="sm" variant="outline" onClick={() => setEditing(!editing)}><Pencil className="size-3.5" />{editing ? "Done" : "Edit"}</Button>
            </div>
          </div>
        ) : <Empty text="Your AI-written email will appear here." />}
      </Panel>
    </div>
  );
}

const SAMPLE = "Dana opened by reviewing the Q3 roadmap. The team agreed the onboarding flow needs more polish before launch. We decided to ship the beta on May 12. Leo will prepare a QA plan by Friday. Budget concerns were raised about the marketing spend. Dana needs to finalize pricing tiers next week.";

export function MeetingSummarizer() {
  const [text, setText] = useState("");
  const [err, setErr] = useState("");
  const [out, setOut] = useState<MeetingSummary | null>(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    if (text.trim().length < 40) { setErr("Please add a transcript of at least 40 characters"); return; }
    setErr(""); setLoading(true);
    try { setOut(await summarizeMeeting(text)); toast.success("Meeting summarized"); } finally { setLoading(false); }
  };
  const onFile = async (file?: File) => { if (file) { setText(await file.text()); toast.success(`Loaded ${file.name}`); } };
  const paste = async () => { try { setText(await navigator.clipboard.readText()); } catch { setText(SAMPLE); toast("Loaded a sample transcript"); } };
  const asText = out ? `Summary: ${out.executive}\n\nKey points:\n- ${out.keyPoints.join("\n- ")}\n\nDecisions:\n- ${out.decisions.join("\n- ")}\n\nAction items:\n- ${out.actions.join("\n- ")}` : "";
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(); }} noValidate>
        <div className="space-y-1.5"><Label htmlFor="tr">Meeting transcript</Label><Textarea id="tr" rows={11} placeholder="Paste your meeting transcript here…" value={text} onChange={(e) => setText(e.target.value)} aria-invalid={!!err} /><Err msg={err} /></div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" variant="outline" asChild><label className="cursor-pointer"><Upload className="size-4" />Upload Transcript<input type="file" accept=".txt,.md,.vtt,.srt" className="sr-only" onChange={(e) => onFile(e.target.files?.[0])} /></label></Button>
          <Button type="button" variant="outline" onClick={paste}><ClipboardPaste className="size-4" />Paste Text</Button>
          <Button type="button" variant="ghost" onClick={() => setText(SAMPLE)}>Use sample</Button>
        </div>
        <GenBtn loading={loading}>Summarize</GenBtn>
      </form>
      <Panel>
        {loading ? <Thinking /> : out ? (
          <div className="space-y-4 text-sm">
            <div className="flex items-center justify-between"><h4 className="font-semibold">Executive Summary</h4><Button size="sm" variant="outline" onClick={() => copy(asText)}><Copy className="size-3.5" />Copy</Button></div>
            <p className="text-muted-foreground">{out.executive}</p>
            {([["Key Points", out.keyPoints], ["Decisions", out.decisions], ["Action Items", out.actions]] as const).map(([h, items]) => (
              <div key={h}><h5 className="mb-1.5 font-semibold">{h}</h5><ul className="space-y-1.5">{items.map((i) => <li key={i} className="rounded-lg bg-muted px-3 py-2">{i}</li>)}</ul></div>
            ))}
          </div>
        ) : <Empty text="Your summary, decisions, and action items will appear here." />}
      </Panel>
    </div>
  );
}

const prioColor: Record<string, string> = { High: "text-destructive", Medium: "text-warning", Low: "text-success" };

export function TaskPlanner() {
  const [f, setF] = useState({ goal: "", deadline: "", priority: "High", hours: "10" });
  const [errs, setErrs] = useState<{ [k: string]: string | undefined }>({});
  const [out, setOut] = useState<PlanTask[] | null>(null);
  const [loading, setLoading] = useState(false);
  const run = async () => {
    const e: { [k: string]: string } = {};
    if (f.goal.trim().length < 3) e["goal"] = "Tell us your goal";
    const h = Number(f.hours); if (!h || h <= 0 || h > 200) e["hours"] = "Enter 1–200 hours";
    setErrs(e); if (Object.keys(e).length) return;
    setLoading(true);
    try { setOut(await planTasks(f.goal, f.deadline, f.priority, h)); toast.success("Task plan created"); } finally { setLoading(false); }
  };
  return (
    <div className="grid gap-6 lg:grid-cols-[2fr_3fr]">
      <form className="space-y-4" onSubmit={(e) => { e.preventDefault(); run(); }} noValidate>
        <div className="space-y-1.5"><Label htmlFor="goal">Goal</Label><Input id="goal" placeholder="Launch the new marketing website" value={f.goal} onChange={(e) => setF({ ...f, goal: e.target.value })} aria-invalid={!!errs["goal"]} /><Err msg={errs["goal"]} /></div>
        <div className="space-y-1.5"><Label htmlFor="dl">Deadline</Label><Input id="dl" type="date" value={f.deadline} onChange={(e) => setF({ ...f, deadline: e.target.value })} /></div>
        <div className="space-y-1.5"><Label>Priority</Label>
          <Select value={f.priority} onValueChange={(v) => setF({ ...f, priority: v })}><SelectTrigger aria-label="Priority"><SelectValue /></SelectTrigger>
            <SelectContent>{["High", "Medium", "Low"].map((t) => <SelectItem key={t} value={t}>{t}</SelectItem>)}</SelectContent></Select>
        </div>
        <div className="space-y-1.5"><Label htmlFor="hrs">Available hours</Label><Input id="hrs" type="number" min={1} value={f.hours} onChange={(e) => setF({ ...f, hours: e.target.value })} aria-invalid={!!errs["hours"]} /><Err msg={errs["hours"]} /></div>
        <GenBtn loading={loading}>Generate Plan</GenBtn>
      </form>
      <Panel>
        {loading ? <Thinking /> : out ? (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-xs uppercase text-muted-foreground"><tr>{["Task", "Priority", "Est.", "Deadline", "Status"].map((h) => <th key={h} className="pb-3 pr-3 font-medium">{h}</th>)}</tr></thead>
              <tbody className="divide-y divide-border">{out.map((t) => (
                <tr key={t.task}><td className="py-3 pr-3">{t.task}</td><td className={`pr-3 font-medium ${prioColor[t.priority]}`}>{t.priority}</td><td className="pr-3 whitespace-nowrap">{t.hours}h</td><td className="pr-3 whitespace-nowrap">{t.deadline}</td><td><Chip>{t.status}</Chip></td></tr>
              ))}</tbody>
            </table>
          </div>
        ) : <Empty text="Your prioritized task plan will appear here." />}
      </Panel>
    </div>
  );
}

export function Demo() {
  return (
    <section id="demo" className="bg-muted/50 py-24">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <SectionHeading eyebrow="Live demo" title="See AI productivity in action." sub="Try each tool below — these are sample AI responses." />
        <Tabs defaultValue="email" className="mt-12">
          <TabsList className="mx-auto mb-8 flex h-auto w-fit flex-wrap rounded-full p-1">
            <TabsTrigger value="email" className="rounded-full px-4 py-2">Email Generator</TabsTrigger>
            <TabsTrigger value="meeting" className="rounded-full px-4 py-2">Meeting Summarizer</TabsTrigger>
            <TabsTrigger value="tasks" className="rounded-full px-4 py-2">Task Planner</TabsTrigger>
          </TabsList>
          <div className="rounded-3xl border border-border glass p-5 shadow-soft sm:p-8">
            <TabsContent value="email"><EmailGenerator /></TabsContent>
            <TabsContent value="meeting"><MeetingSummarizer /></TabsContent>
            <TabsContent value="tasks"><TaskPlanner /></TabsContent>
          </div>
        </Tabs>
      </div>
    </section>
  );
}
