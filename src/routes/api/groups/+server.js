// This file handles API requests for listing all groups

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all group slugs
 */
export async function GET() {
  try {
    // In a production environment, you would read from your content directory
    const groupsDir = path.join(process.cwd(), 'content', 'groups');
    const files = fs.readdirSync(groupsDir);
    
    // Extract slugs (remove file extensions)
    const groupSlugs = files
      .filter(file => file.endsWith('.md'))
      .map(file => file.replace('.md', ''));
    
    return json(groupSlugs);
  } catch (error) {
    console.error('Error loading groups:', error);
    return json([], { status: 500 });
  }
}
