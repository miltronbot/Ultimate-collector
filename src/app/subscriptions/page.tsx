"use client";

import Topbar from "@/components/topbar";
import FounderBadge from "@/components/founder-badge";
import StatusBadge from "@/components/status-badge";
import { subscriptions } from "@/data/seed";

export default function Subscriptions() {
  const totalCost = subscriptions.filter((s) => s.status !== "Cancelled").reduce((a, s) => a + s.cost, 0);

  return (
    <div>
      <Topbar title="Subscriptions" />
      <div className="p-6 space-y-6">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold">Tool Stack</h3>
          <div className="text-sm text-gray-500">
            Monthly total: <span className="font-bold text-gray-900">${totalCost}/mo</span>
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 bg-gray-50">
                <th className="px-5 py-3 font-medium">Tool</th>
                <th className="px-5 py-3 font-medium">Category</th>
                <th className="px-5 py-3 font-medium">Company</th>
                <th className="px-5 py-3 font-medium">Owner</th>
                <th className="px-5 py-3 font-medium">Status</th>
                <th className="px-5 py-3 font-medium text-right">Cost</th>
              </tr>
            </thead>
            <tbody>
              {subscriptions.map((s) => (
                <tr key={s.id} className="border-t border-gray-100">
                  <td className="px-5 py-3 text-sm font-medium">{s.tool}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{s.category}</td>
                  <td className="px-5 py-3 text-sm text-gray-500">{s.company}</td>
                  <td className="px-5 py-3"><FounderBadge founder={s.owner} /></td>
                  <td className="px-5 py-3"><StatusBadge status={s.status} /></td>
                  <td className="px-5 py-3 text-sm text-right">${s.cost}/mo</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
