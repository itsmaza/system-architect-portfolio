/**
 * ══════════════════════════════════════════════════════════════════
 * Centralized Data Store
 * ══════════════════════════════════════════════════════════════════
 * All portfolio content lives here. Components are pure renderers;
 * adding new projects / skills requires zero component changes.
 */

import type {
    DsaMetric,
    DsaPattern,
    EngineeringCaseStudy,
    PersonalInfo,
    Project,
    SkillCategory,
    SocialLink,
    TimelineItem,
} from './types';

/* ─── Personal Information ──────────────────────────────────────── */

export const PERSONAL: PersonalInfo = {
    name: 'Mazaharul Islam',
    firstName: 'Mazaharul',
    lastName: 'Islam',
    title: 'Full Stack Software Engineer',
    experience: '4+',
    description:
        'I am a Software Engineer dedicated to building scalable, high-performance distributed systems. With a strong foundation in Data Structures & Algorithms, I engineer robust backend architectures and intuitive frontend interfaces using Next.js, PostgreSQL, and Docker. Currently sharpening my Java skills to tackle complex algorithmic challenges.',
    location: 'Remote · Jessore, Bangladesh',
    email: 'devmazaharul@gmail.com',
    resumeUrl: '/resume.pdf',
} as const;

/* ─── Social / Contact Links ────────────────────────────────────── */

export const SOCIAL_LINKS: readonly SocialLink[] = [
    {
        label: 'Email',
        href: 'mailto:devmazaharul@gmail.com',
        icon: 'email',
    },
    {
        label: 'LinkedIn',
        href: 'https://www.linkedin.com/in/mazaharul-islam-0948a333a',
        icon: 'linkedin',
    },
    {
        label: 'GitHub',
        href: 'https://github.com/itsmaza',
        icon: 'github',
    },
    {
        label: 'WhatsApp',
        href: 'https://wa.me/8801886575932',
        icon: 'whatsapp',
    },
] as const;

/* ─── Skills ────────────────────────────────────────────────────── */

export const SKILL_CATEGORIES: readonly SkillCategory[] = [
    {
        title: 'Frontend Engineering',
        icon: 'frontend',
        description: 'Building performant, accessible interfaces with modern React patterns.',
        skills: [
            { name: 'JavaScript', experience: '4y+' },
            { name: 'TypeScript', experience: '2y+' },
            { name: 'React.js', experience: '3y+' },
            { name: 'Next.js', experience: '3y+' },
            { name: 'Tailwind CSS', experience: '3y+' },
        ],
    },
    {
        title: 'Backend & Databases',
        icon: 'backend',
        description: 'Designing robust APIs and data layers with ACID compliance.',
        skills: [
            { name: 'Node.js', experience: '3y+' },
            { name: 'Express', experience: '3y+' },
            { name: 'PostgreSQL', experience: '2y+' },
            { name: 'MongoDB', experience: '2y+' },
            { name: 'Prisma', experience: '2y+' },
            { name: 'REST APIs', experience: '3y+' },
            { name: 'JWT Auth', experience: '3y+' },
        ],
    },
    {
        title: 'Architecture & Tools',
        icon: 'tools',
        description: 'Containerization, version control, and deployment pipelines.',
        skills: [
            { name: 'Docker', experience: '1y+' },
            { name: 'Git / GitHub', experience: '4y+' },
            { name: 'Linux CLI', experience: '2y+' },
            { name: 'Basic CI/CD', experience: '1y+' },
            { name: 'System Design', experience: '2y+' },
        ],
    },
] as const;

/* ─── Projects ──────────────────────────────────────────────────── */

