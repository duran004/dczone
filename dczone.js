$(document).ready(function() {
    let height=$("#dropzone").data('height');
    $("#dropzone").css('height',height);
});
$(document).on('change', '#dropzone input[type="file"]', function() {
  let files = $(this).prop('files');
  $('#dropzone_files').empty();
  $.each(files, function(i, file) {
    let folder_icon = '<svg stroke="currentColor" fill="currentColor" stroke-width="0" version="1" viewBox="0 0 48 48" enable-background="new 0 0 48 48" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path fill="#FFA000" d="M38,12H22l-4-4H8c-2.2,0-4,1.8-4,4v24c0,2.2,1.8,4,4,4h31c1.7,0,3-1.3,3-3V16C42,13.8,40.2,12,38,12z"></path><path fill="#FFCA28" d="M42.2,18H15.3c-1.9,0-3.6,1.4-3.9,3.3L8,40h31.7c1.9,0,3.6-1.4,3.9-3.3l2.5-14C46.6,20.3,44.7,18,42.2,18z"></path></svg>';
    let close_icon = '<svg stroke="currentColor" fill="#EB352F" stroke-width="0" version="1.2" baseProfile="tiny" viewBox="0 0 24 24" height="1.2em" width="1.2em" xmlns="http://www.w3.org/2000/svg"><path d="M12 4c-4.419 0-8 3.582-8 8s3.581 8 8 8 8-3.582 8-8-3.581-8-8-8zm3.707 10.293c.391.391.391 1.023 0 1.414-.195.195-.451.293-.707.293s-.512-.098-.707-.293l-2.293-2.293-2.293 2.293c-.195.195-.451.293-.707.293s-.512-.098-.707-.293c-.391-.391-.391-1.023 0-1.414l2.293-2.293-2.293-2.293c-.391-.391-.391-1.023 0-1.414s1.023-.391 1.414 0l2.293 2.293 2.293-2.293c.391-.391 1.023-.391 1.414 0s.391 1.023 0 1.414l-2.293 2.293 2.293 2.293z"></path></svg>';
    /*if file is image show base64 */
    if (file.type.match('image.*')) {
        let reader = new FileReader();
        reader.onload = function(e) {
            folder_icon = '<img src="' + e.target.result + '" class="w-14 h-14 object-cover" />';
            $('#dropzone_files').append('<div class="flex w-48 overflow-hidden  flex-col gap-2 items-center justify-center"><span>'+folder_icon+'</span> <span class="flex items-center justify-center gap-3 w-48 "> <span class="clamped-text">' + file.name + '</span>  <span class="remove_file z-10 relative" data-name="' + file.name + '">'+close_icon+'</span></span> </div>');
        }
        reader.readAsDataURL(file);
    }else{
        $('#dropzone_files').append('<div class="flex w-48 overflow-hidden  flex-col gap-2 items-center justify-center"><span>'+folder_icon+'</span> <span class="flex items-center justify-center gap-3 w-48 "> <span class="clamped-text">' + file.name + '</span>  <span class="remove_file z-10 relative" data-name="' + file.name + '">'+close_icon+'</span></span> </div>');
    }
  });
});
$(document).on('click', '.remove_file', function() {
  let name = $(this).data('name');
  let files = $('#dropzone input[type="file"]').prop('files');
  let new_files = [];
  $.each(files, function(i, file) {
    if (file['name'] != name) {
      new_files.push(file);
    }
  });
  const dT = new DataTransfer();
  for (let i = 0; i < new_files.length; i++) {
    dT.items.add(new_files[i]);
  }
  $('#dropzone input[type="file"]').prop('files', dT.files);
  $('#dropzone input[type="file"]').trigger('change');

});

$(document).on('dragover', '#dropzone', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).addClass('dragable');
});
$(document).on('dragleave', '#dropzone', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).removeClass('dragable');
});