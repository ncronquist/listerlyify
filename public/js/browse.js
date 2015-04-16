console.log('browse: coming online');

$(function(){

  console.log('browse DOM: loaded');

  // Add the active class to the My Lists button in the navbar
  $('#browse').addClass('active');

  // Initialize the data table
  var table = $('#browseliststable').DataTable({})

})
