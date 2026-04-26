'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Search, ArrowRight, ExternalLink, Hash, Mail,
    Github, Linkedin, MessageCircle, X, Command,
} from 'lucide-react';

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
        { id: 'about',       label: 'About',       description: 'Algorithmic thinking & metrics',  keywords: ['dsa', 'algo'],                    icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('about') },
        { id: 'skills',      label: 'Skills',      description: 'Technical stack & tools',         keywords: ['stack', 'tech', 'react', 'next'], icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('skills') },
        { id: 'projects',    label: 'Projects',    description: 'Selected production work',        keywords: ['work', 'portfolio'],              icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('projects') },
        { id: 'casestudies', label: 'Case Studies',description: 'Engineering deep dives',          keywords: ['case', 'engineering', 'study'],   icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('casestudies') },
        { id: 'journey',     label: 'Journey',     description: 'Experience timeline',             keywords: ['experience', 'timeline'],         icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('journey') },
        { id: 'contact',     label: 'Contact',     description: 'Get in touch',                    keywords: ['hire', 'email', 'talk'],          icon: <Hash className="w-3.5 h-3.5" />, group: 'Navigate', action: () => go('contact') },
        { id: 'github',    label: 'GitHub',    description: 'Open GitHub profile',    keywords: ['code', 'repos'],       icon: <Github className="w-3.5 h-3.5" />,        group: 'Links', action: () => { close(); window.open('https://github.com/devmazaharul', '_blank'); } },
        { id: 'linkedin',  label: 'LinkedIn',  description: 'Open LinkedIn profile', keywords: ['profile', 'network'],  icon: <Linkedin className="w-3.5 h-3.5" />,       group: 'Links', action: () => { close(); window.open('https://linkedin.com/in/mazaharul-islam-0948a333a', '_blank'); } },
        { id: 'whatsapp',  label: 'WhatsApp',  description: 'Message on WhatsApp',   keywords: ['chat', 'message'],     icon: <MessageCircle className="w-3.5 h-3.5" />,  group: 'Links', action: () => { close(); window.open('https://web.whatsapp.com/send/?phone=8801886575932&text&type=phone_number&app_absent=0', '_blank'); } },
        { id: 'email',     label: 'Email',     description: 'Send an email',          keywords: ['mail', 'message'],    icon: <Mail className="w-3.5 h-3.5" />,           group: 'Links', action: () => { close(); window.location.href = 'mailto:devmazaharul@gmail.com'; } },
    ];
}

function KbdHint({ keys, isLight }: { keys: string[]; isLight: boolean }) {
    return (
        <span className="inline-flex items-center gap-1">
            {keys.map((k) => (
                <kbd key={k} className={`inline-flex items-center justify-center h-5 min-w-[20px] px-1.5 rounded-md text-[10px] font-mono border ${
                    isLight
                        ? 'bg-zinc-100 border-zinc-200 text-zinc-400'
                        : 'bg-white/[0.06] border-white/[0.1] text-white/40'
                }`}>{k}</kbd>
            ))}
        </span>
    );
}

