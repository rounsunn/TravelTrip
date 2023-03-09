import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking tde REST API and return tdem
  const url = config.backendEndpoint + "/reservations";
  try {
    const reservationsData = await fetch( url );
    return await reservationsData.json();
  }
  catch(err) {
    console.error('there has been a problem with your fetch operation:', err);
  }

  // Place holder for functionality to work in tde Stubs
  return null;
}

//Function to add reservations to tde table. Also; in case of no reservations, display tde no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add tde Reservations to the HTML DOM so that they show up in the table

  //Conditionally render tde no-reservation-banner and reservation-table-parent
  const noReservationBannerEl = document.getElementById( "no-reservation-banner" );
  const reservationTableParentEl = document.getElementById( "reservation-table-parent" );
  const reservationTabletEl = document.getElementById( "reservation-table" );
  if( reservations.length ) {
    noReservationBannerEl.style.display = "none";
    reservationTableParentEl.style.display = "block";
    reservations.forEach( el => {
      // console.log( el ); // ${el.adventureName} 
      let date = new Date( el.date );
      date = date.toLocaleDateString('en-IN');

      let time = new Date( el.time );
      const options = { year: 'numeric', month: 'long', day: 'numeric', time: 'long' };
      time = time.toLocaleTimeString('en-IN', options);
      time = time.split( " at" );
      time = time[0] + "," + time[1];
      time = time.split( ",undefined" );
      time = time[0];
      // console.log( time );

      reservationTabletEl.innerHTML +=
      `
      <td scope="col">${el.adventure}</td>
      <td scope="col">${el.name}</td>
      <td scope="col">${el.adventureName}</td>
      <td scope="col">${el.person}</td>
      <td scope="col">${date}</td>
      <td scope="col">${el.price}</td>
      <td scope="col">${time}</td>
      <td scope="col" id=${el.id}>
      <a href="../detail/?adventure=${el.adventure}" class="reservation-visit-button">
      Visit Adventure
      </a>
      </td>
      `
    });
  }
  else {
    noReservationBannerEl.style.display = "block";
    reservationTableParentEl.style.display = "none";
  }

  /*
    Iterating over reservations, adding it to table (into div witd class "reservation-table") and link it correctly to respective adventure
    tde last column of tde table should have a "Visit Adventure" button witd id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. tde date of adventure booking should appear in tde format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4td November, 2020
    2. tde booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
