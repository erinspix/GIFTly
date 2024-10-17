// List of themes with corresponding background images and CSS files
const themes = [
    {
      image: 'url("images/Gold-Snow.png")', // Path to background image
      cssFile: 'css/goldSnowTheme.css' // Path to CSS file for this theme
    },
    {
      image: 'url("images/Gold-Snow-Present.png")',
      cssFile: 'theme-gold-present.css'
    },
    {
      image: 'url("images/Large-Flake.png")',
      cssFile: 'theme-snowflake.css'
    },
    {
      image: 'url("images/Snowy-Tree.png")',
      cssFile: 'theme-tree-branch.css'
    },
    {
      image: 'url("images/Snowmens.png")',
      cssFile: 'theme-snowmen.css'
    }
  ];
  
// Function to dynamically load CSS file
function loadCSS(cssFile) {
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    console.log('Loading CSS:', cssFile);
    link.href = cssFile; // Set the href to the CSS file path
    document.head.appendChild(link);
  }
  // Function to set a random theme
  function setRandomTheme() {
    const randomIndex = Math.floor(Math.random() * themes.length);
    const selectedTheme = themes[randomIndex];
  
    // Apply the background image to the body
    document.body.style.backgroundImage = selectedTheme.image;
  
    // Load the CSS file for the selected theme
    loadCSS(selectedTheme.cssFile);
  }
  
  // Execute when the page loads
  window.onload = setRandomTheme;
  