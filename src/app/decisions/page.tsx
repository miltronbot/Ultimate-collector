"use client";

import Topbar from "@/components/topbar";
import FounderBadge from "@/components/founder-badge";
import StatusBadge from "@/components/status-badge";
import { decisions, companies } from "@/data/seed";
import { CalendarCheck } from "lucide-react";

export default function DecisionCockpit() {
  return (
    <div>
      <Topbar title="Decision Cockpit" />
      <div className="p-6 space-y-6">
        {/* Decision Log */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Decision Log</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Type</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium">Founder</th>
                <th className="pb-3 font-medium">Date</th>
              </tr>
            </thead>
            <tbody>
              {decisions.map((d) => (
                <tr key={d.id} className="border-b border-gray-50 last:border-0">
                  <td className="py-3"><StatusBadge status={d.type} /></td>
                  <td className="py-3 text-sm">{d.company}</td>
                  <td className="py-3"><FounderBadge founder={d.founder} /></td>
                  <td className="py-3 text-sm text-gray-500">{d.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Recurring Reviews */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
            <CalendarCheck size={16} /> Recurring Reviews
          </h3>
          <div className="grid grid-cols-3 gap-4">
            {companies.map((c) => (
              <div key={c.id} className="border border-gray-200 rounded-xl p-4">
                <p className="text-sm font-medium mb-1">{c.name}</p>
                <p className="text-xs text-gray-500 mb-3">{c.sector} · {c.stage}</p>
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-400">Next review</span>
                  <span className="text-xs font-medium">Apr 4</span>
                </div>
                <div className="flex items-center justify-between mt-1">
                  <span className="text-xs text-gray-400">Frequency</span>
                  <span className="text-xs font-medium">Bi-weekly</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
