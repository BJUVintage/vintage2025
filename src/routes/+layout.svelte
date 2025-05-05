<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import YearbookTheme from '$lib/components/YearbookTheme.svelte';
  import '../app.css';
</script>

<div class="layout">
  <Header />
  
  <main>
    <YearbookTheme position="top-right" color="#ffcc00" />
    <slot />
    <YearbookTheme position="bottom-left" color="#ffcc00" />
  </main>
  
  <Footer />
</div>

<style>
  .layout {
    display: flex;
    flex-direction: column;
    min-height: 100vh;
  }

  main {
    flex: 1;
    position: relative;
    max-width: 1200px;
    margin: 0 auto;
    padding: 2rem;
    width: 100%;
  }

  @media (max-width: 768px) {
    main {
      padding: 1rem;
    }
  }
</style>

