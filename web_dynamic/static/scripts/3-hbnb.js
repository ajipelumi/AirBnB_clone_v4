$(document).ready(() => {
  const amenityIds = {};

  $('input').change(function () {
    const id = $(this).data('id');
    const name = $(this).data('name');

    if ($(this).is(':checked')) {
      amenityIds[id] = name;
    } else {
      delete amenityIds[id];
    }

    const amenitiesList = Object.values(amenityIds);
    $('.amenities h4').text(amenitiesList.join(', '));
  });

  $.ajax({
    type: 'GET',
    url: 'http://127.0.0.1:5001/api/v1/status/',
    success: (response) => {
      $('div#api_status').addClass('available');
    }
  });

  $.ajax({
    type: 'POST',
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    contentType: 'application/json',
    data: JSON.stringify({}),
    success: (response) => {
      updatePlaces(response);
    }
  });

  function updatePlaces (places) {
    const placeSection = $('section.places');
  
    for (const place of places) {
      const newPlace = $('<article></article>');
      const titleBox = $('<div class="title_box"></div>');
      const title = $('<h2></h2>').text(place.name);
      const price = $('<div class="price_by_night"></div>').text(`$${place.price_by_night}`);
      titleBox.append(title, price);
  
      const information = $('<div class="information"></div>');
      const maxGuest = $('<div class="max_guest"></div>').text(`${place.max_guest} Guest(s)`);
      const numRooms = $('<div class="number_rooms"></div>').text(`${place.number_rooms} Bedroom(s)`);
      const numBathrooms = $('<div class="number_bathrooms"></div>').text(`${place.number_bathrooms} Bathroom(s)`);
      information.append(maxGuest, numRooms, numBathrooms);
  
      const description = $('<div class="description"></div>').html(place.description);
  
      newPlace.append(titleBox, information, description);
      placeSection.append(newPlace);
    }
  }  
});
