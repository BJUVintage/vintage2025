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
      "debate-society-championship",
      "evangelistic-services",
      "fall-fest",
      "harvest-festival",
      "homecoming",
      "hurricane-helene",
      "inter-society-council",
      "literary-society-gala",
      "new-president",
      "slc-and-isc",
      "society-rush",
      "student-led-chapel",
      "theater",
      "turkey-bowl",
      "welcome-week"
    ]);
  } catch (error) {
    console.error('Error loading events:', error);
    return json([], { status: 500 });
  }
}