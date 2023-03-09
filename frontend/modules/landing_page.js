// import { response } from "express";
import config from "../conf/index.js";
// console.log( config );

async function init() {
  // console.log("From init()");
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  // console.log( "cities: ", cities );

  // Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  const url = config.backendEndpoint + "/cities";
  try {
    const cityData = await fetch( url );
    return await cityData.json();
  }
  catch(err) {
    console.error('There has been a problem with your fetch operation:', err);
  }

  return null;
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // console.log( id, city, description, image );
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  const dataEl = document.getElementById("data");
  const divEl = document.createElement("div");
  divEl.className = "col-sm-6 col-lg-3 mb-4"
  divEl.innerHTML = 
  `
  <a href="pages/adventures/?city=${id}" id=${id}>
    <div class="tile">
      <img src=${image} />
      <div class="tile-text text-center">
        <h5>${city}</h5>
        <p>${description}</p>
      </div>
    </div>
  </a>
  `
7
  dataEl.appendChild( divEl );
  return;
}

export { init, fetchCities, addCityToDOM };
