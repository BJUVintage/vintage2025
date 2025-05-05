<script>
  export let title;
  export let slug;
  export let imagePath;
  export let excerpt;
</script>

<a href={`/events/${slug}`} class="event-card">
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
    background: white;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    text-decoration: none;
    color: inherit;
  }

  .event-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.15);
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
    color: #0a1155; /* Dark blue from yearbook cover */
    font-size: 1.5rem;
  }

  .card-content p {
    margin-bottom: 0;
    color: #333;
  }
</style>
