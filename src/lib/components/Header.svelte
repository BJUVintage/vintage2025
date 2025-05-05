<script>
  import { page } from '$app/stores';
  
  // Navigation links
  const navLinks = [
    { href: '/', label: 'Home' },
    { href: '/events', label: 'Events' },
    { href: '/groups', label: 'Campus Groups' },
    { href: '/dedications', label: 'Dedications' },
    { href: '/about', label: 'About' }
  ];
</script>

<header>
  <div class="logo-container">
    <a href="/">
      <img src="/images/cover/logo.png" alt="BJU Vintage 2025 Logo" />
    </a>
  </div>
  <nav>
    <ul>
      {#each navLinks as link}
        <li class={$page.url.pathname === link.href ? 'active' : ''}>
          <a href={link.href}>{link.label}</a>
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
    background-color: #0a1155; /* Dark blue from yearbook cover */
    color: #fff;
  }

  .logo-container img {
    height: 60px;
  }

  nav ul {
    display: flex;
    gap: 2rem;
    list-style: none;
    margin: 0;
    padding: 0;
  }

  nav a {
    color: #ffcc00; /* Gold from yearbook cover */
    text-decoration: none;
    font-weight: 500;
    transition: color 0.3s ease;
  }

  nav a:hover {
    color: #7ab7ff; /* Light blue from yearbook cover */
  }

  .active a {
    color: #7ab7ff;
    border-bottom: 2px solid #7ab7ff;
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
