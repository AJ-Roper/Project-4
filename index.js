//https://dog.ceo/api/breeds/image/random

async function main() {
  const searchBar = document.querySelector(".search__bar");
  const slider = document.getElementById("range__element");
  const rangeValueDisplay = document.querySelector(".results__h5");
  const imageContainer = document.getElementById("dogs");

  // Single fetch attempt with retry logic
  async function fetchRandomDog(retryCount = 3) {
    for (let i = 0; i < retryCount; i++) {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        if (!response.ok) throw new Error("Network response was not ok");
        const dogData = await response.json();
        return dogData.message;
      } catch (error) {
        console.error(`Attempt ${i + 1} failed:`, error);
        if (i === retryCount - 1) throw error; // Throw on final retry
        await new Promise((resolve) => setTimeout(resolve, 500)); // Wait before retry
      }
    }
  }

  async function updateImages() {
    const numImages = parseInt(slider.value);

    // Update the display
    rangeValueDisplay.textContent = `number of images: ${numImages}`;

    // Show the loading state
    imageContainer.innerHTML = "<p>Loading...</p>";

    try {
      const successfulImages = [];

      // Keep trying until we get just the exact number of images we need
      while (successfulImages.length < numImages) {
        try {
          const url = await fetchRandomDog();
          if (url) {
            successfulImages.push(url);
          }
        } catch (error) {
          console.error("Failed to fetch an image, retrying...");
          // Continue trying even if one fails
          continue;
        }
      }

      // Clear container and add all successful images
      imageContainer.innerHTML = "";

      successfulImages.forEach((url, index) => {
        const imgWrapper = document.createElement("div");
        imgWrapper.className = "dog-wrapper";

        const img = document.createElement("img");
        img.src = url;
        img.alt = `Dog image ${index + 1}`;
        img.className = "classname-for-your-dog-imgs";

        // Add loading indicator
        img.addEventListener("load", () => {
          img.style.opacity = "1";
        });

        imgWrapper.appendChild(img);
        imageContainer.appendChild(imgWrapper);
      });
    } catch (error) {
      console.error("Error updating images:", error);
      imageContainer.innerHTML =
        '<p class="error">Failed to load images. Please try again!</p>';
    }
  }

  // Debounce function
  function debounce(func, wait) {
    let timeoutId = null;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func.apply(null, args), wait);
    };
  }

  const debouncedUpdateImages = debounce(updateImages, 500);

  // Event listeners
  slider.addEventListener("input", debouncedUpdateImages);

  searchBar.addEventListener("input", (e) => {
    const query = e.target.value.trim().toLowerCase();
    if (query) {
      debouncedUpdateImages();
    }
  });

  // Loading screen
  const loader = document.getElementById("loading__screen");
  const pageLoad = new Promise((resolve) =>
    window.addEventListener("load", resolve)
  );
  const delayTimeout = new Promise((resolve) => setTimeout(resolve, 1000));

  Promise.all([pageLoad, delayTimeout]).then(() => {
    loader.style.display = "none";
  });

  // Initial load
  updateImages();
}

// Run the main function
main();
