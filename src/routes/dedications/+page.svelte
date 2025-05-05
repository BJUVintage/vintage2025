<script>
  import { onMount } from 'svelte';
  
  let dedicationsContent = null;
  let loading = true;
  
  onMount(async () => {
    try {
      // Load dedications content
      const response = await fetch('/content/dedications/dedications.md');
      
      if (!response.ok) {
        throw new Error('Failed to load dedications content');
      }
      
      const markdown = await response.text();
      
      // Here you would use a markdown parser like marked
      // For this example, we'll just use the raw text
      dedicationsContent = markdown;
    } catch (error) {
      console.error('Error loading dedications content:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Dedications | BJU Vintage 2025</title>
</svelte:head>

<section class="dedications-page">
  <h1>2025 Vintage Dedications</h1>
  
  {#if loading}
    <div class="loading">Loading dedications...</div>
  {:else if !dedicationsContent}
    <div class="error-state">
      <p>Dedications information could not be loaded.</p>
    </div>
  {:else}
    <div class="dedications-content">
      <!-- Display dedications content -->
      <p>{dedicationsContent}</p>
    </div>
  {/if}
  
  <div class="honoree-section">
    <h2>2025 Honorees</h2>
    
    <div class="honoree-card">
      <div class="honoree-image">
        <img src="/images/dedications/honoree1.jpg" alt="Honoree 1" />
      </div>
      <div class="honoree-info">
        <h3>Faculty/Staff Name</h3>
        <p class="honoree-title">Professor of [Department]</p>
        <div class="honoree-description">
          <p>Placeholder for honoree description. This would contain a brief biography highlighting their contributions to BJU and their dedication to students and the university's mission.</p>
          <p>Additional information about the honoree's achievements, years of service, and impact on the university community would be included here.</p>
        </div>
      </div>
    </div>
    
    <div class="honoree-card">
      <div class="honoree-image">
        <img src="/images/dedications/honoree2.jpg" alt="Honoree 2" />
      </div>
      <div class="honoree-info">
        <h3>Faculty/Staff Name</h3>
        <p class="honoree-title">Director of [Department]</p>
        <div class="honoree-description">
          <p>Placeholder for honoree description. This would contain a brief biography highlighting their contributions to BJU and their dedication to students and the university's mission.</p>
          <p>Additional information about the honoree's achievements, years of service, and impact on the university community would be included here.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<style>
  .dedications-page {
    max-width: 800px;
    margin: 0 auto;
  }

  h1 {
    color: #0a1155; /* Dark blue from yearbook cover */
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  h2 {
    color: #0a1155;
    font-size: 1.8rem;
    margin: 2rem 0 1.5rem;
    border-bottom: 2px solid #ffcc00; /* Gold from yearbook cover */
    padding-bottom: 0.5rem;
  }

  .dedications-content {
    margin-bottom: 3rem;
    line-height: 1.6;
  }

  .honoree-section {
    margin: 3rem 0;
  }

  .honoree-card {
    display: flex;
    gap: 2rem;
    margin-bottom: 3rem;
    background-color: #f8f8f8;
    border-radius: 8px;
    padding: 2rem;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .honoree-image {
    flex: 0 0 200px;
  }

  .honoree-image img {
    width: 100%;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  }

  .honoree-info {
    flex: 1;
  }

  .honoree-info h3 {
    color: #0a1155;
    font-size: 1.5rem;
    margin-bottom: 0.5rem;
  }

  .honoree-title {
    color: #7ab7ff; /* Light blue from yearbook cover */
    font-style: italic;
    margin-bottom: 1rem;
  }

  .honoree-description {
    line-height: 1.6;
  }

  .loading, .error-state {
    text-align: center;
    padding: 3rem;
    font-style: italic;
    color: #666;
  }

  @media (max-width: 768px) {
    .honoree-card {
      flex-direction: column;
    }

    .honoree-image {
      flex: 0 0 auto;
      margin-bottom: 1.5rem;
    }
  }
</style>
