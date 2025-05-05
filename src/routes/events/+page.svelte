<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import { loadAllEvents } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let events = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load all events
      events = await loadAllEvents();
      
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
  <h1>Events</h1>
  <p>Explore the highlights from the 2024-2025 academic year at BJU.</p>
  
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
    color: #0a1155; /* Dark blue from yearbook cover */
    font-size: 2.5rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    color: #444;
    margin-bottom: 2rem;
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

