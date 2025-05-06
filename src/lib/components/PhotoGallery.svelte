<script>
  import { onMount } from 'svelte';
  export let images = [];
  export let baseDir;
  
  let selectedImage = null;
  let lazyLoadObserver;
  let thumbnailWidth = 250;
  let thumbnailHeight = 200;
  
  onMount(() => {
    // Initialize Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.getAttribute('data-src');
            if (dataSrc) {
              img.src = dataSrc;
              img.removeAttribute('data-src');
              lazyLoadObserver.unobserve(img);
            }
          }
        });
      }, { rootMargin: '100px' });
      
      // Observe all thumbnails with data-src attribute
      document.querySelectorAll('.gallery-item img[data-src]').forEach(img => {
        lazyLoadObserver.observe(img);
      });
    }
    
    // Cleanup observer on component destroy
    return () => {
      if (lazyLoadObserver) {
        lazyLoadObserver.disconnect();
      }
    };
  });
  
  function openLightbox(image) {
    // Preload the full-size image before displaying lightbox
    const preloadImg = new Image();
    preloadImg.src = `${baseDir}/${image}`;
    preloadImg.onload = () => {
      selectedImage = image;
    };
  }
  
  function closeLightbox() {
    selectedImage = null;
  }
  
  // Handle keyboard navigation
  function handleKeydown(e) {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="gallery">
  {#each images as image, i}
    <div class="gallery-item" on:click={() => openLightbox(image)}>
      <img 
        src="/images/placeholder-thumb.jpg" 
        data-src={`${baseDir}/${image}`} 
        alt={`Gallery image ${i+1}`}
        loading="lazy"
        width={thumbnailWidth}
        height={thumbnailHeight}
      />
    </div>
  {/each}
</div>

{#if selectedImage}
  <div class="lightbox" on:click={closeLightbox}>
    <div class="lightbox-content">
      <img src={`${baseDir}/${selectedImage}`} alt="Enlarged view" />
      <button class="close-button" on:click|stopPropagation={closeLightbox}>×</button>
    </div>
  </div>
{/if}

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
    margin: 2rem 0;
    contain: layout style;
  }

  .gallery-item {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    height: 200px;
    transform: translateZ(0);
    will-change: transform;
    transition: transform 0.2s ease;
    background-color: #e9e9e9;
  }

  .gallery-item:hover {
    transform: scale(1.02);
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateZ(0);
    will-change: transform;
    background-color: #f0f0f0;
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.85);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(2px);
  }

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
    transform: translateZ(0);
    transition: transform 0.1s ease;
    animation: fadeIn 0.2s ease-out;
  }

  @keyframes fadeIn {
    from { opacity: 0; transform: scale(0.95); }
    to { opacity: 1; transform: scale(1); }
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    border: 2px solid #ffcc00; /* Gold from yearbook cover */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    background-color: #eeeeee;
  }

  .close-button {
    position: absolute;
    top: 10px;
    right: 10px;
    background: #ffcc00; /* Gold from yearbook cover */
    color: #0a1155; /* Dark blue from yearbook cover */
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.2);
    transform: translateZ(0);
  }
</style>
