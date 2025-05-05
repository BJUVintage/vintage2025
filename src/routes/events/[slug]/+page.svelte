<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import PhotoGallery from '$lib/components/PhotoGallery.svelte';
  import { loadEventContent } from '$lib/utils/contentLoader.js';
  import { getEventImages } from '$lib/utils/imageLoader.js';
  
  const slug = $page.params.slug;
  
  let event = null;
  let images = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load event content
      event = await loadEventContent(slug);
      
      // Load event images
      images = await getEventImages(slug);
    } catch (error) {
      console.error(`Error loading event ${slug}:`, error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{event?.metadata?.title || 'Event'} | BJU Vintage 2025</title>
</svelte:head>

{#if loading}
  <div class="loading">Loading event...</div>
{:else if !event}
  <div class="error-state">
    <h1>Event Not Found</h1>
    <p>The event you're looking for doesn't exist or couldn't be loaded.</p>
    <a href="/events">Back to Events</a>
  </div>
{:else}
  <article class="event-page">
    <header>
      <h1>{event.metadata.title}</h1>
      {#if event.metadata.date}
        <div class="event-date">{event.metadata.date}</div>
      {/if}
    </header>
    
    <div class="event-content">
      <!-- Event content from markdown -->
      {@html event.content}
    </div>
    
    {#if images.length > 0}
      <section class="event-photos">
        <h2>Photo Gallery</h2>
        <PhotoGallery 
          images={images}
          baseDir={`/images/events/${slug}`}
        />
      </section>
    {/if}
  </article>
{/if}

<style>
  .event-page {
    max-width: 800px;
    margin: 0 auto;
  }

  header {
    margin-bottom: 2rem;
    border-bottom: 2px solid #ffcc00; /* Gold from yearbook cover */
    padding-bottom: 1rem;
  }

  h1 {
    color: #0a1155; /* Dark blue from yearbook cover */
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }

  .event-date {
    font-size: 1.1rem;
    color: #555;
    font-style: italic;
  }

  .event-content {
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .event-photos h2 {
    color: #0a1155;
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
  }

  .loading, .error-state {
    text-align: center;
    padding: 3rem;
  }

  .error-state a {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.75rem 1.5rem;
    background-color: #0a1155;
    color: #ffcc00;
    text-decoration: none;
    border-radius: 4px;
  }
</style>

