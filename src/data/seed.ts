export type Founder = "Lane" | "Partner";

export const founders: Record<Founder, { name: string; color: string; hex: string }> = {
  Lane: { name: "Lane", color: "bg-lane text-white", hex: "#6366f1" },
  Partner: { name: "Partner", color: "bg-partner text-white", hex: "#0ea5e9" },
};

export interface Company {
  id: string;
  name: string;
  sector: string;
  stage: string;
  status: string;
  momentum: string;
  score: number;
  mrr: number;
  burn: number;
  runway: number;
  capital: number;
}

export const companies: Company[] = [
  { id: "leadforge", name: "LeadForge AI", sector: "Sales Automation", stage: "Growth", status: "Live", momentum: "Strong", score: 88, mrr: 860, burn: 1145, runway: 21, capital: 24100 },
  { id: "storyspark", name: "StorySpark AI", sector: "Consumer AI", stage: "MVP", status: "Building", momentum: "Strong", score: 82, mrr: 0, burn: 612, runway: 30, capital: 18500 },
  { id: "agentops", name: "AgentOps Studio", sector: "B2B SaaS", stage: "Validation", status: "Planning", momentum: "At Risk", score: 61, mrr: 0, burn: 278, runway: 33, capital: 9200 },
];

export interface Task {
  id: string;
  title: string;
  company: string;
  owner: Founder;
  priority: "High" | "Med" | "Low";
  due: string;
  status: "In Progress" | "Blocked" | "Queued" | "Done";
}

export const tasks: Task[] = [
  { id: "t1", title: "Audit AWS spend", company: "LeadForge AI", owner: "Partner", priority: "High", due: "Today", status: "In Progress" },
  { id: "t2", title: "Deploy beta waitlist page", company: "StorySpark AI", owner: "Partner", priority: "High", due: "Tomorrow", status: "Blocked" },
  { id: "t3", title: "Interview 3 operators", company: "AgentOps Studio", owner: "Lane", priority: "High", due: "This Week", status: "Queued" },
  { id: "t4", title: "Write onboarding copy v2", company: "LeadForge AI", owner: "Lane", priority: "Med", due: "Next Week", status: "Queued" },
];

export interface CapitalEntry {
  founder: Founder;
  company: string;
  amount: number;
}

export const capitalLedger: CapitalEntry[] = [
  { founder: "Lane", company: "LeadForge AI", amount: 12000 },
  { founder: "Lane", company: "StorySpark AI", amount: 10500 },
  { founder: "Lane", company: "AgentOps Studio", amount: 7200 },
  { founder: "Partner", company: "LeadForge AI", amount: 9000 },
  { founder: "Partner", company: "StorySpark AI", amount: 8000 },
  { founder: "Partner", company: "AgentOps Studio", amount: 5100 },
];

export interface Decision {
  id: string;
  type: "Double Down" | "Constrain" | "Test";
  company: string;
  founder: Founder;
  date: string;
}

export const decisions: Decision[] = [
  { id: "d1", type: "Double Down", company: "LeadForge AI", founder: "Lane", date: "Mar 28" },
  { id: "d2", type: "Constrain", company: "AgentOps Studio", founder: "Partner", date: "Mar 25" },
  { id: "d3", type: "Test", company: "StorySpark AI", founder: "Lane", date: "Mar 22" },
];

export interface Subscription {
  id: string;
  tool: string;
  category: string;
  cost: number;
  owner: Founder;
  company: string;
  status: "Active" | "Trial" | "Cancelled";
}

export const subscriptions: Subscription[] = [
  { id: "s1", tool: "Vercel Pro", category: "Hosting", cost: 20, owner: "Lane", company: "LeadForge AI", status: "Active" },
  { id: "s2", tool: "OpenAI API", category: "AI/ML", cost: 145, owner: "Partner", company: "LeadForge AI", status: "Active" },
  { id: "s3", tool: "Figma", category: "Design", cost: 15, owner: "Lane", company: "StorySpark AI", status: "Active" },
  { id: "s4", tool: "AWS", category: "Cloud", cost: 320, owner: "Partner", company: "LeadForge AI", status: "Active" },
  { id: "s5", tool: "Notion", category: "Productivity", cost: 10, owner: "Lane", company: "AgentOps Studio", status: "Trial" },
  { id: "s6", tool: "Linear", category: "Project Mgmt", cost: 8, owner: "Partner", company: "StorySpark AI", status: "Active" },
];

export interface Activity {
  id: string;
  text: string;
  founder: Founder;
  time: string;
  company: string;
}

export const activities: Activity[] = [
  { id: "a1", text: "Updated AWS cost dashboard", founder: "Partner", time: "2h ago", company: "LeadForge AI" },
  { id: "a2", text: "Reviewed onboarding flow mockups", founder: "Lane", time: "3h ago", company: "StorySpark AI" },
  { id: "a3", text: "Submitted YC application draft", founder: "Lane", time: "5h ago", company: "AgentOps Studio" },
  { id: "a4", text: "Deployed API v2.1 hotfix", founder: "Partner", time: "6h ago", company: "LeadForge AI" },
  { id: "a5", text: "Scheduled operator interviews", founder: "Lane", time: "1d ago", company: "AgentOps Studio" },
  { id: "a6", text: "Set up Stripe test environment", founder: "Partner", time: "1d ago", company: "StorySpark AI" },
];

export const alerts = [
  { id: "al1", text: "LeadForge AWS spend up 23% this month", severity: "warning" as const },
  { id: "al2", text: "StorySpark beta deploy blocked — DNS issue", severity: "error" as const },
  { id: "al3", text: "AgentOps runway extended to 33mo after cost cuts", severity: "info" as const },
];

export const aiFeed = [
  { id: "ai1", text: "LeadForge MRR growth trend suggests $1.2k by May if current pace holds." },
  { id: "ai2", text: "AgentOps score dropped 8pts in 2 weeks — consider pivoting or constraining." },
  { id: "ai3", text: "StorySpark burn rate is low — good position to extend runway during MVP phase." },
];

export const milestones: Record<string, { label: string; progress: number }[]> = {
  "LeadForge AI": [
    { label: "Product-Market Fit", progress: 85 },
    { label: "First 100 Customers", progress: 62 },
    { label: "Series A Ready", progress: 40 },
  ],
  "StorySpark AI": [
    { label: "MVP Launch", progress: 70 },
    { label: "Beta Users (500)", progress: 15 },
    { label: "Revenue", progress: 0 },
  ],
  "AgentOps Studio": [
    { label: "Problem Validation", progress: 55 },
    { label: "Prototype", progress: 30 },
    { label: "First Customer", progress: 10 },
  ],
};