export const PROJECTS: readonly Project[] = [
    {
        id: 'finvault',
        title: 'FinVault',
        subtitle: 'AI-Powered Conversational Banking Platform',
        description:
            'Built a full-stack AI-native fintech dashboard where users manage finances through natural language. Features a conversational AI interface for real-time transfers, spending analytics, and transaction history — all secured with JWT auth, 4-digit passcode, rate limiting, and human-in-the-loop confirmation before every transaction.',
        techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Claude AI', 'Docker'],
        liveUrl: 'https://fin-vault-6grp.vercel.app/',
        status: 'live',
        featured: true,
    },
    {
        id: 'flybismillah',
        title: 'flybismillah',
        subtitle: 'Global Flight Aggregation Engine',
        description:
            'Engineered a high-performance flight search architecture integrating real-time GDS/Duffel APIs. Features complex route filtering, multi-currency support, and a high-concurrency backend optimized for sub-second response times under heavy load.',
        techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'REST APIs', 'Docker'],
        liveUrl: 'https://flybismillah.com/',
        status: 'live',
        featured: true,
    },
    {
        id: 'voterfinder',
        title: 'VoterFinder',
        subtitle: 'Smart Serial Platform',
        description:
            'Responsive voter serial lookup optimized for fast querying with indexed database operations and secure data handling. Implements efficient search algorithms for rapid result retrieval across large datasets.',
        techStack: ['Next.js', 'MongoDB', 'REST APIs', 'Tailwind CSS'],
        liveUrl: 'https://voterserial.vercel.app',
        status: 'live',
        featured: true,
    },
    {
        id: 'mazapay',
        title: 'mazaPay',
        subtitle: 'Secure FinTech Transaction System',
        description:
            'Focuses on transaction atomicity with ACID-compliant operations, multi-layer JWT authentication, role-based access control, and end-to-end data integrity for financial operations.',
        techStack: ['Node.js', 'Express', 'PostgreSQL', 'JWT', 'Docker'],
        liveUrl: 'https://pay.mazaharul.site',
        status: 'live',
        featured: true,
    },
    {
        id: 'flexin',
        title: 'FlexIn',
        subtitle: 'Scalable E-Commerce Architecture',
        description:
            'Implemented optimized relational database schemas (PostgreSQL) with normalized table structures. Utilized Zustand for performant global state management and implemented lazy-loading strategies for optimal UX.',
        techStack: ['Next.js', 'PostgreSQL', 'Zustand', 'Prisma', 'Tailwind CSS'],
        liveUrl: 'https://themaza.shop',
        status: 'live',
        featured: true,
    },
] as const;

/* ─── DSA Metrics ───────────────────────────────────────────────── */

export const DSA_METRICS: readonly DsaMetric[] = [
    {
        id: 'linear-time',
        value: 'O(N)',
        label: 'Efficient Solutions',
        description: 'I try to solve problems in linear time whenever possible.',
    },
    {
        id: 'constant-space',
        value: 'O(1)',
        label: 'Memory Efficient',
        description: 'I prefer solutions that use very little extra memory.',
    },
    {
        id: 'log-search',
        value: 'O(log N)',
        label: 'Fast Search',
        description: 'I use binary search and efficient lookup techniques when appropriate.',
    },
    {
        id: 'scalability',
        value: 'DSA',
        label: 'Problem Solving',
        description:
            'I apply data structures and algorithms to build efficient and scalable software.',
    },
] as const;

/* ─── DSA Patterns ──────────────────────────────────────────────── */

export const DSA_PATTERNS: readonly DsaPattern[] = [
    {
        id: 'arrays-strings',
        name: 'Arrays & Strings',
        level: 'Strong',
        notation: 'O(N)',
        description:
            'Core iteration, transformation, filtering, normalization, and parsing strategies.',
        productionUse:
            'Useful in payload transformation, route filtering, and frontend state shaping.',
    },
    {
        id: 'hashing',
        name: 'Hash Maps / Sets',
        level: 'Strong',
        notation: 'O(1)',
        description:
            'Fast lookups, deduplication, membership checks, and cache-friendly access patterns.',
        productionUse:
            'Applied in voter lookup flows, auth/session checks, and response aggregation.',
    },
    {
        id: 'two-pointers',
        name: 'Two Pointers',
        level: 'Active',
        notation: 'O(N)',
        description:
            'Efficient range scanning and boundary-driven traversal with minimal extra space.',
        productionUse:
            'Useful in ordered filtering, interval logic, and price/range search experiences.',
    },
    {
        id: 'sliding-window',
        name: 'Sliding Window',
        level: 'Active',
        notation: 'O(N)',
        description: 'Optimizing continuous sequences, streams, and rolling computations.',
        productionUse: 'Relevant to analytics, throttled aggregations, and streaming data windows.',
    },
    {
        id: 'binary-search',
        name: 'Binary Search',
        level: 'Active',
        notation: 'O(log N)',
        description: 'Logarithmic search across sorted domains and threshold-based decisions.',
        productionUse:
            'Useful in indexed search, pagination thresholds, and data narrowing strategies.',
    },
    {
        id: 'trees-graphs',
        name: 'Trees & Graph Traversal',
        level: 'Active',
        notation: 'DFS / BFS',
        description: 'Structured traversal for hierarchical and relational problem spaces.',
        productionUse:
            'Helpful for nested route systems, dependency modeling, and graph-like flows.',
    },
    {
        id: 'sorting-greedy',
        name: 'Sorting & Greedy',
        level: 'Strong',
        notation: 'N log N',
        description: 'Prioritization, ordering, selection, and heuristic-based optimization.',
        productionUse:
            'Used in ranking results, flight sorting, and response prioritization logic.',
    },
    {
        id: 'dp',
        name: 'Dynamic Programming',
        level: 'Learning',
        notation: 'state',
        description:
            'State transition thinking for optimal substructure and overlapping subproblems.',
        productionUse: 'Currently sharpening this area for more advanced algorithmic challenges.',
    },
] as const;

