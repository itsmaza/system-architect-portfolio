import type { Metadata, Viewport } from 'next';
import localFont from 'next/font/local';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({
    variable: '--font-geist-sans',
    subsets: ['latin'],
    display: 'swap',
    weight: ['200', '300', '400', '500', '600', '700'],
});

const sfMono = localFont({
    src: [
        {
            path: '../public/SFMonoRegular.otf',
            weight: '400',
            style: 'normal',
        },
    ],
    variable: '--font-sf-mono',
    display: 'swap',
});

const SITE_URL = 'https://mazaharul.site';
const SITE_NAME = 'Mazaharul Islam';
const SITE_TITLE = 'Mazaharul Islam | Full Stack Software Engineer';
const SITE_DESCRIPTION =
    'Full Stack Software Engineer specializing in scalable distributed systems, high-performance architectures, React, Next.js, Node.js, and cloud-native solutions.';
const OG_IMAGE = `${SITE_URL}/seo.jpg`;

export const metadata: Metadata = {
    title: { default: SITE_TITLE, template: `%s | ${SITE_NAME}` },
    description: SITE_DESCRIPTION,
    applicationName: SITE_NAME,
    authors: [{ name: SITE_NAME, url: SITE_URL }],
    creator: SITE_NAME,
    publisher: SITE_NAME,
    generator: 'Next.js',
    keywords: [
        'Mazaharul Islam',
        'Full Stack Developer',
        'Software Engineer',
        'React Developer',
        'Next.js Developer',
        'Node.js Developer',
        'TypeScript Developer',
        'System Architecture',
        'Distributed Systems',
        'Cloud Native',
        'REST API',
        'GraphQL',
        'MongoDB',
        'PostgreSQL',
        'Tailwind CSS',
        'Portfolio',
        'Bangladesh Developer',
    ],
    metadataBase: new URL(SITE_URL),
    alternates: { canonical: '/', languages: { 'en-US': '/' } },
    openGraph: {
        type: 'website',
        locale: 'en_US',
        url: SITE_URL,
        siteName: SITE_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [
            {
                url: OG_IMAGE,
                width: 1200,
                height: 630,
                alt: `${SITE_NAME} — Full Stack Software Engineer Portfolio`,
                type: 'image/jpeg',
            },
        ],
    },
    twitter: {
        card: 'summary_large_image',
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        images: [OG_IMAGE],
        creator: '@mazaharul_islam',
        site: '@mazaharul_islam',
    },
    robots: {
        index: true,
        follow: true,
        nocache: false,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    verification: { google: 'YOUR_GOOGLE_VERIFICATION_CODE' },
    icons: {
        icon: [
            { url: '/binary.png', sizes: 'any' },
            { url: '/binary.png', sizes: '16x16', type: 'image/png' },
            { url: '/binary.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [{ url: '/binary.png', sizes: '180x180', type: 'image/png' }],
        shortcut: '/binary.png',
    },
    manifest: '/site.webmanifest',
    category: 'technology',
};

export const viewport: Viewport = {
    themeColor: [
        { media: '(prefers-color-scheme: dark)', color: '#0D0D0D' },
        { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    ],
    width: 'device-width',
    initialScale: 1,
    maximumScale: 5,
    colorScheme: 'dark light',
};

function JsonLd() {
    const personSchema = {
        '@context': 'https://schema.org',
        '@type': 'Person',
        name: 'Mazaharul Islam',
        url: SITE_URL,
        image: `${SITE_URL}/IMG_6403.PNG`,
        jobTitle: 'Full Stack Software Engineer',
        description: SITE_DESCRIPTION,
        email: 'mailto:mazaharul.contact@gmail.com',
        sameAs: ['https://github.com/mazaharul', 'https://linkedin.com/in/mazaharul'],
        knowsAbout: [
            'Software Engineering',
            'Full Stack Development',
            'React',
            'Next.js',
            'Node.js',
            'TypeScript',
            'System Design',
        ],
        address: {
            '@type': 'PostalAddress',
            addressCountry: 'BD',
            addressLocality: 'Bangladesh',
        },
    };
    const websiteSchema = {
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
        description: SITE_DESCRIPTION,
        author: { '@type': 'Person', name: SITE_NAME },
        inLanguage: 'en-US',
    };
    const profilePageSchema = {
        '@context': 'https://schema.org',
        '@type': 'ProfilePage',
        mainEntity: {
            '@type': 'Person',
            name: 'Mazaharul Islam',
            url: SITE_URL,
            jobTitle: 'Full Stack Software Engineer',
        },
        dateCreated: '2024-01-01',
        dateModified: new Date().toISOString().split('T')[0],
    };

    return (
        <>
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(profilePageSchema) }}
            />
        </>
    );
}

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
    return (
        <html
            lang="en"
            className={`scroll-smooth ${inter.variable} ${sfMono.variable}`}
            suppressHydrationWarning
        >
            <head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link
                    rel="preconnect"
                    href="https://fonts.gstatic.com"
                    crossOrigin="anonymous"
                />
                <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
                <JsonLd />
            </head>

            <body className="antialiased isolate">
                <a
                    href="#hero"
                    className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[100] focus:px-4 focus:py-2 focus:rounded-lg focus:bg-emerald-500 focus:text-black focus:text-sm focus:font-bold"
                >
                    Skip to main content
                </a>

                <main className="relative z-[1] min-h-screen">{children}</main>
            </body>
        </html>
    );
}