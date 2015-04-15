console.log('listeditor.ejs: coming online');

$(function(){

  console.log('listeditor DOM: loaded');

  var table = $('#listgrideditor').DataTable({
    "scrollY": 650,
    "scrollX": "100%"
  });

  // new $.fn.dataTable.FixedHeader( table, {
  //   left: true,
  //   top: true
  // });

  new $.fn.dataTable.FixedColumns( table );

  // var colvis = new $.fn.dataTable.ColVis( table );

  // $( colvis.button() ).insertAfter('div.info');
  // new $.fn.dataTable.ColReorder( table );

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
