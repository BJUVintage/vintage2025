/**
 * Dynamically loads content from markdown files in the content directory
 */

// Import the markdown parser (you'll need to install this package)
// npm install marked
import { marked } from 'marked';
import { withBasePath } from '$lib/utils/paths.js';

/**
 * Load and parse an event markdown file
 * @param {string} slug - The event slug (filename without extension)
 * @returns {Object} - Parsed event data including metadata and content
 */
export async function loadEventContent(slug) {
  try {
    console.log(`Loading event content for ${slug}`);
    const url = withBasePath(`/content/events/${slug}.md`);
    console.log(`Fetching from URL: ${url}`);
    
    // In SvelteKit, static files are served from the root path
    const response = await fetch(url);
    
    console.log(`Event content response status for ${slug}:`, response.status);
    
    if (!response.ok) {
      console.warn(`Failed to load event content for ${slug}. Status: ${response.status}`);
      throw new Error(`Failed to load event content for ${slug}`);
    }
    
    const markdown = await response.text();
    console.log(`Received markdown for ${slug}, length: ${markdown.length} characters`);
    
    // Create a minimal metadata object for fallback
    if (!markdown || markdown.trim() === '') {
      console.warn(`Empty markdown content for ${slug}, returning fallback metadata`);
      return {
        metadata: {
          title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
          excerpt: `Information about ${slug.replace(/-/g, ' ')}`
        },
        content: `<p>Details coming soon for ${slug.replace(/-/g, ' ')}.</p>`
      };
    }
    
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading event ${slug}:`, error);
    // Return fallback metadata so the page doesn't break
    return {
      metadata: {
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
        excerpt: `Information about ${slug.replace(/-/g, ' ')}`
      },
      content: `<p>Unable to load details for ${slug.replace(/-/g, ' ')}.</p>`
    };
  }
}

/**
 * Load and parse a group markdown file
 * @param {string} slug - The group slug (filename without extension)
 * @returns {Object} - Parsed group data including metadata and content
 */
export async function loadGroupContent(slug) {
  try {
    console.log(`Loading group content for ${slug}`);
    const url = withBasePath(`/content/groups/${slug}.md`);
    console.log(`Fetching from URL: ${url}`);
    
    const response = await fetch(url);
    
    console.log(`Group content response status for ${slug}:`, response.status);
    
    if (!response.ok) {
      console.warn(`Failed to load group content for ${slug}. Status: ${response.status}`);
      throw new Error(`Failed to load group content for ${slug}`);
    }
    
    const markdown = await response.text();
    console.log(`Received markdown for ${slug}, length: ${markdown.length} characters`);
    
    // Create a minimal metadata object for fallback
    if (!markdown || markdown.trim() === '') {
      console.warn(`Empty markdown content for ${slug}, returning fallback metadata`);
      return {
        metadata: {
          title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
          excerpt: `Information about ${slug.replace(/-/g, ' ')}`
        },
        content: `<p>Details coming soon for ${slug.replace(/-/g, ' ')}.</p>`
      };
    }
    
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading group ${slug}:`, error);
    // Return fallback metadata so the page doesn't break
    return {
      metadata: {
        title: slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' '),
        excerpt: `Information about ${slug.replace(/-/g, ' ')}`
      },
      content: `<p>Unable to load details for ${slug.replace(/-/g, ' ')}.</p>`
    };
  }
}

/**
 * Load all event content files
 * @returns {Array} - Array of parsed event data
 */
// Fallback data in case API endpoints don't work
const FALLBACK_EVENTS = [
  "art-exhibitions",
  "artist-series",
  "bible-conference",
  "campus-renovations",
  "chapel",
  "christmas",
  "commencement",
  "harvest-fest", 
  "homecoming",
  "hurricane-helene",
  "new-president",
  "society-rush",
  "theater",
  "turkey-bowl",
  "welcome-week"
];

