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
  <h1>2025 Vintage Honorees</h1>
  
  {#if loading}
    <div class="loading">Loading honoree information...</div>
  {:else if !dedicationsContent}
    <div class="error-state">
      <p>Honoree information could not be loaded.</p>
    </div>
  {:else}
    <div class="honoree-cards">
      <div class="honoree-card">
        <div class="honoree-image">
          <img src="/images/dedications/abrams.jpg" alt="Dr. Karen Abrams" />
        </div>
        <div class="honoree-info">
          <h3>Dr. Karen Abrams</h3>
          <p class="honoree-title">Professor of English, 1988-2025</p>
          <div class="honoree-description">
            <p>Dr. Karen Abrams has dedicated nearly four decades to BJU's English Department, inspiring generations of students with her passion for literature and excellence in writing. Her engaging teaching style made even the most challenging literary works accessible and meaningful to students.</p>
            <p>Beyond the classroom, Dr. Abrams has been a tireless advocate for the humanities, founding the university's annual Literary Festival which now attracts renowned authors from around the country. Her own scholarly work on redemptive themes in American literature has been published in numerous academic journals and presented at conferences worldwide.</p>
            <div class="honoree-quote">
              <blockquote>"My greatest joy has been watching students discover how literature can deepen their understanding of God's truth and humanity's complexity. When a student sees Christ's redemptive narrative echoed in great literature, that's when I know I've succeeded as a teacher."</blockquote>
            </div>
          </div>
        </div>
      </div>
      
      <div class="honoree-card">
        <div class="honoree-image">
          <img src="/images/dedications/olinger.jpg" alt="Dr. Richard Olinger" />
        </div>
        <div class="honoree-info">
          <h3>Dr. Richard Olinger</h3>
          <p class="honoree-title">Professor of Biblical Studies, 1982-2025</p>
          <div class="honoree-description">
            <p>For 43 years, Dr. Richard Olinger has been the cornerstone of BJU's Biblical Studies Department. His profound understanding of Scripture and ability to connect ancient texts to contemporary Christian living has influenced thousands of students who now serve in ministries worldwide.</p>
            <p>Dr. Olinger's expertise in original biblical languages resulted in his highly respected commentary series that is widely used in seminaries across the nation. His Wednesday evening Bible studies in the student center became a cherished tradition that regularly drew hundreds of students seeking deeper biblical insights.</p>
            <p>Beyond academic achievements, Dr. Olinger has modeled Christ-like servanthood through his extensive missionary work during summer breaks, leading student teams to unreached areas in Southeast Asia.</p>
            <div class="honoree-quote">
              <blockquote>"The Scripture is not merely to be studied, but to be lived. True biblical scholarship always leads to transformed hearts and hands ready to serve."</blockquote>
            </div>
          </div>
        </div>
      </div>
    </div>
  {/if}
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
    border-bottom: 2px solid #ffc046; /* Rich gold */
    padding-bottom: 0.5rem;
    position: relative;
    display: inline-block;
  }
  
  h2::after {
    content: '';
    position: absolute;
    bottom: -2px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #ffc046, rgba(255, 192, 70, 0.3), #ffc046);
    animation: shimmer 3s infinite;
    background-size: 200% 100%;
  }
  
  @keyframes shimmer {
    0% {
      background-position: -200% 0;
    }
    100% {
      background-position: 200% 0;
    }
  }

  .honoree-cards {
    display: flex;
    flex-direction: column;
    gap: 3rem;
  }

  .honoree-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 2rem;
    background: linear-gradient(to bottom, #ffffff, #f8f8f8);
    border-radius: 16px;
    padding: 2.5rem;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.15);
    border: 1px solid rgba(255, 255, 255, 0.3);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    position: relative;
    overflow: hidden;
  }
  
  .honoree-card::before {
    content: '';
    position: absolute;
    top: 0;
    right: 0;
    width: 100%;
    height: 5px;
    background: linear-gradient(90deg, #0a1155, #7ab7ff);
  }
  
  .honoree-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(10, 17, 85, 0.2);
  }

  .honoree-image {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding-top: 1rem;
  }

  .honoree-image img {
    width: 100%;
    max-width: 250px;
    border-radius: 50%;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    border: 3px solid #ffc046; /* Gold border */
    transition: transform 0.3s ease, box-shadow 0.3s ease;
  }
  
  .honoree-card:hover .honoree-image img {
    transform: scale(1.05);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.25);
  }

  .honoree-info {
    display: flex;
    flex-direction: column;
  }

  .honoree-info h3 {
    color: #0a1155;
    font-size: 1.8rem;
    margin-bottom: 0.5rem;
    position: relative;
    display: inline-block;
    padding-bottom: 0.5rem;
  }
  
  .honoree-info h3::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 50px;
    height: 3px;
    background-color: #ffc046;
  }

  .honoree-title {
    color: #ffc046; /* Rich gold */
    font-style: italic;
    margin-bottom: 1rem;
    font-weight: 500;
  }

  .honoree-description {
    line-height: 1.6;
  }
  
  .honoree-quote {
    margin: 1.5rem 0;
    padding: 1.5rem;
    background: linear-gradient(to bottom, rgba(255, 192, 70, 0.1), rgba(255, 192, 70, 0.05));
    border-left: 3px solid #ffc046;
    border-radius: 0 8px 8px 0;
  }
  
  .honoree-quote blockquote {
    color: #0a1155;
    font-style: italic;
    position: relative;
    padding-left: 1.5rem;
  }
  
  .honoree-quote blockquote::before {
    content: '"';
    position: absolute;
    left: 0;
    top: -0.5rem;
    font-size: 2rem;
    color: #ffc046;
    font-family: Georgia, serif;
  }

  .loading, .error-state {
    text-align: center;
    padding: 3rem;
    font-style: italic;
    color: #666;
  }

  @media (max-width: 768px) {
    .honoree-card {
      grid-template-columns: 1fr;
      padding: 1.5rem;
    }

    .honoree-image {
      padding-bottom: 1.5rem;
    }
    
    .honoree-image img {
      max-width: 200px;
    }
    
    .honoree-info h3 {
      font-size: 1.5rem;
    }
    
    .honoree-quote {
      padding: 1rem;
    }
  }
</style>
