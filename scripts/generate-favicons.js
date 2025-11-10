/**
 * Favicon Generator Script
 * 
 * This script helps generate favicon files from a source image.
 * 
 * Prerequisites:
 * 1. Install sharp: npm install sharp --save-dev
 * 2. Place a source image (logo.png) in the public folder (at least 512x512px)
 * 3. Run: node scripts/generate-favicons.js
 */

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const publicDir = path.join(__dirname, '..', 'public');
const sourceImage = path.join(publicDir, 'logo.png'); // You need to add your logo.png here

// Check if source image exists
if (!fs.existsSync(sourceImage)) {
  console.log('⚠️  Source image not found!');
  console.log('📝 Please add your logo.png (512x512px) to the public folder first.');
  console.log('💡 You can create a simple logo or use an online tool to generate one.');
  console.log('\n📋 Alternative: Use online favicon generators:');
  console.log('   - https://favicon.io/');
  console.log('   - https://realfavicongenerator.net/');
  console.log('   - https://www.favicon-generator.org/');
  process.exit(1);
}

const sizes = [
  { name: 'favicon-16x16.png', size: 16 },
  { name: 'favicon-32x32.png', size: 32 },
  { name: 'apple-touch-icon.png', size: 180 },
];

async function generateFavicons() {
  console.log('🎨 Generating favicon files...\n');

  try {
    // Generate PNG favicons
    for (const { name, size } of sizes) {
      await sharp(sourceImage)
        .resize(size, size, {
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 1 }
        })
        .png()
        .toFile(path.join(publicDir, name));
      console.log(`✅ Generated ${name} (${size}x${size})`);
    }

    // Generate ICO file (favicon.ico)
    // Note: sharp doesn't support ICO directly, so we'll use the 32x32 PNG
    // Most browsers accept PNG files with .ico extension
    await sharp(sourceImage)
      .resize(32, 32, {
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 1 }
      })
      .png()
      .toFile(path.join(publicDir, 'favicon.ico'));
    console.log('✅ Generated favicon.ico (32x32)\n');

    console.log('✨ All favicon files generated successfully!');
    console.log('📁 Files created in:', publicDir);
  } catch (error) {
    console.error('❌ Error generating favicons:', error.message);
    process.exit(1);
  }
}

generateFavicons();

