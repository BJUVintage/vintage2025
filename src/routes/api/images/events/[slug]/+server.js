// This file handles API requests for retrieving event images

import { json } from '@sveltejs/kit';

/**
 * GET handler for retrieving images for a specific event
 */
export async function GET({ params }) {
  try {
    const { slug } = params;
    
    // Always return placeholder.jpg for testing
    // In production, we would implement proper image handling here
    return json(["placeholder.jpg"]);
  } catch (error) {
    console.error(`Error loading images for event ${params.slug}:`, error);
    return json(["placeholder.jpg"], { status: 200 });
  }
}