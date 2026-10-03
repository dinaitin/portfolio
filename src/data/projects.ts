import type { StaticImageData } from "next/image";
import type { Localized } from "@/i18n/config";
import hexacopterFull from "../../public/images/projects/hexacopter/hexacopter-full.png";
import ripv2Environment from "../../public/images/projects/ripv2/ripv2-linux-wireshark.png";
import stm32Vehicle from "../../public/images/projects/stm32-autonomous-vehicle.png";
import uavComms from "../../public/images/projects/uav-comms.jpg";
import uavComponents from "../../public/images/projects/uav-components.jpg";
import uavElectromagnet from "../../public/images/projects/uav-electromagnet.jpg";
import uavMain from "../../public/images/projects/uav-main.jpg";

export type ProjectStatus = "completed" | "inProgress" | "planned";

export type ProjectMetric = {
  value: Localized;
  label: Localized;
  /** Small qualifier shown under the label, e.g. how the value was measured. */
  hint?: Localized;
};

/**
 * A block of a case-study details page:
 * - `split`: image and text side by side (alternating sides).
 * - `wide`: full-width image followed by the text.
 * - `metrics`: grid of metric cards, without image.
 */
export type ProjectSection = {
  id: string;
  title: Localized;
  body?: Localized<string[]>;
  image?: { src: StaticImageData; alt: Localized };
  /** Steps of a chain (e.g. a communications path), shown as connected chips. */
  flow?: Localized<string[]>;
  /** Items shown as a grid of small technical cards. */
  points?: Localized<string[]>;
  metrics?: ProjectMetric[];
  /** Secondary technical notes shown in a smaller, discreet format. */
  notes?: Localized<string[]>;
  tags?: string[];
  layout?: "split" | "wide" | "metrics";
};

export type Project = {
  slug: string;
  title: Localized;
  /** Context label, e.g. "Bachelor's Thesis" or "University project". */
  context?: Localized;
  /** Official title (e.g. of the thesis), shown on the details page. */
  officialTitle?: Localized;
  /** Short description shown on the card. */
  summary: Localized;
  /** Longer description paragraphs shown on the details page. */
  description: Localized<string[]>;
  /** Key points shown as a list on the details page. */
  highlights?: Localized<string[]>;
  tags: string[];
  /**
   * Cover image shown at the top of the card and on the details page.
   * Either a path inside /public (e.g. "/images/projects/uav.jpg") or a static
   * import (`import uavImage from "../../public/images/projects/uav.jpg"`),
   * which also gives a blur preview while loading. Without it, the card shows
   * the placeholder.
   */
  image?: string | StaticImageData;
  /** Alt text for the image. Defaults to the project title. */
  imageAlt?: Localized;
  /** CSS object-position for the card image, when the default centered crop isn't ideal. */
  imagePosition?: string;
  /**
   * How the extra information is shown:
   * - `page` (default): the card links to /projects/[slug].
   * - `inline`: no detail page; `description` and `highlights` open in a
   *   collapsible panel inside the card.
   */
  detail?: "page" | "inline";
  github?: string;
  demo?: string;
  status: ProjectStatus;
  featured?: boolean;
  /** Year or date label shown on the card, e.g. "2026". */
  date?: string;
  /** University or organization the project was developed at. */
  institution?: string;
  /** Academic grade, shown as a highlighted card in the header of the details page. */
  grade?: Localized;
  /** When present, the details page is rendered as a case study with these blocks. */
  sections?: ProjectSection[];
};

