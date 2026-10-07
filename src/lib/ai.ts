// Mock AI service. Replace the bodies with real API calls (e.g. a server function) later.
const delay = (ms: number) => new Promise((r) => setTimeout(r, ms));

export interface EmailInput { recipient: string; purpose: string; tone: string; context: string }
export async function generateEmail(i: EmailInput): Promise<string> {
  await delay(1200);
  const name = i.recipient.trim().split(" ")[0] || "there";
  const openers: Record<string, string> = {
    Professional: `Hi ${name},\n\nI hope this message finds you well.`,
    Friendly: `Hey ${name}!\n\nHope your week is going great.`,
    Persuasive: `Hi ${name},\n\nI have an idea I think you'll find valuable.`,
    Formal: `Dear ${i.recipient.trim() || "Sir/Madam"},\n\nI am writing to you regarding the following matter.`,
  };
  return `${openers[i.tone] ?? openers["Professional"]}\n\nI'm reaching out about ${i.purpose.trim().toLowerCase()}.${
    i.context.trim() ? ` ${i.context.trim()}` : ""
  } I'd be happy to answer any questions or set up a quick call to discuss next steps.\n\nLooking forward to hearing from you.\n\nBest regards,\nAlex`;
}

export interface MeetingSummary { executive: string; keyPoints: string[]; decisions: string[]; actions: string[] }
export async function summarizeMeeting(transcript: string): Promise<MeetingSummary> {
  await delay(1500);
  const sentences = transcript.split(/(?<=[.!?])\s+/).map((s) => s.trim()).filter((s) => s.length > 12);
  const pick = (n: number, off = 0) => sentences.slice(off, off + n);
  return {
    executive: `The team discussed ${sentences.length} topics and aligned on priorities for the coming sprint. ${sentences[0] ?? ""}`,
    keyPoints: pick(3).length ? pick(3) : ["Reviewed project timeline", "Discussed budget constraints"],
    decisions: sentences.filter((s) => /decid|agree|will|approve/i.test(s)).slice(0, 3).concat(["Proceed with the proposed plan"]).slice(0, 3),
    actions: sentences.filter((s) => /need|should|follow|send|prepare/i.test(s)).slice(0, 3).concat(["Share meeting notes with stakeholders — Owner TBD"]).slice(0, 3),
  };
}

export interface PlanTask { task: string; priority: "High" | "Medium" | "Low"; hours: number; deadline: string; status: "To do" | "In progress" }
export async function planTasks(goal: string, deadline: string, priority: string, hours: number): Promise<PlanTask[]> {
  await delay(1300);
  const g = goal.trim();
  const steps = [`Define scope & success criteria for "${g}"`, "Research and gather resources", "Draft first version", "Review and gather feedback", "Refine and finalize", "Launch and share results"];
  const per = Math.max(0.5, Math.round((hours / steps.length) * 2) / 2);
  const end = deadline ? new Date(deadline) : new Date(Date.now() + 7 * 864e5);
  const start = Date.now();
  return steps.map((task, idx) => ({
    task,
    priority: idx < 2 ? (priority as PlanTask["priority"]) : idx < 4 ? "Medium" : "Low",
    hours: per,
    deadline: new Date(start + ((end.getTime() - start) * (idx + 1)) / steps.length).toLocaleDateString(undefined, { month: "short", day: "numeric" }),
    status: idx === 0 ? "In progress" : "To do",
  }));
}
