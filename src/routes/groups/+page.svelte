<script>
  import { onMount } from 'svelte';
  import GroupCard from '$lib/components/GroupCard.svelte';
  import { loadAllGroups } from '$lib/utils/contentLoader.js';
  import { getThumbnailImage } from '$lib/utils/imageLoader.js';
  
  let groups = [];
  let loading = true;
  
  // Helper function to sort groups by name (since they don't have dates)
  function sortGroupsByName(groups) {
    return [...groups].sort((a, b) => {
      const titleA = a.metadata?.title || '';
      const titleB = b.metadata?.title || '';
      return titleA.localeCompare(titleB);
    });
  }
  
  onMount(async () => {
    try {
      // Load all groups
      groups = await loadAllGroups();
      
      // Sort groups alphabetically by title
      groups = sortGroupsByName(groups);
      
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
  <title>Groups | BJU Vintage 2025</title>
</svelte:head>

<section class="groups-page">
  <div class="page-header">
    <h1>Groups</h1>
    <p>Discover the diverse student organizations that enriched campus life during the 2024-2025 academic year.</p>
  </div>
  
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

