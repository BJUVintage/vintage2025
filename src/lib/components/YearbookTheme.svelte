<script>
  // Component for the wavy design elements from the cover
  export let position = "top-right"; // Options: top-right, bottom-left, etc.
  export let color = "#ffcc00"; // Default gold color
</script>

<div class="wave-design {position}">
  <svg viewBox="0 0 400 200" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,50 C50,30 100,80 150,60 C200,40 250,90 300,70 C350,50 400,100 450,80" 
          stroke={color} fill="none" stroke-width="2" />
    <path d="M0,70 C50,50 100,100 150,80 C200,60 250,110 300,90 C350,70 400,120 450,100" 
          stroke={color} fill="none" stroke-width="2" />
    <path d="M0,90 C50,70 100,120 150,100 C200,80 250,130 300,110 C350,90 400,140 450,120" 
          stroke={color} fill="none" stroke-width="2" />
    <path d="M0,110 C50,90 100,140 150,120 C200,100 250,150 300,130 C350,110 400,160 450,140" 
          stroke={color} fill="none" stroke-width="2" />
    <path d="M0,130 C50,110 100,160 150,140 C200,120 250,170 300,150 C350,130 400,180 450,160" 
          stroke={color} fill="none" stroke-width="2" />
  </svg>
</div>

<style>
  .wave-design {
    position: absolute;
    z-index: -1;
    opacity: 0.5;
    pointer-events: none;
  }

  .wave-design.top-right {
    top: 0;
    right: 0;
    width: 400px;
    height: 200px;
  }

  .wave-design.bottom-left {
    bottom: 0;
    left: 0;
    width: 400px;
    height: 200px;
    transform: rotate(180deg);
  }

  .wave-design.top-left {
    top: 0;
    left: 0;
    width: 400px;
    height: 200px;
    transform: scaleX(-1);
  }

  .wave-design.bottom-right {
    bottom: 0;
    right: 0;
    width: 400px;
    height: 200px;
    transform: rotate(180deg) scaleX(-1);
  }
</style>
