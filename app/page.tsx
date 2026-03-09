"use client";

/* ═══════════════════════════════════════════════════════════════════════════
 *
 *  MAZAHARUL ISLAM — Full Stack Software Engineer Portfolio
 *  ▸ Soft Dark Theme — Balanced, Readable, Modern
 *  ▸ Next.js 14  ▸ TypeScript  ▸ Tailwind  ▸ Framer Motion
 *
 * ═══════════════════════════════════════════════════════════════════════════ */

import { useState, useEffect, JSX } from "react";
import { motion, AnimatePresence, cubicBezier } from "framer-motion";
import {
  Mail, Github, Linkedin, ExternalLink, MapPin, Code2,
  Terminal, Monitor, Server, Wrench, ChevronDown, ArrowRight,
  MessageCircle, Menu, X, Briefcase, Rocket, BookOpen, Award,
  Send, Heart, CheckCircle2, Circle, Zap, Database,
  ArrowUpRight, Play, Target, TrendingUp, Copy, Check,
} from "lucide-react";

import {
  PERSONAL, SOCIAL_LINKS, SKILL_CATEGORIES, PROJECTS,
  DSA_METRICS, DSA_PATTERNS, DSA_CASE_STUDIES, EXPERIENCE_TIMELINE,
} from "@/lib/data";

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS — Lightweight
   ═══════════════════════════════════════════════════════════════════════════ */

const ease = cubicBezier(0.25, 0.1, 0.25, 1);

const fadeUp = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease } },
};

const popIn = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
};

const stagger = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.08 } },
};

/* ═══════════════════════════════════════════════════════════════════════════
   ICON MAPPERS
   ═══════════════════════════════════════════════════════════════════════════ */

const socialIcon = (id: string) => {
  const m: Record<string, JSX.Element> = {
    email: <Mail className="w-[18px] h-[18px]" />,
    linkedin: <Linkedin className="w-[18px] h-[18px]" />,
    github: <Github className="w-[18px] h-[18px]" />,
    whatsapp: <MessageCircle className="w-[18px] h-[18px]" />,
  };
  return m[id] ?? <ExternalLink className="w-[18px] h-[18px]" />;
};

const catIcon = (id: string) => {
  const m: Record<string, JSX.Element> = {
    frontend: <Monitor className="w-5 h-5" />,
    backend: <Server className="w-5 h-5" />,
    tools: <Wrench className="w-5 h-5" />,
  };
  return m[id] ?? <Code2 className="w-5 h-5" />;
};

const tlIcon = (t: string) => {
  const m: Record<string, JSX.Element> = {
    milestone: <Award className="w-4 h-4" />,
    project: <Rocket className="w-4 h-4" />,
    learning: <BookOpen className="w-4 h-4" />,
  };
  return m[t] ?? <Circle className="w-4 h-4" />;
};

const NAV = [
  { label: "About", id: "about" },
  { label: "Skills", id: "skills" },
  { label: "Projects", id: "projects" },
  { label: "Case Studies", id: "casestudies" },
  { label: "Journey", id: "journey" },
  { label: "Contact", id: "contact" },
] as const;

/* ═══════════════════════════════════════════════════════════════════════════
   SOFT BACKGROUND
   ═══════════════════════════════════════════════════════════════════════════ */
