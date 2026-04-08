'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search,
    ArrowRight,
    ExternalLink,
    Hash,
    Mail,
    Github,
    Linkedin,
    MessageCircle,
    FileDown,
    X,
    Command,
} from 'lucide-react';

/* ─── Command definitions ─── */
type CommandItem = {
    id: string;
    label: string;
    description: string;
    keywords?: string[];
    icon: React.ReactNode;
    group: 'Navigate' | 'Links' | 'Actions';
    action: () => void;
};

function buildCommands(close: () => void): CommandItem[] {
    const go = (id: string) => {
        close();
        setTimeout(() => {
            document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
        }, 150);
    };

    return [
        /* ── Navigate ── */
        {
            id: 'about',
            label: 'About',
            description: 'Algorithmic thinking & metrics',
            keywords: ['dsa', 'algo'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('about'),
        },
        {
            id: 'skills',
            label: 'Skills',
            description: 'Technical stack & tools',
            keywords: ['stack', 'tech', 'react', 'next'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('skills'),
        },
        {
            id: 'projects',
            label: 'Projects',
            description: 'Selected production work',
            keywords: ['work', 'portfolio'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('projects'),
        },
        {
            id: 'casestudies',
            label: 'Case Studies',
            description: 'Engineering deep dives',
            keywords: ['case', 'engineering', 'study'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('casestudies'),
        },
        {
            id: 'journey',
            label: 'Journey',
            description: 'Experience timeline',
            keywords: ['experience', 'timeline', 'history'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('journey'),
        },
        {
            id: 'contact',
            label: 'Contact',
            description: 'Get in touch',
            keywords: ['hire', 'email', 'talk'],
            icon: <Hash className="w-3.5 h-3.5" />,
            group: 'Navigate',
            action: () => go('contact'),
        },
        /* ── Links ── */
        {
            id: 'github',
            label: 'GitHub',
            description: 'Open GitHub profile',
            keywords: ['code', 'repos'],
            icon: <Github className="w-3.5 h-3.5" />,
            group: 'Links',
            action: () => { close(); window.open('https://github.com/devmazaharul', '_blank'); },
        },
        {
            id: 'linkedin',
            label: 'LinkedIn',
            description: 'Open LinkedIn profile',
            keywords: ['profile', 'network'],
            icon: <Linkedin className="w-3.5 h-3.5" />,
            group: 'Links',
            action: () => { close(); window.open('https://linkedin.com/in/mazaharul-islam-0948a333a', '_blank'); },
        },
        {
            id: 'whatsapp',
            label: 'WhatsApp',
            description: 'Message on WhatsApp',
            keywords: ['chat', 'message'],
            icon: <MessageCircle className="w-3.5 h-3.5" />,
            group: 'Links',
            action: () => { close(); window.open('https://web.whatsapp.com/send/?phone=8801886575932&text&type=phone_number&app_absent=0', '_blank'); },
        },
        {
            id: 'email',
            label: 'Email',
            description: 'Send an email',
            keywords: ['mail', 'message'],
            icon: <Mail className="w-3.5 h-3.5" />,
            group: 'Links',
            action: () => { close(); window.location.href = 'mailto:devmazaharul@gmail.com'; },
        },
        /* ── Actions ── */
        // {
        //     id: 'resume',
        //     label: 'Download Resume',
        //     description: 'Get PDF resume',
        //     keywords: ['cv', 'pdf', 'download'],
        //     icon: <FileDown className="w-3.5 h-3.5" />,
        //     group: 'Actions',
        //     action: () => { close(); window.open('/resume.pdf', '_blank'); },
        // },
    ];
}

/* ─── Hint badge ─── */
function KbdHint({ keys }: { keys: string[] }) {
    return (
        <span className="inline-flex items-center gap-1">
            {keys.map((k) => (
                <kbd
                    key={k}
                    className="inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-md bg-white/[0.06] border border-white/[0.1] text-[10px] font-mono text-white/40"
                >
                    {k}
                </kbd>
            ))}
        </span>
    );
}

/* ─── Main component ─── */
export default function CommandPalette() {
    const [open, setOpen] = useState(false);
    const [query, setQuery] = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
        setCursor(0);
    }, []);

    const commands = buildCommands(close);

    /* ── keyboard shortcut to open ── */
    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
                e.preventDefault();
                setOpen((v) => !v);
            }
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [close]);

    /* ── focus input on open ── */
    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 50);
    }, [open]);

    /* ── filter ── */
    const filtered = commands.filter((c) => {
        if (!query) return true;
        const q = query.toLowerCase();
        return (
            c.label.toLowerCase().includes(q) ||
            c.description.toLowerCase().includes(q) ||
            c.keywords?.some((k) => k.includes(q))
        );
    });

    /* ── group filtered items ── */
    const groups = ['Navigate', 'Links', 'Actions'] as const;
    const grouped = groups
        .map((g) => ({ group: g, items: filtered.filter((c) => c.group === g) }))
        .filter((g) => g.items.length > 0);

    /* ── flat list for keyboard navigation ── */
    const flat = grouped.flatMap((g) => g.items);

    /* ── keyboard navigation inside palette ── */
    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') {
            e.preventDefault();
            setCursor((p) => Math.min(p + 1, flat.length - 1));
        } else if (e.key === 'ArrowUp') {
            e.preventDefault();
            setCursor((p) => Math.max(p - 1, 0));
        } else if (e.key === 'Enter') {
            flat[cursor]?.action();
        }
    };

    /* ── scroll active item into view ── */
    useEffect(() => {
        const el = listRef.current?.querySelector(`[data-idx="${cursor}"]`);
        el?.scrollIntoView({ block: 'nearest' });
    }, [cursor]);

    return (
        <>
            {/* ── Trigger hint (bottom-left) ── */}
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={() => setOpen(true)}
                className="fixed bottom-6 left-6 z-50 hidden sm:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] text-white/30 hover:text-white/55 hover:bg-white/[0.07] hover:border-white/[0.12] transition-all duration-300 backdrop-blur-sm"
            >
                <Command className="w-3 h-3" />
                <span className="text-[11px] font-mono">Search</span>
                <KbdHint keys={['⌃', 'K']} />
            </motion.button>

            {/* ── Palette Modal ── */}
            <AnimatePresence>
                {open && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={close}
                            className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
                        />

                        {/* Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4"
                        >
                            <div className="rounded-2xl bg-[#0f0f11] border border-white/[0.1] shadow-2xl shadow-black/80 overflow-hidden">
                                {/* Search input */}
                                <div className="flex items-center gap-3 px-5 py-4 border-b border-white/[0.06]">
                                    <Search className="w-4 h-4 text-white/30 shrink-0" />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={(e) => { setQuery(e.target.value); setCursor(0); }}
                                        onKeyDown={onKey}
                                        placeholder="Search commands…"
                                        className="flex-1 bg-transparent text-[14px] text-white/75 placeholder:text-white/25 outline-none font-light"
                                    />
                                    {query && (
                                        <button onClick={() => setQuery('')} className="text-white/25 hover:text-white/50 transition-colors">
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Results */}
                                <div ref={listRef} className="max-h-[340px] overflow-y-auto overscroll-contain py-2">
                                    {grouped.length === 0 ? (
                                        <p className="text-center text-[12px] text-white/25 py-10 font-light">
                                            No results for &quot;{query}&quot;
                                        </p>
                                    ) : (
                                        grouped.map(({ group, items }) => {
                                            return (
                                                <div key={group}>
                                                    <p className="px-5 pt-3 pb-1.5 text-[10px] font-mono text-white/25 uppercase tracking-widest">
                                                        {group}
                                                    </p>
                                                    {items.map((cmd) => {
                                                        const idx = flat.indexOf(cmd);
                                                        const isActive = idx === cursor;
                                                        return (
                                                            <button
                                                                key={cmd.id}
                                                                data-idx={idx}
                                                                onClick={cmd.action}
                                                                onMouseEnter={() => setCursor(idx)}
                                                                className={`w-full flex items-center gap-3.5 px-4 py-3 mx-1 rounded-xl transition-all duration-150 text-left ${
                                                                    isActive
                                                                        ? 'bg-white/[0.07] text-white/90'
                                                                        : 'text-white/45 hover:bg-white/[0.04]'
                                                                }`}
                                                                style={{ width: 'calc(100% - 8px)' }}
                                                            >
                                                                <span className={`shrink-0 transition-colors duration-150 ${isActive ? 'text-white/70' : 'text-white/25'}`}>
                                                                    {cmd.icon}
                                                                </span>
                                                                <span className="flex-1 min-w-0">
                                                                    <span className="block text-[13px] font-medium leading-none mb-1">
                                                                        {cmd.label}
                                                                    </span>
                                                                    <span className="block text-[11px] text-white/30 font-light truncate">
                                                                        {cmd.description}
                                                                    </span>
                                                                </span>
                                                                {cmd.group === 'Links' && (
                                                                    <ExternalLink className="w-3 h-3 text-white/20 shrink-0" />
                                                                )}
                                                                {isActive && cmd.group !== 'Links' && (
                                                                    <ArrowRight className="w-3 h-3 text-white/30 shrink-0" />
                                                                )}
                                                            </button>
                                                        );
                                                    })}
                                                </div>
                                            );
                                        })
                                    )}
                                </div>

                                {/* Footer */}
                                <div className="px-5 py-3 border-t border-white/[0.06] flex items-center justify-between">
                                    <div className="flex items-center gap-3 text-[10px] text-white/25 font-mono">
                                        <span className="flex items-center gap-1">
                                            <KbdHint keys={['↑', '↓']} />
                                            navigate
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <KbdHint keys={['↵']} />
                                            select
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <KbdHint keys={['Esc']} />
                                            close
                                        </span>
                                    </div>
                                    <span className="text-[10px] font-mono text-white/20">
                                        {flat.length} results
                                    </span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}