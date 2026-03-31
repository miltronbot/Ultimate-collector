"use client";

import { useState } from "react";
import Topbar from "@/components/topbar";
import FounderBadge from "@/components/founder-badge";
import StatusBadge from "@/components/status-badge";
import { tasks } from "@/data/seed";
import { List, Columns } from "lucide-react";

type View = "list" | "kanban";
const statuses = ["In Progress", "Blocked", "Queued", "Done"] as const;

export default function Execution() {
  const [view, setView] = useState<View>("list");

  return (
    <div>
      <Topbar title="Execution" />
      <div className="p-6 space-y-6">
        {/* Toggle */}
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">All Tasks</h3>
          <div className="flex gap-1 bg-gray-100 rounded-lg p-1">
            <button
              onClick={() => setView("list")}
              className={`p-1.5 rounded-md ${view === "list" ? "bg-white shadow-sm" : ""}`}
            >
              <List size={16} />
            </button>
            <button
              onClick={() => setView("kanban")}
              className={`p-1.5 rounded-md ${view === "kanban" ? "bg-white shadow-sm" : ""}`}
            >
              <Columns size={16} />
            </button>
          </div>
        </div>

        {view === "list" ? (
          <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="text-left text-xs text-gray-500 bg-gray-50">
                  <th className="px-5 py-3 font-medium">Task</th>
                  <th className="px-5 py-3 font-medium">Company</th>
                  <th className="px-5 py-3 font-medium">Owner</th>
                  <th className="px-5 py-3 font-medium">Priority</th>
                  <th className="px-5 py-3 font-medium">Due</th>
                  <th className="px-5 py-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody>
                {tasks.map((t) => (
                  <tr key={t.id} className="border-t border-gray-100">
                    <td className="px-5 py-3 text-sm font-medium">{t.title}</td>
                    <td className="px-5 py-3 text-sm text-gray-500">{t.company}</td>
                    <td className="px-5 py-3"><FounderBadge founder={t.owner} /></td>
                    <td className="px-5 py-3"><StatusBadge status={t.priority} /></td>
                    <td className="px-5 py-3 text-sm text-gray-500">{t.due}</td>
                    <td className="px-5 py-3"><StatusBadge status={t.status} /></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="grid grid-cols-4 gap-4">
            {statuses.map((status) => (
              <div key={status} className="space-y-3">
                <div className="flex items-center gap-2 mb-2">
                  <StatusBadge status={status} />
                  <span className="text-xs text-gray-400">
                    {tasks.filter((t) => t.status === status).length}
                  </span>
                </div>
                {tasks
                  .filter((t) => t.status === status)
                  .map((t) => (
                    <div key={t.id} className="bg-white border border-gray-200 rounded-xl p-4 space-y-2">
                      <p className="text-sm font-medium">{t.title}</p>
                      <p className="text-xs text-gray-400">{t.company}</p>
                      <div className="flex items-center gap-2">
                        <FounderBadge founder={t.owner} />
                        <StatusBadge status={t.priority} />
                      </div>
                      <p className="text-[11px] text-gray-400">{t.due}</p>
                    </div>
                  ))}
                {tasks.filter((t) => t.status === status).length === 0 && (
                  <div className="border border-dashed border-gray-200 rounded-xl p-4 text-center">
                    <p className="text-xs text-gray-300">No tasks</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
