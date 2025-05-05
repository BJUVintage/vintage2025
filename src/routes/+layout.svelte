<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import YearbookTheme from '$lib/components/YearbookTheme.svelte';
  import '../app.css';
</script>

<div class="layout">
  <div class="background-waves">
    <YearbookTheme position="top-full" color="#7ab7ff" opacity="0.4" />
    <YearbookTheme position="bottom-full" color="#7ab7ff" opacity="0.4" />
  </div>
  
  <Header />
  
  <main>
    <div class="content-container">
      <slot />
    </div>
  </main>
  
  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
    position: relative;
    overflow-x: hidden;
  }
  
  .background-waves {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    pointer-events: none;
  }

  main {
    flex: 1;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
    background-color: rgba(255, 255, 255, 0.08);
    border-radius: 16px;
    margin-top: 2rem;
    margin-bottom: 2rem;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  }

  .content-container {
    position: relative;
    z-index: 1;
    width: 100%;
    height: 100%;
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }
  }
</style>

