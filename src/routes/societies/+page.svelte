<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import { loadAllEvents } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let societyEvents = [];
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
      const allEvents = await loadAllEvents();
      
      // Filter for only society events (based on category metadata)
      societyEvents = allEvents.filter(event => 
        event.metadata && event.metadata.category === 'Society'
      );
      
      // Sort society events by date
      societyEvents.sort((a, b) => {
        const dateA = parseEventDate(a.metadata?.date);
        const dateB = parseEventDate(b.metadata?.date);
        return dateA - dateB;
      });
      
      // Add thumbnail images
      for (let event of societyEvents) {
        event.imagePath = await getThumbnailImage('events', event.slug);
      }
    } catch (error) {
      console.error('Error loading society events:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Societies | BJU Vintage 2025</title>
</svelte:head>

<section class="societies-page">
  <div class="page-header">
    <h1 class="societies-title">Societies</h1>
    <p>Explore the diverse academic and cultural societies that enriched campus life during the 2024-2025 academic year.</p>
  </div>
  
  {#if loading}
    <div class="loading">Loading society events...</div>
  {:else if societyEvents.length === 0}
    <div class="empty-state">No society events found.</div>
  {:else}
    <div class="societies-grid">
      {#each societyEvents as event}
        <EventCard 
          title={event.metadata.title} 
          slug={event.slug} 
          imagePath={event.imagePath}
          excerpt={event.metadata.excerpt || 'Learn more about this society event...'}
          category="Society"
        />
      {/each}
    </div>
  {/if}
</section>

<style>
  .societies-page {
    margin-bottom: 4rem;
  }

  h1 {
    color: #001142; /* Navy blue from cover */
    font-size: 2.5rem;
    margin-bottom: 1rem;
    text-align: center;
  }
  
  .societies-title {
    color: #8ca5d9; /* Light blue from cover */
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

  .societies-grid {
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