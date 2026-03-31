"use client";

import Topbar from "@/components/topbar";
import FounderBadge from "@/components/founder-badge";
import { companies, capitalLedger } from "@/data/seed";
import { Clock, DollarSign, Flame } from "lucide-react";

export default function Finance() {
  const laneTotal = capitalLedger.filter((c) => c.founder === "Lane").reduce((a, c) => a + c.amount, 0);
  const partnerTotal = capitalLedger.filter((c) => c.founder === "Partner").reduce((a, c) => a + c.amount, 0);

  return (
    <div>
      <Topbar title="Finance" />
      <div className="p-6 space-y-6">
        {/* Capital Ledger */}
        <div className="bg-white border border-gray-200 rounded-xl p-5">
          <h3 className="text-sm font-semibold mb-4">Capital Ledger</h3>
          <table className="w-full">
            <thead>
              <tr className="text-left text-xs text-gray-500 border-b border-gray-100">
                <th className="pb-3 font-medium">Founder</th>
                <th className="pb-3 font-medium">Company</th>
                <th className="pb-3 font-medium text-right">Amount</th>
              </tr>
            </thead>
            <tbody>
              {capitalLedger.map((c, i) => (
                <tr key={i} className="border-b border-gray-50 last:border-0">
                  <td className="py-3"><FounderBadge founder={c.founder} /></td>
                  <td className="py-3 text-sm">{c.company}</td>
                  <td className="py-3 text-sm text-right font-medium">${c.amount.toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
            <tfoot>
              <tr className="border-t border-gray-200">
                <td className="py-3"><FounderBadge founder="Lane" /></td>
                <td className="py-3 text-sm font-semibold">Total</td>
                <td className="py-3 text-sm text-right font-bold">${laneTotal.toLocaleString()}</td>
              </tr>
              <tr>
                <td className="py-3"><FounderBadge founder="Partner" /></td>
                <td className="py-3 text-sm font-semibold">Total</td>
                <td className="py-3 text-sm text-right font-bold">${partnerTotal.toLocaleString()}</td>
              </tr>
              <tr className="border-t border-gray-300">
                <td className="py-3" />
                <td className="py-3 text-sm font-bold">Grand Total</td>
                <td className="py-3 text-sm text-right font-bold">${(laneTotal + partnerTotal).toLocaleString()}</td>
              </tr>
            </tfoot>
          </table>
        </div>

        {/* Runway Cards */}
        <h3 className="text-sm font-semibold">Runway by Company</h3>
        <div className="grid grid-cols-3 gap-4">
          {companies.map((c) => (
            <div key={c.id} className="border border-gray-200 rounded-xl p-5 space-y-4">
              <div>
                <p className="text-sm font-semibold">{c.name}</p>
                <p className="text-xs text-gray-400">{c.sector}</p>
              </div>
              <div className="grid grid-cols-3 gap-3">
                <div className="text-center">
                  <DollarSign size={16} className="mx-auto text-green-500 mb-1" />
                  <p className="text-lg font-bold">${c.mrr}</p>
                  <p className="text-[10px] text-gray-400">MRR</p>
                </div>
                <div className="text-center">
                  <Flame size={16} className="mx-auto text-red-500 mb-1" />
                  <p className="text-lg font-bold">${c.burn}</p>
                  <p className="text-[10px] text-gray-400">Burn/mo</p>
                </div>
                <div className="text-center">
                  <Clock size={16} className="mx-auto text-blue-500 mb-1" />
                  <p className="text-lg font-bold">{c.runway}</p>
                  <p className="text-[10px] text-gray-400">Months</p>
                </div>
              </div>
              <div className="w-full bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${c.runway > 24 ? "bg-green-500" : c.runway > 12 ? "bg-yellow-500" : "bg-red-500"}`}
                  style={{ width: `${Math.min(c.runway / 36 * 100, 100)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
