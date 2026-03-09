/* ═══════════════════════════════════════════════════════════════════════════
   TYPE DEFINITIONS
   Strict TypeScript interfaces for every data shape used in the portfolio.
   ═══════════════════════════════════════════════════════════════════════════ */

export interface PersonalInfo {
  name: string;
  firstName: string;
  lastName: string;
  title: string;
  experience: string;
  description: string;
  location: string;
  email: string;
  resumeUrl: string;
}

export interface SocialLink {
  label: string;
  href: string;
  icon: string;
}

export interface Skill {
  name: string;
  experience: string;
}

export interface SkillCategory {
  title: string;
  icon: string;
  description: string;
  skills: readonly Skill[];
}

export interface Project {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  techStack: readonly string[];
  liveUrl: string;
  status: string;
  featured: boolean;
}

export interface DsaMetric {
  id: string;
  value: string;
  label: string;
  notation: string;
  description: string;
}

export interface DsaPattern {
  id: string;
  name: string;
  level: string;
  notation: string;
  description: string;
  productionUse: string;
}

export interface EngineeringCaseStudy {
  id: string;
  project: string;
  title: string;
  summary: string;
  complexityFocus: string;
  impact: string;
  stack: readonly string[];
  liveUrl: string;
}

export interface TimelineItem {
  id: string;
  year: string;
  title: string;
  type: string;
  summary: string;
  highlights: readonly string[];
  techStack: readonly string[];
}