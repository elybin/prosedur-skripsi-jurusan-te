
let userAndRepo = "elybin/prosedur-skripsi-jurusan-te";
let lastCommitEndpoint =  "https://api.github.com/repos/" + userAndRepo + "/git/refs/heads/main";
let getCommitDetailEndpoint = "https://api.github.com/repos/" + userAndRepo + "/git/commits/";

$( document ).ready(function() {
  getLastestCommit();

  // Slow scroll with anchors
  (function ($) {
    $(document).on("click", "a[href^=#]", function (e) {
      e.preventDefault();
      var id = $(this).attr("href");
      $("html,body").animate({ scrollTop: $(id).offset().top }, 500);
    });
  })(jQuery);
})



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
          " <br/>(" +
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