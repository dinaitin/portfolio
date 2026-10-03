import type { LucideIcon } from "lucide-react";
import { CodeXml, Cpu, Languages, Network, ShieldCheck } from "lucide-react";
import type { Localized } from "@/i18n/config";

/** A skill can be language-neutral ("Python") or translated. */
export type Skill = string | Localized;

export type SkillCategory = {
  id: string;
  title: Localized;
  icon: LucideIcon;
  accent: "cyan" | "violet";
  skills: Skill[];
};

export const skillCategories: SkillCategory[] = [
  {
    id: "programming",
    title: { es: "Programación", en: "Programming" },
    icon: CodeXml,
    accent: "cyan",
    skills: ["C", "Python", "Java", "Matlab"],
  },
  {
    id: "networking",
    title: { es: "Redes y Comunicaciones", en: "Networks & Communications" },
    icon: Network,
    accent: "violet",
    skills: ["TCP/IP", "Ethernet", "UDP", "RIPv2", { es: "Encaminamiento", en: "Routing" }, "Wireshark", "LoRa", "GPS"],
  },
  {
    id: "embedded",
    title: { es: "Embebidos y Sistemas", en: "Embedded & Systems" },
    icon: Cpu,
    accent: "cyan",
    skills: ["STM32", "STM32CubeIDE", "Linux", "Git", { es: "Integración hardware/software", en: "Hardware/software integration" }],
  },
  {
    id: "security-ai",
    title: { es: "Ciberseguridad e IA", en: "Cybersecurity & AI" },
    icon: ShieldCheck,
    accent: "violet",
    skills: [
      { es: "Fundamentos de ciberseguridad", en: "Cybersecurity fundamentals" },
      { es: "Machine Learning aplicado", en: "Applied Machine Learning" },
    ],
  },
  {
    id: "languages",
    title: { es: "Idiomas", en: "Languages" },
    icon: Languages,
    accent: "cyan",
    skills: [
      { es: "Español · Nativo", en: "Spanish · Native" },
      { es: "Inglés · B2 Intermedio-Alto", en: "English · B2 Upper-Intermediate" },
    ],
  },
];
