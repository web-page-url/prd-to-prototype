import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "PRD to Prototype - Transform Requirements into Working Prototypes",
  description: "Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts.",
  keywords: [
    "PRD to prototype",
    "product requirements document",
    "prototype generator",
    "AI prototype tool",
    "HTML prototype",
    "product design",
    "wireframe generator",
    "mockup tool",
    "rapid prototyping",
    "product development",
    "UI/UX design",
    "web prototype",
    "interactive prototype",
    "design tool",
    "product manager tool"
  ],
  authors: [{ name: "Anubhav", url: "https://prd-to-prototype.vercel.app" }],
  creator: "Anubhav",
  publisher: "Anubhav",
  metadataBase: new URL("https://prd-to-prototype.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "PRD to Prototype - Transform Requirements into Working Prototypes",
    description: "Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts.",
    url: "https://prd-to-prototype.vercel.app",
    siteName: "PRD to Prototype",
        images: [
      {
        url: "https://prd-to-prototype.vercel.app/og-image-1200x630.png",
        width: 1200,
        height: 630,
        alt: "PRD to Prototype - AI-powered tool to transform Product Requirements Documents into working HTML prototypes",
        type: "image/png",
      },
    ],
    locale: "en_US",
    type: "website",
    countryName: "United States",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRD to Prototype - Transform Requirements into Working Prototypes",
    description: "Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered prototyping tool created by Anubhav.",
    images: ["https://prd-to-prototype.vercel.app/twitter-image-1200x600.png"],
    creator: "@anubhav",
    site: "@anubhav",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code",
  },
  category: "technology",
  classification: "Business Tool",
  referrer: "origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  icons: {
    icon: "/prd-to-product-2.0.png",
    shortcut: "/prd-to-product-2.0.png",
    apple: "/prd-to-product-2.0.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    "name": "PRD to Prototype",
    "description": "Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered tool that transforms ideas into interactive prototypes.",
    "url": "https://prd-to-prototype.vercel.app",
    "applicationCategory": "BusinessApplication",
    "operatingSystem": "Web Browser",
    "offers": {
      "@type": "Offer",
      "price": "0",
      "priceCurrency": "USD"
    },
    "creator": {
      "@type": "Person",
      "name": "Anubhav"
    },
    "featureList": [
      "Convert PRD to HTML prototype",
      "AI-powered prototype generation",
      "Interactive design elements",
      "Mobile-responsive layouts",
      "Instant download capability",
      "Modern UI/UX design"
    ]
  };

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Structured Data for Search Engines */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        
        {/* Basic Meta Tags */}
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <meta name="msapplication-TileColor" content="#3b82f6" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
        
        {/* Enhanced Open Graph Tags for Facebook, Instagram, WhatsApp */}
        <meta property="og:title" content="PRD to Prototype - Transform Requirements into Working Prototypes" />
        <meta property="og:description" content="Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts." />
        <meta property="og:image" content="https://prd-to-prototype.vercel.app/og-image-1200x630.png" />
        <meta property="og:image:secure_url" content="https://prd-to-prototype.vercel.app/og-image-1200x630.png" />
        <meta property="og:image:width" content="1200" />
        <meta property="og:image:height" content="630" />
        <meta property="og:image:alt" content="PRD to Prototype - AI-powered tool to transform Product Requirements Documents into working HTML prototypes" />
        <meta property="og:image:type" content="image/png" />
        <meta property="og:url" content="https://prd-to-prototype.vercel.app" />
        <meta property="og:type" content="website" />
        <meta property="og:site_name" content="PRD to Prototype" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:updated_time" content="2025-01-29T00:00:00Z" />
        
        {/* Enhanced Twitter Card Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@anubhav" />
        <meta name="twitter:creator" content="@anubhav" />
        <meta name="twitter:title" content="PRD to Prototype - Transform Requirements into Working Prototypes" />
        <meta name="twitter:description" content="Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered prototyping tool created by Anubhav." />
        <meta name="twitter:image" content="https://prd-to-prototype.vercel.app/twitter-image-1200x600.png" />
        <meta name="twitter:image:alt" content="PRD to Prototype - AI-powered tool to transform Product Requirements Documents into working HTML prototypes" />
        <meta name="twitter:domain" content="prd-to-prototype.vercel.app" />
        
        {/* LinkedIn Specific Tags */}
        <meta property="article:author" content="Anubhav" />
        <meta property="article:published_time" content="2025-01-29T00:00:00Z" />
        <meta property="article:section" content="Technology" />
        <meta property="article:tag" content="PRD, Prototype, AI, Product Design, Web Development" />
        
        {/* WhatsApp Optimization (uses Open Graph) */}
        <meta property="og:rich_attachment" content="true" />
        
        {/* Additional Social Media Tags */}
        <meta name="pinterest-rich-pin" content="true" />
        <meta name="application-name" content="PRD to Prototype" />
        <meta name="apple-mobile-web-app-title" content="PRD to Prototype" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        
        {/* Favicon and Icons - Multi-Platform Support */}
        {/* Standard Favicon */}
        <link rel="icon" href="/favicon.ico" sizes="48x48" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        {/* Apple Touch Icons */}
        <link rel="apple-touch-icon" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png" />
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png" />
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png" />
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png" />

        {/* Android/Chrome Icons */}
        <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png" />
        <link rel="icon" type="image/png" sizes="512x512" href="/android-chrome-512x512.png" />

        {/* Microsoft Tiles */}
        <meta name="msapplication-TileImage" content="/mstile-144x144.png" />
        <meta name="msapplication-TileColor" content="#3b82f6" />

        {/* Legacy support */}
        <link rel="shortcut icon" href="/favicon.ico" />
        
        {/* PWA Manifest */}
        <link rel="manifest" href="/manifest.json" />
        
        {/* Preconnect for Performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        
        {/* DNS Prefetch */}
        <link rel="dns-prefetch" href="//vercel.app" />
        <link rel="dns-prefetch" href="//fonts.googleapis.com" />
        
        {/* Canonical URL */}
        <link rel="canonical" href="https://prd-to-prototype.vercel.app" />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem={true}
          disableTransitionOnChange={false}
          storageKey="theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
