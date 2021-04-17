
let userAndRepo = "elybin/prosedur-skripsi-jurusan-te";
let lastCommitEndpoint =  "https://api.github.com/repos/" + userAndRepo + "/git/refs/heads/master";
let getCommitDetailEndpoint = "https://api.github.com/repos/" + userAndRepo + "/git/commits/";

$( document ).ready(function() {
  getLastestCommit();

 
})

// handle links with @href started with '#' only
$(document).on('click', 'a[href^="#"]', function(e) {
  // target element id
  var id = $(this).attr('href');

  // target element
  var $id = $(id);
  if ($id.length === 0) {
      return;
  }

  // prevent standard hash navigation (avoid blinking in IE)
  e.preventDefault();

  // top position relative to the document
  var pos = $id.offset().top;

  // animated top scrolling
  $('body, html').animate({scrollTop: pos});

  // open panel if possible 
  try {
    if( $($id.selector).children('.panel-heading').length  > 0)
    {
      $($id.selector).children('.panel-heading').delay(1000).removeClass('collapse').attr('aria-expanded','true');
      $($id.selector).children('.panel-body').delay(1000).removeClass('collapse');
    }
   
  }
  catch(err) {
    console.log("panel cannot be opened.")
  }
  
});

function getLastestCommit(){
  let commitList = "";
  $.getJSON(lastCommitEndpoint, function (data) {
    theCommitSha = data.object.sha;

    // get detail 
    $.getJSON(getCommitDetailEndpoint + theCommitSha, function (data2) {
      theCommitDetail = data2;

      var unixDate = new Date(theCommitDetail.committer.date).getTime();

        let writeIt =
          timeSince(unixDate) +
          " yang lalu oleh " +
          theCommitDetail.committer.name +
          " (" +
          theCommitDetail.message +
          ")";
        $("#last-update").html(writeIt);

      console.log(theCommitDetail);
    });
  })
}




function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " tahun";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " bulan";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " hari";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " jam";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " menit";
  }
  return Math.floor(seconds) + " detik";
}