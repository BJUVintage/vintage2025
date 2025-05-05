<script>
  import { onMount } from 'svelte';
  import { page } from '$app/stores';
  import PhotoGallery from '$lib/components/PhotoGallery.svelte';
  import { loadGroupContent } from '$lib/utils/contentLoader.js';
  import { getGroupImages } from '$lib/utils/imageLoader.js';
  
  const slug = $page.params.slug;
  
  let group = null;
  let images = [];
  let loading = true;
  
  onMount(async () => {
    try {
      // Load group content
      group = await loadGroupContent(slug);
      
      // Load group images
      images = await getGroupImages(slug);
    } catch (error) {
      console.error(`Error loading group ${slug}:`, error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>{group?.metadata?.title || 'Group'} | BJU Vintage 2025</title>
</svelte:head>

{#if loading}
  <div class="loading">Loading group...</div>
{:else if !group}
  <div class="error-state">
    <h1>Group Not Found</h1>
    <p>The group you're looking for doesn't exist or couldn't be loaded.</p>
    <a href="/groups">Back to Groups</a>
  </div>
{:else}
  <article class="group-page">
    <header>
      <h1>{group.metadata.title}</h1>
      {#if group.metadata.advisor}
        <div class="group-advisor">Advisor: {group.metadata.advisor}</div>
      {/if}
    </header>
    
    <div class="group-content">
      <!-- Group content from markdown -->
      {@html group.content}
    </div>
    
    {#if images.length > 0}
      <section class="group-photos">
        <h2>Photo Gallery</h2>
        <PhotoGallery 
          images={images}
          baseDir={`/images/groups/${slug}`}
        />
      </section>
    {/if}
  </article>
{/if}

<style>
  .group-page {
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

  .group-advisor {
    font-size: 1.1rem;
    color: #555;
    font-style: italic;
  }

  .group-content {
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .group-photos h2 {
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
