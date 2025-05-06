<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import { loadAllEvents } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let events = [];
  let loading = true;
  
  // Helper function to parse date strings
  function parseEventDate(dateStr) {
    if (!dateStr) return new Date(0); // Default to earliest date if no date provided
    
    // Check if it's just the academic year format
    if (dateStr.includes('Academic Year')) {
      return new Date('2024-08-01'); // Set to beginning of academic year as default
    }
    
    // Try to parse month and day format
    const monthNames = ['January', 'February', 'March', 'April', 'May', 'June',
                         'July', 'August', 'September', 'October', 'November', 'December'];
    
    for (let i = 0; i < monthNames.length; i++) {
      if (dateStr.includes(monthNames[i])) {
        // Extract the year, default to 2024 if not found
        const yearMatch = dateStr.match(/\d{4}/);
        const year = yearMatch ? yearMatch[0] : '2024';
        
        // Extract the day, default to 1 if not found
        const dayMatch = dateStr.match(new RegExp(`${monthNames[i]}\\s+(\\d+)`));
        const day = dayMatch ? dayMatch[1] : '1';
        
        return new Date(`${year}-${i+1}-${day}`);
      }
    }
    
    // If all else fails, try standard date parsing
    return new Date(dateStr);
  }

  onMount(async () => {
    try {
      // Load all events
      events = await loadAllEvents();
      
      // Filter out society events
      events = events.filter(event => 
        !event.metadata || event.metadata.category !== 'Society'
      );
      
      // Sort events by date
      events.sort((a, b) => {
        const dateA = parseEventDate(a.metadata?.date);
        const dateB = parseEventDate(b.metadata?.date);
        return dateA - dateB;
      });
      
      // Add thumbnail images
      for (let event of events) {
        event.imagePath = await getThumbnailImage('events', event.slug);
      }
    } catch (error) {
      console.error('Error loading events:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Events | BJU Vintage 2025</title>
</svelte:head>

<section class="events-page">
  <div class="page-header">
    <h1>Events</h1>
    <p>Explore the highlights from the 2024-2025 academic year at BJU.</p>
  </div>
  
  {#if loading}
    <div class="loading">Loading events...</div>
  {:else if events.length === 0}
    <div class="empty-state">No events found.</div>
  {:else}
    <div class="events-grid">
      {#each events as event}
        <EventCard 
          title={event.metadata.title} 
          slug={event.slug} 
          imagePath={event.imagePath}
          excerpt={event.metadata.excerpt || 'Learn more about this event...'}
        />
      {/each}
    </div>
  {/if}
</section>

<style>
  .events-page {
    margin-bottom: 4rem;
  }

  h1 {
    color: #8ca5d9; /* Light blue from cover */
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }

  .page-header {
    background: rgba(0, 0, 0, 0.4); /* Semi-transparent dark background for better contrast */
    padding: 1.5rem;
    border-radius: 8px;
    margin-bottom: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }
  
  p {
    font-size: 1.2rem;
    color: #e6e6e6; /* Light gray/white for better contrast */
    margin-bottom: 1rem;
    text-align: center;
    text-shadow: 0 1px 1px rgba(0, 0, 0, 0.5); /* Add subtle shadow for better readability */
  }

  .events-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .loading, .empty-state {
    text-align: center;
    padding: 3rem;
    font-style: italic;
    color: #666;
  }
</style>

