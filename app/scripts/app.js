$(document).ready(function() {

  // подсвечиваем ссылки с одинаковым адресом
  $(document).on('mouseover mouseout', "a", function(e) {
    var href = $(this).attr('href');
      if (!href || href == '#') {
        return;
      }
    $("a")
      .filter('[href="' + $(this).attr('href') + '"]')
      .toggleClass("hover", e.type == 'mouseover');
  });
  // /подсвечиваем ссылки с одинаковым адресом

  // подсвечиваем мини-шапку при скролле
  $(document).scroll(function(evt) {
    evt.preventDefault();
    if($(document).scrollTop()>2){
      $('._header').addClass('header-scroll');
    } else {
      $('._header').removeClass('header-scroll');
    }
    return false;
  });

});
