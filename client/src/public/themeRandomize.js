const themes = [
    { name: "goldSnowTheme", cssFile: './css/goldSnowTheme.css' },
    { name: "presentTheme", cssFile: './css/goldSnowPresent.css' },
    { name: "snowflakeTheme", cssFile: './css/largeFlakeTheme.css' },
    { name: "treeBranchTheme", cssFile: './css/snowyTreeTheme.css' },
    { name: "snowmenTheme", cssFile: 'css/snowmenTheme.css' }
];

// Function to randomly select and apply a theme
function applyRandomTheme() {
    const randomTheme = themes[Math.floor(Math.random() * themes.length)];
    const linkElement = document.createElement('link');
    linkElement.rel = 'stylesheet';
    linkElement.href = randomTheme.cssFile;
    linkElement.type = 'text/css';
    
    // Append the <link> element to the <head> section
    document.head.appendChild(linkElement);

    // Log to make sure the theme is applied correctly
    console.log(`Applied theme: ${randomTheme.name}`);
}

// Call the function to apply the theme on page load
window.onload = applyRandomTheme;