export async function loadAllEvents() {
  try {
    // Add more detailed logging
    const eventsApiUrl = withBasePath('/api/events');
    console.log(`Fetching events list from ${eventsApiUrl}`);
    
    try {
      // First try API endpoint
      const response = await fetch(eventsApiUrl);
      console.log('Events API response status:', response.status);
      
      if (response.ok) {
        const eventsList = await response.json();
        console.log('Events list received from API:', eventsList);
        
        if (eventsList && eventsList.length > 0) {
          // Load content for each event
          console.log('Loading content for each event from API...');
          const eventsWithContent = await Promise.all(
            eventsList.map(async (eventSlug) => {
              console.log(`Loading content for event: ${eventSlug}`);
              const content = await loadEventContent(eventSlug);
              return {
                slug: eventSlug,
                ...content
              };
            })
          );
          
          console.log(`Loaded ${eventsWithContent.length} events with content from API`);
          return eventsWithContent;
        }
      }
      
      // If we get here, API request failed or returned empty
      console.log('API request failed or empty, using fallback data');
    } catch (apiError) {
      console.error('Error calling API, using fallback data:', apiError);
    }
    
    // Use hardcoded fallback data
    console.log('Using fallback events list:', FALLBACK_EVENTS);
    const eventsWithContent = await Promise.all(
      FALLBACK_EVENTS.map(async (eventSlug) => {
        console.log(`Loading content for event using fallback: ${eventSlug}`);
        const content = await loadEventContent(eventSlug);
        return {
          slug: eventSlug,
          ...content
        };
      })
    );
    
    console.log(`Loaded ${eventsWithContent.length} events with content using fallback`);
    return eventsWithContent;
  } catch (error) {
    console.error('Error loading all events:', error);
    console.error(error.stack);
    return [];
  }
}

/**
 * Load all group content files
 * @returns {Array} - Array of parsed group data
 */
// Fallback data in case API endpoints don't work
const FALLBACK_GROUPS = [
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
];

export async function loadAllGroups() {
  try {
    // Add more detailed logging
    const groupsApiUrl = withBasePath('/api/groups');
    console.log(`Fetching groups list from ${groupsApiUrl}`);
    
    try {
      // First try API endpoint
      const response = await fetch(groupsApiUrl);
      console.log('Groups API response status:', response.status);
      
      if (response.ok) {
        const groupsList = await response.json();
        console.log('Groups list received from API:', groupsList);
        
        if (groupsList && groupsList.length > 0) {
          // Load content for each group
          console.log('Loading content for each group from API...');
          const groupsWithContent = await Promise.all(
            groupsList.map(async (groupSlug) => {
              console.log(`Loading content for group: ${groupSlug}`);
              const content = await loadGroupContent(groupSlug);
              return {
                slug: groupSlug,
                ...content
              };
            })
          );
          
          console.log(`Loaded ${groupsWithContent.length} groups with content from API`);
          return groupsWithContent;
        }
      }
      
      // If we get here, API request failed or returned empty
      console.log('API request failed or empty, using fallback data');
    } catch (apiError) {
      console.error('Error calling API, using fallback data:', apiError);
    }
    
    // Use hardcoded fallback data
    console.log('Using fallback groups list:', FALLBACK_GROUPS);
    const groupsWithContent = await Promise.all(
      FALLBACK_GROUPS.map(async (groupSlug) => {
        console.log(`Loading content for group using fallback: ${groupSlug}`);
        const content = await loadGroupContent(groupSlug);
        return {
          slug: groupSlug,
          ...content
        };
      })
    );
    
    console.log(`Loaded ${groupsWithContent.length} groups with content using fallback`);
    return groupsWithContent;
  } catch (error) {
    console.error('Error loading all groups:', error);
    console.error(error.stack);
    return [];
  }
}

/**
 * Parse a markdown file with frontmatter
 * @param {string} markdown - Raw markdown content
 * @returns {Object} - Parsed markdown with metadata and HTML content
 */
function parseMarkdown(markdown) {
  // Extract frontmatter (metadata at the top of the file)
  const frontmatterRegex = /^---\n([\s\S]*?)\n---\n/;
  const match = markdown.match(frontmatterRegex);
  
  const metadata = {};
  let content = markdown;
  
  if (match) {
    // Extract and parse the frontmatter
    const frontmatter = match[1];
    frontmatter.split('\n').forEach(line => {
      const [key, ...valueParts] = line.split(':');
      if (key && valueParts.length) {
        metadata[key.trim()] = valueParts.join(':').trim();
      }
    });
    
    // Remove frontmatter from content
    content = markdown.slice(match[0].length);
  }
  
  // Convert markdown to HTML
  const htmlContent = marked(content);
  
  return {
    metadata,
    content: htmlContent
  };
}
