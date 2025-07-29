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
  description: "Convert your Product Requirements Document (PRD) into a fully functional HTML prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts.",
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
    description: "Convert your Product Requirements Document (PRD) into a fully functional HTML prototype instantly. AI-powered tool that transforms ideas into interactive prototypes.",
    url: "https://prd-to-prototype.vercel.app",
    siteName: "PRD to Prototype",
    images: [
      {
        url: "/prd-to-product-1.0.png",
        width: 1200,
        height: 630,
        alt: "PRD to Prototype - Transform Requirements into Working Prototypes",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "PRD to Prototype - Transform Requirements into Working Prototypes",
    description: "Convert your Product Requirements Document (PRD) into a fully functional HTML prototype instantly. AI-powered prototyping tool.",
    images: ["/prd-to-product-1.0.png"],
    creator: "@anubhav",
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
    icon: "/prd-to-product-1.0.png",
    shortcut: "/prd-to-product-1.0.png",
    apple: "/prd-to-product-1.0.png",
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
    "description": "Convert your Product Requirements Document (PRD) into a fully functional HTML prototype instantly. AI-powered tool that transforms ideas into interactive prototypes.",
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="theme-color" content="#3b82f6" />
        <link rel="manifest" href="/manifest.json" />
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
