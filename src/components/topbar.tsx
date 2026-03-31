"use client";

import { useFounder } from "@/lib/founder-context";
import { founders } from "@/data/seed";
import { Bell } from "lucide-react";

export default function Topbar({ title }: { title: string }) {
  const { active } = useFounder();
  const f = founders[active];

  return (
    <header className="h-14 border-b border-gray-200 flex items-center justify-between px-6">
      <h2 className="text-lg font-semibold text-gray-900">{title}</h2>
      <div className="flex items-center gap-3">
        <span
          className="text-xs font-medium px-2.5 py-1 rounded-full text-white"
          style={{ backgroundColor: f.hex }}
        >
          {active}
        </span>
        <button className="relative p-2 text-gray-400 hover:text-gray-600">
          <Bell size={18} />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />
        </button>
      </div>
    </header>
  );
}
