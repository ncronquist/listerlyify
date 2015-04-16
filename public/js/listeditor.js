console.log('listeditor.ejs: coming online');

$(function(){

  console.log('listeditor DOM: loaded');

  // Add the active class to the Edit Lists button in the navbar
  $('#listeditor').addClass('active');

  // Initialize the data table
  var table = $('#listgrideditor').DataTable({
    "scrollY": 590,
    "scrollX": "100%"
  });

    // Add the FixedColumns extension for the data table
    // This extension will fix the left most column (friends)
    // in place so that if a user has many lists, they can scroll
    // right through their lists without losing the user column
    new $.fn.dataTable.FixedColumns( table );

  // Ajax Form Submit Event
  // Catch the default submit for when a user clicks a checkmark to
  // add or remove a member from a list. Then make an ajax call to the
  // correct route to perform the action and update the DOM to reflect
  // the change.
  $('#listgrideditor tbody').on('submit', 'form', function (e) {
    e.preventDefault();
    var form = $(this);
    var method = form.attr('method');
    var url = form.attr('action');
    var data = form.serialize();
    console.log('Method:', method);
    console.log('Action:', url);
    console.log('Form Data:', data);

    $.ajax({
      method: method,
      url: url,
      data: data
    }).done(function(data) {
      console.log(data);
      if(url==='/list/member/add') {
        form.find('.glyphicon').addClass('green');
        form.attr('action', '/list/member/remove');
      } else {
        form.find('.glyphicon').removeClass('green');
        form.attr('action', '/list/member/add');
      }
    })
  });

});
