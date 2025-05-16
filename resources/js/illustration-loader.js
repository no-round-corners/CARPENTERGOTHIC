function loadGallery() {
  // Total number of images in your folder
  const totalImages = 9; // Change this to match your actual count

  // Get the gallery container
  const gallery = document.getElementById("gallery");

  // Loop through all image numbers
  for (let i = 1; i <= totalImages; i++) {
    // Generate the image URL based on the pattern
    const imgUrl = `../../resources/images/illustrations/${i}.png`; // Using relative path

    // Create image element
    const imgElement = document.createElement("img");
    imgElement.src = imgUrl;
    imgElement.alt = `Artwork ${i}`;
    imgElement.loading = "lazy"; // For better performance

    // Add error handling for each image
    // imgElement.onerror = function () {
    //   console.error(`Failed to load image: ${imgUrl}`);
    //   this.src = "/resources/images/placeholder.jpg"; // Using absolute path
    // };

    gallery.appendChild(imgElement);
  }
}

// Call the function when DOM is ready
document.addEventListener('DOMContentLoaded', loadGallery);