'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useMotionValue, useSpring } from 'framer-motion';

export default function CursorEffect() {
    const cursorX = useMotionValue(-100);
    const cursorY = useMotionValue(-100);
    const trailX = useMotionValue(-100);
    const trailY = useMotionValue(-100);

    /* ── spring config: dot follows instantly, trail lags behind ── */
    const springCfg = { stiffness: 500, damping: 28, mass: 0.5 };
    const trailCfg = { stiffness: 120, damping: 18, mass: 0.8 };

    const dotX = useSpring(cursorX, springCfg);
    const dotY = useSpring(cursorY, springCfg);
    const lagX = useSpring(trailX, trailCfg);
    const lagY = useSpring(trailY, trailCfg);

    const [visible, setVisible] = useState(false);
    const [clicking, setClicking] = useState(false);
    const [hovering, setHovering] = useState(false);
    const rafRef = useRef<number>(0);

    useEffect(() => {
        /* only on desktop */
        if (window.matchMedia('(pointer: coarse)').matches) return;

        /* hide default cursor */
        document.documentElement.style.cursor = 'none';

        const onMove = (e: MouseEvent) => {
            cursorX.set(e.clientX);
            cursorY.set(e.clientY);

            /* trail follows with rAF smoothing */
            cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(() => {
                trailX.set(e.clientX);
                trailY.set(e.clientY);
            });

            if (!visible) setVisible(true);

            /* detect interactive elements */
            const el = e.target as HTMLElement;
            const interactive = el.closest(
                'a, button, [role="button"], input, textarea, select, label',
            );
            setHovering(!!interactive);
        };

        const onLeave = () => setVisible(false);
        const onEnter = () => setVisible(true);
        const onDown = () => setClicking(true);
        const onUp = () => setClicking(false);

        document.addEventListener('mousemove', onMove, { passive: true });
        document.addEventListener('mouseleave', onLeave);
        document.addEventListener('mouseenter', onEnter);
        document.addEventListener('mousedown', onDown);
        document.addEventListener('mouseup', onUp);

        return () => {
            document.documentElement.style.cursor = '';
            cancelAnimationFrame(rafRef.current);
            document.removeEventListener('mousemove', onMove);
            document.removeEventListener('mouseleave', onLeave);
            document.removeEventListener('mouseenter', onEnter);
            document.removeEventListener('mousedown', onDown);
            document.removeEventListener('mouseup', onUp);
        };
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    if (typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches) {
        return null;
    }

    return (
        <>
            {/* ── Glow halo (large, soft, lagging) ── */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[200] rounded-full"
                style={{
                    x: lagX,
                    y: lagY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: visible ? 1 : 0,
                    width: hovering ? 64 : 40,
                    height: hovering ? 64 : 40,
                    background: hovering
                        ? 'radial-gradient(circle, rgba(255,255,255,0.08) 0%, transparent 70%)'
                        : 'radial-gradient(circle, rgba(255,255,255,0.05) 0%, transparent 70%)',
                    transition: 'opacity 0.3s, width 0.4s, height 0.4s, background 0.3s',
                }}
            />

            {/* ── Ring (medium, slightly lagging) ── */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[201] rounded-full border"
                style={{
                    x: lagX,
                    y: lagY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: visible ? 1 : 0,
                    width: hovering ? 32 : 20,
                    height: hovering ? 32 : 20,
                    borderColor: hovering ? 'rgba(255,255,255,0.25)' : 'rgba(255,255,255,0.15)',
                    scale: clicking ? 0.85 : 1,
                    transition: 'opacity 0.3s, width 0.4s, height 0.4s, borderColor 0.3s',
                }}
            />

            {/* ── Dot (tiny, snappy, instant) ── */}
            <motion.div
                className="pointer-events-none fixed top-0 left-0 z-[202] rounded-full"
                style={{
                    x: dotX,
                    y: dotY,
                    translateX: '-50%',
                    translateY: '-50%',
                    opacity: visible ? 1 : 0,
                    width: clicking ? 3 : 4,
                    height: clicking ? 3 : 4,
                    backgroundColor: hovering ? 'rgba(255,255,255,0.9)' : 'rgba(255,255,255,0.6)',
                    transition: 'opacity 0.2s, width 0.1s, height 0.1s, backgroundColor 0.2s',
                }}
            />
        </>
    );
}