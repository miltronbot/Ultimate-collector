"use client";

import { useState } from "react";
import Topbar from "@/components/topbar";
import StatusBadge from "@/components/status-badge";
import { companies, milestones, type Company } from "@/data/seed";
import { DollarSign, Flame, Clock, TrendingUp } from "lucide-react";

export default function Portfolio() {
  const [selected, setSelected] = useState<Company>(companies[0]);
  const ms = milestones[selected.name] || [];

  return (
    <div>
      <Topbar title="Portfolio" />
      <div className="flex">
        {/* Sidebar selector */}
        <div className="w-56 border-r border-gray-200 p-4 min-h-[calc(100vh-3.5rem)]">
          <p className="text-[10px] text-gray-400 uppercase tracking-wider mb-3">Companies</p>
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelected(c)}
              className={`w-full text-left px-3 py-2.5 rounded-lg mb-1 transition-colors ${
                selected.id === c.id ? "bg-gray-100 font-medium" : "hover:bg-gray-50 text-gray-600"
              }`}
            >
              <p className="text-sm">{c.name}</p>
              <p className="text-[11px] text-gray-400">{c.sector}</p>
            </button>
          ))}
        </div>

        {/* Drill-down */}
        <div className="flex-1 p-6 space-y-6">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-lg font-semibold">{selected.name}</h3>
            <StatusBadge status={selected.status} />
            <StatusBadge status={selected.momentum} />
            <span className="text-sm font-bold text-indigo-600">Score: {selected.score}</span>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-4 gap-4">
            {[
              { label: "MRR", value: `$${selected.mrr.toLocaleString()}`, icon: DollarSign, color: "text-green-600" },
              { label: "Monthly Burn", value: `$${selected.burn.toLocaleString()}`, icon: Flame, color: "text-red-500" },
              { label: "Runway", value: `${selected.runway}mo`, icon: Clock, color: "text-blue-600" },
              { label: "Capital Deployed", value: `$${selected.capital.toLocaleString()}`, icon: TrendingUp, color: "text-indigo-600" },
            ].map((s) => (
              <div key={s.label} className="border border-gray-200 rounded-xl p-4 flex items-center gap-3">
                <div className={s.color}><s.icon size={20} /></div>
                <div>
                  <p className="text-xl font-bold">{s.value}</p>
                  <p className="text-xs text-gray-500">{s.label}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Milestone Progress */}
          <div className="bg-white border border-gray-200 rounded-xl p-5">
            <h3 className="text-sm font-semibold mb-4">Milestone Progress</h3>
            <div className="space-y-4">
              {ms.map((m) => (
                <div key={m.label}>
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-sm text-gray-700">{m.label}</span>
                    <span className="text-xs font-medium text-gray-500">{m.progress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 rounded-full h-2.5">
                    <div
                      className="h-2.5 rounded-full bg-indigo-500 transition-all"
                      style={{ width: `${m.progress}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
