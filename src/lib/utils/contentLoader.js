/**
 * Dynamically loads content from markdown files in the content directory
 */

// Import the markdown parser (you'll need to install this package)
// npm install marked
import { marked } from 'marked';

/**
 * Load and parse an event markdown file
 * @param {string} slug - The event slug (filename without extension)
 * @returns {Object} - Parsed event data including metadata and content
 */
export async function loadEventContent(slug) {
  try {
    // In SvelteKit, static files are served from the root path
    // so we don't need /static/ in the path
    const response = await fetch(`/content/events/${slug}.md`);
    
    if (!response.ok) {
      console.warn(`Failed to load event content for ${slug}. Status: ${response.status}`);
      throw new Error(`Failed to load event content for ${slug}`);
    }
    
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading event ${slug}:`, error);
    return null;
  }
}

/**
 * Load and parse a group markdown file
 * @param {string} slug - The group slug (filename without extension)
 * @returns {Object} - Parsed group data including metadata and content
 */
export async function loadGroupContent(slug) {
  try {
    const response = await fetch(`/content/groups/${slug}.md`);
    
    if (!response.ok) {
      console.warn(`Failed to load group content for ${slug}. Status: ${response.status}`);
      throw new Error(`Failed to load group content for ${slug}`);
    }
    
    const markdown = await response.text();
    return parseMarkdown(markdown);
  } catch (error) {
    console.error(`Error loading group ${slug}:`, error);
    return null;
  }
}

/**
 * Load all event content files
 * @returns {Array} - Array of parsed event data
 */
export async function loadAllEvents() {
  try {
    // In a real app, this would be a fetch to your API for a list of events
    // For this example, we're simulating the API response
    const response = await fetch('/api/events');
    
    if (!response.ok) {
      throw new Error('Failed to load events list');
    }
    
    const eventsList = await response.json();
    
    // Load content for each event
    const eventsWithContent = await Promise.all(
      eventsList.map(async (eventSlug) => {
        const content = await loadEventContent(eventSlug);
        return {
          slug: eventSlug,
          ...content
        };
      })
    );
    
    return eventsWithContent;
  } catch (error) {
    console.error('Error loading all events:', error);
    return [];
  }
}

/**
 * Load all group content files
 * @returns {Array} - Array of parsed group data
 */
export async function loadAllGroups() {
  try {
    const response = await fetch('/api/groups');
    
    if (!response.ok) {
      throw new Error('Failed to load groups list');
    }
    
    const groupsList = await response.json();
    
    // Load content for each group
    const groupsWithContent = await Promise.all(
      groupsList.map(async (groupSlug) => {
        const content = await loadGroupContent(groupSlug);
        return {
          slug: groupSlug,
          ...content
        };
      })
    );
    
    return groupsWithContent;
  } catch (error) {
    console.error('Error loading all groups:', error);
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

