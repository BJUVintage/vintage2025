<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import { loadEventContent } from '$lib/utils/contentLoader.js';
  import { getEventImages } from '$lib/utils/imageLoader.js';
  import PhotoGallery from '$lib/components/PhotoGallery.svelte';
  import { withBasePath } from '$lib/utils/paths.js';
  
  const { slug } = $page.params;
  
  let eventData = null;
  let images = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Since we're using the events structure underneath, we load event content
      eventData = await loadEventContent(slug);
      
      if (!eventData) {
        throw new Error(`Failed to load society event: ${slug}`);
      }
      
      // Only allow viewing if it's a society event
      if (eventData.metadata.category !== 'Society') {
        throw new Error('This is not a society event');
      }
      
      // Get event images
      images = await getEventImages(slug);
    } catch (error) {
      console.error(`Error loading society event ${slug}:`, error);
      eventData = null;
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{eventData ? eventData.metadata.title : 'Society Event'} | BJU Vintage 2025</title>
</svelte:head>

<section class="society-event-page">
  {#if loading}
    <div class="loading">Loading society event...</div>
  {:else if !eventData}
    <div class="error-state">
      <h2>Event Not Found</h2>
      <p>The requested society event could not be found.</p>
      <a href={withBasePath('/societies')}>Back to Society Events</a>
    </div>
  {:else}
    <div class="society-card">
      <div class="event-header">
        <h1>{eventData.metadata.title}</h1>
        <div class="event-meta">
          <span class="event-date">{eventData.metadata.date}</span>
        </div>
      </div>
      
      <div class="event-content">
        {@html eventData.content}
      </div>
      
      {#if images.length > 0}
        <div class="event-gallery">
          <h2>Photo Gallery</h2>
          <PhotoGallery 
            images={images}
            baseDir={withBasePath(`/images/events/${slug}`)}
          />
        </div>
      {/if}
      
      <div class="back-link">
        <a href={withBasePath('/societies')}>← Back to All Society Events</a>
      </div>
    </div>
  {/if}
</section>

<style>
  .society-event-page {
    max-width: 800px;
    margin: 0 auto;
  }
  
  .society-card {
    display: block;
    background: linear-gradient(to bottom, #ffffff, #f8f8f8);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    overflow: hidden;
  }
  
  .society-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #001142, #8ca5d9);
  }
  
  .event-header {
    margin-bottom: 2rem;
    text-align: center;
    border-bottom: 2px solid #e6b93d; /* Gold from yearbook cover */
    padding-bottom: 1rem;
  }
  
  h1 {
    color: #8ca5d9; /* Light blue from cover */
    font-size: 2.5rem;
    margin-bottom: 0.5rem;
  }
  
  .event-meta {
    color: #666;
    font-style: italic;
  }
  
  .event-content {
    line-height: 1.8;
    margin-bottom: 3rem;
  }
  
  .event-content :global(h2) {
    color: #001142; /* Navy blue */
    font-size: 1.8rem;
    margin-top: 2rem;
    margin-bottom: 1rem;
    border-bottom: 2px solid #e6b93d; /* Gold from cover */
    padding-bottom: 0.5rem;
    display: inline-block;
  }
  
  .event-content :global(h3) {
    color: #001142; /* Navy blue */
    font-size: 1.4rem;
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
  }
  
  .event-content :global(p) {
    margin-bottom: 1.5rem;
  }
  
  .event-content :global(ul) {
    margin-bottom: 1.5rem;
    padding-left: 2rem;
  }
  
  .event-gallery {
    margin-top: 3rem;
    margin-bottom: 3rem;
  }
  
  .event-gallery h2 {
    color: #001142; /* Navy blue */
    font-size: 1.8rem;
    margin-bottom: 1.5rem;
    text-align: center;
  }
  
  .back-link {
    margin-top: 3rem;
    margin-bottom: 1rem;
  }
  
  .back-link a {
    display: inline-block;
    padding: 0.5rem 1rem;
    color: #8ca5d9; /* Light blue */
    text-decoration: none;
    font-weight: 500;
    transition: all 0.3s ease;
  }
  
  .back-link a:hover {
    color: #e6b93d; /* Gold */
  }
  
  .loading, .error-state {
    text-align: center;
    padding: 3rem;
  }
  
  .error-state h2 {
    color: #001142;
    margin-bottom: 1rem;
  }
  
  .error-state a {
    display: inline-block;
    margin-top: 1rem;
    padding: 0.5rem 1rem;
    background-color: #001142;
    color: #e6b93d;
    text-decoration: none;
    border-radius: 4px;
    transition: all 0.3s ease;
  }
  
  .error-state a:hover {
    background-color: #00184f;
    transform: translateY(-2px);
  }
</style>
