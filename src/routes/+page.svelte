<script>
  import { onMount } from 'svelte';
  import EventCard from '$lib/components/EventCard.svelte';
  import GroupCard from '$lib/components/GroupCard.svelte';
  import YearbookTheme from '$lib/components/YearbookTheme.svelte';
  import { loadAllEvents, loadAllGroups } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let featuredEvents = [];
  let featuredGroups = [];
  let loading = true;
  
  let featuredSocieties = [];

  onMount(async () => {
    try {
      // Load featured content
      const events = await loadAllEvents();
      const groups = await loadAllGroups();
      
      // Filter society events
      const societyEvents = events.filter(event => 
        event.metadata && event.metadata.category === 'Society'
      );
      
      // Function to randomly select n items from an array
      function getRandomItems(array, n) {
        const shuffled = [...array].sort(() => 0.5 - Math.random());
        return shuffled.slice(0, n);
      }
      
      // Randomly select 3 items for each category
      const nonSocietyEvents = events.filter(event => 
        !event.metadata || event.metadata.category !== 'Society'
      );
      
      featuredEvents = getRandomItems(nonSocietyEvents, 3);
      featuredSocieties = getRandomItems(societyEvents, 3);
      featuredGroups = getRandomItems(groups, 3);
      
      // Add thumbnail images
      for (let event of featuredEvents) {
        event.imagePath = await getThumbnailImage('events', event.slug);
      }
      
      for (let society of featuredSocieties) {
        society.imagePath = await getThumbnailImage('events', society.slug);
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
  <title>Vintage 2025</title>
</svelte:head>

<section class="hero">
  <div class="university-name">BOB JONES UNIVERSITY</div>
  <div class="hero-content">
    <div class="vintage-title sparkle">VINTAGE</div>
    <div class="year-text">2025</div>
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
    <h2>Featured Societies</h2>
    <div class="card-grid">
      {#each featuredSocieties as society}
        <EventCard 
          title={society.metadata.title} 
          slug={society.slug} 
          imagePath={society.imagePath}
          excerpt={society.metadata.excerpt || 'Learn more about this society event...'}
          category="Society"
        />
      {/each}
    </div>
    <div class="view-all">
      <a href="/societies">View All Societies</a>
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
    flex-direction: column;
    align-items: center;
    justify-content: center;
    margin-bottom: 4rem;
    padding: 8rem 0;
    position: relative;
    z-index: 1;
    text-align: center;
    overflow: hidden;
    background: #001142; /* Navy blue from cover */
    border-radius: 12px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    min-height: 70vh;
  }
  
  .university-name {
    color: #8ca5d9; /* Light blue */
    font-size: 1.5rem;
    letter-spacing: 0.3rem;
    font-style: italic;
    margin-bottom: 1.5rem;
    position: relative;
    z-index: 2;
  }
  
  .hero-content {
    position: relative;
    z-index: 2;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .vintage-title {
    font-size: 8rem;
    font-weight: bold;
    letter-spacing: 0.5rem;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
    color: #8ca5d9; /* Light blue from cover */
    font-family: 'Times New Roman', serif;
  }
  
  /* Create sparkle effect that only applies to letters */
  .sparkle::before {
    content: 'VINTAGE';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-image: 
      radial-gradient(circle at 30% 20%, rgba(230, 185, 61, 0.9) 1px, transparent 3px),
      radial-gradient(circle at 70% 30%, rgba(230, 185, 61, 0.9) 1px, transparent 3px),
      radial-gradient(circle at 40% 80%, rgba(230, 185, 61, 0.9) 1px, transparent 3px),
      radial-gradient(circle at 80% 60%, rgba(230, 185, 61, 0.9) 1px, transparent 3px);
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    mix-blend-mode: lighten;
    background-size: 150% 150%;
    pointer-events: none;
    animation: twinkle 7s ease-in-out infinite alternate;
  }
  
  /* Moving highlight that only applies to letters */
  .sparkle::after {
    content: 'VINTAGE';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(
      90deg,
      rgba(230, 185, 61, 0) 0%,
      rgba(230, 185, 61, 0.8) 50%,
      rgba(230, 185, 61, 0) 100%
    );
    background-size: 200% 100%;
    -webkit-background-clip: text;
    background-clip: text;
    color: transparent;
    animation: shine 8s ease-in-out infinite;
    animation-delay: 2s;
  }
  
  @keyframes twinkle {
    0%, 100% {
      opacity: 0.5;
      background-position: 0% 0%;
    }
    50% {
      opacity: 0.9;
      background-position: 100% 100%;
    }
  }
  
  @keyframes shine {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }
  
  .year-text {
    color: #8ca5d9; /* Light blue */
    font-size: 2.5rem;
    margin-top: 0.5rem;
    letter-spacing: 0.4rem;
  }

  h2 {
    color: #8ca5d9; /* Light blue from cover */
    font-size: 2rem;
    margin-bottom: 2rem;
    border-bottom: 2px solid #e6b93d; /* Gold */
    display: inline-block;
    padding-bottom: 0.5rem;
  }

  .featured-section {
    margin-bottom: 4rem;
    position: relative;
    z-index: 1;
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
    background: #001142; /* Navy blue from cover */
    color: #e6b93d; /* Gold from cover */
    text-decoration: none;
    border-radius: 4px;
    font-weight: 500;
    transition: all 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    text-transform: uppercase;
    letter-spacing: 1px;
    border: 1px solid #e6b93d;
  }

  .view-all a:hover {
    background: #00184f; /* Slightly lighter navy */
    transform: translateY(-2px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.3);
  }

  .loading {
    text-align: center;
    padding: 2rem;
    font-style: italic;
    color: #666;
  }

  @media (max-width: 768px) {
    .hero {
      padding: 3rem 0;
    }
    
    .vintage-title {
      font-size: 5rem;
      letter-spacing: 0.25rem;
    }
    
    .university-name {
      font-size: 1.2rem;
    }
    
    .year-text {
      font-size: 2rem;
    }
    
    h2 {
      font-size: 1.8rem;
    }
  }
</style>

