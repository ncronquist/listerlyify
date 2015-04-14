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

  new $.fn.dataTable.ColReorder( table );

});
