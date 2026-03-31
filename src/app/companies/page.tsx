"use client";

import { useState } from "react";
import Topbar from "@/components/topbar";
import StatusBadge from "@/components/status-badge";
import FounderBadge from "@/components/founder-badge";
import { companies, tasks, capitalLedger, subscriptions, decisions, type Company } from "@/data/seed";

type Tab = "Overview" | "Documents" | "Accounts" | "Linked Records";

export default function CompanyProfiles() {
  const [selected, setSelected] = useState<Company>(companies[0]);
  const [tab, setTab] = useState<Tab>("Overview");

  const companyTasks = tasks.filter((t) => t.company === selected.name);
  const companyCapital = capitalLedger.filter((c) => c.company === selected.name);
  const companySubs = subscriptions.filter((s) => s.company === selected.name);
  const companyDecisions = decisions.filter((d) => d.company === selected.name);

  return (
    <div>
      <Topbar title="Company Profiles" />
      <div className="p-6 space-y-6">
        {/* Company selector */}
        <div className="flex gap-2">
          {companies.map((c) => (
            <button
              key={c.id}
              onClick={() => { setSelected(c); setTab("Overview"); }}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                selected.id === c.id ? "bg-gray-900 text-white" : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              {c.name}
            </button>
          ))}
        </div>

        {/* Tabs */}
        <div className="flex gap-1 border-b border-gray-200">
          {(["Overview", "Documents", "Accounts", "Linked Records"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2.5 text-sm font-medium border-b-2 transition-colors ${
                tab === t ? "border-gray-900 text-gray-900" : "border-transparent text-gray-500 hover:text-gray-700"
              }`}
            >
              {t}
            </button>
          ))}
        </div>

        {/* Tab Content */}
        {tab === "Overview" && (
          <div className="grid grid-cols-2 gap-6">
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold mb-3">Company Info</h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between"><span className="text-gray-500">Sector</span><span>{selected.sector}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Stage</span><span>{selected.stage}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Status</span><StatusBadge status={selected.status} /></div>
                <div className="flex justify-between"><span className="text-gray-500">Momentum</span><StatusBadge status={selected.momentum} /></div>
                <div className="flex justify-between"><span className="text-gray-500">Score</span><span className="font-bold">{selected.score}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">MRR</span><span>${selected.mrr.toLocaleString()}</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Burn</span><span>${selected.burn.toLocaleString()}/mo</span></div>
                <div className="flex justify-between"><span className="text-gray-500">Runway</span><span>{selected.runway}mo</span></div>
              </div>
            </div>
            <div className="border border-gray-200 rounded-xl p-5">
              <h4 className="text-sm font-semibold mb-3">Recent Decisions</h4>
              {companyDecisions.length === 0 ? (
                <p className="text-xs text-gray-400">No decisions yet</p>
              ) : (
                <div className="space-y-2">
                  {companyDecisions.map((d) => (
                    <div key={d.id} className="flex items-center justify-between">
                      <StatusBadge status={d.type} />
                      <FounderBadge founder={d.founder} />
                      <span className="text-xs text-gray-500">{d.date}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="border border-gray-200 rounded-xl p-5 col-span-2">
              <h4 className="text-sm font-semibold mb-3">Active Tasks</h4>
              {companyTasks.length === 0 ? (
                <p className="text-xs text-gray-400">No active tasks</p>
              ) : (
                <div className="space-y-2">
                  {companyTasks.map((t) => (
                    <div key={t.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                      <div className="flex items-center gap-2">
                        <StatusBadge status={t.status} />
                        <span className="text-sm">{t.title}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <FounderBadge founder={t.owner} />
                        <StatusBadge status={t.priority} />
                        <span className="text-xs text-gray-500">{t.due}</span>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {tab === "Documents" && (
          <div className="border border-gray-200 rounded-xl p-8 text-center">
            <p className="text-gray-400 text-sm">Document storage coming soon</p>
            <p className="text-xs text-gray-300 mt-1">Pitch decks, legal docs, and contracts will live here</p>
          </div>
        )}

        {tab === "Accounts" && (
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold mb-3">Capital Contributions</h4>
            <div className="space-y-2">
              {companyCapital.map((c, i) => (
                <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                  <FounderBadge founder={c.founder} />
                  <span className="text-sm font-medium">${c.amount.toLocaleString()}</span>
                </div>
              ))}
              <div className="flex items-center justify-between pt-2">
                <span className="text-sm font-semibold">Total</span>
                <span className="text-sm font-bold">${companyCapital.reduce((a, c) => a + c.amount, 0).toLocaleString()}</span>
              </div>
            </div>
          </div>
        )}

        {tab === "Linked Records" && (
          <div className="border border-gray-200 rounded-xl p-5">
            <h4 className="text-sm font-semibold mb-3">Linked Subscriptions</h4>
            {companySubs.length === 0 ? (
              <p className="text-xs text-gray-400">No subscriptions linked</p>
            ) : (
              <div className="space-y-2">
                {companySubs.map((s) => (
                  <div key={s.id} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium">{s.tool}</span>
                      <span className="text-xs text-gray-400">{s.category}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <FounderBadge founder={s.owner} />
                      <StatusBadge status={s.status} />
                      <span className="text-sm">${s.cost}/mo</span>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
