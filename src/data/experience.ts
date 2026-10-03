import type { Localized } from "@/i18n/config";

export type ExperienceItem = {
  kind: "work" | "education";
  role: Localized;
  organization: string;
  period: Localized;
  location?: Localized;
  description?: Localized;
  /** Bullet points with responsibilities or achievements. */
  highlights?: Localized<string[]>;
  tags?: string[];
  /** Marks entries that still need real data. */
  placeholder?: boolean;
};

export const experience: ExperienceItem[] = [
  {
    kind: "work",
    role: { es: "Becario de Ingeniería", en: "Engineering Intern" },
    organization: "XRF",
    period: { es: "Mayo – Julio 2026", en: "May – July 2026" },
    location: { es: "Madrid, España", en: "Madrid, Spain" },
    highlights: {
      es: [
        "Desarrollo de una plataforma aérea no tripulada para localización y seguimiento de objetivos.",
        "Implementación de comunicaciones inalámbricas de largo alcance mediante LoRa.",
        "Integración de sistemas de posicionamiento GPS.",
        "Transmisión y monitorización de telemetría en tiempo real.",
        "Diseño e integración de la plataforma de vuelo: controladora, ESC, motores, receptor, FPV y telemetría.",
        "Montaje, depuración y pruebas funcionales del prototipo.",
        "Colaboración con CEPRUVAL en el desarrollo e integración del sistema UAV.",
      ],
      en: [
        "Development of an unmanned aerial platform for target localization and tracking.",
        "Implementation of long-range wireless communications using LoRa.",
        "Integration of GPS positioning systems.",
        "Real-time telemetry transmission and monitoring.",
        "Design and integration of the flight platform: flight controller, ESCs, motors, receiver, FPV and telemetry.",
        "Assembly, debugging and functional testing of the prototype.",
        "Collaboration with CEPRUVAL on the development and integration of the UAV system.",
      ],
    },
    tags: ["UAV", "LoRa", "GPS", "Telemetry", "FPV", "HW/SW Integration"],
  },
  {
    kind: "education",
    role: { es: "Grado en Ingeniería Telemática", en: "BSc in Telematics Engineering" },
    organization: "Universidad Carlos III de Madrid",
    period: { es: "2022 – 2026", en: "2022 – 2026" },
    location: { es: "Madrid, España", en: "Madrid, Spain" },
    description: {
      es: "Formación en redes y protocolos de comunicaciones, desarrollo de software en C y Python, sistemas embebidos e integración hardware/software. TFG centrado en el diseño e integración de una plataforma aérea para monitorización persistente de objetivos móviles mediante una baliza autónoma de localización.",
      en: "Training in networks and communication protocols, software development in C and Python, embedded systems and hardware/software integration. Bachelor’s Thesis focused on the design and integration of an aerial platform for persistent monitoring of moving targets using an autonomous tracking beacon.",
    },
    tags: ["Networking", "C", "Python", "Embedded Systems", "UAV"],
  },
];
