
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let params = new URLSearchParams( search );
  const city = params.get("city");
  return city;
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  const url = config.backendEndpoint + "/adventures?city=" + city;
  try {
    const adevturesData = await fetch( url );
    return await adevturesData.json();
  }
  catch(err) {
    console.error('There has been a problem with your fetch operation:', err);
  }

  return null;
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  const dataEl = document.getElementById("data");

  adventures.forEach((key) => {
    const divEl = document.createElement("div");
    divEl.className = "col-6 col-lg-3 mb-4"
    divEl.innerHTML = 
    `
    <a href="./detail/?adventure=${key.id}" id=${key.id}>
      <div class="activity-card">
        <div class="category-banner" style="right: -5%; min-width: 0; font-size: smaller" >
        ${key.category}
        </div>
        <img src=${key.image}>
        <div class="w-100 p-2 pb-0 d-flex justify-content-between">
          <h5 class="text-centre" style="font-size: min(3.5vw, 18px);">${key.name}</h5>
          <h6 style="font-size: min(3vw, 16px);">₹${key.costPerHead}</h6>
        </div>
        <div class="w-100 p-2 pt-0 pb-0 d-flex justify-content-between">
          <h5 class="text-centre" style="font-size: min(3.5vw, 18px);">Duration</h5>
          <h6 style="font-size: min(3vw, 16px);">${key.duration}</h6>
        </div>
      </div>
    </a>
    `
    dataEl.appendChild( divEl );
  });
}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  let filteredList = [];
  list.forEach( el => {
    if( low <= el.duration && el.duration <= high ) filteredList.push( el );
  });

  return filteredList;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  let filteredList = [];
  list.forEach( el => {
    if( categoryList.includes( el.category ) ) filteredList.push( el );
  });

  return filteredList;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  if( filters.category.length ) list = filterByCategory( list, filters.category );
  if( filters.duration ) {
    let duration = filters.duration.split("-");
    list = filterByDuration( list, duration[0], duration[1] );
  }

  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage'
  localStorage.setItem("filters", JSON.stringify(filters) );
  console.log( "saveFiltersToLocal: ", JSON.stringify(filters));

  // let selectedIndex = document.getElementById("duration-select").selectedIndex;
  // localStorage.setItem( "durationSelectedIndex", selectedIndex );

  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  let fetchedFilters = localStorage.getItem("filters"); 
  let filtersObj = JSON.parse(fetchedFilters);

  // Place holder for functionality to work in the Stubs
  return filtersObj;
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  // For duration - if duration is null retrieve selectedIndex from local storage 
  // otherwise update the new selectedIndex to local storage
  let currentSelectedIndex = document.getElementById("duration-select").selectedIndex;
  let fetchedIndex = localStorage.getItem( "storeSelectedIndex" );
  if( currentSelectedIndex ){
    localStorage.setItem( "storeSelectedIndex", currentSelectedIndex );
  }
  else if( fetchedIndex ) {
    document.getElementById("duration-select").selectedIndex = fetchedIndex;
  }

  let categoryListEl = document.getElementById( "category-list" );
  categoryListEl.textContent = "";
  filters.category.forEach( el => {
    let categoryEl = document.createElement( "div" );
    categoryEl.className = "category-filter";
    categoryEl.innerHTML = `${el}`;
    categoryListEl.appendChild( categoryEl );
  });

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
