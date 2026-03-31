import type { Founder } from "@/data/seed";
import { founders } from "@/data/seed";

export default function FounderBadge({ founder }: { founder: Founder }) {
  const f = founders[founder];
  return (
    <span
      className="inline-flex items-center text-[11px] font-medium px-2 py-0.5 rounded-full text-white"
      style={{ backgroundColor: f.hex }}
    >
      {founder}
    </span>
  );
}
