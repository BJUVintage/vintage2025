<script>
  // Component for the wavy design elements from the cover
  export let position = "top-right"; // Options: top-right, bottom-left, etc.
  export let color = "#7ab7ff"; // Default light blue color
  export let opacity = 0.7; // Default opacity
</script>

<div class="wave-design {position}" style="opacity: {opacity};">
  <svg viewBox="0 0 500 250" xmlns="http://www.w3.org/2000/svg">
    <path d="M0,50 C50,30 100,80 150,60 C200,40 250,90 300,70 C350,50 400,100 450,80 C500,60 550,110 600,90" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,70 C50,50 100,100 150,80 C200,60 250,110 300,90 C350,70 400,120 450,100 C500,80 550,130 600,110" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,90 C50,70 100,120 150,100 C200,80 250,130 300,110 C350,90 400,140 450,120 C500,100 550,150 600,130" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,110 C50,90 100,140 150,120 C200,100 250,150 300,130 C350,110 400,160 450,140 C500,120 550,170 600,150" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,130 C50,110 100,160 150,140 C200,120 250,170 300,150 C350,130 400,180 450,160 C500,140 550,190 600,170" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,150 C50,130 100,180 150,160 C200,140 250,190 300,170 C350,150 400,200 450,180 C500,160 550,210 600,190" 
          stroke={color} fill="none" stroke-width="3" />
    <path d="M0,170 C50,150 100,200 150,180 C200,160 250,210 300,190 C350,170 400,220 450,200 C500,180 550,230 600,210" 
          stroke={color} fill="none" stroke-width="3" />
  </svg>
</div>

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