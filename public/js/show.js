console.log('show: coming online');

$(function(){

  console.log('show DOM: loaded');

  // Ajax Share List
  // Catch the default submit event for the share list form and then
  // make an ajax call to the share list route and update the DOM
  // to reflect the change
  $('form.fmShareList').on('submit', function(e) {
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
      if (!data.errors) {
        console.log('Save complete', data);
        if(method==='POST') {
          $('#fmShareList').hide();
          $('#ShareDesc').hide();
          $('#fmUnShareList').show();
          $('#unShareDesc').show();

        } else {
          $('#fmShareList').show();
          $('#ShareDesc').show();
          $('#fmUnShareList').hide();
          $('#unShareDesc').hide();
        }
        // Switch which button is visible
        // addBtn.hide();
        // delBtn.show();
      } else {
        alert(data.message);
        // editor.edit();
        // editor.focus();
      }
    })
  })

})
