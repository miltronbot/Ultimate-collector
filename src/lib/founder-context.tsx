"use client";

import React, { createContext, useContext, useState, type ReactNode } from "react";
import type { Founder } from "@/data/seed";

interface FounderContextType {
  active: Founder;
  setActive: (f: Founder) => void;
}

const FounderContext = createContext<FounderContextType>({ active: "Lane", setActive: () => {} });

export function FounderProvider({ children }: { children: ReactNode }) {
  const [active, setActive] = useState<Founder>("Lane");
  return <FounderContext.Provider value={{ active, setActive }}>{children}</FounderContext.Provider>;
}

export function useFounder() {
  return useContext(FounderContext);
}
