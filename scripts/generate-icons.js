const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const sourceImage = path.join(__dirname, '..', 'public', 'seo-source.png');
const outputDir = path.join(__dirname, '..', 'public');

// Icon sizes to generate for different platforms
const iconSizes = [
  // Standard favicons
  { size: 16, name: 'favicon-16x16.png' },
  { size: 32, name: 'favicon-32x32.png' },
  { size: 48, name: 'favicon.ico' }, // Will be converted to ICO later

  // Apple Touch Icons
  { size: 57, name: 'apple-touch-icon-57x57.png' },
  { size: 60, name: 'apple-touch-icon-60x60.png' },
  { size: 72, name: 'apple-touch-icon-72x72.png' },
  { size: 76, name: 'apple-touch-icon-76x76.png' },
  { size: 114, name: 'apple-touch-icon-114x114.png' },
  { size: 120, name: 'apple-touch-icon-120x120.png' },
  { size: 144, name: 'apple-touch-icon-144x144.png' },
  { size: 152, name: 'apple-touch-icon-152x152.png' },
  { size: 167, name: 'apple-touch-icon-167x167.png' },
  { size: 180, name: 'apple-touch-icon-180x180.png' },
  { size: 1024, name: 'apple-touch-icon-1024x1024.png' },

  // Android/Chrome Icons
  { size: 36, name: 'android-chrome-36x36.png' },
  { size: 48, name: 'android-chrome-48x48.png' },
  { size: 72, name: 'android-chrome-72x72.png' },
  { size: 96, name: 'android-chrome-96x96.png' },
  { size: 128, name: 'android-chrome-128x128.png' },
  { size: 144, name: 'android-chrome-144x144.png' },
  { size: 152, name: 'android-chrome-152x152.png' },
  { size: 192, name: 'android-chrome-192x192.png' },
  { size: 256, name: 'android-chrome-256x256.png' },
  { size: 384, name: 'android-chrome-384x384.png' },
  { size: 512, name: 'android-chrome-512x512.png' },

  // Microsoft Tiles
  { size: 70, name: 'mstile-70x70.png' },
  { size: 144, name: 'mstile-144x144.png' },
  { size: 150, name: 'mstile-150x150.png' },
  { size: 310, name: 'mstile-310x150.png', width: 310, height: 150 },
  { size: 310, name: 'mstile-310x310.png' },

  // Social Media & Open Graph
  { size: 1200, name: 'og-image-1200x630.png', width: 1200, height: 630 },
  { size: 1200, name: 'twitter-image-1200x600.png', width: 1200, height: 600 },
];

async function generateIcons() {
  console.log('🔄 Starting favicon generation...');

  // Check if source image exists
  if (!fs.existsSync(sourceImage)) {
    console.error(`❌ Source image not found: ${sourceImage}`);
    console.log('💡 Please add your high-resolution source image (≥1024×1024) to public/seo-source.png');
    process.exit(1);
  }

  try {
    // Load the source image
    const image = sharp(sourceImage);
    const metadata = await image.metadata();

    console.log(`📏 Source image: ${metadata.width}x${metadata.height}px`);

    // Generate all icon sizes
    for (const icon of iconSizes) {
      const outputPath = path.join(outputDir, icon.name);

      // Special handling for rectangular images (Microsoft tiles)
      const width = icon.width || icon.size;
      const height = icon.height || icon.size;

      await image
        .resize(width, height, {
          fit: 'contain',
          background: { r: 255, g: 255, b: 255, alpha: 0 }, // transparent background
        })
        .png()
        .toFile(outputPath);

      console.log(`✅ Generated: ${icon.name} (${width}x${height})`);
    }

    // Generate ICO file (favicon.ico) from 48x48
    const icoPath = path.join(outputDir, 'favicon.ico');
    await image
      .resize(48, 48, {
        fit: 'contain',
        background: { r: 255, g: 255, b: 255, alpha: 0 },
      })
      .png()
      .toFile(path.join(outputDir, 'favicon-temp.png'));

    // Note: For a complete ICO generation, you might need additional tools
    // For now, we'll use the PNG as favicon.ico (browsers support this)

    console.log('🎉 All favicons generated successfully!');
    console.log('📂 Files created in /public/ directory');
    console.log('🔧 Update your layout.tsx and manifest.json if needed');

  } catch (error) {
    console.error('❌ Error generating icons:', error);
    process.exit(1);
  }
}

// Run the script
generateIcons();
