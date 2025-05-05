<script>
  import { onMount } from 'svelte';
  import GroupCard from '$lib/components/GroupCard.svelte';
  import { loadAllGroups } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let groups = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load all groups
      groups = await loadAllGroups();
      
      // Add thumbnail images
      for (let group of groups) {
        group.imagePath = await getThumbnailImage('groups', group.slug);
      }
    } catch (error) {
      console.error('Error loading groups:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Campus Groups | BJU Vintage 2025</title>
</svelte:head>

<section class="groups-page">
  <h1>Campus Groups</h1>
  <p>Discover the diverse student organizations that enriched campus life during the 2024-2025 academic year.</p>
  
  {#if loading}
    <div class="loading">Loading groups...</div>
  {:else if groups.length === 0}
    <div class="empty-state">No groups found.</div>
  {:else}
    <div class="groups-grid">
      {#each groups as group}
        <GroupCard 
          title={group.metadata.title} 
          slug={group.slug} 
          imagePath={group.imagePath}
          excerpt={group.metadata.excerpt || 'Learn more about this group...'}
        />
      {/each}
    </div>
  {/if}
</section>

<style>
  .groups-page {
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

  .groups-grid {
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

