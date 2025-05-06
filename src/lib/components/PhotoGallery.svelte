<script>
  import { onMount } from 'svelte';
  export let images = [];
  export let baseDir;
  
  let selectedImage = null;
  let lazyLoadObserver;
  let loading = true;
  let currentImageIndex = 0;
  
  // Create thumbnail and full image URLs
  const imageUrls = images.map(image => {
    // Handle case where image might already have _thumb or _compressed suffix
    let baseName = image;
    let fileName;
    let extension;
    
    // Remove any existing _thumb or _compressed suffixes
    if (image.includes('_thumb.') || image.includes('_compressed.')) {
      baseName = image.replace('_thumb.', '.').replace('_compressed.', '.');
    }
    
    fileName = baseName.split('.')[0];
    extension = baseName.split('.').pop();
    
    return {
      original: `${baseDir}/${baseName}`,
      thumbnail: `${baseDir}/${fileName}_thumb.${extension}`,
      compressed: `${baseDir}/${fileName}_compressed.${extension}`,
      fileName: baseName
    };
  });
  
  // Track which images have been loaded
  let loadedImages = {};
  
  onMount(() => {
    // Initialize Intersection Observer for lazy loading
    if ('IntersectionObserver' in window) {
      lazyLoadObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target;
            const dataSrc = img.getAttribute('data-src');
            const imageId = img.getAttribute('data-id');
            
            if (dataSrc && !loadedImages[imageId]) {
              // Try loading the compressed version for thumbnails
              const compressedImg = new Image();
              compressedImg.onload = () => {
                img.src = dataSrc;
                loadedImages[imageId] = true;
                lazyLoadObserver.unobserve(img);
              };
              
              compressedImg.onerror = () => {
                // If compressed fails, use original
                const originalUrl = img.getAttribute('data-original');
                if (originalUrl) {
                  img.src = originalUrl;
                  loadedImages[imageId] = true;
                  lazyLoadObserver.unobserve(img);
                } else {
                  console.warn('Failed to load image, no URL available');
                  img.src = '/images/placeholder-thumb.jpg';
                  loadedImages[imageId] = true;
                  lazyLoadObserver.unobserve(img);
                }
              };
              
              compressedImg.src = dataSrc;
            }
          }
        });
      }, { rootMargin: '200px' });
      
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
  
  function openLightbox(index) {
    currentImageIndex = index;
    // Show loading state
    loading = true;
    
    // Preload the full-size image before displaying
    const preloadImg = new Image();
    preloadImg.src = imageUrls[index].original;
    preloadImg.onload = () => {
      selectedImage = imageUrls[index].original;
      loading = false;
    };
    
    // Fallback in case image takes too long
    setTimeout(() => {
      if (loading) {
        selectedImage = imageUrls[index].original;
        loading = false;
      }
    }, 1000);
  }
  
  function closeLightbox() {
    selectedImage = null;
    loading = true;
  }
  
  function navigateGallery(direction) {
    if (!selectedImage) return;
    
    loading = true;
    const newIndex = (currentImageIndex + direction + images.length) % images.length;
    
    // Preload next image
    const preloadImg = new Image();
    preloadImg.src = imageUrls[newIndex].original;
    
    preloadImg.onload = () => {
      currentImageIndex = newIndex;
      selectedImage = imageUrls[newIndex].original;
      loading = false;
    };
    
    // Fallback in case image takes too long
    setTimeout(() => {
      if (loading) {
        currentImageIndex = newIndex;
        selectedImage = imageUrls[newIndex].original;
        loading = false;
      }
    }, 1000);
  }
  
  // Handle keyboard navigation
  function handleKeydown(e) {
    if (!selectedImage) return;
    
    if (e.key === 'Escape') {
      closeLightbox();
    } else if (e.key === 'ArrowRight') {
      navigateGallery(1);
    } else if (e.key === 'ArrowLeft') {
      navigateGallery(-1);
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

<div class="gallery">
  {#each imageUrls as image, i}
    <div class="gallery-item" on:click={() => openLightbox(i)} 
         aria-label={`View full size image ${i+1}`} role="button" tabindex="0">
      <div class="thumbnail-container">
        <img 
          src="/images/placeholder-thumb.jpg" 
          data-src={image.compressed} 
          data-original={image.original}
          data-id={`img-${i}`}
          alt={`Gallery image ${i+1}`}
          loading="lazy"
        />
      </div>
    </div>
  {/each}
</div>

{#if selectedImage}
  <div class="lightbox" on:click={closeLightbox}>
    <div class="lightbox-content" on:click|stopPropagation>
      {#if loading}
        <div class="loading-indicator">
          <div class="spinner"></div>
        </div>
      {/if}
      <img 
        src={selectedImage} 
        alt={`Enlarged view of image ${currentImageIndex + 1}`} 
        class={loading ? 'hidden' : ''}
      />
      <button class="prev-button" on:click|stopPropagation={() => navigateGallery(-1)}>❮</button>
      <button class="next-button" on:click|stopPropagation={() => navigateGallery(1)}>❯</button>
      <button class="close-button" on:click|stopPropagation={closeLightbox}>×</button>
    </div>
  </div>
{/if}

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
    grid-gap: 1rem;
    margin: 2rem 0;
    contain: layout style;
  }

  .gallery-item {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    height: 180px;
    transform: translateZ(0);
    will-change: transform;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
    background-color: #e9e9e9;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    position: relative;
  }

  .gallery-item:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  }

  .gallery-item:focus {
    outline: 2px solid #e6b93d;
  }

  .thumbnail-container {
    width: 100%;
    height: 100%;
    position: relative;
    background-color: #f0f0f0;
    overflow: hidden;
  }

  .thumbnail-container::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: linear-gradient(to bottom, rgba(0,0,0,0) 70%, rgba(0,0,0,0.4) 100%);
    pointer-events: none;
    z-index: 1;
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    transform: translateZ(0);
    will-change: opacity;
    transition: opacity 0.3s ease;
    background-color: #f0f0f0;
  }

  .lightbox {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 1000;
    backdrop-filter: blur(3px);
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
    from { opacity: 0; transform: scale(0.98); }
    to { opacity: 1; transform: scale(1); }
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    border: 2px solid #ffcc00; /* Gold from yearbook cover */
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
    background-color: #111;
    opacity: 1;
    transition: opacity 0.3s ease;
  }

  .lightbox-content img.hidden {
    opacity: 0;
  }

  .loading-indicator {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 2;
  }

  .spinner {
    width: 50px;
    height: 50px;
    border: 4px solid rgba(230, 185, 61, 0.3);
    border-radius: 50%;
    border-top-color: #e6b93d; /* Gold */
    animation: spin 1s linear infinite;
  }

  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }

  .close-button {
    position: absolute;
    top: 15px;
    right: 15px;
    background: #e6b93d; /* Gold from yearbook cover */
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
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    transform: translateZ(0);
    z-index: 3;
    transition: background-color 0.2s ease;
  }

  .close-button:hover {
    background-color: #ffcc00;
  }

  .prev-button, .next-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background: rgba(230, 185, 61, 0.7);
    color: #0a1155;
    border: none;
    border-radius: 50%;
    width: 40px;
    height: 40px;
    font-size: 24px;
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.5);
    z-index: 3;
    transition: background-color 0.2s ease, opacity 0.2s ease;
    opacity: 0.7;
  }

  .prev-button {
    left: 15px;
  }

  .next-button {
    right: 15px;
  }

  .prev-button:hover, .next-button:hover {
    background-color: rgba(255, 204, 0, 0.9);
    opacity: 1;
  }

  @media (max-width: 768px) {
    .gallery {
      grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
      grid-gap: 0.75rem;
    }

    .gallery-item {
      height: 150px;
    }

    .prev-button, .next-button, .close-button {
      width: 36px;
      height: 36px;
      font-size: 20px;
    }
  }
</style>
