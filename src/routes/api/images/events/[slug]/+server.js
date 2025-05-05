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
    
    // In a production environment, you would read from your static directory
    const eventImagesDir = path.join(process.cwd(), 'static', 'images', 'events', slug);
    
    // Check if directory exists
    if (!fs.existsSync(eventImagesDir)) {
      return json([], { status: 404 });
    }
    
    // Get all image files
    const files = fs.readdirSync(eventImagesDir);
    const imageFiles = files.filter(file => 
      /\.(jpg|jpeg|png|gif|webp|avif)$/i.test(file)
    );
    
    return json(imageFiles);
  } catch (error) {
    console.error(`Error loading images for event ${params.slug}:`, error);
    return json([], { status: 500 });
  }
}

