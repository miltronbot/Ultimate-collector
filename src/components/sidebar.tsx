"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useFounder } from "@/lib/founder-context";
import { founders } from "@/data/seed";
import {
  LayoutDashboard, GitBranch, Briefcase, Building2,
  ListChecks, DollarSign, CreditCard, Settings, User,
} from "lucide-react";
import { cn } from "@/lib/utils";

const nav = [
  { href: "/", label: "Command Center", icon: LayoutDashboard },
  { href: "/decisions", label: "Decision Cockpit", icon: GitBranch },
  { href: "/portfolio", label: "Portfolio", icon: Briefcase },
  { href: "/companies", label: "Company Profiles", icon: Building2 },
  { href: "/execution", label: "Execution", icon: ListChecks },
  { href: "/finance", label: "Finance", icon: DollarSign },
  { href: "/subscriptions", label: "Subscriptions", icon: CreditCard },
  { href: "/system", label: "System", icon: Settings },
];

export default function Sidebar() {
  const pathname = usePathname();
  const { active, setActive } = useFounder();
  const f = founders[active];
  const other = active === "Lane" ? "Partner" : "Lane";

  return (
    <aside className="fixed left-0 top-0 bottom-0 w-60 bg-sidebar flex flex-col z-50">
      <div className="p-5 border-b border-white/10">
        <h1 className="text-white font-bold text-lg">Startup Studio OS</h1>
        <p className="text-gray-500 text-xs mt-0.5">Two-Founder Dashboard</p>
      </div>

      {/* Founder Switcher */}
      <div className="p-4 border-b border-white/10">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider mb-2">Active Founder</p>
        <div className="flex gap-2">
          <button
            onClick={() => setActive("Lane")}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-medium transition-all",
              active === "Lane" ? "bg-lane text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            Lane
          </button>
          <button
            onClick={() => setActive("Partner")}
            className={cn(
              "flex-1 rounded-lg py-2 text-xs font-medium transition-all",
              active === "Partner" ? "bg-partner text-white" : "bg-white/5 text-gray-400 hover:bg-white/10"
            )}
          >
            Partner
          </button>
        </div>
      </div>

      <nav className="flex-1 py-3 overflow-y-auto">
        {nav.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "flex items-center gap-3 px-5 py-2.5 text-sm transition-colors",
                isActive ? "text-white bg-white/10" : "text-gray-400 hover:text-white hover:bg-white/5"
              )}
            >
              <item.icon size={18} />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3">
          <div
            className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold"
            style={{ backgroundColor: f.hex }}
          >
            {active[0]}
          </div>
          <div>
            <p className="text-white text-sm font-medium">{active}</p>
            <p className="text-gray-500 text-[11px]">Co-Founder</p>
          </div>
        </div>
      </div>
    </aside>
  );
}
