/**
 * Get all images for a specific event
 * @param {string} eventSlug - The event slug/folder name
 * @returns {Array} - Array of image filenames
 */
export async function getEventImages(eventSlug) {
  try {
    // In a real app, this would be a fetch to your API
    const response = await fetch(`/api/images/events/${eventSlug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load images for event ${eventSlug}`);
    }
    
    const images = await response.json();
    return images;
  } catch (error) {
    console.error(`Error loading images for event ${eventSlug}:`, error);
    return [];
  }
}

/**
 * Get all images for a specific group
 * @param {string} groupSlug - The group slug/folder name
 * @returns {Array} - Array of image filenames
 */
export async function getGroupImages(groupSlug) {
  try {
    const response = await fetch(`/api/images/groups/${groupSlug}`);
    
    if (!response.ok) {
      throw new Error(`Failed to load images for group ${groupSlug}`);
    }
    
    const images = await response.json();
    return images;
  } catch (error) {
    console.error(`Error loading images for group ${groupSlug}:`, error);
    return [];
  }
}

/**
 * Helper to get the first image for a thumbnail
 * @param {string} type - 'events' or 'groups'
 * @param {string} slug - The slug/folder name
 * @returns {string} - Path to the first image or a default image
 */
export async function getThumbnailImage(type, slug) {
  try {
    const images = type === 'events' 
      ? await getEventImages(slug)
      : await getGroupImages(slug);
    
    if (images && images.length > 0) {
      return `/images/${type}/${slug}/${images[0]}`;
    }
    
    // Return default image if no images found
    return '/images/cover/default-thumbnail.jpg';
  } catch (error) {
    console.error(`Error getting thumbnail for ${type}/${slug}:`, error);
    return '/images/cover/default-thumbnail.jpg';
  }
}
