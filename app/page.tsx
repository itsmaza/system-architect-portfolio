'use client';

import { useState, useEffect, JSX, useRef } from 'react';
import { motion, AnimatePresence, cubicBezier, useScroll, useTransform } from 'framer-motion';

import {
    Mail,
    Github,
    Linkedin,
    ExternalLink,
    MapPin,
    Code2,
    Terminal,
    Monitor,
    Server,
    Wrench,
    ChevronDown,
    ArrowRight,
    MessageCircle,
    Menu,
    X,
    Rocket,
    BookOpen,
    Award,
    Send,
    Heart,
    CheckCircle2,
    Circle,
    Database,
    ArrowUpRight,
    Target,
    TrendingUp,
    Copy,
    Check,
    Sparkles,
    Layers,
    Star,
    Clock,
} from 'lucide-react';

import {
    PERSONAL,
    SOCIAL_LINKS,
    SKILL_CATEGORIES,
    PROJECTS,
    DSA_METRICS,
    DSA_PATTERNS,
    DSA_CASE_STUDIES,
    EXPERIENCE_TIMELINE,
} from '@/lib/data';

import LeetCodeStats from './components/LeetCodeStats';
import CommandPalette from './components/CommandPalette';

/* ═══════════════ ANIMATIONS ═══════════════ */
const ease = cubicBezier(0.16, 1, 0.3, 1);
const fadeUp = {
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease } },
};
const scaleIn = {
    hidden: { opacity: 0, scale: 0.94 },
    visible: { opacity: 1, scale: 1, transition: { duration: 0.45, ease } },
};
const stagger = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.06 } },
};
const staggerSlow = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.12 } },
};

/* ═══════════════ ICON MAPS ═══════════════ */
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
    { label: 'About', id: 'about' },
    { label: 'Skills', id: 'skills' },
    { label: 'Projects', id: 'projects' },
    { label: 'Case Studies', id: 'casestudies' },
    { label: 'Journey', id: 'journey' },
    { label: 'Contact', id: 'contact' },
] as const;

/* ═══════════════ EXTRA DSA CASE STUDIES ═══════════════ */
const EXTRA_DSA_CASES = DSA_CASE_STUDIES;

/* ═══════════════ THEME TOKENS ═══════════════ */
// DARK: Softened — no more pitch-black. Warm-tinted slate dark.
const th = {
    root: 'bg-[#111318] text-zinc-300',
    nav: 'bg-[#111318]/92',
    mobileMenu: 'bg-[#111318]/98 border-zinc-700/40',
    card: 'bg-[#191C24] border-zinc-700/30',
    cardHover: 'hover:bg-[#1E2230] hover:border-zinc-600/40',
    heading: 'text-[#ECF0F8]',
    sub: 'text-zinc-400',
    muted: 'text-zinc-500',
    divider: 'via-zinc-700/50',
    codeBg: 'bg-[#15181F] border-zinc-700/30',
    skillBadge:
        'bg-[#1E2230] border-zinc-700/40 text-zinc-400 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]',
    tag: 'bg-[#1E2230] border-zinc-700/40 text-zinc-500',
    tagHover: 'group-hover:text-emerald-400/60 group-hover:border-emerald-500/20',
    yearBadge: 'bg-emerald-500/[0.08] border-emerald-500/25 text-emerald-400/90',
    tlLine: 'from-emerald-500/25 via-zinc-700/25',
    tlIcon: 'bg-[#191C24] border-zinc-700/40 text-zinc-500 hover:text-emerald-400 hover:border-emerald-500/30 hover:bg-emerald-500/[0.07]',
    footerBorder: 'border-zinc-700/40',
    copyBtn: 'bg-[#191C24] border-zinc-700/40 hover:bg-[#1E2230] hover:border-emerald-500/25',
    copyText: 'text-zinc-400 group-hover:text-emerald-400',
    divLine: 'w-px h-4 bg-zinc-700',
    ctaSecondary:
        'bg-[#1E2230] text-zinc-300 border-zinc-700/50 hover:bg-[#252A38] hover:text-[#ECF0F8] hover:border-zinc-600',
    socialLink: 'text-zinc-500 hover:text-emerald-400 hover:bg-emerald-500/[0.07]',
    navLink: 'text-zinc-500 hover:text-zinc-300 hover:bg-[#1E2230]',
    navActive: 'text-emerald-400 bg-emerald-500/[0.09]',
    patternRow: 'hover:bg-[#1E2230]',
    ambientGrid: 'rgba(16,185,129,0.15)',
    notationBg: 'bg-[#15181F] border-zinc-700/40',
    imgBorder: 'border-zinc-700/40 bg-[#191C24] shadow-black/50',
    imgOverlay: 'from-[#111318]/60',
    badgeBg: 'bg-[#111318] border-zinc-700/50 shadow-black/60',
    cornerDot: 'bg-[#111318] border-zinc-700/50',
    backTop: 'bg-[#191C24]/90 border-zinc-700/40 text-zinc-500',
    numOverlay: 'text-zinc-700/50',
    borderLine: 'bg-zinc-700/40',
};

