<script>
  import { onMount } from 'svelte';
  import YearbookTheme from '$lib/components/YearbookTheme.svelte';
  
  let themeContent = null;
  let loading = true;
  
  onMount(async () => {
    try {
      // Load theme content
      const response = await fetch('/content/about/theme.md');
      
      if (!response.ok) {
        throw new Error('Failed to load theme content');
      }
      
      const markdown = await response.text();
      
      // Here you would use a markdown parser like marked
      // For this example, we'll just use the raw text
      themeContent = markdown;
    } catch (error) {
      console.error('Error loading theme content:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>About | BJU Vintage 2025</title>
</svelte:head>

<section class="about-page">
  <h1>About The Vintage 2025</h1>
  
  <div class="cover-display">
    <img src="/images/cover/cover-full.jpg" alt="BJU Vintage 2025 Cover" />
  </div>
  
  {#if loading}
    <div class="loading">Loading theme information...</div>
  {:else if !themeContent}
    <div class="error-state">
      <p>Theme information could not be loaded.</p>
    </div>
  {:else}
    <div class="theme-section">
      <h2>2025 Theme</h2>
      <div class="theme-content">
        <YearbookTheme position="top-right" color="#ffcc00" />
        <div class="content">
          <!-- Display theme content -->
          <p>{themeContent}</p>
        </div>
        <YearbookTheme position="bottom-left" color="#ffcc00" />
      </div>
    </div>
  {/if}
  
  <div class="staff-section">
    <h2>Yearbook Staff</h2>
    <div class="staff-list">
      <div class="staff-member">
        <h3>Editor-in-Chief</h3>
        <p>Student Name</p>
      </div>
      <div class="staff-member">
        <h3>Assistant Editor</h3>
        <p>Student Name</p>
      </div>
      <div class="staff-member">
        <h3>Photography Director</h3>
        <p>Student Name</p>
      </div>
      <div class="staff-member">
        <h3>Layout Designer</h3>
        <p>Student Name</p>
      </div>
      <div class="staff-member">
        <h3>Copy Editor</h3>
        <p>Student Name</p>
      </div>
      <div class="staff-member">
        <h3>Faculty Advisor</h3>
        <p>Faculty Name</p>
      </div>
    </div>
  </div>
</section>

<style>
  .about-page {
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
    margin: 2rem 0 1rem;
    border-bottom: 2px solid #ffcc00; /* Gold from yearbook cover */
    padding-bottom: 0.5rem;
  }

  .cover-display {
    text-align: center;
    margin: 2rem 0;
  }

  .cover-display img {
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
    border-radius: 8px;
  }

  .theme-section {
    margin: 3rem 0;
  }

  .theme-content {
    position: relative;
    background-color: #f8f8f8;
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .theme-content .content {
    position: relative;
    z-index: 1;
  }

  .staff-section {
    margin: 3rem 0;
  }

  .staff-list {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
    gap: 2rem;
  }

  .staff-member {
    background-color: #f8f8f8;
    padding: 1.5rem;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  .staff-member h3 {
    color: #7ab7ff; /* Light blue from yearbook cover */
    font-size: 1.2rem;
    margin-bottom: 0.5rem;
  }

  .loading, .error-state {
    text-align: center;
    padding: 3rem;
    font-style: italic;
    color: #666;
  }
</style>

