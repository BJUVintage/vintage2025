<script>
  import { onMount } from 'svelte';
  import { withBasePath } from '$lib/utils/paths.js';

  export let title;
  export let slug;
  export let imagePath;
  export let excerpt;
  
  let displayImagePath = imagePath;
  let imageLoaded = false;
  let fallbackPath = '';
  
  // Extract original path in case the compressed version doesn't exist
  onMount(() => {
    // If path includes _compressed, create fallback to original
    if (imagePath.includes('_compressed.')) {
      fallbackPath = imagePath.replace('_compressed.', '.');
    }
  });
  
  // Handle image error by switching to fallback
  function handleImageError() {
    if (fallbackPath && !imageLoaded) {
      displayImagePath = fallbackPath;
    }
  }
  
  // Record successful image load
  function handleImageLoad() {
    imageLoaded = true;
  }

  $: groupHref = withBasePath(`/groups/${slug}`);
</script>

<a href={groupHref} class="group-card">
  <div class="card-image">
    <img 
      src={displayImagePath} 
      alt={title} 
      on:error={handleImageError}
      on:load={handleImageLoad}
    />
  </div>
  <div class="card-content">
    <h3>{title}</h3>
    <p>{excerpt}</p>
  </div>
</a>

<style>
  .group-card {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(to bottom, #ffffff, #f8f8f8);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: inherit;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    z-index: 2;
  }

  .group-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
    border-top: 2px solid #e6b93d; /* Gold from cover */
  }

  .card-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-content h3 {
    margin-top: 0;
    color: #8ca5d9; /* Light blue from cover */
    font-size: 1.5rem;
  }

  .card-content p {
    margin-bottom: 0;
    color: #333;
  }
</style>
