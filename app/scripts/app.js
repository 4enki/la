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

  // поведение шапки при скролле
  $(function() {
    var header = $("._header");
    $(window).scroll(function(scrlevt) {
      scrlevt.preventDefault();
      var scroll = $(window).scrollTop();

      if (scroll > 2) {
        header.removeClass('header-scroll-off').addClass("header-scroll");
      } else {
        header.removeClass("header-scroll").addClass('header-scroll-off');
      }

      return false;
    });
  });
  // /поведение шапки при скролле

  // // маска для полей zip-кодов
  // $('._zip').inputmask("99999", {"placeholder": "_____"});
  // // /маска для полей zip-кодов

  //
  $('.close-icon').click(function(){
    $('.header').toggleClass("header--ok").next();
  });
  // /

  // шпионское меню со скроллом
  var lastId,
      topMenu = $("#top-menu"),
      topMenuHeight = topMenu.outerHeight()+0,
      menuItems = topMenu.find("a"),
      scrollItems = menuItems.map(function(){
        var item = $($(this).attr("href"));
        if (item.length) { return item; }
      });

  menuItems.click(function(e){
    var href = $(this).attr("href"),
        offsetTop = href === "#" ? 0 : $(href).offset().top-topMenuHeight+1;
    $('html, body').stop().animate({scrollTop: offsetTop}, 300);
    e.preventDefault();
  });

  $(window).scroll(function(){
    var fromTop = $(this).scrollTop()+topMenuHeight;
    var cur = scrollItems.map(function(){
      if ($(this).offset().top < fromTop)
      return this;
    });
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
      if (lastId !== id) {
      lastId = id;
      menuItems
        .parent().removeClass("active")
        .end().filter("[href=#"+id+"]").parent().addClass("active");
      }
  });
  // /шпионское меню со скроллом

  // помогаем ссылкам с якорями плавно скролиться
  $('._go-to').on('click', function (event) {
    event.preventDefault();
    var id  = $(this).attr('href'),
    top = $(id).offset().top;
    $('body,html').animate({scrollTop: top}, 310);
  });
  // /помогаем ссылкам с якорями плавно скролиться

  // когда очень нужно скролить вверх
  $(window).scroll(function () {
    if ($(this).scrollTop() > 0) {
      $('._scroller').fadeIn();
    } else {
      $('._scroller').fadeOut();
    }
  });
  $('._scroller').click(function () {
    $('body,html').animate({scrollTop: 0}, 401); return false;
  });
  // /когда очень нужно скролить вверх

  $('.tabs').tabtab({
    tabMenu: '.tabs__menu',             // direct container of the tab menu items
    tabContent: '.tabs__content',       // direct container of the tab content items
    next: '.tabs-controls__next',       // next slide trigger
    prev: '.tabs-controls__prev',       // previous slide trigger

    startSlide: 1,                      // starting slide on pageload
    arrows: true,                       // keyboard arrow navigation
    dynamicHeight: true,                // if true the height will dynamic and animated.
    useAnimations: true,                // disables animations.

    easing: 'ease',                     // http://julian.com/research/velocity/#easing
    speed: 550,                         // animation speed
    slideDelay: 0,                      // delay the animation
    perspective: 1200,                  // set 3D perspective
    transformOrigin: 'center top',      // set the center point of the 3d animation
    perspectiveOrigin: '50% 50%',       // camera angle

    translateY: 0,                      // animate along the Y axis (val: px or ‘slide’)
    translateX: 0,                      // animate along the X axis (val: px or ‘slide’)
    scale: 1,                           // animate scale (val: 0-2)
    rotateX: 90,                        // animate rotation (val: 0deg-360deg)
    rotateY: 0,                         // animate Y acces rotation (val: 0deg-360deg)
    skewY: 0,                           // animate Y skew (val: 0deg-360deg)
    skewX: 0,                           // animate X skew (val: 0deg-360deg)
  });

  function clear_form() {
    $('input[type="text"]').val("");
    $("textarea").val('');
  };

  $('._fs').submit(function(){
  var formName = $(this).find('input[name="name"]').val();
  var formContact =  $(this).find('input[name="contact"]').val();
  var formZipfrom = $(this).find('input[name="zipform"]').val();
  var formZipto = $(this).find('input[name="zipto"]').val();
  var formType = $(this).find('input[name="hidden"]').val();
  var formMessage = $(this).find('textarea[name="message"]').val();
  //if(phone.length >= 6 && index == -1 && emailCount == 0 && indexstring == -1) {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data:{
        "formName":formName,
        "formContact":formContact,
        "formZipfrom":formZipfrom,
        "formZipto":formZipto,
        "formType":formType,
        "formMessage":formMessage
      },
      success: function() {
        clear_form();
        $('.modal').fadeOut();
        $('.modalThanks').fadeIn();
        $('input[name="name"], input[name="phone"]').removeClass('error');
      }
    });
  //}
  //else {
   // $(this).find('input[name="phone"]').addClass('error');
  //}
  return false;
  });


		$('._fs').validate({
      errorPlacement: function (error, element) {
        return false;
    }
    });


});

$(document).ready(function() {

  var owl = $("#owl-demo");

  owl.owlCarousel({
      singleItem: true,
      slideSpeed: 1200,
      lazyLoad: true,
      navigation: false,
      pagination: false
  });

  // Custom Navigation Events
  $(".reviews__control--right").click(function(){
    owl.trigger('owl.next');
  });
  $(".reviews__control--left").click(function(){
    owl.trigger('owl.prev');
  });

});
