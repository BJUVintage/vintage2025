<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import { loadAllEvents } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let societyEvents = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load all events
      const allEvents = await loadAllEvents();
      
      // Filter for only society events (based on category metadata)
      societyEvents = allEvents.filter(event => 
        event.metadata && event.metadata.category === 'Society'
      );
      
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
  <h1 class="societies-title">Societies</h1>
  <p>Explore the diverse academic and cultural societies that enriched campus life during the 2024-2025 academic year.</p>
  
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

  p {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 2rem;
    text-align: center;
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