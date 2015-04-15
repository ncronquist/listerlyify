console.log('listeditor.ejs: coming online');

$(function(){

  console.log('listeditor DOM: loaded');

  var table = $('#listgrideditor').DataTable({
    dom: 'C<"clear">lfrtip',
    colVis: {
            exclude: [ 0 ],
            activate: "mouseover",
            showAll: "Show all",
            showNone: "Show none"
          }
  });

  new $.fn.dataTable.FixedHeader( table, {
    left: true,
    top: true
  });

  // new $.fn.dataTable.ColReorder( table );

  // // Click function for each square in my table
  // $('#listgrideditor').on('click', function(e) {
  //   console.log(e.target)
  // })

  // Click function for each square in my table
  $('.member').on('submit', function(e) {
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
      if(method==='POST') {
        form.find('.glyphicon').addClass('green');
        form.attr('method') = 'DELETE';
      } else {
        form.find('.glyphicon').removeClass('green');
        form.attr('method') = 'POST';
      }
    })
  })

});
