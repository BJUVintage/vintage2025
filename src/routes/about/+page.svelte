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
      themeContent = markdown;
    } catch (error) {
      console.error('Error loading theme content:', error);
    } finally {
      loading = false;
    }
  });

  // Function to format the theme text with paragraph breaks
  function formatThemeContent(text) {
    if (!text) return '';
    
    // Split the text into paragraphs
    const paragraphs = text.split('\n\n');
    
    // Process each paragraph
    return paragraphs.map((paragraph, index) => {
      // Add scripture references in span for styling
      const processedText = paragraph.replace(/\(([\w\s]+\d+:\d+(?:-\d+)?(?:,\s*[\w\s]+\d+:\d+(?:-\d+)?)*)\)/g, 
        (match, reference) => `<span class="scripture-ref">${match}</span>`);
      
      // Add a class to the first paragraph for the drop cap
      if (index === 0) {
        const firstChar = processedText.charAt(0);
        const restOfText = processedText.slice(1);
        return `<p class="intro"><span class="drop-cap">${firstChar}</span>${restOfText}</p>`;
      }
      
      // Regular paragraphs after that
      return `<p>${processedText}</p>`;
    }).join('');
  }
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
        <div class="content">
          <!-- First paragraph -->
          <p class="intro"><span class="drop-cap">W</span>isdom was in the beginning with God as He created the world <span class="scripture-ref">(Genesis 1:26, John 1:1)</span>. Formed in the image of the Creator, we humans have mined God's creation for gold and silver, iron and copper. We have dammed up mighty rivers, forming lakes and generating power. We have explored the oceans and conquered peaks <span class="scripture-ref">(Job 28)</span>. But when we enter an academic setting, we tend to focus only on knowledge. We search textbooks, perform experiments, and complete projects, seeking to broaden our pool of knowledge and to expand our sphere of influence.</p>

          <!-- Second paragraph -->
          <p>Despite mankind's amazing accomplishments, though, knowledge remains inadequate to answer the really significant like questions like What job should I apply for? Whom should I marry? Where should I live? and most fundamentally Why am I alive? Only wisdom, which according to <span class="scripture-ref">Proverbs 8:11</span> is more valuable than precious jewels, provide ultimate answers.</p>
          

          <!-- First pull quote -->
          <div class="pull-quote right">
            <blockquote>"If any of you lack wisdom, let him ask of God, that giveth to all men liberally"</blockquote>
            <cite>James 1:5</cite>
          </div>
          
          <!-- Third paragraph -->
          <p>Solomon dedicated his life to gaining wisdom, but he discovered his search to be "striving after wind" <span class="scripture-ref">(Ecclesiastes 1:17)</span>. Job, lamenting this same dilemma, cries out to God: "But where shall wisdom be found? And where is the place of understanding? Man knoweth not the price thereof; neither is it found in the land of the living" <span class="scripture-ref">(Job 28:12-13)</span>. Job recognizes that wisdom is "hid from the eyes of the living, And kept close from the fowls of the air. Death and destruction say, We have heard the fame thereof with our ears" <span class="scripture-ref">(Job 28:21-22)</span>. Wisdom seems unattainable, but Solomon exhorts us to pursue it; the consequences of neglecting wisdom are severe <span class="scripture-ref">(Ecclesiastes 12)</span>.</p>

          <!-- Second pull quote -->
          <div class="pull-quote">
            <blockquote>"Behold, the fear of the Lord, that is wisdom, and to turn away from evil, is understanding"</blockquote>
            <cite>Job 28:28</cite>
          </div>

          
          <!-- Fourth paragraph -->
          <p>Just as our Great Provider fills the earth with the valuable resources for man's consumption, so he supplies the path to wisdom: "Behold, the fear of the Lord, that is wisdom, and to turn away from evil, is understanding" <span class="scripture-ref">(Job 28:28)</span>. Our God sees beyond limited human endeavors. <span class="scripture-ref">James 1:5</span> says, "If any of you lack wisdom, let him ask of God, that giveth to all men liberally, and upbraideth not; and it shall be given him." With God's promise to supply wisdom, we can stand in awe of the Creator as well as his creation <span class="scripture-ref">(Psalm 33, Proverbs 8)</span>. He raises the mountains; he carves the rivers; he measures the thunder, wind, and rain; and he sets the stars in motion.</p>
          
          
          <!-- Fifth paragraph -->
          <p>With confidence, we can enjoy the greatness of our God. However, we must also align our decisions with his will. <span class="scripture-ref">Proverbs 3:5-6</span> says, "Trust in the LORD with all thine heart; and lean not unto thine own understanding. In all thy ways acknowledge him, and he shall direct thy paths." In addition to guiding our paths, God gives us access to his Son, Jesus, who is wisdom incarnate. Christ is our "righteousness and sanctification and redemption, so that, as it is written, 'Let the one who boasts, boast in the Lord'"<span class="scripture-ref">(1 Corinthians 1:30-31)</span>.</p>
          
          <!-- Third pull quote -->
          <div class="pull-quote right">
            <blockquote>"Trust in the LORD with all thine heart; and lean not unto thine own understanding."</blockquote>
            <cite>Proverbs 3:5-6</cite>
          </div>
          
          <!-- Sixth paragraph -->
          <p>Wisdom is not something we can mine from a mountain or discover at the bottom of the sea. Rather, it is a daily surrender of our lives according to God's great design. Our diligent pursuit of wisdom requires turning away from evil and fearing the Lord. To become wise, we must follow the One who knows where wisdom is found.</p>
        </div>
      </div>
    </div>
  {/if}
  
