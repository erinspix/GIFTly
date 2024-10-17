<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link href="https://fonts.googleapis.com/css2?family=Pacifico&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="./css/home.css"> <!-- Your home.css file (general styles) -->
  <title>Giftly - Winter Wonderland</title>
  <link rel="manifest" href="./manifest.json">
  <link rel="icon" href="./favicon.ico" type="image/x-icon">
</head>
<body>
  <!-- Main Title -->
  <header class="main-header">
    <h1 class="main-title">Giftly - Winter Wonderland</h1>
  </header>

  <!-- Fixed Background Image -->
  <div class="fixed-bg"></div>
  <div class="gradient-transition"></div>

  <!-- Search Section Positioned Above the Shopping Box -->
  <div class="search-section">
    <input type="text" class="search-bar" placeholder="Search for gifts...">
  </div>

  <!-- Main Shopping Box with Grid -->
  <div class="shopping-box">
    <section class="shopping-grid">
      <div class="item-card">
        <img src="https://via.placeholder.com/150" alt="Gift Item 1" class="item-image">
        <h3 class="item-title">Cozy Sweater</h3>
        <p class="item-price">$49.99</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
      <div class="item-card">
        <img src="https://via.placeholder.com/150" alt="Gift Item 2" class="item-image">
        <h3 class="item-title">Winter Mug</h3>
        <p class="item-price">$19.99</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
      <div class="item-card">
        <img src="https://via.placeholder.com/150" alt="Gift Item 3" class="item-image">
        <h3 class="item-title">Snow Boots</h3>
        <p class="item-price">$59.99</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
      <div class="item-card">
        <img src="https://via.placeholder.com/150" alt="Gift Item 4" class="item-image">
        <h3 class="item-title">Winter Hat</h3>
        <p class="item-price">$24.99</p>
        <button class="add-to-cart-btn">Add to Cart</button>
      </div>
    </section>
  </div>

  <!-- Placeholder Button -->
  <div class="placeholder-btn-container">
    <button class="placeholder-btn">See More Gifts</button>
  </div>

  <!-- Footer -->
  <footer class="footer">
    <p>© 2024 Giftly. All rights reserved.</p>
  </footer>

  <!-- JavaScript to Randomly Select Theme -->
  <script>
    const themes = [
      { name: "goldSnowTheme", cssFile: 'css/goldSnowTheme.css' },
      { name: "presentTheme", cssFile: 'css/goldSnowPresent.css' },
      { name: "snowflakeTheme", cssFile: 'css/largeFlakeTheme.css' },
      { name: "treeBranchTheme", cssFile: 'css/snowyTreeTheme.css' },
      { name: "snowmenTheme", cssFile: 'css/snowmenTheme.css' }
    ];

    function applyRandomTheme() {
      const randomTheme = themes[Math.floor(Math.random() * themes.length)];
      const linkElement = document.createElement('link');
      linkElement.rel = 'stylesheet';
      linkElement.href = randomTheme.cssFile;
      document.head.appendChild(linkElement);

      console.log(`Applied theme: ${randomTheme.name}`);
    }

    window.onload = applyRandomTheme;
  </script>
</body>
</html>
