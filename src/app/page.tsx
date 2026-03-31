"use client";

import { useState } from "react";
import Topbar from "@/components/topbar";
import FounderBadge from "@/components/founder-badge";
import StatusBadge from "@/components/status-badge";
import { useFounder } from "@/lib/founder-context";
import { companies, tasks, activities, alerts, aiFeed, type Founder } from "@/data/seed";
import { TrendingUp, DollarSign, Flame, Clock, AlertTriangle, Sparkles, Activity } from "lucide-react";

const metrics = [
  { label: "Companies", value: "3", icon: TrendingUp, color: "text-indigo-600" },
  { label: "Total MRR", value: "$860", icon: DollarSign, color: "text-green-600" },
  { label: "Avg Burn", value: "$678", icon: Flame, color: "text-red-500" },
  { label: "Avg Runway", value: "28mo", icon: Clock, color: "text-blue-600" },
];

type FeedTab = "All" | "Mine" | "Partner";

export default function CommandCenter() {
  const { active } = useFounder();
  const [feedTab, setFeedTab] = useState<FeedTab>("All");
  const other: Founder = active === "Lane" ? "Partner" : "Lane";

  const filteredActivities = activities.filter((a) => {
    if (feedTab === "Mine") return a.founder === active;
    if (feedTab === "Partner") return a.founder === other;
    return true;
  });

  return (
    <div>
      <Topbar title="Command Center" />
      <div className="p-6 space-y-6">
        {/* Metrics Strip */}
        <div className="grid grid-cols-4 gap-4">
          {metrics.map((m) => (
            <div key={m.label} className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3">
              <div className={`${m.color}`}><m.icon size={22} /></div>
              <div>
                <p className="text-2xl font-bold">{m.value}</p>
                <p className="text-xs text-gray-500">{m.label}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-6">
          {/* Left: Ranked Companies + Tasks */}
          <div className="col-span-2 space-y-6">
            {/* Ranked Companies */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-4">Portfolio Ranking</h3>
              <div className="space-y-3">
                {companies.sort((a, b) => b.score - a.score).map((c, i) => (
                  <div key={c.id} className="flex items-center gap-4">
                    <span className="text-xs text-gray-400 w-5">#{i + 1}</span>
                    <div className="flex-1">
                      <div className="flex items-center justify-between mb-1">
                        <span className="text-sm font-medium">{c.name}</span>
                        <div className="flex items-center gap-2">
                          <StatusBadge status={c.status} />
                          <StatusBadge status={c.momentum} />
                          <span className="text-sm font-bold">{c.score}</span>
                        </div>
                      </div>
                      <div className="w-full bg-gray-100 rounded-full h-2">
                        <div
                          className="h-2 rounded-full bg-indigo-500"
                          style={{ width: `${c.score}%` }}
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Task Focus List */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-4">Task Focus</h3>
              <div className="space-y-2">
                {tasks.map((t) => (
                  <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                    <div className="flex items-center gap-3">
                      <StatusBadge status={t.status} />
                      <span className="text-sm">{t.title}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs text-gray-400">{t.company}</span>
                      <FounderBadge founder={t.owner} />
                      <StatusBadge status={t.priority} />
                      <span className="text-xs text-gray-500">{t.due}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Alerts + AI Feed + Activity */}
          <div className="space-y-6">
            {/* Alerts */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <AlertTriangle size={16} className="text-yellow-500" /> Alerts
              </h3>
              <div className="space-y-2">
                {alerts.map((a) => (
                  <div key={a.id} className="flex items-start gap-2">
                    <StatusBadge status={a.severity} />
                    <p className="text-xs text-gray-700">{a.text}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* AI Feed */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2">
                <Sparkles size={16} className="text-indigo-500" /> AI Insights
              </h3>
              <div className="space-y-2">
                {aiFeed.map((item) => (
                  <p key={item.id} className="text-xs text-gray-600 border-l-2 border-indigo-200 pl-3 py-1">
                    {item.text}
                  </p>
                ))}
              </div>
            </div>

            {/* Activity Feed */}
            <div className="bg-white border border-gray-200 rounded-xl p-5">
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-sm font-semibold flex items-center gap-2">
                  <Activity size={16} /> Activity
                </h3>
                <div className="flex gap-1">
                  {(["All", "Mine", "Partner"] as FeedTab[]).map((tab) => (
                    <button
                      key={tab}
                      onClick={() => setFeedTab(tab)}
                      className={`text-[11px] px-2 py-1 rounded-md font-medium transition-colors ${
                        feedTab === tab ? "bg-gray-900 text-white" : "text-gray-500 hover:bg-gray-100"
                      }`}
                    >
                      {tab}
                    </button>
                  ))}
                </div>
              </div>
              <div className="space-y-2">
                {filteredActivities.map((a) => (
                  <div
                    key={a.id}
                    className={`flex items-start gap-2 ${
                      feedTab === "All" && a.founder !== active ? "opacity-50" : ""
                    }`}
                  >
                    <FounderBadge founder={a.founder} />
                    <div>
                      <p className="text-xs text-gray-700">{a.text}</p>
                      <p className="text-[10px] text-gray-400">{a.time} · {a.company}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
