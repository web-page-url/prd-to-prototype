export default function Head() {
  return (
    <>
      {/* Additional SEO Meta Tags for Enhanced Social Media Sharing */}
      <meta name="format-detection" content="telephone=no" />
      <meta name="mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-capable" content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      
      {/* Enhanced Image Meta Tags for Better Social Media Display */}
      <meta property="og:image:secure_url" content="https://prd-to-prototype.vercel.app/prd-to-product-1.0.png" />
      <meta property="og:image:type" content="image/png" />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      
      {/* Twitter Image Optimization */}
      <meta name="twitter:image:src" content="https://prd-to-prototype.vercel.app/prd-to-product-1.0.png" />
      <meta name="twitter:image:width" content="1200" />
      <meta name="twitter:image:height" content="630" />
      
      {/* LinkedIn Specific Image Tags */}
      <meta property="og:image:alt" content="PRD to Prototype - AI-powered tool to transform Product Requirements Documents into working HTML prototypes. Created by Anubhav." />
      
      {/* WhatsApp and Instagram Optimization */}
      <meta property="og:rich_attachment" content="true" />
      <meta property="og:see_also" content="https://prd-to-prototype.vercel.app" />
      
      {/* Additional Social Platform Tags */}
      <meta name="pinterest:media" content="https://prd-to-prototype.vercel.app/prd-to-product-1.0.png" />
      <meta name="pinterest:description" content="PRD to Prototype - Transform your Product Requirements Document into a working HTML prototype instantly. AI-powered tool created by Anubhav." />
    </>
  )
}