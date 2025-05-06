// This file handles API requests for listing all groups

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all group slugs
 */
export async function GET() {
  try {
    // Return a comprehensive list of group slugs
    return json([
      "academic-teams",
      "baseball-team",
      "basketball-teams",
      "campus-media",
      "cross-country",
      "csc-cgo",
      "discipleship-groups",
      "golf",
      "instrumental-groups",
      "mission-teams",
      "practicums-and-internships",
      "research-teams",
      "seminary",
      "soccer",
      "study-abroad",
      "volleyball"
    ]);
  } catch (error) {
    console.error('Error loading groups:', error);
    return json([], { status: 500 });
  }
}