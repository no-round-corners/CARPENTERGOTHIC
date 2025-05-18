document.addEventListener("DOMContentLoaded", function () {
  const tickerGallery = document.getElementById("tickerGallery");

  // Base path adjustment for GitHub Pages
  const basePath =
    window.location.hostname === "carpentergothic.xyz" ? "/" : "/";

  const imageUrls = [
    "resources/images/store-photos/chosen.jpeg",
    "resources/images/store-photos/eye.jpeg",
    "resources/images/store-photos/flowers.jpeg",
    "resources/images/store-photos/glyph.jpeg",
    "resources/images/store-photos/luigi.jpeg",
    "resources/images/store-photos/stickers1.jpeg",
  ];

  function createImage(url) {
    const img = document.createElement("img");
    // Prepend base path for GitHub Pages
    img.src = `${basePath}${url}`;
    img.alt = "Store Photo";
    return img;
  }

  // Create initial set of images
  imageUrls.forEach((url) => tickerGallery.appendChild(createImage(url)));

  // Clone the first set of images and append them
  // This creates a seamless loop
  const firstSetImages = Array.from(tickerGallery.children);
  firstSetImages.forEach((img) => {
    const clone = img.cloneNode(true);
    tickerGallery.appendChild(clone);
  });

  // Wait for all images to load
  Promise.all(
    Array.from(tickerGallery.getElementsByTagName("img")).map((img) => {
      return new Promise((resolve) => {
        if (img.complete) resolve();
        img.onload = resolve;
      });
    })
  )
    .then(() => {
      // Debug info
      console.log("Images loaded, calculating widths...");
      console.log("Current hostname:", window.location.hostname);
      console.log("Base path:", basePath);
      console.log("Gallery element:", tickerGallery);
      console.log("Number of images:", tickerGallery.children.length);

      const oneSetWidth = Array.from(tickerGallery.getElementsByTagName("img"))
        .slice(0, imageUrls.length)
        .reduce((width, img) => {
          console.log(`Image width: ${img.offsetWidth}`);
          return width + img.offsetWidth + 20;
        }, 0);

      console.log("Total width:", oneSetWidth);

      // Ensure animation is applied correctly
      tickerGallery.style.animation = "none"; // Reset animation
      void tickerGallery.offsetWidth; // Trigger reflow
      tickerGallery.style.animation = `infiniteScroll ${
        oneSetWidth / 120
      }s linear infinite`;

      // Make the ticker visible
      tickerGallery.style.visibility = "visible";

      // Log animation application
      console.log("Animation applied:", tickerGallery.style.animation);
    })
    .catch((error) => {
      console.error("Animation setup failed:", error);
    });
});
