document.addEventListener("DOMContentLoaded", function () {
  const tickerGallery = document.getElementById("tickerGallery");

  const imageUrls = [
    "resources/store-photos/chosen.jpg",
    "resources/store-photos/eye.jpg",
    "resources/store-photos/flowers.jpeg",
    "resources/store-photos/glyph.jpeg",
    "resources/store-photos/luigi.jpeg",
    "resources/store-photos/stickers1.JPEG",
  ];

  function createImage(url) {
    const img = document.createElement("img");
    img.src = url;
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
  ).then(() => {
    // Get the width of one complete set of images
    const oneSetWidth = Array.from(tickerGallery.getElementsByTagName("img"))
      .slice(0, imageUrls.length)
      .reduce((width, img) => width + img.offsetWidth + 20, 0);

    const keyframes = `
      @keyframes infiniteScroll {
        0% { transform: translateX(0); }
        100% { transform: translateX(-${oneSetWidth}px); }
      }
    `;

    // Insert the keyframes into the document
    const styleSheet = document.createElement("style");
    styleSheet.textContent = keyframes;
    document.head.appendChild(styleSheet);

    // Calculate duration based on width (adjust the divisor to change speed)
    const duration = oneSetWidth / 50;

    // Apply the animation with proper settings
    tickerGallery.style.animation = `infiniteScroll ${duration}s linear infinite`;

    // Make the ticker visible
    tickerGallery.style.visibility = "visible";
  });
});
