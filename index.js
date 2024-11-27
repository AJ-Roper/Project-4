//https://dog.ceo/api/breeds/image/random

async function main() {
    const searchBar = document.querySelector(".search__bar");
    const resultsSection = document.getElementById("dogs");
    let range = document.getElementsByClassName('slider')
    let button = document.getElementsByTagName('button')
  
    // Fetch a random dog image
    async function fetchRandomDog() {
      try {
        const response = await fetch("https://dog.ceo/api/breeds/image/random");
        const dogData = await response.json();
        return dogData.message; // URL of the random dog image
      } catch (error) {
        console.error("Error fetching dog data:", error);
        return null;
      }
    }

    // Update the UI with the dog image
    async function displayDog() {
      const dogImageUrl = await fetchRandomDog();
      if (dogImageUrl) {
        resultsSection.innerHTML = `
          <div class="dog">
            <img src="${dogImageUrl}" alt="Random Dog" class="dog__image" />
            <p class="dog__info">Random dog fetched successfully!</p>
          </div>
        `;
      } else {
        resultsSection.innerHTML = `
          <p class="error">Failed to load dog. Try again!</p>
        `;
      }
    }
    // Add an event listener for user input (simulating a search)
    searchBar.addEventListener("input", (e) => {
      const query = e.target.value.trim().toLowerCase();
      if (query) {
        // For now, always fetch a random dog
        displayDog();
      }
    });

    // loading screen

    var loader = document.getElementById("loading__screen");

    window.addEventListener ("load", function(){
    })

    const pageLoad = new Promise(resolve => {
      window.addEventListener('load', resolve);
    }) 

    const delayTimeout = new Promise(resolve => {
      setTimeout(resolve, 1000);
    })

    Promise.all([pageLoad, delayTimeout]).then(() => {
      loader.style.display = "none";
    })

    // event listener to detect changes in value
    //calc for how many images to display
    //DOM manipulation for show/hide elements

        const slider = document.getElementById('range');
        const sliderValueDisplay = document.getElementById('range__element');
        const imageContainer = document.getElementById('dogs');

        const imageSrc = '${dogImageUrl}';

        function updateImages() {
          const numImages = parseInt(slider.value, 6);
          rangeValueDisplay.textContent = numImages;
          imageContainer.innerHTML = '';

          for (let i = 0 <numImages; i++) {
            const img = document.createElement('img');
            img.src = imageSrc
            img.alt = 'image ${i + 1}';
            imageContainer.appendChild(img);
          }
        }

        slider.addEventListener('input', updateImages);
        updateImages();

    // Initial load
    displayDog();
  }
  // Run the main function
  main();