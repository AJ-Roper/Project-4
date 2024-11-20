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
      loader.style.display = "none";
    })

    const pageLoad = new Promise(resolve => {
      window.addEventListener('load', resolve);
    }) 

    const delayTimeout = new Promise(resolve => {
      setTimeout(resolve, 2000);
    })

    Promise.all([pageLoad, delayTimeout]).then(() => {
      vanish();
    })

    // event listener to detect changes in value

    //rangeElement.addEventListener(range. function(){
    //}) {

    //};

    //calc for how many images to display



    //DOM manipulation for show/hide elements

    // Initial load
    displayDog();
  }
  // Run the main function
  main();