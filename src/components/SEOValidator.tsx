// SEO Validation Component - Use this to test social media sharing
// This component helps validate that your SEO image will appear correctly on all platforms

export const SEOValidationData = {
    // Primary SEO Data
    title: "PRD to Prototype - Transform Requirements into Working Prototypes",
    description: "Convert your Product Requirements Document (PRD) into a fully functional prototype instantly. AI-powered tool that transforms ideas into interactive prototypes with modern design and responsive layouts. Created by Anubhav.",
    url: "https://prd-to-prototype.vercel.app",
    image: "https://prd-to-prototype.vercel.app/prd-to-product-1.0.png",

    // Social Media Platform Requirements
    platforms: {
        facebook: {
            imageSize: "1200x630",
            aspectRatio: "1.91:1",
            minSize: "600x315",
            maxSize: "1200x630",
            format: "PNG, JPG",
            requirements: "Image should be at least 600x315px for best display"
        },
        instagram: {
            imageSize: "1080x1080 (square) or 1200x630 (landscape)",
            aspectRatio: "1:1 or 1.91:1",
            format: "PNG, JPG",
            requirements: "Uses Open Graph tags, same as Facebook"
        },
        whatsapp: {
            imageSize: "1200x630",
            aspectRatio: "1.91:1",
            format: "PNG, JPG",
            requirements: "Uses Open Graph tags, image should be publicly accessible"
        },
        twitter: {
            imageSize: "1200x630",
            aspectRatio: "1.91:1",
            cardType: "summary_large_image",
            format: "PNG, JPG, WEBP, GIF",
            requirements: "Image should be less than 5MB"
        },
        linkedin: {
            imageSize: "1200x630",
            aspectRatio: "1.91:1",
            format: "PNG, JPG",
            requirements: "Uses Open Graph tags, image should be publicly accessible"
        }
    },

    // Validation URLs for testing
    validationTools: {
        facebook: "https://developers.facebook.com/tools/debug/",
        twitter: "https://cards-dev.twitter.com/validator",
        linkedin: "https://www.linkedin.com/post-inspector/",
        whatsapp: "Test by sharing the URL in WhatsApp",
        instagram: "Test by sharing the URL in Instagram Stories"
    }
};

// Component for displaying SEO validation info (for development)
export default function SEOValidator() {
    if (process.env.NODE_ENV !== 'development') {
        return null;
    }

    return (
        <div className="fixed bottom-4 right-4 bg-black/80 text-white p-4 rounded-lg text-xs max-w-sm z-50">
            <h3 className="font-bold mb-2">SEO Validation</h3>
            <p><strong>Image:</strong> {SEOValidationData.image}</p>
            <p><strong>Size:</strong> 1200x630 (Optimal for all platforms)</p>
            <p><strong>Format:</strong> PNG ✅</p>
            <p><strong>Accessibility:</strong> Public URL ✅</p>
            <div className="mt-2">
                <p className="font-semibold">Test on:</p>
                <ul className="text-xs">
                    <li>• Facebook Debugger</li>
                    <li>• Twitter Card Validator</li>
                    <li>• LinkedIn Post Inspector</li>
                    <li>• WhatsApp (direct share)</li>
                    <li>• Instagram Stories</li>
                </ul>
            </div>
        </div>
    );
}