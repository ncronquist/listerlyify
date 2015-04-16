console.log('mylists: coming online');

$(function(){

  console.log('mylists DOM: loaded');

  // Add the active class to the My Lists button in the navbar
  $('#mylists').addClass('active');

  // Initialize the data table
  var table = $('#myliststable').DataTable({})

})
