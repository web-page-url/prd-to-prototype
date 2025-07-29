import Head from 'next/head';

interface SEOProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
  type?: string;
}

export default function SEO({
  title = "PRD to Prototype - Transform Requirements into Working Prototypes",
  description = "Convert your Product Requirements Document (PRD) into a fully functional HTML prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts.",
  image = "/prd-to-product-1.0.png",
  url = "https://prd-to-prototype.vercel.app",
  type = "website"
}: SEOProps) {
  return (
    <Head>
      {/* Primary Meta Tags */}
      <title>{title}</title>
      <meta name="title" content={title} />
      <meta name="description" content={description} />
      <meta name="keywords" content="PRD to prototype, product requirements document, prototype generator, AI prototype tool, HTML prototype, product design, wireframe generator, mockup tool, rapid prototyping, product development, UI/UX design, web prototype, interactive prototype, design tool, product manager tool" />
      <meta name="author" content="Anubhav" />
      <meta name="creator" content="Anubhav" />
      <meta name="publisher" content="Anubhav" />
      <meta name="robots" content="index, follow" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      <meta name="distribution" content="global" />
      <meta name="rating" content="general" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={`${url}${image}`} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:image:alt" content={title} />
      <meta property="og:site_name" content="PRD to Prototype" />
      <meta property="og:locale" content="en_US" />

      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={title} />
      <meta property="twitter:description" content={description} />
      <meta property="twitter:image" content={`${url}${image}`} />
      <meta property="twitter:creator" content="@anubhav" />

      {/* Additional Meta Tags */}
      <meta name="theme-color" content="#3b82f6" />
      <meta name="msapplication-TileColor" content="#3b82f6" />
      <meta name="msapplication-config" content="/browserconfig.xml" />
      
      {/* Canonical URL */}
      <link rel="canonical" href={url} />
      
      {/* Favicon and Icons */}
      <link rel="icon" type="image/png" href="/prd-to-product-1.0.png" />
      <link rel="shortcut icon" href="/prd-to-product-1.0.png" />
      <link rel="apple-touch-icon" href="/prd-to-product-1.0.png" />
      <link rel="apple-touch-icon" sizes="180x180" href="/prd-to-product-1.0.png" />
      <link rel="icon" type="image/png" sizes="32x32" href="/prd-to-product-1.0.png" />
      <link rel="icon" type="image/png" sizes="16x16" href="/prd-to-product-1.0.png" />
      
      {/* PWA */}
      <link rel="manifest" href="/manifest.json" />
      
      {/* Preconnect for performance */}
      <link rel="preconnect" href="https://fonts.googleapis.com" />
      <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      
      {/* DNS Prefetch */}
      <link rel="dns-prefetch" href="//vercel.app" />
      <link rel="dns-prefetch" href="//fonts.googleapis.com" />
    </Head>
  );
}