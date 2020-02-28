$(function(){

    $('a[href^="#"]').click(function (){
        var elementClick = $(this).attr("href");
        var destination = $(elementClick).offset().top;
        jQuery("html:not(:animated), body:not(:animated)").animate({scrollTop: destination}, 800);
        return false;
    });
});

$(".callback-btn").click(function() {
    $(".callback-form").toggleClass("hide");
  });

  $(".show-callback").click(function() {
    $(".callback-form").removeClass("hide");
  });

  $(document).click(function(e) {
    if (
      $(e.target).closest(
        $(".callback-form, .callback-btn, .show-callback")
      ).length > 0
    ) {
      return;
    }
    $(".callback-form").addClass("hide");
  });

  $('img[src="img/i-cross.svg"]').click(function() {
    $(".callback-form").addClass("hide");
  });
