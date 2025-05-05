<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import GroupCard from '$lib/components/GroupCard.svelte';
  import { loadAllEvents, loadAllGroups } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let featuredEvents = [];
  let featuredGroups = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load featured content
      const events = await loadAllEvents();
      const groups = await loadAllGroups();
      
      // Take the first 3 events and groups for the homepage
      featuredEvents = events.slice(0, 3);
      featuredGroups = groups.slice(0, 3);
      
      // Add thumbnail images
      for (let event of featuredEvents) {
        event.imagePath = await getThumbnailImage('events', event.slug);
      }
      
      for (let group of featuredGroups) {
        group.imagePath = await getThumbnailImage('groups', group.slug);
      }
    } catch (error) {
      console.error('Error loading homepage content:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>BJU Vintage 2025</title>
</svelte:head>

<section class="hero">
  <div class="hero-content">
    <h1>Bob Jones University</h1>
    <div class="vintage-title">VINTAGE</div>
    <h2>2025</h2>
  </div>
  <div class="hero-image">
    <img src="/images/cover/cover-full.jpg" alt="BJU Vintage 2025 Cover" />
  </div>
</section>

{#if loading}
  <div class="loading">Loading content...</div>
{:else}
  <section class="featured-section">
    <h2>Featured Events</h2>
    <div class="card-grid">
      {#each featuredEvents as event}
        <EventCard 
          title={event.metadata.title} 
          slug={event.slug} 
          imagePath={event.imagePath}
          excerpt={event.metadata.excerpt || 'Learn more about this event...'}
        />
      {/each}
    </div>
    <div class="view-all">
      <a href="/events">View All Events</a>
    </div>
  </section>

  <section class="featured-section">
    <h2>Featured Groups</h2>
    <div class="card-grid">
      {#each featuredGroups as group}
        <GroupCard 
          title={group.metadata.title} 
          slug={group.slug} 
          imagePath={group.imagePath}
          excerpt={group.metadata.excerpt || 'Learn more about this group...'}
        />
      {/each}
    </div>
    <div class="view-all">
      <a href="/groups">View All Groups</a>
    </div>
  </section>
{/if}

<style>
  .hero {
    display: flex;
    align-items: center;
    margin-bottom: 4rem;
    gap: 2rem;
  }

  .hero-content {
    flex: 1;
  }

  .hero-image {
    flex: 1;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
    overflow: hidden;
  }

  .hero-image img {
    width: 100%;
    display: block;
  }

  h1 {
    color: #0a1155; /* Dark blue from yearbook cover */
    font-size: 2rem;
    margin-bottom: 0.5rem;
  }

  .vintage-title {
    color: #7ab7ff; /* Light blue from yearbook cover */
    font-size: 4rem;
    font-weight: bold;
    letter-spacing: 0.25rem;
    margin-bottom: 0.5rem;
  }

  h2 {
    color: #0a1155;
    margin-bottom: 2rem;
  }

  .featured-section {
    margin-bottom: 4rem;
  }

  .card-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 2rem;
  }

  .view-all {
    margin-top: 2rem;
    text-align: center;
  }

  .view-all a {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    background-color: #0a1155; /* Dark blue from yearbook cover */
    color: #ffcc00; /* Gold from yearbook cover */
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: background-color 0.3s ease;
  }

  .view-all a:hover {
    background-color: #162283;
  }

  .loading {
    text-align: center;
    padding: 2rem;
    font-style: italic;
    color: #666;
  }

  @media (max-width: 768px) {
    .hero {
      flex-direction: column;
    }

    .vintage-title {
      font-size: 3rem;
    }
  }
</style>

