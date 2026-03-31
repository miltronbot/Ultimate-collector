"use client";

import Topbar from "@/components/topbar";
import { founders } from "@/data/seed";
import { User, Plug, Database, Cloud, Mail, MessageSquare } from "lucide-react";

const integrations = [
  { name: "Vercel", category: "Hosting", status: "Connected", icon: Cloud },
  { name: "GitHub", category: "Source Control", status: "Connected", icon: Database },
  { name: "Stripe", category: "Payments", status: "Pending", icon: Database },
  { name: "Slack", category: "Communication", status: "Connected", icon: MessageSquare },
  { name: "SendGrid", category: "Email", status: "Not Connected", icon: Mail },
  { name: "OpenAI", category: "AI/ML", status: "Connected", icon: Plug },
];

export default function System() {
  return (
    <div>
      <Topbar title="System" />
      <div className="p-6 space-y-6">
        {/* Role Cards */}
        <h3 className="text-sm font-semibold">Founders</h3>
        <div className="grid grid-cols-2 gap-4">
          {(["Lane", "Partner"] as const).map((name) => {
            const f = founders[name];
            return (
              <div
                key={name}
                className="border-2 rounded-xl p-6 flex items-center gap-4"
                style={{ borderColor: f.hex }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center text-white text-xl font-bold"
                  style={{ backgroundColor: f.hex }}
                >
                  {name[0]}
                </div>
                <div>
                  <p className="text-lg font-semibold">{name}</p>
                  <p className="text-sm text-gray-500">Co-Founder</p>
                  <div className="flex items-center gap-1 mt-1">
                    <div className="w-2 h-2 rounded-full bg-green-500" />
                    <span className="text-xs text-gray-400">Active</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Integration Catalog */}
        <h3 className="text-sm font-semibold">Integration Catalog</h3>
        <div className="grid grid-cols-3 gap-4">
          {integrations.map((intg) => (
            <div key={intg.name} className="border border-gray-200 rounded-xl p-4">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-500">
                  <intg.icon size={20} />
                </div>
                <div>
                  <p className="text-sm font-medium">{intg.name}</p>
                  <p className="text-xs text-gray-400">{intg.category}</p>
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                <div
                  className={`w-2 h-2 rounded-full ${
                    intg.status === "Connected" ? "bg-green-500" : intg.status === "Pending" ? "bg-yellow-500" : "bg-gray-300"
                  }`}
                />
                <span className="text-xs text-gray-500">{intg.status}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
