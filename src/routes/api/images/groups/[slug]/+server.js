// This file handles API requests for retrieving group images

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving images for a specific group
 */
export async function GET({ params }) {
  try {
    const { slug } = params;
    
    // Path to the group's image directory
    const imageDir = path.join(process.cwd(), 'static', 'images', 'groups', slug);
    
    // Check if directory exists
    if (!fs.existsSync(imageDir)) {
      console.warn(`Image directory not found for group ${slug}: ${imageDir}`);
      return json(["placeholder.jpg"]);
    }
    
    // Get all JPG/JPEG/PNG images from the directory
    const imageFiles = fs.readdirSync(imageDir)
      .filter(file => 
        file.toLowerCase().endsWith('.jpg') || 
        file.toLowerCase().endsWith('.jpeg') ||
        file.toLowerCase().endsWith('.png'))
      .sort();
      
    if (imageFiles.length === 0) {
      console.warn(`No images found for group ${slug}`);
      return json(["placeholder.jpg"]);
    }
    
    return json(imageFiles);
  } catch (error) {
    console.error(`Error loading images for group ${params.slug}:`, error);
    return json(["placeholder.jpg"], { status: 200 });
  }
}

