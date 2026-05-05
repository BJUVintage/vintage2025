<script>
  import { page } from '$app/stores';
  import { normalizePathname, withBasePath } from '$lib/utils/paths.js';
  
  // Navigation links
  const navLinks = [
    { path: '/', label: 'Home' },
    { path: '/events', label: 'Events' },
    { path: '/groups', label: 'Groups' },
    { path: '/societies', label: 'Society Events' },
    { path: '/dedications', label: 'Dedications' },
    { path: '/about', label: 'About' }
  ];
</script>

<header>
  <div class="logo-container">
    <a href={withBasePath('/')} class="vintage-text">Vintage</a>
  </div>
  <nav>
    <ul>
      {#each navLinks as link}
        <li class={normalizePathname($page.url.pathname) === link.path ? 'active' : ''}>
          <a href={withBasePath(link.path)}>{link.label}</a>
        </li>
      {/each}
    </ul>
  </nav>
</header>

<style>
  header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
    background: #001142; /* Navy blue from cover */
    color: #fff;
    box-shadow: 0 4px 16px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 10;
  }

  .logo-container {
    display: inline-flex;
    align-items: center;
  }
  
  .vintage-text {
    color: #8ca5d9; /* Light blue from cover */
    font-size: 1.8rem;
    font-weight: bold;
    text-decoration: none;
    letter-spacing: 1px;
    position: relative;
    display: inline-block;
    text-shadow: 0 1px 3px rgba(0, 0, 0, 0.3);
  }
  
  .vintage-text::after {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      -45deg, 
      rgba(255, 255, 255, 0) 0%, 
      rgba(255, 255, 255, 0) 40%, 
      rgba(255, 255, 255, 0.3) 50%, 
      rgba(255, 255, 255, 0) 60%, 
      rgba(255, 255, 255, 0) 100%
    );
    background-size: 200% 200%;
    background-position: 100% 100%;
    animation: headerSparkle 5s infinite;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
  
  @keyframes headerSparkle {
    0% {
      background-position: 100% 100%;
    }
    50% {
      background-position: 0% 0%;
    }
    100% {
      background-position: 100% 100%;
    }
  }

  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav a {
    color: #e6b93d; /* Gold from cover */
    text-decoration: none;
    font-weight: 600;
    transition: all 0.3s ease;
    padding: 0.5rem 1rem;
    border-radius: 4px;
    position: relative;
    letter-spacing: 0.5px;
  }

  nav a:hover {
    color: #ffffff;
    background-color: rgba(140, 165, 217, 0.15); /* Light blue with transparency */
  }

  .active a {
    color: #ffffff;
    position: relative;
  }
  
  .active a::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 100%;
    height: 2px;
    background: linear-gradient(90deg, #8ca5d9, #e6b93d); /* Light blue to gold */
    border-radius: 2px;
  }

  @media (max-width: 768px) {
    header {
      flex-direction: column;
      padding: 1rem;
    }

    nav ul {
      margin-top: 1rem;
      flex-wrap: wrap;
      justify-content: center;
      gap: 1rem;
    }
  }
</style>
