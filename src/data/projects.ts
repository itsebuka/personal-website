import { Cpu, Database, Network } from "lucide-react";
import type { ElementType } from "react";

export interface ProjectFile {
  label: string;
  filename: string;
  type: "pdf" | "doc" | "image" | "zip" | "txt" | "other";
}

export interface ProjectLink {
  label: string;
  url: string;
  kind: "github" | "demo" | "report" | "external";
}

export interface StaticProject {
  id: string;
  title: string;
  tagline: string;
  description: string;
  summary: string[];
  tech: string[];
  links: ProjectLink[];
  files: ProjectFile[];
  icon: ElementType;
}

export const projects: StaticProject[] = [
  {
    id: "robotic-arm",
    title: "3DOF Robotic Arm",
    tagline: "Mechanical Design & Build — From Scratch",
    description:
      "Designed and built a 3-Degree-of-Freedom robotic arm from scratch as a hardware project. Covered mechanical design, joint fabrication, actuator selection, and wiring. The arm did not achieve full working functionality by the end of the project, but the process was a significant learning experience in mechanical systems and embedded hardware.",
    summary: [
      "This project involved designing and physically building a 3-Degree-of-Freedom (3DOF) robotic arm entirely from scratch. The scope spanned every layer of the build — from sketching the mechanical structure and sourcing materials, to fabricating joints, mounting servo actuators, and wiring the control electronics.",
      "The arm was designed to achieve three independent axes of motion, with each degree of freedom driven by a servo motor. The frame was assembled using accessible materials and the electronics were connected through a microcontroller intended to coordinate movement across all three joints.",
      "Despite significant effort across the design and construction phases, the arm did not achieve full working functionality by the project deadline. Issues encountered included joint rigidity, actuator torque limitations relative to the arm's weight, and calibration difficulties in coordinating multi-axis movement.",
      "While the project did not reach a fully operational state, it delivered substantial hands-on learning: mechanical assembly and tolerancing, servo selection and torque budgeting, basic embedded control, and the reality of iterating through physical prototypes under real-world constraints.",
    ],
    tech: ["Arduino", "Servo Motors", "Mechanical Design", "Prototyping", "Embedded Wiring"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/itsebuka", kind: "github" },
    ],
    files: [],
    icon: Cpu,
  },
  {
    id: "voltage-comparator",
    title: "4-bit Magnitude Comparator",
    tagline: "KiCad Schematic & PCB Design",
    description: "Designed a 4-bit magnitude comparator circuit using KiCad — schematic capture and PCB layout from scratch. The circuit compares two 4-bit binary numbers and outputs whether one is greater than, less than, or equal to the other.",
    summary: [
      "A 4-bit magnitude comparator is a digital logic circuit that compares two 4-bit binary inputs (A and B) and produces three outputs indicating whether A > B, A < B, or A = B. This project involved designing the full circuit from the gate level up using KiCad.",
      "The schematic was captured using standard logic gate components, building up the comparison logic bit by bit from the LSB to the MSB. Cascading comparator stages were used to propagate the comparison result across all four bits.",
      "After completing the schematic, the design was moved into KiCad's PCB editor for layout. Component placement and trace routing were completed with attention to keeping signal paths clean and the board compact.",
      "The KiCad project files — schematic, PCB layout, and project configuration — are available for download below.",
    ],
    tech: ["KiCad", "Digital Logic", "PCB Design", "Schematic Capture", "Magnitude Comparator"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/itsebuka", kind: "github" },
    ],
    files: [
      { label: "KiCad Schematic", filename: "Comparator project.kicad_sch", type: "other" },
      { label: "PCB Layout File", filename: "Comparator project.kicad_pcb", type: "other" },
      { label: "KiCad Project File", filename: "Comparator project.kicad_pro", type: "other" },
    ],
    icon: Network,
  },
  {
    id: "voltage-stability-model",
    title: "Voltage Stability Prediction Model",
    tagline: "Python Smart Grid Analysis",
    description: "Developed a model using Python to forecast grid voltage stability thresholds. Utilized simulated smart grid telemetry to perform feature correlation and train prediction parameters for stability warning alerts.",
    summary: [
      "This project developed a machine learning-based predictive model in Python to forecast voltage stability conditions within a simulated smart grid environment.",
      "The dataset consisted of simulated smart grid telemetry: bus voltage magnitudes, reactive power injection levels, active load demands, and generator output parameters. Feature engineering extracted meaningful predictors including voltage deviation from nominal and rate-of-change of reactive power.",
      "A classification model was trained to distinguish stable from unstable operating conditions, with a regression component added to estimate the margin-to-instability — giving grid operators a quantitative early-warning metric.",
      "Model performance was evaluated using cross-validation, achieving strong classification accuracy on held-out test data.",
    ],
    tech: ["Python", "Machine Learning", "Scikit-learn", "Pandas", "NumPy", "Smart Grid", "Data Analytics"],
    links: [
      { label: "GitHub Repository", url: "https://github.com/itsebuka", kind: "github" },
    ],
    files: [
      { label: "Project Report (PDF)",          filename: "Voltage Stability Model Report Amended.pdf",  type: "pdf" },
      { label: "Project Report (Word — Final)", filename: "Voltage Stability Model Report Amended.docx", type: "doc" },
      { label: "Project Report (Word — Draft)", filename: "Voltage Stability Model Report.docx",         type: "doc" },
      { label: "Jupyter Notebook (Model v3.0)", filename: "Voltage_Stability_Prediction_model_3_0.ipynb", type: "other" },
    ],
    icon: Database,
  },
];

export function getProjectById(id: string): StaticProject | undefined {
  return projects.find((p) => p.id === id);
}