/* ═══════════════ TYPES ═══════════════ */
type CaseStudy = {
    id: string;
    project: string;
    title: string;
    summary: string;
    complexityFocus: string;
    impact: string;
    stack: readonly string[];
    liveUrl?: string;
};

/* ═══════════════ COMPONENTS ═══════════════ */
function AmbientBg() {
    return (
        <div className="pointer-events-none fixed inset-0 z-[-2] overflow-hidden">
            <div className="absolute -top-[300px] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,rgba(16,185,129,0.05),transparent_70%)]" />
            <div
                className="absolute inset-0 opacity-[0.022]"
                style={{
                    backgroundImage: `linear-gradient(${th.ambientGrid} 1px,transparent 1px),linear-gradient(90deg,${th.ambientGrid} 1px,transparent 1px)`,
                    backgroundSize: '72px 72px',
                }}
            />
        </div>
    );
}

function GlassCard({
    children,
    className = '',
    hover = true,
}: {
    children: React.ReactNode;
    className?: string;
    hover?: boolean;
}) {
    return (
        <div
            className={`rounded-2xl border ${th.card}
            ${hover ? `${th.cardHover} transition-all duration-500` : ''} ${className}`}
        >
            {children}
        </div>
    );
}

function Divider() {
    return (
        <div className="relative z-[2] max-w-6xl mx-auto px-6">
            <div
                className={`h-px bg-gradient-to-r from-transparent ${th.divider} to-transparent`}
            />
        </div>
    );
}

function SectionHeader({
    number,
    tag,
    title,
    desc,
    center = false,
}: {
    number: string;
    tag: string;
    title: string;
    desc: string;
    center?: boolean;
}) {
    return (
        <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-80px' }}
            variants={fadeUp}
            className={`mb-16 ${center ? 'text-center' : ''}`}
        >
            <div className={`flex items-center gap-3 mb-5 ${center ? 'justify-center' : ''}`}>
                <span className="text-[10px] font-mono text-emerald-500/50">{number}</span>
                <span className="w-6 h-px bg-emerald-500/20" />
                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-emerald-400/60">
                    {tag}
                </span>
            </div>
            <h2
                className={`text-[22px] sm:text-[28px] font-light tracking-[-0.03em] leading-[1.1] ${th.heading}`}
            >
                {title}
            </h2>
            <p
                className={`text-[13px] mt-3 leading-relaxed font-light ${th.sub} ${center ? 'max-w-md mx-auto' : 'max-w-lg'}`}
            >
                {desc}
            </p>
        </motion.div>
    );
}

function Typer({ texts }: { texts: string[] }) {
    const [text, setText] = useState('');
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
                    if (ci + 1 === t.length) setTimeout(() => setDel(true), 2200);
                } else {
                    setText(t.slice(0, ci - 1));
                    setCi((p) => p - 1);
                    if (ci === 0) {
                        setDel(false);
                        setIdx((p) => (p + 1) % texts.length);
                    }
                }
            },
            del ? 22 : 52,
        );
        return () => clearTimeout(timer);
    }, [ci, del, idx, texts]);

    return (
        <span className="text-emerald-400">
            {text}
            <span className="animate-pulse text-emerald-600/80">|</span>
        </span>
    );
}

function CaseCard({ cs }: { cs: CaseStudy }) {
    return (
        <GlassCard className="p-6 sm:p-7 h-full flex flex-col relative group overflow-hidden">
            <div className="absolute top-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-emerald-500/25 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            <p className="text-[10px] font-mono text-emerald-400/55 uppercase tracking-wider mb-5 flex items-center gap-2">
                <Database className="w-3 h-3" />
                {cs.project}
            </p>
            <h3
                className={`text-[13px] font-medium mb-3 leading-snug group-hover:text-emerald-500 transition-colors duration-300 ${th.heading}`}
            >
                {cs.title}
            </h3>
            <p className={`text-[11px] leading-[1.85] mb-5 flex-1 font-light ${th.sub}`}>
                {cs.summary}
            </p>
            <div className={`p-4 rounded-xl border mb-5 ${th.codeBg}`}>
                <p className="text-[9px] font-mono text-emerald-400/45 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <Target className="w-2.5 h-2.5" /> Complexity Analysis
                </p>
                <p className={`text-[11px] leading-relaxed font-light ${th.sub}`}>
                    {cs.complexityFocus}
                </p>
            </div>
            <p className={`text-[10px] italic mb-5 flex items-start gap-2 ${th.muted}`}>
                <TrendingUp className="w-3 h-3 mt-0.5 shrink-0 text-emerald-400/35" />
                {cs.impact}
            </p>
            <div className="flex items-center justify-between pt-4 border-t mt-auto border-zinc-700/30">
                <div className="flex flex-wrap gap-1.5">
                    {cs.stack.map((t) => (
                        <span
                            key={t}
                            className={`px-2 py-0.5 rounded text-[8px] font-mono border ${th.tag}`}
                        >
                            {t}
                        </span>
                    ))}
                </div>
                {cs.liveUrl && (
                    <a
                        href={cs.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`p-2 transition-colors duration-300 ${th.muted} hover:text-emerald-400`}
                    >
                        <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                )}
            </div>
        </GlassCard>
    );
}

