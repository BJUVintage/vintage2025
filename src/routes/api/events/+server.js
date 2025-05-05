// This file handles API requests for listing all events

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all event slugs
 */
export async function GET() {
  try {
    // In a production environment, you would read from your content directory
    // For this example, we're simulating reading from the file system
    const eventsDir = path.join(process.cwd(), 'content', 'events');
    const files = fs.readdirSync(eventsDir);
    
    // Extract slugs (remove file extensions)
    const eventSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    return json(eventSlugs);
  } catch (error) {
    console.error('Error loading events:', error);
    return json([], { status: 500 });
  }
}


