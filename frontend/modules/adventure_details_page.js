import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  let params = new URLSearchParams( search );
  const adventureId = params.get("adventure");
  return adventureId;

  // Place holder for functionality to work in the Stubs
  return null;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  const url = config.backendEndpoint + "/adventures/detail/?adventure=" + adventureId;
  try {
    const adevturesData = await fetch( url );
    return await adevturesData.json();
  }
  catch(err) {
    console.error('There has been a problem with your fetch operation:', err);
  }

  // Place holder for functionality to work in the Stubs
  return null;
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  let adventureNameEl = document.getElementById( "adventure-name" );
  adventureNameEl.textContent = adventure.name;

  let adventureSubtitleEl = document.getElementById( "adventure-subtitle" );
  adventureSubtitleEl.textContent = adventure.subtitle;

  let photoGalleryEl = document.getElementById( "photo-gallery" );
  adventure.images.forEach( el => {
    let adventureCardImageEl = document.createElement( "img" );
    adventureCardImageEl.className = "activity-card-image";
    adventureCardImageEl.src = el;
    photoGalleryEl.appendChild( adventureCardImageEl );
  });

  let adventureContentEl = document.getElementById( "adventure-content" );
  adventureContentEl.textContent = adventure.content;

}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let photoGalleryEl = document.getElementById( "photo-gallery" );
  photoGalleryEl.innerHTML = "";

  let photoGalleryContainerEl = document.createElement( "div" );
  photoGalleryContainerEl.classList = "carousel slide";
  photoGalleryContainerEl.id = "carouselExampleIndicators"
  photoGalleryContainerEl.setAttribute( "data-bs-ride", "carousel" );
  photoGalleryContainerEl.innerHTML = 
  `
    <div class="carousel-indicators">
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="0" class="active" aria-current="true" aria-label="Slide 1"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
      <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button>
    </div>
  `;

  let carouselInnerEl = document.createElement( "div");
  carouselInnerEl.className = "carousel-inner";
  let cnt = 1;
  images.forEach( el => {
    let adventureCardImageEl = document.createElement( "div" );
    if( cnt == 1 ) adventureCardImageEl.classList = "activity-card-image carousel-item active";
    else adventureCardImageEl.classList = "activity-card-image carousel-item";
    adventureCardImageEl.innerHTML = `<img src=${el} class="d-block w-100" alt="...">`;
    carouselInnerEl.appendChild( adventureCardImageEl );
    cnt++;
  });
  photoGalleryContainerEl.appendChild( carouselInnerEl );

  photoGalleryContainerEl.innerHTML += 
  `
    <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
      <span class="carousel-control-prev-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Previous</span>
    </button>
    <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
      <span class="carousel-control-next-icon" aria-hidden="true"></span>
      <span class="visually-hidden">Next</span>
    </button>
  `;

  photoGalleryEl.appendChild( photoGalleryContainerEl );

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  if( adventure.available ) {
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-person-cost").innerHTML = adventure.costPerHead;
  }
  else {
    document.getElementById("reservation-panel-available").style.display = "none";
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }
}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById( "reservation-cost" ).innerHTML = adventure.costPerHead * persons ;
}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  const form = document.getElementById( "myForm" );
  if(form.addEventListener){
    form.addEventListener("submit", submitEvent, false);  //Modern browsers
  }else if(ele.attachEvent){
    form.attachEvent('onsubmit', submitEvent);            //Old IE
  }

  async function submitEvent(event) {
    const url = config.backendEndpoint + "/reservations/new"; //console.log( JSON.stringify(update) );
    const fetchPostResponse = fetch( url, {
      method: "POST",
      body: JSON.stringify({
        name: form.elements['name'].value,
        date: form.elements['date'].value,
        person: form.elements['person'].value,
        adventure: adventure.id,
      }),
      headers: {
        "Content-type": "application/json"
      }
    })
    .then(response => response.json())
    .then( json => console.log(json) );

    alert( JSON.stringify( "Reservation successful" ) );
    event.preventDefault();
    window.location.reload();
  }
}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if( adventure.reserved ) {
    document.getElementById("reserved-banner").style.display = "block";
  }
  else {
    document.getElementById("reserved-banner").style.display = "none";
  }
}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
