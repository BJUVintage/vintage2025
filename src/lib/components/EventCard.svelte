<script>
  export let title;
  export let slug;
  export let imagePath;
  export let excerpt;
  export let category = null;
</script>

<a href={category === 'Society' ? `/societies/${slug}` : `/events/${slug}`} class="event-card">
  <div class="card-image">
    <img src={imagePath} alt={title} />
  </div>
  <div class="card-content">
    <h3>{title}</h3>
    <p>{excerpt}</p>
  </div>
</a>

<style>
  .event-card {
    display: block;
    border-radius: 8px;
    overflow: hidden;
    background: linear-gradient(to bottom, #ffffff, #f8f8f8);
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: inherit;
    border: 1px solid rgba(255, 255, 255, 0.3);
    position: relative;
    z-index: 2;
  }

  .event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 12px 20px rgba(0, 0, 0, 0.3);
    border-top: 2px solid #e6b93d; /* Gold from cover */
  }

  .card-image img {
    width: 100%;
    height: 200px;
    object-fit: cover;
  }

  .card-content {
    padding: 1.5rem;
  }

  .card-content h3 {
    margin-top: 0;
    color: #8ca5d9; /* Light blue from cover */
    font-size: 1.5rem;
  }

  .card-content p {
    margin-bottom: 0;
    color: #333;
  }
</style>
