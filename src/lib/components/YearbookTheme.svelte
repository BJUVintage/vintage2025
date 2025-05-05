<script>
  // Component for the wavy design elements from the cover
  export let position = "top-right"; // Options: top-right, bottom-left, etc.
  export let color = "#e6b93d"; // Default gold color from yearbook cover
  export let opacity = 0.9; // Default opacity
  export let style = "wave"; // "wave" or "contour"
</script>

{#if style === "wave"}
  <div class="wave-design {position}" style="opacity: {opacity};">
    <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,50 C150,100 300,30 450,80 C550,110 650,60 750,110" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,80 C150,130 300,60 450,110 C550,140 650,90 750,140" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,110 C150,160 300,90 450,140 C550,170 650,120 750,170" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,140 C150,190 300,120 450,170 C550,200 650,150 750,200" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,170 C150,220 300,150 450,200 C550,230 650,180 750,230" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,200 C150,250 300,180 450,230 C550,260 650,210 750,260" 
            stroke={color} fill="none" stroke-width="2" />
    </svg>
  </div>
{:else if style === "contour"}
  <div class="wave-design {position}" style="opacity: {opacity};">
    <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
      <path d="M0,30 C50,60 150,20 250,50 C350,80 450,40 550,70" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,60 C50,90 150,50 250,80 C350,110 450,70 550,100" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,90 C50,120 150,80 250,110 C350,140 450,100 550,130" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,120 C50,150 150,110 250,140 C350,170 450,130 550,160" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,150 C50,180 150,140 250,170 C350,200 450,160 550,190" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,180 C50,210 150,170 250,200 C350,230 450,190 550,220" 
            stroke={color} fill="none" stroke-width="2" />
      <path d="M0,210 C50,240 150,200 250,230 C350,260 450,220 550,250" 
            stroke={color} fill="none" stroke-width="2" />
    </svg>
  </div>
{/if}

<style>
  .wave-design {
    position: absolute;
    z-index: 0;
    pointer-events: none;
  }

  .wave-design.top-right {
    top: -50px;
    right: -100px;
    width: 600px;
    height: 300px;
  }

  .wave-design.bottom-left {
    bottom: -50px;
    left: -100px;
    width: 600px;
    height: 300px;
    transform: rotate(180deg);
  }

  .wave-design.top-left {
    top: -50px;
    left: -100px;
    width: 600px;
    height: 300px;
    transform: scaleX(-1);
  }

  .wave-design.bottom-right {
    bottom: -50px;
    right: -100px;
    width: 600px;
    height: 300px;
    transform: rotate(180deg) scaleX(-1);
  }

  /* Full width wave for page backgrounds */
  .wave-design.top-full {
    top: 0;
    left: 0;
    width: 100%;
    height: 300px;
  }

  .wave-design.bottom-full {
    bottom: 0;
    left: 0;
    width: 100%;
    height: 300px;
    transform: rotate(180deg);
  }
</style>