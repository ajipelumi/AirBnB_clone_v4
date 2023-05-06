$(document).ready(() => {
  const amenityIds = {};

  $('input').change( function() {
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
});
