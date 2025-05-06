// This file handles API requests for listing all groups

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all group slugs
 */
export async function GET() {
  try {
    // Return a fixed list of group slugs for testing
    return json([
      'basketball-teams',
      'baseball-team',
      'choral-ensembles',
      'academic-teams',
      'student-leadership-council'
    ]);
  } catch (error) {
    console.error('Error loading groups:', error);
    return json([], { status: 500 });
  }
}