/* ─── Engineering Case Studies ──────────────────────────────────── */

export const DSA_CASE_STUDIES: readonly EngineeringCaseStudy[] = [
    {
        id: 'finvault-case',
        project: 'finVault',
        title: 'Secure Transaction Processing System',
        summary:
            'Built backend flows for secure and consistent transaction handling with proper authentication and validation.',
        complexityFocus: 'Data consistency, transaction handling, and secure API design.',
        impact: 'Ensures safe and reliable financial operations with controlled data flow.',
        stack: ['Node.js', 'Express', 'PostgreSQL', 'JWT'],
        liveUrl: 'https://pay.mazaharul.site',
    },
    {
        id: 'flybismillah-case',
        project: 'flybismillah',
        title: 'Flight Data Processing & Search Optimization',
        summary:
            'Built a flight search system integrating external providers and optimized data transformation for consistent results.',
        complexityFocus:
            'Response normalization, filtering pipelines, and API integration for fast data delivery.',
        impact: 'Improves search speed and provides clean, structured flight results to users.',
        stack: ['Next.js', 'PostgreSQL', 'Prisma', 'REST APIs'],
        liveUrl: 'https://flybismillah.com/',
    },
    {
        id: 'voterfinder-case',
        project: 'VoterFinder',
        title: 'Fast Lookup System with Optimized Querying',
        summary:
            'Built a search system for fast retrieval of large voter datasets using efficient query and filtering logic.',
        complexityFocus: 'Indexed querying, fast lookup patterns, and optimized database access.',
        impact: 'Reduces search time and improves responsiveness across large datasets.',
        stack: ['Next.js', 'MongoDB'],
        liveUrl: 'https://voterserial.vercel.app',
    },
] as const;

/* ─── Experience Timeline ───────────────────────────────────────── */

export const EXPERIENCE_TIMELINE: readonly TimelineItem[] = [
    {
        id: 'timeline-2023',
        year: '2023',
        title: 'Frontend Foundations & JavaScript Depth',
        type: 'milestone',
        summary:
            'Started building production-grade interfaces while strengthening JavaScript fundamentals, responsive UI thinking, and component-based architecture.',
        highlights: [
            'Focused on clean UI implementation',
            'Built reusable React components',
            'Established Git/GitHub workflow discipline',
        ],
        techStack: ['JavaScript', 'React.js', 'Tailwind CSS', 'Git/GitHub'],
    },
    {
        id: 'timeline-2024',
        year: '2024',
        title: 'Moved Into Full-Stack Engineering',
        type: 'milestone',
        summary:
            'Expanded from frontend into backend systems, authentication, API design, and practical database modeling.',
        highlights: [
            'Built REST APIs with Express',
            'Worked with MongoDB and PostgreSQL',
            'Implemented JWT-based authentication flows',
        ],
        techStack: ['Node.js', 'Express', 'MongoDB', 'PostgreSQL', 'JWT'],
    },
    {
        id: 'timeline-2025',
        year: '2025',
        title: 'Performance-Driven Next.js Delivery',
        type: 'milestone',
        summary:
            'Shifted toward scalable product delivery using Next.js, TypeScript, and database tooling with stronger attention to performance and architecture.',
        highlights: [
            'Adopted TypeScript for safer codebases',
            'Used Prisma for cleaner data access',
            'Focused on query optimization and app structure',
        ],
        techStack: ['Next.js', 'TypeScript', 'Prisma', 'PostgreSQL', 'Docker'],
    },

    {
        id: 'timeline-2026',
        year: '2026',
        title: 'Deepening DSA, Java & System Design',
        type: 'learning',
        summary:
            'Currently sharpening algorithmic problem-solving, Java fundamentals, and deeper system design thinking for complex, scale-focused engineering challenges.',
        highlights: [
            'Studying advanced DSA patterns',
            'Strengthening Java for problem solving',
            'Refining architecture and scalability decisions',
        ],
        techStack: ['Java', 'DSA', 'System Design', 'Linux CLI', 'Docker'],
    },
] as const;