</section>

<style>
  .about-page {
    max-width: 800px;
    margin: 2rem auto;
    background: linear-gradient(135deg, #ffffff 0%, #f0f4ff 100%);
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
    color: #333;
    border: 1px solid rgba(122, 183, 255, 0.3);
  }

  h1 {
    color: #001142; /* Navy blue from cover */
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }

  h2 {
    color: #001142; /* Navy blue from cover */
    font-size: 1.8rem;
    margin: 2rem 0 1rem;
    border-bottom: 2px solid #e6b93d; /* Gold from cover */
    padding-bottom: 0.5rem;
  }

  .cover-display {
    text-align: center;
    margin: 2rem 0;
  }

  .cover-display img {
    max-width: 400px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.4);
    border-radius: 8px;
    border: 3px solid #e6b93d; /* Gold from cover */
  }

  .theme-section {
    margin: 3rem 0;
  }

  .theme-content {
    position: relative;
    background: linear-gradient(135deg, #ffffff 0%, #f8f8f8 100%);
    padding: 2rem;
    border-radius: 8px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.25);
    border: 1px solid rgba(255, 255, 255, 0.2);
  }

  .theme-content .content {
    position: relative;
    z-index: 1;
    line-height: 1.8;
    font-size: 1.05rem;
    color: #333;
  }

  /* Paragraph styling */
  .content p {
    margin-bottom: 1.5rem;
    text-align: justify;
  }

  /* First letter styling (drop cap) */
  .drop-cap {
    float: left;
    font-size: 3.5rem;
    line-height: 0.8;
    padding-right: 0.5rem;
    padding-top: 0.25rem;
    color: #001142; /* Navy blue from cover */
    font-weight: bold;
    text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.1);
  }

  /* Scripture reference styling */
  .scripture-ref {
    color: #001142; /* Navy blue from cover */
    font-weight: 500;
  }

  /* Pull quote styling */
  .pull-quote {
    margin: 2rem 0 2rem 3rem;
    padding: 1.5rem;
    background-color: rgba(230, 185, 61, 0.1); /* Light gold background */
    border-left: 4px solid #e6b93d; /* Gold accent */
    max-width: 55%;
    position: relative;
    float: right;
    clear: right;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-radius: 0 8px 8px 0;
  }

  .pull-quote.right {
    float: left;
    clear: left;
    margin: 2rem 3rem 2rem 0;
    border-left: none;
    border-right: 4px solid #e6b93d;
    text-align: right;
    border-radius: 8px 0 0 8px;
  }

  .pull-quote blockquote {
    font-size: 1.2rem;
    font-style: italic;
    margin: 0 0 0.5rem 0;
    color: #001142; /* Navy blue from cover */
    line-height: 1.4;
  }

  .pull-quote cite {
    font-size: 0.9rem;
    color: #666;
    font-style: normal;
    display: block;
    font-weight: 500;
  }

  .loading, .error-state {
    text-align: center;
    padding: 3rem;
    font-style: italic;
    color: #666;
    background: rgba(0, 0, 0, 0.05);
    border-radius: 8px;
  }

  /* Responsive adjustments */
  @media (max-width: 768px) {
    .theme-content {
      padding: 1.5rem;
    }

    .pull-quote, .pull-quote.right {
      float: none;
      max-width: 100%;
      margin: 2rem 0;
      text-align: left;
      border-left: 4px solid #e6b93d;
      border-right: none;
    }
  }
</style>
