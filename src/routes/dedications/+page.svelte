<script>
  import { onMount } from 'svelte';
  
  let abramsMd = '';
  let olingerMd = '';
  let loading = true;
  
  onMount(async () => {
    try {
      // Load dedicatees content
      const abramsResponse = await fetch('/content/dedications/abrams.md');
      const olingerResponse = await fetch('/content/dedications/olinger.md');
      
      if (!abramsResponse.ok || !olingerResponse.ok) {
        throw new Error('Failed to load dedicatees content');
      }
      
      abramsMd = await abramsResponse.text();
      olingerMd = await olingerResponse.text();
    } catch (error) {
      console.error('Error loading dedicatees content:', error);
    } finally {
      loading = false;
    }
  });
</script>

<svelte:head>
  <title>Dedications | BJU Vintage 2025</title>
</svelte:head>

<section class="dedications-page">
  <h1 class="dedicatees-title">2025 Vintage Dedicatees</h1>
  
  {#if loading}
    <div class="loading">Loading dedicatee information...</div>
  {:else if !abramsMd || !olingerMd}
    <div class="error-state">
      <p>Dedicatee information could not be loaded.</p>
    </div>
  {:else}
    <div class="honoree-cards">
      <div class="honoree-card">
        <div class="honoree-image">
          <img src="/images/dedications/abrams.jpg" alt="Linda Abrams" />
        </div>
        <div class="honoree-info">
          <h3>Linda Abrams</h3>
          <div class="honoree-description">
            <p>Throughout her ministry at Bob Jones University, Linda Abrams has exemplified a dedication and passion for education that inspire her colleagues and students. By the end of this academic year, May 2025, Linda will have completed 43 years of service to BJU.</p>
            
            <div class="honoree-quote">
              <blockquote>Throughout her ministry at Bob Jones University, Linda Abrams has exemplified a dedication and passion for education that inspire her colleagues and students.</blockquote>
            </div>
            
            <p>Linda received a BA in History from Berry College and an MA in Modern European History from the University of Maryland. She also completed graduate work in Political Science from American Public University. She likewise holds a Certificate in Online Teaching from the University of Wisconsin. Her expertise spans eighteenth- and nineteenth-century European history as well as American government, areas of study to which she has made significant contributions through her teaching career and scholarship.</p>
            
            <p>As the founder and director of BJU's Center for Effective Teaching and Engaged Learning (CETEL), Linda has been instrumental in enhancing the pedagogical skills of BJU faculty. She directs activities and projects for new faculty members; the CETEL May Institute, which provides professional development sessions for faculty members; and "Edubreaks," seminars on special topics relative to teaching expertise.</p>
            
            <div class="honoree-quote">
              <blockquote>As the founder and director of BJU's Center for Effective Teaching and Engaged Learning (CETEL), Linda has been instrumental in enhancing the pedagogical skills of BJU faculty.</blockquote>
            </div>
            
            <p>Through these contributions, Linda seeks to improve teaching effectiveness and foster experiential learning on campus. According to colleagues, Linda's efforts have elevated the teaching standards at BJU, making her an invaluable asset to the University.</p>
            
            <div class="honoree-quote">
              <blockquote>"Linda is a teacher's teacher," said a friend, "and she understands the needs of both faculty members and students. With this understanding, she empowers others to succeed."</blockquote>
            </div>
            
            <p>Linda's commitment to professional development is evident through her continuous engagement with modern teaching methods, participation in education conferences, and extensive research on educational theory. For twenty-two years she has served as an advisor to the BJU delegation to the South Carolina Student Legislature, leading the group to win "Best Delegation" award fifteen times.</p>
            
            <p>In addition to her academic and administrative roles, Linda is a respected political analyst. National media outlets such as The Boston Globe, The Charlotte News and Observer, Die Zeit, and Bloomberg News have featured her interviews, and Greenville's WYFF 4 News frequently highlights Linda as a political analyst. Her expertise lies in the intersection of conservative Christianity and the American political system.</p>
            
            <p>Linda's dedication to education extends beyond the classroom. She has led study abroad courses to France and missions teams to rural Kenya and urban South Africa. Her extensive travels enrich her teaching, and she believes integrating literature, music, and art into her classes offers students a well-rounded understanding of the subject matter. Actively involved in her church, she serves in the nursery and teaches Sunday school to elementary and junior high young people. Linda has also completed numerous language courses at BJU to better engage with her church's Spanish-speaking ministry. Linda enjoys traveling with her husband (retired faculty member Carl Abrams), spending time with her grandchildren, and cooking.</p>
            
            <p>For her humble spirit, ongoing commitment to Bob Jones University, and desire to show Christ in everything she does, Linda Abrams is the 2025 Vintage co-dedicatee.</p>
          </div>
        </div>
      </div>
      
      <div class="honoree-card">
        <div class="honoree-image">
          <img src="/images/dedications/olinger.jpg" alt="Dr. Dan Olinger" />
        </div>
        <div class="honoree-info">
          <h3>Dr. Dan Olinger</h3>
          <div class="honoree-description">
            <p>Throughout his ministry at Bob Jones University, Dr. Dan Olinger has exemplified the qualities of a faithful servant of Jesus Christ: "in work, in conversation, in charity, in spirit, in faith, in purity" (1 Tim. 4:12). By the end of this academic year, May 2025, Dan will have completed 49 total years of service to BJU.</p>
            
            <div class="honoree-quote">
              <blockquote>Throughout his ministry at Bob Jones University, Dr. Dan Olinger has exemplified the qualities of a faithful servant of Jesus Christ: "in work, in conversation, in charity, in spirit, in faith, in purity" (1 Tim. 4:12).</blockquote>
            </div>
            
            <p>Having earned a PhD in Theology from Bob Jones University, Dan has taught courses in theology, New Testament, and Old Testament, with special interest in ecclesiology and the Pauline Epistles. As Chair of the Division of Bible, he has been instrumental in shaping undergraduate and graduate theological education at BJU. For 18 years he has led the BJU summer ministry team to Africa, extending his influence and ministry beyond the classroom.</p>
            
            <p>Dan's commitment to biblical education is also evident through his extensive teaching experience internationally. He has taught Bible courses in China, Ghana, Kenya, Mexico, Puerto Rico, Saipan, St. Vincent, South Africa, and Zambia. According to a current BJU Seminary student, Dan's global teaching experiences enrich his classes, providing students with a broad perspective on biblical studies.</p>
            
            <p>In addition to teaching, Dan has served on the boards of Mission to Haiti and The Shanghai Institute of Health Sciences. He has written extensively for BJU Press publications and speaks regularly at churches, camps, and educational conferences.</p>
            
            <div class="honoree-quote">
              <blockquote>"His dedication to making Bible teaching understandable and lively is a hallmark of his career," says a colleague. Dan hopes his students will not only be well acquainted with but also lovers of God's Word.</blockquote>
            </div>
            
            <p>Dan's approach to Bible teaching goes beyond head knowledge, for he emphasizes the practical application of biblical truth, aiming to instill a heartfelt understanding of the Bible in his students. He is a continual learner, always seeking to grow and improve in his field.</p>
            
            <p>During Dan's early career, which included five years as an English Graduate Assistant while completing his seminary degree, he honed his writing skills. His work at BJU Press, which included drafting positional statements for the institution, reflects his commitment to the University's liberal arts focus that aims to develop the whole person. In his current role Dan reflects the University's pursuit of academic excellence, but he likewise maintains a strong focus on the arts. Showcasing his diverse talent, Dan has performed in numerous productions of Shakespeare on campus.</p>
            
            <p>Dan and his wife, Pam, are members of Grace Baptist Fellowship in Greenville. They have two daughters and enjoy spending time together as a family.</p>
            
            <div class="honoree-quote">
              <blockquote>For his humble spirit, ongoing commitment to Bob Jones University, and desire to reflect Christ in everything he does, Dr. Dan Olinger is the 2025 Vintage co-dedicatee.</blockquote>
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
    color: #001142; /* Navy blue from cover */
    font-size: 2.5rem;
    margin-bottom: 2rem;
    text-align: center;
  }
  
  .dedicatees-title {
    color: #8ca5d9; /* Light blue from cover */
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
    display: block;
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
    background: linear-gradient(90deg, #001142, #8ca5d9);
  }
  
  .honoree-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 15px 30px rgba(10, 17, 85, 0.2);
  }

  .honoree-image {
    margin: 0 auto 2rem;
    width: 250px;
    display: block;
  }

  .honoree-image img {
    width: 100%;
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
    width: 100%;
  }

  .honoree-info h3 {
    color: #001142; /* Navy blue from cover */
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
    background-color: #e6b93d; /* Gold from cover */
  }

  .honoree-title {
    color: #e6b93d; /* Gold from cover */
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
    background: linear-gradient(to bottom, rgba(230, 185, 61, 0.1), rgba(230, 185, 61, 0.05));
    border-left: 3px solid #e6b93d;
    border-radius: 0 8px 8px 0;
  }
  
  .honoree-quote blockquote {
    color: #001142; /* Navy blue from cover */
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
    color: #e6b93d; /* Gold from cover */
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
