// This file handles API requests for listing all events

import { json } from '@sveltejs/kit';
import fs from 'fs';
import path from 'path';

/**
 * GET handler for retrieving all event slugs
 */
export async function GET() {
  try {
    // Return a comprehensive list of event slugs
    return json([
      "art-exhibitions",
      "artist-series",
      "bible-conference",
      "campus-renovations",
      "chapel",
      "christmas",
      "commencement",
      "fall-fest",
      "homecoming",
      "hurricane-helene",
      "new-president",
      "society-rush",
      "theater",
      "turkey-bowl",
      "welcome-week"
    ]);
  } catch (error) {
    console.error('Error loading events:', error);
    return json([], { status: 500 });
  }
}