<footer>
  <div class="footer-content">
    <div class="footer-logo">
      <span class="vintage-text">Vintage</span>
    </div>
    <div class="footer-info">
      <p>Built by</p>
      <p>The Vintage Staff</p>
      <p>© Copyright 2025 Bob Jones University</p>
    </div>
  </div>
</footer>

<style>
  footer {
    background: #001142; /* Navy blue from cover */
    color: #fff;
    padding: 2rem;
    margin-top: 2rem;
    box-shadow: 0 -4px 16px rgba(0, 0, 0, 0.5);
    position: relative;
    z-index: 10;
  }

  .footer-content {
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
  }

  .footer-logo {
    margin-bottom: 1rem;
    display: inline-flex;
    justify-content: center;
    align-items: center;
  }
  
  .vintage-text {
    color: #8ca5d9; /* Light blue from cover */
    font-size: 1.3rem;
    font-weight: bold;
    letter-spacing: 1px;
    text-shadow: 0 1px 2px rgba(0, 0, 0, 0.3);
    position: relative;
    display: inline-block;
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
    animation: footerSparkle 5s infinite;
    top: 0;
    left: 0;
    mix-blend-mode: overlay;
    pointer-events: none;
  }
  
  @keyframes footerSparkle {
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

  .footer-info p {
    margin: 0.25rem 0;
    color: #e6b93d; /* Gold from cover */
  }
  
  .footer-info p:first-child {
    margin-bottom: 0.1rem;
  }
  
  .footer-info p:nth-child(2) {
    font-weight: bold;
    font-size: 1.1rem;
    margin-bottom: 0.5rem;
  }
</style>
