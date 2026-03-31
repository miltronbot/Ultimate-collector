import { cn } from "@/lib/utils";

const colors: Record<string, string> = {
  "In Progress": "bg-blue-100 text-blue-700",
  Blocked: "bg-red-100 text-red-700",
  Queued: "bg-gray-100 text-gray-600",
  Done: "bg-green-100 text-green-700",
  Live: "bg-green-100 text-green-700",
  Building: "bg-yellow-100 text-yellow-700",
  Planning: "bg-purple-100 text-purple-700",
  Strong: "bg-green-100 text-green-700",
  "At Risk": "bg-red-100 text-red-700",
  Active: "bg-green-100 text-green-700",
  Trial: "bg-yellow-100 text-yellow-700",
  Cancelled: "bg-gray-100 text-gray-600",
  High: "bg-red-100 text-red-700",
  Med: "bg-yellow-100 text-yellow-700",
  Low: "bg-gray-100 text-gray-600",
  "Double Down": "bg-green-100 text-green-700",
  Constrain: "bg-orange-100 text-orange-700",
  Test: "bg-blue-100 text-blue-700",
  warning: "bg-yellow-100 text-yellow-700",
  error: "bg-red-100 text-red-700",
  info: "bg-blue-100 text-blue-700",
};

export default function StatusBadge({ status }: { status: string }) {
  return (
    <span className={cn("text-[11px] font-medium px-2 py-0.5 rounded-full", colors[status] || "bg-gray-100 text-gray-600")}>
      {status}
    </span>
  );
}