function SoftBg() {
  return (
    <div className="pointer-events-none fixed inset-0 z-0">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-[radial-gradient(ellipse,rgba(99,102,241,0.045),transparent_70%)]" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[400px] bg-[radial-gradient(circle,rgba(99,102,241,0.025),transparent_70%)]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   SECTION LABEL
   ═══════════════════════════════════════════════════════════════════════════ */
function SectionLabel({
  tag,
  title,
  desc,
  center = false,
}: {
  tag: string;
  title: string;
  desc: string;
  center?: boolean;
}) {
  return (
    <motion.div
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-60px" }}
      variants={fadeUp}
      className={`mb-12 ${center ? "text-center" : ""}`}
    >
      <p className="text-[11px] font-mono tracking-[0.18em] uppercase text-indigo-400/70 mb-3">
        {tag}
      </p>
      <h2 className="text-[28px] sm:text-[34px] font-semibold text-slate-100 tracking-[-0.02em] leading-tight">
        {title}
      </h2>
      <p
        className={`text-[13px] text-slate-400 mt-2.5 leading-relaxed ${
          center ? "max-w-md mx-auto" : "max-w-lg"
        }`}
      >
        {desc}
      </p>
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   TYPING TEXT
   ═══════════════════════════════════════════════════════════════════════════ */
function Typer({ texts }: { texts: string[] }) {
  const [text, setText] = useState("");
  const [idx, setIdx] = useState(0);
  const [ci, setCi] = useState(0);
  const [del, setDel] = useState(false);

  useEffect(() => {
    const t = texts[idx];
    const timer = setTimeout(
      () => {
        if (!del) {
          setText(t.slice(0, ci + 1));
          setCi((p) => p + 1);
          if (ci + 1 === t.length) setTimeout(() => setDel(true), 2000);
        } else {
          setText(t.slice(0, ci - 1));
          setCi((p) => p - 1);
          if (ci === 0) {
            setDel(false);
            setIdx((p) => (p + 1) % texts.length);
          }
        }
      },
      del ? 30 : 65
    );
    return () => clearTimeout(timer);
  }, [ci, del, idx, texts]);

  return (
    <span className="text-indigo-300">
      {text}
      <span className="animate-pulse text-indigo-400/60">_</span>
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Portfolio() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("");
  const [copied, setCopied] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const fn = () => {
      setScrolled(window.scrollY > 50);
      const t = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(t > 0 ? window.scrollY / t : 0);
    };
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-40% 0px -55% 0px" }
    );
    document.querySelectorAll("section[id]").forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);

  const copyMail = async () => {
    await navigator.clipboard.writeText(PERSONAL.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-[#0f1120] text-slate-300 antialiased scroll-smooth selection:bg-indigo-500/20 selection:text-indigo-200">
      <SoftBg />

      {/* Progress bar */}
      <div
        className="fixed top-0 left-0 h-[2px] bg-indigo-500/60 z-[60] origin-left transition-transform duration-100"
        style={{ transform: `scaleX(${progress})` }}
      />

      {/* ══════════════════════════════════════════════════════════════
          NAVIGATION
          ══════════════════════════════════════════════════════════════ */}
      <nav
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0f1120]/80 backdrop-blur-xl border-b border-slate-700/30 shadow-lg shadow-black/10"
            : ""
        }`}
      >
        <div className="max-w-5xl mx-auto px-5 flex items-center justify-between h-[60px]">
          <a
            href="#"
            className="font-mono text-[13px] font-semibold text-slate-200 hover:text-white transition-colors"
          >
            Mazaharul<span className="text-indigo-400"></span>
          </a>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-7">
            {NAV.map((n) => (
              <a
                key={n.id}
                href={`#${n.id}`}
                className={`relative text-[12px] tracking-wide transition-colors duration-200 pb-1 ${
                  active === n.id
                    ? "text-indigo-300"
                    : "text-slate-400 hover:text-slate-200"
                }`}
              >
                {n.label}
                {active === n.id && (
                  <motion.span
                    layoutId="navDot"
                    className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-indigo-400"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                )}
              </a>
            ))}
          </div>

          <a
            href="#contact"
            className="hidden md:inline-flex items-center gap-2 px-4 py-2 rounded-lg text-[12px] font-medium bg-indigo-500/10 text-indigo-300 border border-indigo-500/20 hover:bg-indigo-500/20 hover:border-indigo-400/30 transition-all"
          >
            Let&apos;s Talk
            <ArrowRight className="w-3 h-3" />
          </a>

          <button
            aria-label="Menu"
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden p-2 text-slate-400"
          >
            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile menu */}
        <AnimatePresence>
          {menuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden overflow-hidden bg-[#131627]/95 backdrop-blur-xl border-b border-slate-700/30"
            >
              <div className="px-5 py-4 space-y-1">
                {NAV.map((n) => (
                  <a
                    key={n.id}
                    href={`#${n.id}`}
                    onClick={() => setMenuOpen(false)}
                    className={`block px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      active === n.id
                        ? "text-indigo-300 bg-indigo-500/10"
                        : "text-slate-400 hover:text-slate-200 hover:bg-white/[0.03]"
                    }`}
                  >
                    {n.label}
                  </a>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </nav>

      {/* ══════════════════════════════════════════════════════════════
          HERO
          ══════════════════════════════════════════════════════════════ */}
      <section id="hero" className="relative min-h-screen flex items-center pt-14">
        <div className="max-w-5xl mx-auto px-5 w-full py-20 sm:py-28">
          <div className="grid lg:grid-cols-[1fr_320px] gap-16 items-center">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={stagger}
              className="order-2 lg:order-1"
            >
              {/* Available */}
              <motion.div variants={fadeUp} className="mb-7">
                <span className="inline-flex items-center gap-2.5 px-3.5 py-2 rounded-full bg-emerald-500/[0.08] border border-emerald-500/15 text-[11px] font-medium text-emerald-300/80">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                  </span>
                  Available for work
                </span>
              </motion.div>

              {/* Name */}
              <motion.div variants={fadeUp} className="mb-6">
                <p className="text-[13px] text-slate-500 mb-2 font-mono flex items-center gap-2">
                  <span className="w-5 h-px bg-indigo-500/40" />
                  Hi, I&apos;m
                </p>
                <h1 className="text-4xl sm:text-5xl lg:text-[54px] font-bold tracking-[-0.03em] text-white leading-[1.1] mb-4">
                  {PERSONAL.name}
                </h1>
                <div className="text-lg sm:text-xl font-mono h-7">
                  <Typer
                    texts={[
                      "Full Stack Engineer",
                      "System Architect",
                      "Problem Solver",
                      PERSONAL.title,
                    ]}
                  />
                </div>
              </motion.div>

              {/* Desc */}
              <motion.p
                variants={fadeUp}
                className="text-[14px] text-slate-400 leading-[1.85] max-w-lg mb-7"
              >
                {PERSONAL.description}
              </motion.p>

              {/* Info chips */}
              <motion.div
                variants={fadeUp}
                className="flex flex-wrap gap-2 mb-8"
              >
                {[
                  { icon: <MapPin className="w-3 h-3" />, t: PERSONAL.location },
                  { icon: <Briefcase className="w-3 h-3" />, t: `${PERSONAL.experience}+ Years` },
                  { icon: <Zap className="w-3 h-3" />, t: PERSONAL.title },
                ].map((c, i) => (
                  <span
                    key={i}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800/50 border border-slate-700/40 text-[11px] text-slate-400"
                  >
                    <span className="text-indigo-400/50">{c.icon}</span>
                    {c.t}
                  </span>
                ))}
              </motion.div>

              {/* CTAs */}
              <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-10">
                <a
                  href="#projects"
                  className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-lg bg-indigo-500 text-white text-[13px] font-medium hover:bg-indigo-400 transition-colors shadow-lg shadow-indigo-500/20"
                >
                  View Work
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </a>
                <a
                  href="#contact"
                  className="group inline-flex items-center gap-2.5 px-6 py-2.5 rounded-lg border border-slate-600/60 text-slate-300 text-[13px] font-medium hover:border-slate-500 hover:text-white hover:bg-white/[0.03] transition-all"
                >
                  Contact
                  <Send className="w-3.5 h-3.5" />
                </a>
              </motion.div>

              {/* Socials */}
              <motion.div variants={fadeUp} className="flex items-center gap-2">
                {SOCIAL_LINKS.map((s) => (
                  <a
                    key={s.label}
                    href={s.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={s.label}
                    className="p-2.5 rounded-lg text-slate-500 hover:text-indigo-300 hover:bg-indigo-500/[0.06] transition-all duration-200"
                  >
                    {socialIcon(s.icon)}
                  </a>
                ))}
              </motion.div>
            </motion.div>

            {/* Image */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3, ease }}
              className="order-1 lg:order-2 flex justify-center"
            >
              <div className="relative group">
                {/* Soft glow behind image */}
                <div className="absolute -inset-4 rounded-3xl bg-indigo-500/[0.06] opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                <div className="relative w-52 h-52 sm:w-60 sm:h-60 rounded-2xl overflow-hidden border border-slate-700/50 bg-slate-800/50 shadow-xl shadow-black/20 group-hover:border-slate-600/50 transition-all duration-300">
                  <img
                    src="/IMG_6403.PNG"
                    alt={PERSONAL.name}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>

                {/* Badge */}
                <div className="absolute -bottom-3 -right-3 px-3 py-1.5 rounded-lg bg-[#151a30] border border-slate-700/50 shadow-lg">
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-slate-300">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    {PERSONAL.experience}+ yrs
                  </span>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Scroll */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.5 }}
            className="flex justify-center mt-20"
          >
            <a href="#about" className="text-slate-600 hover:text-slate-400 transition-colors">
              <ChevronDown className="w-5 h-5 animate-bounce" />
            </a>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          ABOUT — DSA
          ══════════════════════════════════════════════════════════════ */}
      <section id="about" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <SectionLabel
            tag="About"
            title="Algorithmic Thinking"
            desc="Clean architecture, time & space complexity, and measurable efficiency in every system."
          />

          {/* Metrics */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-12"
          >
            {DSA_METRICS.map((m, i) => (
              <motion.div
                key={m.id}
                variants={popIn}
                className="p-5 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/40 hover:bg-slate-800/50 transition-all duration-300"
              >
                <p className="font-mono text-2xl sm:text-3xl font-bold text-white mb-1.5 tracking-tight">
                  {m.value}
                </p>
                <p className="text-[12px] font-medium text-slate-200 mb-1">
                  {m.label}
                </p>
                <p className="text-[10px] text-slate-500 leading-relaxed">
                  {m.description}
                </p>
              </motion.div>
            ))}
          </motion.div>

          {/* Terminal */}
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={fadeUp}
            className="rounded-xl border border-slate-700/30 overflow-hidden bg-[#131627]/60"
          >
            {/* Chrome */}
            <div className="flex items-center gap-2 px-4 py-3 border-b border-slate-700/30 bg-slate-800/20">
              <div className="flex gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/60" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/60" />
              </div>
              <span className="flex-1 text-center text-[10px] font-mono text-slate-500">
                patterns.ts
              </span>
            </div>

            <div className="p-4 sm:p-5">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={stagger}
                className="grid sm:grid-cols-2 gap-1"
              >
                {DSA_PATTERNS.map((p) => (
                  <motion.div
                    key={p.id}
                    variants={fadeUp}
                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-slate-800/30 transition-colors duration-200"
                  >
                    <Terminal className="w-3.5 h-3.5 text-indigo-400/40 mt-0.5 shrink-0" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-0.5 flex-wrap">
                        <span className="text-[12px] font-medium text-slate-200">
                          {p.name}
                        </span>
                        <span className="font-mono text-[9px] px-1.5 py-0.5 rounded bg-indigo-500/[0.08] text-indigo-300/60 border border-indigo-500/10">
                          {p.notation}
                        </span>
                      </div>
                      <p className="text-[10px] text-slate-500 leading-relaxed">
                        {p.description}
                      </p>
                    </div>
                    <span
                      className={`shrink-0 text-[9px] font-mono px-2 py-0.5 rounded-full border ${
                        p.level === "Strong"
                          ? "border-emerald-500/20 text-emerald-300/60 bg-emerald-500/[0.06]"
                          : p.level === "Active"
                          ? "border-sky-500/20 text-sky-300/60 bg-sky-500/[0.06]"
                          : "border-amber-500/20 text-amber-300/60 bg-amber-500/[0.06]"
                      }`}
                    >
                      {p.level}
                    </span>
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          SKILLS
          ══════════════════════════════════════════════════════════════ */}
      <section id="skills" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <SectionLabel
            tag="Stack"
            title="Technical Skills"
            desc="Technologies I work with daily in production."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid md:grid-cols-3 gap-4"
          >
            {SKILL_CATEGORIES.map((cat, catIdx) => {
              const accents = [
                { icon: "bg-indigo-500/10 text-indigo-400 border-indigo-500/15", top: "from-indigo-500/30" },
                { icon: "bg-sky-500/10 text-sky-400 border-sky-500/15", top: "from-sky-500/30" },
                { icon: "bg-violet-500/10 text-violet-400 border-violet-500/15", top: "from-violet-500/30" },
              ];
              const a = accents[catIdx % accents.length];
              return (
                <motion.div
                  key={cat.title}
                  variants={fadeUp}
                  className="relative group p-5 sm:p-6 rounded-xl bg-slate-800/25 border border-slate-700/30 hover:border-slate-600/40 hover:bg-slate-800/40 transition-all duration-300 overflow-hidden"
                >
                  {/* Subtle top line */}
                  <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${a.top} to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                  <div className="flex items-center gap-3 mb-4">
                    <div className={`p-2 rounded-lg border ${a.icon}`}>
                      {catIcon(cat.icon)}
                    </div>
                    <div>
                      <h3 className="text-[13px] font-semibold text-slate-100">
                        {cat.title}
                      </h3>
                      <p className="text-[10px] text-slate-500 font-mono">
                        {cat.skills.length} tools
                      </p>
                    </div>
                  </div>

                  <p className="text-[11px] text-slate-500 mb-4 leading-relaxed">
                    {cat.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5">
                    {cat.skills.map((s) => (
                      <span
                        key={s.name}
                        className="inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg bg-slate-700/20 border border-slate-700/30 text-[10px] font-mono text-slate-400 hover:text-slate-200 hover:border-slate-600/50 hover:bg-slate-700/30 transition-all duration-200"
                      >
                        {s.name}
                        <span className="text-[8px] text-slate-600">
                          {s.experience}
                        </span>
                      </span>
                    ))}
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          PROJECTS
          ══════════════════════════════════════════════════════════════ */}
      <section id="projects" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <SectionLabel
            tag="Work"
            title="Selected Projects"
            desc="Systems I've designed, built, and shipped to production."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid sm:grid-cols-2 gap-4"
          >
            {PROJECTS.map((proj, i) => (
              <motion.a
                key={proj.id}
                href={proj.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                variants={fadeUp}
                className="group block p-5 sm:p-6 rounded-xl bg-slate-800/25 border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/40 transition-all duration-300"
              >
                {/* Top */}
                <div className="flex items-center justify-between mb-4">
                  <span className="inline-flex items-center gap-1.5 text-[10px] font-mono text-slate-500">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400/80" />
                    {proj.status}
                  </span>
                  <span className="text-[11px] font-mono text-slate-600">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[15px] font-semibold text-slate-100 group-hover:text-white mb-1 transition-colors flex items-center gap-2">
                  {proj.title}
                  <ArrowUpRight className="w-3.5 h-3.5 text-slate-600 group-hover:text-indigo-400 transition-colors" />
                </h3>
                <p className="text-[10px] text-indigo-400/40 font-mono mb-3">
                  {proj.subtitle}
                </p>
                <p className="text-[11px] text-slate-400 leading-relaxed mb-5">
                  {proj.description}
                </p>

                {/* Divider */}
                <div className="h-px bg-slate-700/30 mb-4" />

                {/* Tech */}
                <div className="flex flex-wrap gap-1.5">
                  {proj.techStack.map((t) => (
                    <span
                      key={t}
                      className="px-2 py-0.5 rounded text-[9px] font-mono bg-slate-700/20 border border-slate-700/30 text-slate-500 group-hover:text-slate-400 transition-colors"
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </motion.a>
            ))}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CASE STUDIES
          ══════════════════════════════════════════════════════════════ */}
      <section id="casestudies" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <SectionLabel
            tag="Deep Dive"
            title="Engineering Case Studies"
            desc="How algorithmic thinking shapes real production decisions."
          />

          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-40px" }}
            variants={stagger}
            className="grid lg:grid-cols-3 gap-4"
          >
            {DSA_CASE_STUDIES.map((cs, i) => {
              const stripes = ["bg-indigo-400", "bg-sky-400", "bg-violet-400"];
              return (
                <motion.div
                  key={cs.id}
                  variants={fadeUp}
                  className="group flex flex-col p-5 sm:p-6 rounded-xl bg-slate-800/25 border border-slate-700/30 hover:border-slate-600/40 hover:bg-slate-800/40 transition-all duration-300 relative overflow-hidden"
                >
                  {/* Left accent bar */}
                  <div
                    className={`absolute left-0 top-5 bottom-5 w-[2px] rounded-full ${stripes[i % stripes.length]} opacity-20 group-hover:opacity-60 transition-opacity duration-300`}
                  />

                  <p className="text-[10px] font-mono text-slate-500 uppercase tracking-wider mb-4 flex items-center gap-1.5">
                    <Database className="w-3 h-3 text-indigo-400/40" />
                    {cs.project}
                  </p>

                  <h3 className="text-[14px] font-semibold text-slate-200 mb-2.5 leading-snug group-hover:text-white transition-colors">
                    {cs.title}
                  </h3>

                  <p className="text-[11px] text-slate-500 leading-relaxed mb-4 flex-1">
                    {cs.summary}
                  </p>

                  {/* Complexity */}
                  <div className="p-3.5 rounded-lg bg-slate-800/40 border border-slate-700/25 mb-4">
                    <p className="text-[9px] font-mono text-slate-500 uppercase tracking-wider mb-1.5 flex items-center gap-1">
                      <Target className="w-2.5 h-2.5 text-indigo-400/40" /> Complexity
                    </p>
                    <p className="text-[11px] text-slate-400 leading-relaxed">
                      {cs.complexityFocus}
                    </p>
                  </div>

                  {/* Impact */}
                  <p className="text-[10px] text-emerald-300/40 italic mb-4 flex items-start gap-1.5">
                    <TrendingUp className="w-3 h-3 mt-0.5 shrink-0 text-emerald-400/30" />
                    {cs.impact}
                  </p>

                  {/* Bottom */}
                  <div className="flex items-center justify-between pt-3.5 border-t border-slate-700/25 mt-auto">
                    <div className="flex flex-wrap gap-1">
                      {cs.stack.map((t) => (
                        <span
                          key={t}
                          className="px-1.5 py-0.5 rounded text-[8px] font-mono bg-slate-700/20 border border-slate-700/25 text-slate-500"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                    <a
                      href={cs.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-1.5 text-slate-600 hover:text-indigo-300 transition-colors"
                    >
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          JOURNEY
          ══════════════════════════════════════════════════════════════ */}
      <section id="journey" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <SectionLabel
            tag="Timeline"
            title="My Journey"
            desc="From frontend foundations to full-stack distributed systems."
          />

          <div className="max-w-2xl mx-auto">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-40px" }}
              variants={stagger}
              className="relative"
            >
              {/* Line */}
              <div className="absolute left-5 top-0 bottom-0 w-px bg-gradient-to-b from-indigo-500/30 via-slate-700/30 to-transparent" />

              <div className="space-y-6">
                {EXPERIENCE_TIMELINE.map((item, i) => {
                  const dotAccents = [
                    "bg-indigo-500/15 border-indigo-500/25 text-indigo-400",
                    "bg-sky-500/15 border-sky-500/25 text-sky-400",
                    "bg-violet-500/15 border-violet-500/25 text-violet-400",
                    "bg-emerald-500/15 border-emerald-500/25 text-emerald-400",
                  ];
                  const yearAccents = [
                    "text-indigo-300/60 bg-indigo-500/[0.06] border-indigo-500/12",
                    "text-sky-300/60 bg-sky-500/[0.06] border-sky-500/12",
                    "text-violet-300/60 bg-violet-500/[0.06] border-violet-500/12",
                    "text-emerald-300/60 bg-emerald-500/[0.06] border-emerald-500/12",
                  ];
                  return (
                    <motion.div
                      key={item.id}
                      variants={fadeUp}
                      className="relative pl-14"
                    >
                      {/* Dot */}
                      <div className="absolute left-0 top-3 w-10 flex justify-center">
                        <div
                          className={`w-10 h-10 rounded-xl flex items-center justify-center border ${dotAccents[i % dotAccents.length]}`}
                        >
                          {tlIcon(item.type)}
                        </div>
                      </div>

                      {/* Card */}
                      <div className="p-5 rounded-xl bg-slate-800/25 border border-slate-700/30 hover:border-slate-600/40 hover:bg-slate-800/40 transition-all duration-300">
                        <span
                          className={`inline-block font-mono text-[10px] font-medium px-2.5 py-1 rounded-lg mb-3 border ${yearAccents[i % yearAccents.length]}`}
                        >
                          {item.year}
                        </span>

                        <h3 className="text-[14px] font-semibold text-slate-100 mb-1.5">
                          {item.title}
                        </h3>
                        <p className="text-[11px] text-slate-400 leading-relaxed mb-4">
                          {item.summary}
                        </p>

                        <ul className="space-y-2 mb-4">
                          {item.highlights.map((h, hi) => (
                            <li
                              key={hi}
                              className="flex items-start gap-2 text-[11px] text-slate-400"
                            >
                              <CheckCircle2 className="w-3.5 h-3.5 text-indigo-400/30 mt-px shrink-0" />
                              <span className="leading-relaxed">{h}</span>
                            </li>
                          ))}
                        </ul>

                        <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-700/25">
                          {item.techStack.map((t) => (
                            <span
                              key={t}
                              className="px-2 py-0.5 rounded text-[8px] font-mono bg-slate-700/20 border border-slate-700/25 text-slate-500"
                            >
                              {t}
                            </span>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          CONTACT
          ══════════════════════════════════════════════════════════════ */}
      <section id="contact" className="py-20 sm:py-28">
        <div className="max-w-5xl mx-auto px-5">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
            variants={stagger}
            className="max-w-lg mx-auto text-center"
          >
            {/* Icon */}
            <motion.div variants={fadeUp} className="mb-8">
              <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-indigo-500/10 border border-indigo-500/15 mb-6">
                <Mail className="w-6 h-6 text-indigo-400" />
              </div>
              <p className="text-[11px] font-mono text-indigo-400/60 uppercase tracking-widest mb-3">
                Contact
              </p>
              <h2 className="text-[28px] sm:text-[34px] font-semibold text-white tracking-tight mb-3">
                Let&apos;s work together
              </h2>
              <p className="text-[13px] text-slate-400 leading-relaxed">
                Open to collaboration, hiring, or technical conversations.
              </p>
            </motion.div>

            {/* Social cards */}
            <motion.div
              variants={stagger}
              className="grid grid-cols-2 sm:grid-cols-4 gap-2 mb-8"
            >
              {SOCIAL_LINKS.map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  variants={popIn}
                  className="flex flex-col items-center gap-2.5 p-4 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 hover:bg-slate-800/50 transition-all duration-200 group"
                >
                  <span className="text-slate-500 group-hover:text-indigo-300 transition-colors">
                    {socialIcon(s.icon)}
                  </span>
                  <span className="text-[11px] text-slate-400 group-hover:text-slate-200 transition-colors">
                    {s.label}
                  </span>
                </motion.a>
              ))}
            </motion.div>

            {/* Email */}
            <motion.div variants={fadeUp}>
              <button
                onClick={copyMail}
                className="group inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-slate-800/30 border border-slate-700/30 hover:border-slate-600/50 transition-all duration-200"
              >
                <Mail className="w-4 h-4 text-indigo-400/40" />
                <span className="text-[13px] font-mono text-slate-400 group-hover:text-slate-200 transition-colors">
                  {PERSONAL.email}
                </span>
                {copied ? (
                  <Check className="w-4 h-4 text-emerald-400" />
                ) : (
                  <Copy className="w-4 h-4 text-slate-600 group-hover:text-slate-400 transition-colors" />
                )}
              </button>
              <AnimatePresence>
                {copied && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="text-[11px] text-emerald-400/70 font-mono mt-2"
                  >
                    ✓ Copied!
                  </motion.p>
                )}
              </AnimatePresence>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════════════
          FOOTER
          ══════════════════════════════════════════════════════════════ */}
      <footer className="py-8 border-t border-slate-800/40">
        <div className="max-w-5xl mx-auto px-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-[12px] text-slate-500">
            Mazaharul<span className="text-indigo-400/50"></span>
          </span>
          <span className="text-[11px] text-slate-600 flex items-center gap-1.5">
            © {new Date().getFullYear()} {PERSONAL.name}
            <Heart className="w-3 h-3 text-slate-700" />
          </span>
          <div className="flex gap-1">
            {SOCIAL_LINKS.slice(0, 3).map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 text-slate-600 hover:text-indigo-300 transition-colors"
              >
                {socialIcon(s.icon)}
              </a>
            ))}
          </div>
        </div>
      </footer>

      {/* Back to top */}
      <AnimatePresence>
        {scrolled && (
          <motion.a
            href="#hero"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            className="fixed bottom-5 right-5 z-50 p-2.5 rounded-xl bg-slate-800/60 border border-slate-700/40 text-slate-400 hover:text-white hover:border-slate-600 backdrop-blur-sm transition-all duration-200"
          >
            <ChevronDown className="w-4 h-4 rotate-180" />
          </motion.a>
        )}
      </AnimatePresence>
    </div>
  );
}