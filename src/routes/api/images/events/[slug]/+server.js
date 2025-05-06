// This file handles API requests for retrieving event images

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving images for a specific event
 */
export async function GET({ params }) {
  try {
    const { slug } = params;
    
    // Path to the event's image directory
    const imageDir = path.join(process.cwd(), 'static', 'images', 'events', slug);
    
    // Check if directory exists
    if (!fs.existsSync(imageDir)) {
      console.warn(`Image directory not found for event ${slug}: ${imageDir}`);
      return json(["placeholder.jpg"]);
    }
    
    // Get all JPG/JPEG images from the directory
    const imageFiles = fs.readdirSync(imageDir)
      .filter(file => 
        file.toLowerCase().endsWith('.jpg') || 
        file.toLowerCase().endsWith('.jpeg') ||
        file.toLowerCase().endsWith('.png'))
      .sort();
      
    if (imageFiles.length === 0) {
      console.warn(`No images found for event ${slug}`);
      return json(["placeholder.jpg"]);
    }
    
    return json(imageFiles);
  } catch (error) {
    console.error(`Error loading images for event ${params.slug}:`, error);
    return json(["placeholder.jpg"], { status: 200 });
  }
}