/* ═══════════════ MAIN ═══════════════ */
export default function Portfolio() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [active, setActive] = useState('');
    const [copied, setCopied] = useState(false);
    const [progress, setProgress] = useState(0);

    const heroRef = useRef<HTMLDivElement>(null);

    const { scrollYProgress } = useScroll({
        target: heroRef,
        offset: ['start start', 'end start'],
    });
    useTransform(scrollYProgress, [0, 1], [1, 0]);

    useEffect(() => {
        const fn = () => {
            setScrolled(window.scrollY > 50);
            const t = document.documentElement.scrollHeight - window.innerHeight;
            setProgress(t > 0 ? window.scrollY / t : 0);
        };
        window.addEventListener('scroll', fn, { passive: true });
        return () => window.removeEventListener('scroll', fn);
    }, []);

    useEffect(() => {
        const io = new IntersectionObserver(
            (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
            { rootMargin: '-40% 0px -55% 0px' },
        );
        document.querySelectorAll('section[id]').forEach((n) => io.observe(n));
        return () => io.disconnect();
    }, []);

    // ── Copy email with proper reset ──
    const copyMail = async () => {
        try {
            await navigator.clipboard.writeText(PERSONAL.email);
            setCopied(true);
            const timer = setTimeout(() => setCopied(false), 2500);
            return () => clearTimeout(timer);
        } catch {
            // Fallback for browsers that block clipboard
            const el = document.createElement('textarea');
            el.value = PERSONAL.email;
            document.body.appendChild(el);
            el.select();
            document.execCommand('copy');
            document.body.removeChild(el);
            setCopied(true);
            setTimeout(() => setCopied(false), 2500);
        }
    };

    return (
        <div
            className={`relative min-h-screen antialiased scroll-smooth selection:bg-emerald-500/20 selection:text-emerald-300 transition-colors duration-300 ${th.root}`}
        >
            <AmbientBg />

            {/* Noise overlay */}
            <div
                className="pointer-events-none fixed inset-0 z-[-1] opacity-[0.02]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                }}
            />

            <CommandPalette isLight={false} />

            {/* Progress bar */}
            <div
                className="fixed top-0 left-0 h-[1.5px] bg-gradient-to-r from-emerald-700 via-emerald-400 to-emerald-500 z-[60] origin-left"
                style={{ transform: `scaleX(${progress})`, transition: 'transform 0.1s' }}
            />

            {/* ══ NAV ══ */}
            <nav
                className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${scrolled ? `${th.nav} backdrop-blur-2xl shadow-sm shadow-black/20` : ''}`}
            >
                <div className="max-w-6xl mx-auto px-6 flex items-center justify-between h-16">
                    <a href="#" className="group flex items-center gap-2">
                        <span className="w-4 h-px bg-gradient-to-r from-emerald-400/60 to-transparent group-hover:w-6 group-hover:from-emerald-400 transition-all duration-500" />
                        <span className="font-mono text-[13px] tracking-tight">
                            <span
                                className={`font-semibold group-hover:text-emerald-400 transition-colors duration-300 ${th.heading}`}
                            >
                                Maza
                            </span>
                            <span
                                className={`font-light transition-colors duration-300 ${th.muted}`}
                            >
                                Soft
                            </span>
                        </span>
                    </a>

                    <div className="hidden md:flex items-center gap-0.5">
                        {NAV.map((n) => (
                            <a
                                key={n.id}
                                href={`#${n.id}`}
                                className={`px-3.5 py-2 rounded-lg text-[12px] tracking-wide font-mono transition-all duration-300 ${
                                    active === n.id ? th.navActive : th.navLink
                                }`}
                            >
                                {n.label}
                            </a>
                        ))}
                    </div>

                    <div className="hidden md:flex items-center gap-2">
                        <a
                            href="#contact"
                            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-[11px] font-mono font-medium bg-emerald-500/[0.08] text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/[0.16] hover:text-emerald-400 hover:border-emerald-400/40 transition-all duration-300"
                        >
                            Let&apos;s Talk <ArrowRight className="w-3 h-3" />
                        </a>
                    </div>

                    <div className="md:hidden flex items-center gap-2">
                        <button
                            aria-label="Menu"
                            onClick={() => setMenuOpen(!menuOpen)}
                            className={`p-2 transition-colors ${th.muted}`}
                        >
                            {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
                        </button>
                    </div>
                </div>

                <AnimatePresence>
                    {menuOpen && (
                        <motion.div
                            initial={{ opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={{ opacity: 0, height: 0 }}
                            transition={{ duration: 0.3, ease }}
                            className={`md:hidden overflow-hidden backdrop-blur-2xl border-b ${th.mobileMenu}`}
                        >
                            <div className="px-6 py-5 space-y-1">
                                {NAV.map((n) => (
                                    <a
                                        key={n.id}
                                        href={`#${n.id}`}
                                        onClick={() => setMenuOpen(false)}
                                        className={`block px-4 py-3 rounded-xl text-[13px] font-mono transition-all duration-200 ${
                                            active === n.id ? th.navActive : th.navLink
                                        }`}
                                    >
                                        {n.label}
                                    </a>
                                ))}
                                <div className="pt-3">
                                    <a
                                        href="#contact"
                                        onClick={() => setMenuOpen(false)}
                                        className="block text-center px-4 py-3 rounded-xl text-[13px] font-mono bg-emerald-500/[0.08] text-emerald-500 border border-emerald-500/20"
                                    >
                                        Let&apos;s Talk →
                                    </a>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </nav>

            {/* ══ HERO ══ */}
            <section
                id="hero"
                ref={heroRef}
                className="relative z-[2] min-h-screen flex items-center"
            >
                <div className="max-w-6xl mx-auto px-6 w-full py-24 sm:py-32">
                    <div className="grid lg:grid-cols-[1fr_320px] gap-20 items-center">
                        <motion.div
                            initial="hidden"
                            animate="visible"
                            variants={staggerSlow}
                            className="order-2 lg:order-1"
                        >
                            {/* Status badge */}
                            <motion.div variants={fadeUp} className="mb-10">
                                <span className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full bg-emerald-500/[0.07] border border-emerald-500/20 text-[11px] font-mono font-medium text-emerald-500">
                                    <span className="relative flex h-1.5 w-1.5">
                                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400/50 opacity-75" />
                                        <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-400" />
                                    </span>
                                    Available for opportunities
                                </span>
                            </motion.div>

                            {/* Name + typer */}
                            <motion.div variants={fadeUp} className="mb-8">
                                <p
                                    className={`text-[11px] mb-3 font-mono flex items-center gap-3 ${th.muted}`}
                                >
                                    <span className="w-5 h-px bg-emerald-500/35" />
                                    Hello, I&apos;m
                                </p>
                                <h1
                                    className={`text-[36px] sm:text-[48px] lg:text-[56px] font-extralight tracking-[-0.04em] leading-[1.05] mb-5 ${th.heading}`}
                                >
                                    {PERSONAL.name.split(' ')[0]}
                                    <br />
                                    <span className={th.sub}>
                                        {PERSONAL.name.split(' ').slice(1).join(' ')}
                                    </span>
                                </h1>
                                <div className="text-[14px] sm:text-[16px] font-mono h-7 font-light">
                                    <Typer
                                        texts={[
                                            'Full Stack Engineer',
                                            'System Architect',
                                            'Problem Solver',
                                            PERSONAL.title,
                                        ]}
                                    />
                                </div>
                            </motion.div>

                            <motion.p
                                variants={fadeUp}
                                className={`text-[13px] leading-[1.95] max-w-lg mb-10 font-light ${th.sub}`}
                            >
                                {PERSONAL.description}
                            </motion.p>

                            {/* Meta row */}
                            <motion.div
                                variants={fadeUp}
                                className={`flex flex-wrap items-center gap-5 mb-10 text-[11px] font-mono ${th.muted}`}
                            >
                                {[
                                    { icon: <MapPin className="w-3 h-3" />, t: PERSONAL.location },
                                    {
                                        icon: <Clock className="w-3 h-3" />,
                                        t: `${PERSONAL.experience}+ Years Exp.`,
                                    },
                                    { icon: <Layers className="w-3 h-3" />, t: PERSONAL.title },
                                ].map((c, i) => (
                                    <span key={i} className="inline-flex items-center gap-2">
                                        <span className="text-emerald-500/50">{c.icon}</span>
                                        {c.t}
                                        {i < 2 && <span className="ml-5 w-px h-3 bg-zinc-700" />}
                                    </span>
                                ))}
                            </motion.div>

                            {/* CTAs */}
                            <motion.div variants={fadeUp} className="flex flex-wrap gap-3 mb-12">
                                <a 
                                target="_blank"
                                    href="/full_stack_engineer_resume_best.pdf"
                                    className="group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-mono font-medium bg-emerald-500/[0.08] text-emerald-500 border border-emerald-500/20 hover:bg-emerald-500/[0.16] hover:text-emerald-400 hover:border-emerald-400/40 transition-all duration-300"
                                >
                                    View Resume
                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform duration-300" />
                                </a>
                                <a
                                    href="#contact"
                                    className={`group inline-flex items-center gap-2 px-6 py-3 rounded-xl text-[12px] font-mono font-medium border transition-all duration-300 ${th.ctaSecondary}`}
                                >
                                    Get in Touch <Send className="w-3.5 h-3.5" />
                                </a>
                            </motion.div>

                            {/* Socials */}
                            <motion.div variants={fadeUp} className="flex items-center gap-0.5">
                                {SOCIAL_LINKS.map((s) => (
                                    <a
                                        key={s.label}
                                        href={s.href}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        title={s.label}
                                        className={`p-2.5 rounded-xl transition-all duration-300 ${th.socialLink}`}
                                    >
                                        {socialIcon(s.icon)}
                                    </a>
                                ))}
                            </motion.div>
                        </motion.div>

                        {/* Profile image */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.4, ease }}
                            className="order-1 lg:order-2 flex justify-center"
                        >
                            <div className="relative group">
                                <div className="absolute -inset-8 rounded-[32px] bg-gradient-to-b from-emerald-500/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                <div
                                    className={`relative w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden border group-hover:border-emerald-500/30 transition-all duration-500 shadow-2xl ${th.imgBorder}`}
                                >
                                    <img
                                        src="/Mazaharul Islam Full Stack Software Engineer.PNG"
                                        alt={PERSONAL.name}
                                        loading="lazy"
                                        decoding="async"
                                        className="w-full h-full object-cover group-hover:scale-[1.04] transition-transform duration-700 ease-out"
                                    />
                                    <div
                                        className={`absolute inset-0 bg-gradient-to-t to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 ${th.imgOverlay}`}
                                    />
                                </div>
                                <div
                                    className={`absolute -bottom-4 -right-4 px-3.5 py-2 rounded-xl border shadow-xl ${th.badgeBg}`}
                                >
                                    <span
                                        className={`flex items-center gap-2 text-[10px] font-mono ${th.sub}`}
                                    >
                                        <Star className="w-3 h-3 text-emerald-400/60" />
                                        {PERSONAL.experience}+ years
                                    </span>
                                </div>
                                <div
                                    className={`absolute -top-3 -left-3 w-6 h-6 rounded-lg border flex items-center justify-center ${th.cornerDot}`}
                                >
                                    <Sparkles className="w-3 h-3 text-emerald-400/50" />
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* ══ ABOUT ══ */}
            <section id="about" className="relative z-[2] py-6 sm:py-6">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader
                        number="01"
                        tag="About"
                        title="Algorithmic Thinking"
                        desc="Clean architecture, time & space complexity, and measurable efficiency in every system I build."
                    />

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={stagger}
                        className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-16"
                    >
                        {DSA_METRICS.map((m) => (
                            <motion.div key={m.id} variants={scaleIn}>
                                <GlassCard className="p-6 text-center">
                                    <p className="font-mono text-[24px] sm:text-[30px] font-light text-emerald-400 mb-2 tracking-tighter">
                                        {m.value}
                                    </p>
                                    <p className={`text-[11px] font-medium mb-1 ${th.heading}`}>
                                        {m.label}
                                    </p>
                                    <p className={`text-[10px] leading-relaxed ${th.muted}`}>
                                        {m.description}
                                    </p>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>

                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={fadeUp}
                    >
                        <GlassCard className="overflow-hidden" hover={false}>
                            <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-700/30">
                                <div className="flex gap-1.5">
                                    <span className="w-2.5 h-2.5 rounded-full bg-red-500/35" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-500/35" />
                                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/55" />
                                </div>
                                <span className={`text-[10px] font-mono ${th.muted}`}>
                                    patterns.ts
                                </span>
                                <div className="w-12" />
                            </div>
                            <div className="p-5 sm:p-6">
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
                                            className={`group flex items-start gap-3.5 p-3.5 rounded-xl transition-all duration-300 ${th.patternRow}`}
                                        >
                                            <div className="w-8 h-8 rounded-lg bg-emerald-500/[0.07] border border-emerald-500/15 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-emerald-500/[0.12] transition-colors duration-300">
                                                <Terminal className="w-3.5 h-3.5 text-emerald-400/55" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-center gap-2.5 mb-1 flex-wrap">
                                                    <span
                                                        className={`text-[12px] font-medium group-hover:text-emerald-500 transition-colors duration-300 ${th.heading}`}
                                                    >
                                                        {p.name}
                                                    </span>
                                                    <span
                                                        className={`font-mono text-[9px] px-2 py-0.5 rounded-md border text-emerald-400/55 ${th.notationBg}`}
                                                    >
                                                        {p.notation}
                                                    </span>
                                                </div>
                                                <p
                                                    className={`text-[10px] leading-relaxed ${th.muted}`}
                                                >
                                                    {p.description}
                                                </p>
                                            </div>
                                            <span
                                                className={`shrink-0 text-[9px] font-mono px-2.5 py-1 rounded-full border ${
                                                    p.level === 'Strong'
                                                        ? 'border-emerald-500/25 text-emerald-500 bg-emerald-500/[0.07]'
                                                        : p.level === 'Active'
                                                          ? 'border-zinc-600/40 text-zinc-400 bg-zinc-800/50'
                                                          : 'border-zinc-700/30 text-zinc-500 bg-zinc-800/30'
                                                }`}
                                            >
                                                {p.level}
                                            </span>
                                        </motion.div>
                                    ))}
                                </motion.div>
                            </div>
                        </GlassCard>
                        <br />
                        <LeetCodeStats />
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ SKILLS ══ */}
            <section id="skills" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader
                        number="02"
                        tag="Stack"
                        title="Technical Skills"
                        desc="Technologies I use daily to build production-grade systems."
                    />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={stagger}
                        className="grid md:grid-cols-3 gap-4"
                    >
                        {SKILL_CATEGORIES.map((cat) => (
                            <motion.div key={cat.title} variants={fadeUp}>
                                <GlassCard className="p-6 sm:p-7 h-full relative group overflow-hidden">
                                    <div className="absolute inset-0 bg-gradient-to-b from-emerald-500/[0.015] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                                    <div className="relative z-10">
                                        <div className="flex items-center gap-3.5 mb-5">
                                            <div className="p-2.5 rounded-xl bg-emerald-500/[0.07] border border-emerald-500/15 text-emerald-400/55 group-hover:text-emerald-400 transition-colors duration-300">
                                                {catIcon(cat.icon)}
                                            </div>
                                            <div>
                                                <h3
                                                    className={`text-[13px] font-medium group-hover:text-emerald-500 transition-colors duration-300 ${th.heading}`}
                                                >
                                                    {cat.title}
                                                </h3>
                                                <p
                                                    className={`text-[10px] font-mono mt-0.5 ${th.muted}`}
                                                >
                                                    {cat.skills.length} technologies
                                                </p>
                                            </div>
                                        </div>
                                        <p
                                            className={`text-[11px] mb-5 leading-relaxed font-light ${th.sub}`}
                                        >
                                            {cat.description}
                                        </p>
                                        <div className="flex flex-wrap gap-1.5">
                                            {cat.skills.map((s) => (
                                                <span
                                                    key={s.name}
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border text-[10px] font-mono transition-all duration-300 cursor-default ${th.skillBadge}`}
                                                >
                                                    {s.name}
                                                    <span className={`text-[8px] ${th.muted}`}>
                                                        {s.experience}
                                                    </span>
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ PROJECTS ══ */}
            <section id="projects" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader
                        number="03"
                        tag="Work"
                        title="Selected Projects"
                        desc="Systems I've designed, built, and shipped to production."
                    />
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
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
                                className="group block"
                            >
                                <GlassCard className="p-6 sm:p-7 h-full relative overflow-hidden">
                                    <div
                                        className={`absolute top-4 right-5 text-[50px] font-extralight leading-none select-none pointer-events-none ${th.numOverlay}`}
                                    >
                                        {String(i + 1).padStart(2, '0')}
                                    </div>
                                    <div className="relative z-10">
                                        <div className="flex items-center justify-between mb-6">
                                            <span
                                                className={`inline-flex items-center gap-2 text-[10px] font-mono ${th.muted}`}
                                            >
                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                                                {proj.status}
                                            </span>
                                            <ArrowUpRight
                                                className={`w-4 h-4 group-hover:text-emerald-400 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 transition-all duration-300 ${th.muted}`}
                                            />
                                        </div>
                                        <h3
                                            className={`text-[14px] font-medium group-hover:text-emerald-500 mb-1.5 transition-colors duration-300 leading-snug ${th.heading}`}
                                        >
                                            {proj.title}
                                        </h3>
                                        <p className={`text-[10px] font-mono mb-4 ${th.muted}`}>
                                            {proj.subtitle}
                                        </p>
                                        <p
                                            className={`text-[12px] leading-[1.85] mb-6 font-light ${th.sub}`}
                                        >
                                            {proj.description}
                                        </p>
                                        <div className={`h-px mb-5 ${th.borderLine}`} />
                                        <div className="flex flex-wrap gap-1.5">
                                            {proj.techStack.map((t) => (
                                                <span
                                                    key={t}
                                                    className={`px-2.5 py-1 rounded-md text-[9px] font-mono border transition-colors duration-300 ${th.tag} ${th.tagHover}`}
                                                >
                                                    {t}
                                                </span>
                                            ))}
                                        </div>
                                    </div>
                                </GlassCard>
                            </motion.a>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ CASE STUDIES ══ */}
            <section id="casestudies" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader
                        number="04"
                        tag="Deep Dive"
                        title="Engineering Case Studies"
                        desc="How algorithmic thinking shapes real production decisions."
                    />
                  
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-60px' }}
                        variants={stagger}
                        className="grid lg:grid-cols-3 gap-4"
                    >
                        {EXTRA_DSA_CASES.map((cs) => (
                            <motion.div key={cs.id} variants={fadeUp}>
                                <CaseCard cs={cs} />
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </section>

            <Divider />

            {/* ══ JOURNEY ══ */}
            <section id="journey" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <SectionHeader
                        number="05"
                        tag="Timeline"
                        title="My Journey"
                        desc="From frontend foundations to full-stack distributed systems."
                        center
                    />
                    <div className="max-w-2xl mx-auto">
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, margin: '-60px' }}
                            variants={stagger}
                            className="relative"
                        >
                            <div
                                className={`absolute left-[21px] top-0 bottom-0 w-px bg-gradient-to-b ${th.tlLine} to-transparent`}
                            />
                            <div className="space-y-5">
                                {EXPERIENCE_TIMELINE.map((item) => (
                                    <motion.div
                                        key={item.id}
                                        variants={fadeUp}
                                        className="relative pl-16"
                                    >
                                        <div className="absolute left-0 top-6 w-[42px] flex justify-center">
                                            <div
                                                className={`w-[42px] h-[42px] rounded-xl border flex items-center justify-center transition-all duration-300 ${th.tlIcon}`}
                                            >
                                                {tlIcon(item.type)}
                                            </div>
                                        </div>
                                        <GlassCard className="p-6 sm:p-7">
                                            <span
                                                className={`inline-block font-mono text-[10px] font-medium px-3 py-1 rounded-lg mb-4 border ${th.yearBadge}`}
                                            >
                                                {item.year}
                                            </span>
                                            <h3
                                                className={`text-[13px] font-medium mb-2 ${th.heading}`}
                                            >
                                                {item.title}
                                            </h3>
                                            <p
                                                className={`text-[12px] leading-[1.85] mb-5 font-light ${th.sub}`}
                                            >
                                                {item.summary}
                                            </p>
                                            <ul className="space-y-2.5 mb-5">
                                                {item.highlights.map((h, hi) => (
                                                    <li
                                                        key={hi}
                                                        className={`flex items-start gap-2.5 text-[11px] ${th.sub}`}
                                                    >
                                                        <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400/50 mt-0.5 shrink-0" />
                                                        <span className="leading-relaxed font-light">
                                                            {h}
                                                        </span>
                                                    </li>
                                                ))}
                                            </ul>
                                            <div className="flex flex-wrap gap-1.5 pt-4 border-t border-zinc-700/30">
                                                {item.techStack.map((t) => (
                                                    <span
                                                        key={t}
                                                        className={`px-2.5 py-0.5 rounded-md text-[8px] font-mono border ${th.tag}`}
                                                    >
                                                        {t}
                                                    </span>
                                                ))}
                                            </div>
                                        </GlassCard>
                                    </motion.div>
                                ))}
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <Divider />

            {/* ══ CONTACT ══ */}
            <section id="contact" className="relative z-[2] py-24 sm:py-32">
                <div className="max-w-6xl mx-auto px-6">
                    <motion.div
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true, margin: '-80px' }}
                        variants={staggerSlow}
                        className="max-w-xl mx-auto text-center"
                    >
                        <motion.div variants={fadeUp} className="mb-10">
                            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-emerald-500/[0.07] border border-emerald-500/20 mb-7">
                                <Mail className="w-6 h-6 text-emerald-400/70" />
                            </div>
                            <div className="flex items-center justify-center gap-3 mb-5">
                                <span className="text-[10px] font-mono text-emerald-500/50">
                                    06
                                </span>
                                <span className="w-6 h-px bg-emerald-500/20" />
                                <span className="text-[10px] font-mono tracking-[0.22em] uppercase text-emerald-400/60">
                                    Contact
                                </span>
                            </div>
                            <h2
                                className={`text-[22px] sm:text-[28px] font-light tracking-[-0.03em] mb-4 ${th.heading}`}
                            >
                                Let&apos;s work together
                            </h2>
                            <p
                                className={`text-[13px] leading-relaxed max-w-md mx-auto font-light ${th.sub}`}
                            >
                                Open to collaboration, hiring, or technical conversations. I&apos;d
                                love to hear from you.
                            </p>
                        </motion.div>

                        <motion.div
                            variants={stagger}
                            className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-10"
                        >
                            {SOCIAL_LINKS.map((s) => (
                                <motion.a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    variants={scaleIn}
                                >
                                    <GlassCard className="flex flex-col items-center gap-3 p-5 group cursor-pointer">
                                        <span
                                            className={`group-hover:text-emerald-400 transition-colors duration-300 ${th.muted}`}
                                        >
                                            {socialIcon(s.icon)}
                                        </span>
                                        <span
                                            className={`text-[11px] font-mono group-hover:text-emerald-500 transition-colors duration-300 font-light ${th.muted}`}
                                        >
                                            {s.label}
                                        </span>
                                    </GlassCard>
                                </motion.a>
                            ))}
                        </motion.div>

                        {/* ── Copy email button — fixed feedback ── */}
                        <motion.div variants={fadeUp} className="flex flex-col items-center gap-3">
                            <button
                                onClick={copyMail}
                                className={`group inline-flex items-center gap-4 px-6 py-3.5 rounded-2xl border transition-all duration-300 ${th.copyBtn} ${
                                    copied ? 'border-emerald-500/30 bg-emerald-500/[0.06]' : ''
                                }`}
                            >
                                <Mail
                                    className={`w-4 h-4 transition-colors duration-300 ${copied ? 'text-emerald-500' : th.muted}`}
                                />
                                <span
                                    className={`text-[12px] font-mono transition-colors duration-300 ${
                                        copied ? 'text-emerald-500' : th.copyText
                                    }`}
                                >
                                    {PERSONAL.email}
                                </span>
                                <div className={th.divLine} />
                                <AnimatePresence mode="wait">
                                    {copied ? (
                                        <motion.span
                                            key="check"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Check className="w-4 h-4 text-emerald-400" />
                                        </motion.span>
                                    ) : (
                                        <motion.span
                                            key="copy"
                                            initial={{ scale: 0.5, opacity: 0 }}
                                            animate={{ scale: 1, opacity: 1 }}
                                            exit={{ scale: 0.5, opacity: 0 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Copy
                                                className={`w-4 h-4 group-hover:text-emerald-400 transition-colors duration-300 ${th.muted}`}
                                            />
                                        </motion.span>
                                    )}
                                </AnimatePresence>
                            </button>

                            {/* Feedback toast — animates in & out cleanly */}
                            <AnimatePresence>
                                {copied && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -6, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: -4, scale: 0.97 }}
                                        transition={{ duration: 0.25 }}
                                        className="inline-flex items-center gap-2 px-4 py-2 rounded-xl border text-[11px] font-mono bg-emerald-500/[0.08] border-emerald-500/25 text-emerald-400"
                                    >
                                        <CheckCircle2 className="w-3.5 h-3.5" />
                                        Email copied to clipboard
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </motion.div>
                    </motion.div>
                </div>
            </section>

            {/* ══ FOOTER ══ */}
            <footer className={`relative z-[2] py-10 border-t ${th.footerBorder}`}>
                <div className="max-w-6xl mx-auto px-6">
                    <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
                        <a href="#" className="group flex items-center gap-2">
                            <span className="w-4 h-px bg-gradient-to-r from-emerald-400/60 to-transparent group-hover:w-6 group-hover:from-emerald-400 transition-all duration-500" />
                            <span className="font-mono text-[13px] tracking-tight">
                                <span
                                    className={`font-semibold group-hover:text-emerald-400 transition-colors duration-300 ${th.heading}`}
                                >
                                    Maza
                                </span>
                                <span className={`font-light ${th.muted}`}>Soft</span>
                            </span>
                        </a>
                        <span
                            className={`text-[11px] font-mono flex items-center gap-2 ${th.muted}`}
                        >
                            © {new Date().getFullYear()} {PERSONAL.name}
                            <span className="text-zinc-600">·</span>
                            Turning Ideas into Reality
                            <Heart className="w-3 h-3 text-emerald-400/35" />
                        </span>
                        <div className="flex gap-0.5">
                            {SOCIAL_LINKS.slice(0, 3).map((s) => (
                                <a
                                    key={s.label}
                                    href={s.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`p-2.5 hover:text-emerald-400 transition-colors duration-300 ${th.muted}`}
                                >
                                    {socialIcon(s.icon)}
                                </a>
                            ))}
                        </div>
                    </div>
                </div>
            </footer>

            {/* Back to top */}
            <AnimatePresence>
                {scrolled && (
                    <motion.a
                        href="#hero"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.9 }}
                        transition={{ duration: 0.2 }}
                        className={`fixed bottom-6 right-6 z-50 p-3 rounded-xl border backdrop-blur-sm transition-all duration-300 hover:text-emerald-400 hover:border-emerald-500/25 ${th.backTop}`}
                    >
                        <ChevronDown className="w-4 h-4 rotate-180" />
                    </motion.a>
                )}
            </AnimatePresence>
        </div>
    );
}