export const projects: Project[] = [
  {
    slug: "uav-payload-deployment-system",
    title: { es: "UAV Payload Deployment System", en: "UAV Payload Deployment System" },
    context: { es: "Trabajo de Fin de Grado", en: "Bachelor's Thesis" },
    officialTitle: {
      es: "Diseño desarrollo e implementación de una Plataforma Aérea para Monitorización Persistente de Objetivos Móviles",
      en: "Design, Development and Implementation of an Aerial Platform for Persistent Monitoring of Moving Targets",
    },
    summary: {
      es: "Sistema UAV personalizado para transportar y liberar remotamente una baliza de localización basada en comunicaciones LoRa.",
      en: "Custom UAV system designed to carry and remotely release a location beacon based on LoRa communications.",
    },
    description: {
      es: [
        "Trabajo de Fin de Grado en Ingeniería Telemática (Universidad Carlos III de Madrid). Se desarrolló una plataforma aérea reutilizable, operada de forma manual con asistencia FPV, que transporta y libera a demanda una baliza autónoma de localización.",
        "El transporte y la liberación se realizan mediante un electroimán instalado en el UAV, y la baliza incorpora imanes permanentes para su retención pasiva. Una vez liberada, el seguimiento se realiza mediante LoRa / Meshtastic.",
        "El sistema no realiza navegación ni persecución autónomas: la aproximación y la liberación las ejecuta el piloto.",
      ],
      en: [
        "Bachelor's Thesis in Telematics Engineering (Universidad Carlos III de Madrid). A reusable aerial platform was developed, flown manually with FPV assistance, that carries and releases an autonomous location beacon on demand.",
        "Carrying and release are handled by an electromagnet mounted on the UAV, and the beacon includes permanent magnets for passive retention. Once released, tracking is performed over LoRa / Meshtastic.",
        "The system does not perform autonomous navigation or pursuit: the approach and release are carried out by the pilot.",
      ],
    },
    tags: ["UAV", "LoRa", "Meshtastic", "GNSS / GPS", "Telemetry", "Betaflight", "Embedded Systems", "HW/SW Integration", "3D Printing"],
    image: uavMain,
    imageAlt: {
      es: "Prototipo final del UAV Payload Deployment System montado, con estructura roja y hélices amarillas",
      en: "Assembled final prototype of the UAV Payload Deployment System, with a red frame and yellow propellers",
    },
    status: "completed",
    featured: true,
    date: "2026",
    institution: "Universidad Carlos III de Madrid",
    grade: { es: "9,7 / 10", en: "9.7 / 10" },
    sections: [
      {
        id: "architecture",
        title: { es: "Arquitectura y hardware", en: "Architecture & hardware" },
        body: {
          es: [
            "El prototipo final es un cuadricóptero de 5 pulgadas basado en una controladora Matek F405-TE con Betaflight, cuatro motores XING-E Pro 2207 de 1800 KV y una batería Tattu 4S de 1800 mAh.",
            "Se pilota mediante radiocontrol ExpressLRS con FPV analógico e integra GNSS y telemetría. El sistema de liberación se controla directamente desde la salida PINIO1 de la controladora a través de un módulo MOSFET, sin microcontrolador auxiliar. Parte de las piezas se fabricaron mediante impresión 3D.",
          ],
          en: [
            "The final prototype is a 5-inch quadcopter built around a Matek F405-TE flight controller running Betaflight, four XING-E Pro 2207 1800 KV motors and a Tattu 4S 1800 mAh battery.",
            "It is flown via ExpressLRS radio control with analog FPV and integrates GNSS and telemetry. The release system is driven directly from the flight controller's PINIO1 output through a MOSFET module, with no auxiliary microcontroller. Some parts were produced by 3D printing.",
          ],
        },
        image: {
          src: uavComponents,
          alt: {
            es: "Componentes del sistema UAV dispuestos sobre una mesa antes del montaje: estructura, motores, hélices, batería y electrónica",
            en: "UAV system components laid out on a table before assembly: frame, motors, propellers, battery and electronics",
          },
        },
        tags: ["Matek F405-TE", "Betaflight", "ExpressLRS", "Analog FPV", "GNSS", "Telemetry", "3D Printing"],
      },
      {
        id: "communications",
        title: { es: "Comunicaciones LoRa / Meshtastic", en: "LoRa / Meshtastic communications" },
        body: {
          es: [
            "La baliza es una SenseCAP T1000-E, que obtiene su posición mediante GNSS. Meshtastic genera el mensaje de posición y lo transmite por LoRa en la banda EU868.",
            "Un LILYGO T-Echo actúa como receptor portátil y hace llegar la posición a una tableta con el cliente Meshtastic, desde la que se realiza el seguimiento.",
          ],
          en: [
            "The beacon is a SenseCAP T1000-E, which obtains its position via GNSS. Meshtastic generates the position message and transmits it over LoRa in the EU868 band.",
            "A LILYGO T-Echo acts as a portable receiver and forwards the position to a tablet running the Meshtastic client, where tracking takes place.",
          ],
        },
        flow: {
          es: ["SenseCAP T1000-E", "Meshtastic EU868 / LoRa", "LILYGO T-Echo", "Tableta · cliente Meshtastic"],
          en: ["SenseCAP T1000-E", "Meshtastic EU868 / LoRa", "LILYGO T-Echo", "Tablet · Meshtastic client"],
        },
        image: {
          src: uavComms,
          alt: {
            es: "Receptor LILYGO T-Echo y baliza SenseCAP T1000-E utilizados en el enlace LoRa / Meshtastic",
            en: "LILYGO T-Echo receiver and SenseCAP T1000-E beacon used in the LoRa / Meshtastic link",
          },
        },
        tags: ["SenseCAP T1000-E", "LILYGO T-Echo", "Meshtastic", "LoRa EU868", "GNSS"],
      },
      {
        id: "release",
        title: { es: "Sistema de liberación", en: "Release system" },
        body: {
          es: [
            "El sistema combina dos funciones magnéticas. Un electroimán instalado en la parte inferior del UAV sujeta la baliza durante el transporte y la libera a demanda; se gobierna desde la salida PINIO1 de la controladora mediante un módulo MOSFET y se acciona desde la emisora.",
            "La baliza incorpora seis imanes permanentes que, tras la liberación, proporcionan su retención pasiva sobre una superficie metálica.",
          ],
          en: [
            "The system combines two magnetic functions. An electromagnet mounted on the underside of the UAV holds the beacon during transport and releases it on demand; it is driven from the flight controller's PINIO1 output through a MOSFET module and triggered from the transmitter.",
            "The beacon includes six permanent magnets that, after release, provide passive retention on a metal surface.",
          ],
        },
        image: {
          src: uavElectromagnet,
          alt: {
            es: "Electroimán de liberación montado en la parte inferior del UAV",
            en: "Release electromagnet mounted on the underside of the UAV",
          },
        },
        tags: ["Electromagnet", "PINIO1", "MOSFET", "Permanent magnets"],
      },
      {
        id: "results",
        title: { es: "Resultados clave", en: "Key results" },
        layout: "metrics",
        metrics: [
          {
            value: { es: "129 g", en: "129 g" },
            label: { es: "Carga útil final de misión", en: "Final mission payload" },
          },
          {
            value: { es: "763 g", en: "763 g" },
            label: { es: "Masa al despegue de la configuración final", en: "Take-off mass of the final configuration" },
          },
          {
            value: { es: "10 / 10", en: "10 / 10" },
            label: {
              es: "Ciclos consecutivos de fijación/liberación correctos",
              en: "Consecutive successful attach/release cycles",
            },
          },
          {
            value: { es: "0,62 s", en: "0.62 s" },
            label: { es: "Tiempo medio de liberación", en: "Mean release time" },
          },
          {
            value: { es: "≈1,04 km", en: "≈1.04 km" },
            label: {
              es: "PDR 100 % en las ventanas estacionarias analizadas",
              en: "100% PDR in the analysed stationary windows",
            },
            hint: { es: "Enlace LoRa caracterizado experimentalmente", en: "Experimentally characterised LoRa link" },
          },
          {
            value: { es: "≈1,68 km", en: "≈1.68 km" },
            label: { es: "PDR 75 % en la ventana analizada", en: "75% PDR in the analysed window" },
            hint: { es: "Enlace LoRa caracterizado experimentalmente", en: "Experimentally characterised LoRa link" },
          },
        ],
        notes: {
          es: [
            "Vuelo estable de ≈30 s en modo ANGLE con la carga final de 129 g.",
            "El análisis Blackbox identificó una componente dominante de ≈54,6 Hz en Roll/Pitch, lo que llevó a reducir dyn_notch_min_hz de 100 a 50 Hz sin modificar los PID y a verificar posteriormente la configuración mediante un segundo vuelo instrumentado.",
          ],
          en: [
            "Stable ≈30 s flight in ANGLE mode with the final 129 g payload.",
            "Blackbox analysis identified a dominant ≈54.6 Hz component on Roll/Pitch, which led to lowering dyn_notch_min_hz from 100 to 50 Hz without changing the PIDs, and to verifying the configuration afterwards with a second instrumented flight.",
          ],
        },
      },
      {
        id: "prototype",
        title: { es: "Prototipo final", en: "Final prototype" },
        layout: "wide",
        body: {
          es: ["El resultado final es un prototipo UAV montado que reúne en un único sistema todos los elementos desarrollados durante el proyecto."],
          en: ["The final result is an assembled UAV prototype that brings together every element developed during the project into a single system."],
        },
        image: {
          src: uavMain,
          alt: {
            es: "Prototipo final del UAV montado, integrando plataforma de vuelo, comunicaciones y sistema de liberación",
            en: "Assembled final UAV prototype, integrating flight platform, communications and release system",
          },
        },
        points: {
          es: [
            "Plataforma UAV",
            "Comunicaciones LoRa",
            "GNSS / GPS",
            "Telemetría",
            "Sistema de liberación",
            "Integración hardware/software",
            "Componentes fabricados mediante impresión 3D",
          ],
          en: [
            "UAV platform",
            "LoRa communications",
            "GNSS / GPS",
            "Telemetry",
            "Release system",
            "Hardware/software integration",
            "3D-printed components",
          ],
        },
      },
    ],
  },
  {
    slug: "protocol-stack-ripv2",
    title: { es: "Pila de protocolos y encaminamiento RIPv2", en: "Protocol Stack and RIPv2 Routing" },
    context: { es: "Proyecto universitario", en: "University project" },
    summary: {
      es: "Implementación en C de una pila de protocolos de red desarrollada por capas, desde Ethernet hasta un cliente y servidor RIPv2, utilizando Linux y Wireshark para análisis y depuración.",
      en: "C implementation of a layered network protocol stack, from Ethernet up to a functional RIPv2 client and server, using Linux and Wireshark for analysis and debugging.",
    },
    description: {
      es: [
        "Proyecto universitario centrado en la implementación desde cero de una pila de protocolos de red en C. El desarrollo se realizó de forma progresiva por capas, partiendo de Ethernet y avanzando por IP y UDP hasta implementar la lógica de un cliente y un servidor RIPv2.",
        "El proyecto se desarrolló en Linux, utilizando de forma habitual la terminal y herramientas de red para configurar y comprobar el entorno. Wireshark tuvo un papel importante durante el desarrollo, permitiendo inspeccionar tráfico, analizar paquetes y verificar el funcionamiento de las distintas capas y del encaminamiento.",
        "También se trabajó con conceptos y protocolos de routing como RIP y OSPF, obteniendo una visión práctica del funcionamiento interno de una pila de comunicaciones.",
      ],
      en: [
        "University project focused on implementing a network protocol stack from scratch in C. Development followed a layered approach, starting from Ethernet and progressing through IP and UDP up to the logic required for a functional RIPv2 client and server.",
        "The project was developed in Linux, making regular use of the terminal and networking tools to configure and inspect the environment. Wireshark played an important role throughout development, allowing traffic inspection, packet analysis and verification of the different protocol layers and routing behaviour.",
        "The coursework also covered routing concepts and protocols such as RIP and OSPF, providing practical insight into the internal operation of a communications stack.",
      ],
    },
    highlights: {
      es: [
        "Implementación de protocolos de red en C",
        "Desarrollo por capas desde Ethernet",
        "IP y UDP",
        "Cliente y servidor RIPv2",
        "Desarrollo y pruebas en Linux",
        "Análisis de tráfico con Wireshark",
        "Trabajo con protocolos de encaminamiento",
      ],
      en: [
        "Network protocol implementation in C",
        "Layered development from Ethernet",
        "IP and UDP",
        "RIPv2 client and server",
        "Development and testing in Linux",
        "Traffic analysis with Wireshark",
        "Work with routing protocols",
      ],
    },
    tags: ["C", "Linux", "Wireshark", "Ethernet", "IP / UDP", "RIPv2", "Routing"],
    // Visual representation of the working environment, not an original capture from the project.
    image: ripv2Environment,
    imageAlt: {
      es: "Representación del entorno de trabajo del proyecto: Wireshark con tráfico RIPv2, código en C y terminales Linux",
      en: "Representation of the project's working environment: Wireshark showing RIPv2 traffic, C code and Linux terminals",
    },
    status: "completed",
    detail: "inline",
  },
  {
    slug: "stm32-autonomous-vehicle",
    title: { es: "Vehículo autónomo STM32", en: "STM32 Autonomous Vehicle" },
    context: { es: "Proyecto universitario", en: "University project" },
    summary: {
      es: "Desarrollo en C de un vehículo autónomo basado en STM32, con detección de obstáculos frontal y trasera mediante ultrasonidos, control de motores y comunicación UART con una tablet.",
      en: "Development in C of an STM32-based autonomous vehicle featuring front and rear ultrasonic obstacle detection, motor control, and UART communication with a tablet.",
    },
    description: {
      es: [
        "Proyecto universitario centrado en el desarrollo de un pequeño vehículo autónomo controlado mediante STM32 y programado en C. El sistema incorporaba dos sensores ultrasónicos, uno frontal y otro trasero, que permitían detectar obstáculos tanto durante el avance como en marcha atrás.",
        "A partir de estas mediciones, el vehículo podía adaptar su comportamiento de forma autónoma, realizando maniobras de evasión y giros de 90 grados. También incorporaba un zumbador cuya frecuencia de aviso aumentaba a medida que disminuía la distancia al obstáculo.",
        "Además del funcionamiento autónomo, se implementó comunicación UART con una tablet desde la que podían enviarse órdenes manuales para avanzar, retroceder, girar o activar avisos acústicos. El desarrollo se realizó en C utilizando STM32CubeIDE, integrando sensores, motores, drivers y alimentación embarcada.",
      ],
      en: [
        "University project focused on the development of a small autonomous vehicle controlled by STM32 and programmed in C. The system included two ultrasonic sensors, one at the front and one at the rear, allowing obstacle detection both while moving forward and while reversing.",
        "Based on these measurements, the vehicle could adapt its behaviour autonomously, performing avoidance manoeuvres and 90-degree turns. It also included a buzzer whose warning frequency increased as the obstacle got closer.",
        "In addition to autonomous operation, UART communication with a tablet was implemented, allowing manual commands such as moving forward, reversing, turning, or triggering acoustic alerts. The whole system was developed in C using STM32CubeIDE, integrating sensors, motors, motor drivers, and onboard power supply.",
      ],
    },
    highlights: {
      es: [
        "Programación embebida en C",
        "STM32 y STM32CubeIDE",
        "Detección ultrasónica frontal y trasera",
        "Control autónomo de movimiento",
        "Control de motores mediante drivers",
        "Aviso de proximidad mediante zumbador",
        "Comunicación UART con tablet",
      ],
      en: [
        "Embedded programming in C",
        "STM32 and STM32CubeIDE",
        "Front and rear ultrasonic sensing",
        "Autonomous motion control",
        "Motor control through drivers",
        "Proximity warning using a buzzer",
        "UART communication with a tablet",
      ],
    },
    tags: ["C", "STM32", "STM32CubeIDE", "UART", "Ultrasonic Sensors", "Embedded Systems", "Motor Control"],
    image: stm32Vehicle,
    imageAlt: {
      es: "Vehículo autónomo basado en STM32 con sensores ultrasónicos y cableado de prototipo",
      en: "STM32-based autonomous vehicle with ultrasonic sensors and prototype wiring",
    },
    // Portrait photo in a 16:9 card: favour the chassis, sensors and wheels.
    imagePosition: "50% 45%",
    status: "completed",
    detail: "inline",
  },
  {
    slug: "multirotor-aerial-platform",
    title: { es: "Plataforma aérea multirrotor", en: "Multirotor Aerial Platform" },
    context: { es: "Proyecto universitario", en: "University project" },
    summary: {
      es: "Desarrollo e integración de una plataforma aérea multirrotor, trabajando sobre hardware, configuración de vuelo, programación y visión artificial.",
      en: "Development and integration of a multirotor aerial platform, covering hardware, flight configuration, programming and computer vision.",
    },
    description: {
      es: [
        "Proyecto universitario centrado en el desarrollo de una plataforma aérea multirrotor desde cero. El trabajo incluyó la integración y conexionado del hardware, motores, ESC y controladora de vuelo, así como la configuración y calibración del sistema.",
        "También se trabajó en software para realizar vuelos programados entre puntos, una estimación de costes de la plataforma y una parte de visión artificial desarrollada en Python orientada a la detección automática de objetivos.",
      ],
      en: [
        "University project focused on developing a multirotor aerial platform from scratch. The work included hardware integration and wiring of the motors, ESCs and flight controller, together with system configuration and calibration.",
        "The project also covered software for programmed point-to-point flights, platform cost estimation and a Python-based computer vision component aimed at automatic target detection.",
      ],
    },
    highlights: {
      es: [
        "Integración hardware",
        "Configuración y calibración de vuelo",
        "Vuelos programados punto a punto",
        "Estimación de costes",
        "Visión artificial en Python",
      ],
      en: [
        "Hardware integration",
        "Flight setup and calibration",
        "Programmed point-to-point flights",
        "Cost estimation",
        "Python computer vision",
      ],
    },
    tags: ["UAV", "Hexacopter", "HW/SW Integration", "Flight Control", "Python", "Computer Vision"],
    image: hexacopterFull,
    imageAlt: {
      es: "Hexacóptero de la plataforma aérea multirrotor sobre una mesa de un aula universitaria",
      en: "Hexacopter of the multirotor aerial platform on a table in a university classroom",
    },
    // Portrait photo in a 16:9 card: keep the body and arms of the drone in frame.
    imagePosition: "50% 38%",
    status: "completed",
    detail: "inline",
  },
];

/** Projects that have their own /projects/[slug] page. */
export const projectsWithPage = projects.filter((project) => project.detail !== "inline");

export function getProject(slug: string) {
  return projectsWithPage.find((project) => project.slug === slug);
}
