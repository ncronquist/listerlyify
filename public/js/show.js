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
          $('#commentscol').show();
        } else {
          $('#fmShareList').show();
          $('#ShareDesc').show();
          $('#fmUnShareList').hide();
          $('#unShareDesc').hide();
          $('#commentscol').fadeOut('slow', function() {});
          $('.comment.well').fadeOut('slow', function() {
            $(this).remove();
          });
        }
      } else {
        alert(data.message);
        // editor.edit();
        // editor.focus();
      }
    })
  })

  // Load EpicEditor
  var opts = {
    container: 'epiceditor',
    textarea: comment,
    basePath: '../../',
    clientSideStorage: false,
    localStorageName: 'epiceditor',
    useNativeFullscreen: true,
    parser: marked,
    file: {
      name: 'epiceditor',
      defaultContent: '',
      autoSave: 100
    },
    theme: {
      base: '/themes/base/epiceditor.css',
      preview: '/themes/preview/github.css',
      editor: '/themes/editor/epic-light.css'
    },
    button: {
      preview: true,
      fullscreen: false,
      bar: true
    },
    focusOnLoad: true,
    shortcut: {
      modifier: 18,
      fullscreen: 70,
      preview: 80
    },
    string: {
      togglePreview: 'Toggle Preview Mode',
      toggleEdit: 'Toggle Edit Mode',
      toggleFullscreen: 'Enter Fullscreen'
    },
    autogrow: {
      minHeight: 150,
      maxHeight: 400,
      scroll: false
    }
  }

  var editor = new EpicEditor(opts).load();

  // AJAX Add Comments
  $('form.add-comment').on('submit', function(e) {
    e.preventDefault();

    var postUrl = $(this).attr('action');
    var twitter_list_id = $('form.add-comment #twitter_list_id').val();
    // If you don't preview the editor, sometimes the innerHTML doesn't get
    // updated
    editor.preview();
    var comment = editor.getElement('previewer').body.innerHTML
    var postData = {
                      twitter_list_id: twitter_list_id,
                      comment: comment
                    }

    $.ajax({
      method: 'POST',
      url: postUrl,
      data: postData
    }).done(function(data) {

      if (!data.errors) {
        console.log('Comment saved', data);

        // Create new div and append it here
        var newDiv = $('<div class="comment well" style="display:none;">' +
                      '<span id="screen_name" class="comment-info">You</span>' +
                      '<span id="created_at" class="comment-info">Just Now</span>' +
                      '<hr>' + comment + '</div>');
        newDiv.prependTo('div.comments');
        newDiv.show('slow', function() {
          editor.edit();
          editor.getElement('editor').body.innerHTML = '';
        });
      } else {
        alert(data.message);
        editor.edit();
        editor.focus();
      }
    })
  })


})
