<script>
  export let images = [];
  export let baseDir;
  
  let selectedImage = null;
  
  function openLightbox(image) {
    selectedImage = image;
  }
  
  function closeLightbox() {
    selectedImage = null;
  }
</script>

<div class="gallery">
  {#each images as image, i}
    <div class="gallery-item" on:click={() => openLightbox(image)}>
      <img src={`${baseDir}/${image}`} alt={`Gallery image ${i+1}`} />
    </div>
  {/each}
</div>

{#if selectedImage}
  <div class="lightbox" on:click={closeLightbox}>
    <div class="lightbox-content">
      <img src={`${baseDir}/${selectedImage}`} alt="Enlarged view" />
      <button class="close-button" on:click={closeLightbox}>×</button>
    </div>
  </div>
{/if}

<style>
  .gallery {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 1rem;
    margin: 2rem 0;
  }

  .gallery-item {
    cursor: pointer;
    border-radius: 8px;
    overflow: hidden;
    height: 200px;
    transition: transform 0.3s ease;
  }

  .gallery-item:hover {
    transform: scale(1.03);
  }

  .gallery-item img {
    width: 100%;
    height: 100%;
    object-fit: cover;
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
  }

  .lightbox-content {
    position: relative;
    max-width: 90%;
    max-height: 90%;
  }

  .lightbox-content img {
    max-width: 100%;
    max-height: 90vh;
    border: 2px solid #ffcc00; /* Gold from yearbook cover */
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
  }
</style>
