var css = '<link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/jquery-te/1.4.0/jquery-te.min.css" />';

document.head.innerHTML = document.head.innerHTML += css;

$.getScript('https://cdnjs.cloudflare.com/ajax/libs/jquery-te/1.4.0/jquery-te.min.js', function(){
  $('#event-desc').find('.hover-to-edit-change').click();
  $('.redactor_toolbar').hide();
  $('.redactor_editor').hide();
  $('#short_desc').jqte();
});