export default function CommandPalette({ isLight = false }: { isLight?: boolean }) {
    const [open, setOpen]     = useState(false);
    const [query, setQuery]   = useState('');
    const [cursor, setCursor] = useState(0);
    const inputRef = useRef<HTMLInputElement>(null);
    const listRef  = useRef<HTMLDivElement>(null);

    const close = useCallback(() => {
        setOpen(false);
        setQuery('');
        setCursor(0);
    }, []);

    const commands = buildCommands(close);

    useEffect(() => {
        const handler = (e: KeyboardEvent) => {
            if ((e.ctrlKey || e.metaKey) && e.key === 'k') { e.preventDefault(); setOpen(v => !v); }
            if (e.key === 'Escape') close();
        };
        window.addEventListener('keydown', handler);
        return () => window.removeEventListener('keydown', handler);
    }, [close]);

    useEffect(() => {
        if (open) setTimeout(() => inputRef.current?.focus(), 50);
    }, [open]);

    const filtered = commands.filter(c => {
        if (!query) return true;
        const q = query.toLowerCase();
        return c.label.toLowerCase().includes(q) || c.description.toLowerCase().includes(q) || c.keywords?.some(k => k.includes(q));
    });

    const groups  = ['Navigate', 'Links', 'Actions'] as const;
    const grouped = groups.map(g => ({ group: g, items: filtered.filter(c => c.group === g) })).filter(g => g.items.length > 0);
    const flat    = grouped.flatMap(g => g.items);

    const onKey = (e: React.KeyboardEvent) => {
        if (e.key === 'ArrowDown') { e.preventDefault(); setCursor(p => Math.min(p + 1, flat.length - 1)); }
        else if (e.key === 'ArrowUp') { e.preventDefault(); setCursor(p => Math.max(p - 1, 0)); }
        else if (e.key === 'Enter') flat[cursor]?.action();
    };

    useEffect(() => {
        listRef.current?.querySelector(`[data-idx="${cursor}"]`)?.scrollIntoView({ block: 'nearest' });
    }, [cursor]);

    /* ── theme shortcuts ── */
    const panel   = isLight ? 'bg-white border-zinc-200/80 shadow-zinc-200/60'       : 'bg-[#0f0f11] border-white/[0.1] shadow-black/80';
    const inputBd = isLight ? 'border-zinc-100'                                       : 'border-white/[0.06]';
    const inputTx = isLight ? 'text-zinc-700 placeholder:text-zinc-300'              : 'text-white/75 placeholder:text-white/25';
    const grpLbl  = isLight ? 'text-zinc-400'                                         : 'text-white/25';
    const footerB = isLight ? 'border-zinc-100 text-zinc-400'                         : 'border-white/[0.06] text-white/25';
    const countTx = isLight ? 'text-zinc-300'                                         : 'text-white/20';
    const trigBtn = isLight
        ? 'bg-white border-zinc-200 text-zinc-400 hover:text-zinc-600 hover:bg-zinc-50 hover:border-zinc-300 shadow-sm'
        : 'bg-white/[0.04] border-white/[0.08] text-white/30 hover:text-white/55 hover:bg-white/[0.07] hover:border-white/[0.12]';

    return (
        <>
            {/* Trigger */}
            <motion.button
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 1.5, duration: 0.5 }}
                onClick={() => setOpen(true)}
                className={`fixed bottom-6 left-6 z-50 hidden sm:inline-flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-[11px] font-mono transition-all duration-300 backdrop-blur-sm ${trigBtn}`}
            >
                <Command className="w-3 h-3" />
                Search
                <KbdHint keys={['⌃', 'K']} isLight={isLight} />
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {open && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                            onClick={close}
                            className={`fixed inset-0 z-[100] backdrop-blur-sm ${isLight ? 'bg-black/20' : 'bg-black/60'}`}
                        />
                        <motion.div
                            initial={{ opacity: 0, scale: 0.96, y: -10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.96, y: -10 }}
                            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
                            className="fixed top-[20vh] left-1/2 -translate-x-1/2 z-[101] w-full max-w-lg mx-4"
                        >
                            <div className={`rounded-2xl border shadow-2xl overflow-hidden ${panel}`}>

                                {/* Search */}
                                <div className={`flex items-center gap-3 px-5 py-4 border-b ${inputBd}`}>
                                    <Search className={`w-4 h-4 shrink-0 ${isLight ? 'text-zinc-300' : 'text-white/30'}`} />
                                    <input
                                        ref={inputRef}
                                        value={query}
                                        onChange={e => { setQuery(e.target.value); setCursor(0); }}
                                        onKeyDown={onKey}
                                        placeholder="Search commands…"
                                        className={`flex-1 bg-transparent text-[14px] outline-none font-light ${inputTx}`}
                                    />
                                    {query && (
                                        <button onClick={() => setQuery('')} className={`transition-colors ${isLight ? 'text-zinc-300 hover:text-zinc-500' : 'text-white/25 hover:text-white/50'}`}>
                                            <X className="w-3.5 h-3.5" />
                                        </button>
                                    )}
                                </div>

                                {/* Results */}
                                <div ref={listRef} className="max-h-[340px] overflow-y-auto overscroll-contain py-2">
                                    {grouped.length === 0 ? (
                                        <p className={`text-center text-[12px] py-10 font-light ${isLight ? 'text-zinc-300' : 'text-white/25'}`}>
                                            No results for &quot;{query}&quot;
                                        </p>
                                    ) : grouped.map(({ group, items }) => (
                                        <div key={group}>
                                            <p className={`px-5 pt-3 pb-1.5 text-[10px] font-mono uppercase tracking-widest ${grpLbl}`}>
                                                {group}
                                            </p>
                                            {items.map(cmd => {
                                                const idx      = flat.indexOf(cmd);
                                                const isActive = idx === cursor;
                                                const activeBg = isLight ? 'bg-zinc-100 text-zinc-800'      : 'bg-white/[0.07] text-white/90';
                                                const idleTx   = isLight ? 'text-zinc-500 hover:bg-zinc-50' : 'text-white/45 hover:bg-white/[0.04]';
                                                const iconTx   = isLight
                                                    ? (isActive ? 'text-zinc-600' : 'text-zinc-300')
                                                    : (isActive ? 'text-white/70' : 'text-white/25');
                                                const descTx   = isLight ? 'text-zinc-400' : 'text-white/30';
                                                const extTx    = isLight ? 'text-zinc-300' : 'text-white/20';
                                                const arrTx    = isLight ? 'text-zinc-400' : 'text-white/30';
                                                return (
                                                    <button
                                                        key={cmd.id}
                                                        data-idx={idx}
                                                        onClick={cmd.action}
                                                        onMouseEnter={() => setCursor(idx)}
                                                        className={`w-full flex items-center gap-3.5 px-4 py-3 mx-1 rounded-xl transition-all duration-150 text-left ${isActive ? activeBg : idleTx}`}
                                                        style={{ width: 'calc(100% - 8px)' }}
                                                    >
                                                        <span className={`shrink-0 transition-colors duration-150 ${iconTx}`}>{cmd.icon}</span>
                                                        <span className="flex-1 min-w-0">
                                                            <span className="block text-[13px] font-medium leading-none mb-1">{cmd.label}</span>
                                                            <span className={`block text-[11px] font-light truncate ${descTx}`}>{cmd.description}</span>
                                                        </span>
                                                        {cmd.group === 'Links' && <ExternalLink className={`w-3 h-3 shrink-0 ${extTx}`} />}
                                                        {isActive && cmd.group !== 'Links' && <ArrowRight className={`w-3 h-3 shrink-0 ${arrTx}`} />}
                                                    </button>
                                                );
                                            })}
                                        </div>
                                    ))}
                                </div>

                                {/* Footer */}
                                <div className={`px-5 py-3 border-t flex items-center justify-between ${footerB}`}>
                                    <div className="flex items-center gap-3 text-[10px] font-mono">
                                        <span className="flex items-center gap-1"><KbdHint keys={['↑', '↓']} isLight={isLight} /> navigate</span>
                                        <span className="flex items-center gap-1"><KbdHint keys={['↵']} isLight={isLight} /> select</span>
                                        <span className="flex items-center gap-1"><KbdHint keys={['Esc']} isLight={isLight} /> close</span>
                                    </div>
                                    <span className={`text-[10px] font-mono ${countTx}`}>{flat.length} results</span>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
}