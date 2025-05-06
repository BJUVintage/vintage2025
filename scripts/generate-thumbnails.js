/**
 * Script to generate thumbnail versions of all images in the static/images directory
 * Usage: node scripts/generate-thumbnails.js
 * 
 * This script will:
 * 1. Find all JPG/JPEG/PNG files in the static/images directory
 * 2. Generate thumbnails (180px height) with _thumb suffix
 * 3. Generate compressed versions (1000px max dimension) with _compressed suffix
 */

import fs from 'fs';
import path from 'path';
import { execSync } from 'child_process';
import { fileURLToPath } from 'url';

// Get the current directory in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Check if ImageMagick is installed
try {
  execSync('convert -version', { stdio: 'ignore' });
} catch (error) {
  console.error('Error: ImageMagick is not installed. Please install it first:');
  console.error('  Ubuntu/Debian: sudo apt-get install imagemagick');
  console.error('  macOS: brew install imagemagick');
  console.error('  Windows: Download and install from https://imagemagick.org/script/download.php');
  process.exit(1);
}

// Set up paths
const imagesDir = path.join(__dirname, '..', 'static', 'images');
const skipDirs = ['placeholder'];

// Find all image files
function findImageFiles(dir, fileList = []) {
  const files = fs.readdirSync(dir);
  
  files.forEach(file => {
    const filePath = path.join(dir, file);
    const stat = fs.statSync(filePath);
    
    if (stat.isDirectory()) {
      // Skip certain directories
      if (!skipDirs.includes(file)) {
        findImageFiles(filePath, fileList);
      }
    } else {
      // Check if it's an image file
      const ext = path.extname(file).toLowerCase();
      if (['.jpg', '.jpeg', '.png'].includes(ext)) {
        fileList.push(filePath);
      }
    }
  });
  
  return fileList;
}

// Process an image file
function processImage(imagePath) {
  const dir = path.dirname(imagePath);
  const filename = path.basename(imagePath);
  const ext = path.extname(filename);
  const nameWithoutExt = path.basename(filename, ext);
  
  // Skip if it already has _thumb or _compressed suffix
  if (nameWithoutExt.endsWith('_thumb') || nameWithoutExt.endsWith('_compressed')) {
    return;
  }
  
  // Clean any pre-existing suffixes just to be safe
  const cleanName = nameWithoutExt.replace('_thumb', '').replace('_compressed', '');
  
  const thumbPath = path.join(dir, `${cleanName}_thumb${ext}`);
  const compressedPath = path.join(dir, `${cleanName}_compressed${ext}`);
  
  // Skip if already exists
  if (fs.existsSync(thumbPath) && fs.existsSync(compressedPath)) {
    return;
  }
  
  try {
    // Generate thumbnail (180px height)
    if (!fs.existsSync(thumbPath)) {
      console.log(`Generating thumbnail for ${path.relative(imagesDir, imagePath)}`);
      execSync(`convert "${imagePath}" -resize x180 -quality 80 "${thumbPath}"`);
    }
    
    // Generate compressed version (1000px max dimension)
    if (!fs.existsSync(compressedPath)) {
      console.log(`Generating compressed version for ${path.relative(imagesDir, imagePath)}`);
      execSync(`convert "${imagePath}" -resize 1000x1000\\> -quality 85 "${compressedPath}"`);
    }
  } catch (error) {
    console.error(`Error processing ${imagePath}:`, error.message);
  }
}

// Main function
function main() {
  console.log('Finding image files...');
  const imageFiles = findImageFiles(imagesDir);
  console.log(`Found ${imageFiles.length} image files`);
  
  // Process each image
  imageFiles.forEach((imagePath, index) => {
    console.log(`Processing image ${index + 1}/${imageFiles.length}: ${path.relative(imagesDir, imagePath)}`);
    processImage(imagePath);
  });
  
  console.log('Done!');
}

main();