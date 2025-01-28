import { evColumns, thielColumns, zFellowsColumns, neoColumns, stsColumns, kpColumns, cameronColumns, riseColumns } from "./columns";
import type { EVWinner, ThielFellow, ZFellow, NeoScholar, STSScholar, KPFellow, CameronScholar, RiseScholar } from "../types/fellowships";

export const FELLOWSHIP_CATEGORIES = {
  ventures: {
    title: "Ventures",
    fellowships: ["thiel", "zFellows", "ev"] as const
  },
  swe: {
    title: "SWE",
    fellowships: ["neo", "kp"] as const
  },
  research: {
    title: "Research",
    fellowships: ["sts"] as const
  },
  impact: {
    title: "Impact",
    fellowships: ["cameron", "rise"] as const
  }
} as const;

export const FELLOWSHIP_THEMES = {
  ev: {
    name: "Emergent Ventures",
    shortName: "EV",
    color: "#00c79f",
    hoverColor: "#00b38f",
    description: "Fellowship program funding moonshots and highly ambitious ideas to improve society.",
    columns: evColumns,
    dataFile: "ev-winners.json",
    filterFields: ["batch", "name"],
    type: {} as EVWinner,
  },
  zFellows: {
    name: "Z Fellows",
    shortName: "Z Fellows",
    color: "#3b82f6",
    hoverColor: "#2563eb",
    description: "Supporting exceptional founders building the next generation of startups.",
    columns: zFellowsColumns,
    dataFile: "z-fellows.json",
    filterFields: ["batch", "name", "tech_stack"],
    type: {} as ZFellow,
  },
  thiel: {
    name: "Thiel Fellowship",
    shortName: "Thiel",
    color: "#ef4444",
    hoverColor: "#dc2626",
    description: "Two-year fellowship for young entrepreneurs to build innovative companies.",
    columns: thielColumns,
    dataFile: "thiel-fellows.json",
    filterFields: ["batch", "name", "school", "project_area"],
    type: {} as ThielFellow,
  },
  neo: {
    name: "Neo Scholars",
    shortName: "Neo",
    color: "#9333ea",
    hoverColor: "#7e22ce",
    description: "Fellowship program for exceptional students pursuing ambitious projects.",
    columns: neoColumns,
    dataFile: "neo-scholars.json",
    filterFields: ["batch", "name", "school"],
    type: {} as NeoScholar,
  },
  sts: {
    name: "Regeneron STS",
    shortName: "STS",
    color: "#1e3a8a",
    hoverColor: "#1e40af",
    description: "The nation's most prestigious science research competition for high school seniors.",
    columns: stsColumns,
    dataFile: "sts-scholars.json",
    filterFields: ["batch", "school"],
    type: {} as STSScholar,
  },
  kp: {
    name: "Kleiner Perkins Fellowship",
    shortName: "KP",
    color: "#000000",
    hoverColor: "#1f1f1f",
    description: "Engineering and design fellowship program at top technology companies.",
    columns: kpColumns,
    dataFile: "kp-fellows.json",
    filterFields: ["batch", "name", "school", "company"],
    type: {} as KPFellow,
  },
  cameron: {
    name: "Bryan Cameron Impact Scholar",
    shortName: "Cameron",
    color: "#fef9c3",
    hoverColor: "#fef08a",
    description: "Supporting students committed to making positive change in their communities.",
    columns: cameronColumns,
    dataFile: "cameron-scholars.json",
    filterFields: ["batch", "name", "school", "impact_area"],
    type: {} as CameronScholar,
  },
  rise: {
    name: "Rise Scholar",
    shortName: "Rise",
    color: "#bfdbfe",
    hoverColor: "#93c5fd",
    description: "Global initiative identifying promising young people committed to serving others.",
    columns: riseColumns,
    dataFile: "rise-scholars.json",
    filterFields: ["batch", "name", "school", "country"],
    type: {} as RiseScholar,
  }
} as const;

export type FellowshipKey = keyof typeof FELLOWSHIP_THEMES; 