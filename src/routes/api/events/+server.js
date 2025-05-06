// This file handles API requests for listing all events

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all event slugs
 */
export async function GET() {
  try {
    // Return a fixed list of event slugs for testing
    return json([
      'society-rush',
      'bible-conference',
      'harvest-festival',
      'inter-society-council'
    ]);
  } catch (error) {
    console.error('Error loading events:', error);
    return json([], { status: 500 });
  }
}