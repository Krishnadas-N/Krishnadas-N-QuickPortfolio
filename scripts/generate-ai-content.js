/**
 * Script to generate AI content on build or manually
 * Run: node scripts/generate-ai-content.js
 */

const fs = require('fs').promises
const path = require('path')

// This script can be extended to call OpenAI API during build
// For now, it just ensures the generated.json file exists

const GENERATED_FILE = path.join(process.cwd(), 'data', 'generated.json')

async function ensureGeneratedFile() {
  try {
    await fs.access(GENERATED_FILE)
    console.log('✓ Generated content file exists')
  } catch {
    // File doesn't exist, create empty one
    await fs.mkdir(path.dirname(GENERATED_FILE), { recursive: true })
    await fs.writeFile(
      GENERATED_FILE,
      JSON.stringify({
        lastGenerated: new Date().toISOString(),
      }, null, 2)
    )
    console.log('✓ Created generated content file')
  }
}

ensureGeneratedFile().catch(console.error)

