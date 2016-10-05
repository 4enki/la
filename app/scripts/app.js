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

  // мобильное меню
  $('.close-icon').click(function(){
    $('.header').toggleClass("header--ok").next();
    $('.close-icon').toggleClass("close-icon--active").next();
  });
  $("#top-menu .menu__item a").click(function(){
    $('.header').removeClass("header--ok").next();
  });
  // /мобильное меню

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

  // работа с формой

  // маска для полей zip-кодов
  // $('._zip').inputmask("99999", {"placeholder": "_____"});
  // /маска для полей zip-кодов
	$('._fs').validate({
    errorPlacement: function (error, element) {return false;}
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
  // /работа с формой

  // табы Прайсов
  $('.tabs').tabtab({
    tabMenu: '.tabs__menu',
    tabContent: '.tabs__content',
    next: '.tabs-controls__next',
    prev: '.tabs-controls__prev',

    startSlide: 1,
    arrows: true,
    dynamicHeight: true,
    useAnimations: true,

    easing: 'ease',
    speed: 550,
    slideDelay: 0,
    perspective: 1200,
    transformOrigin: 'center top',
    perspectiveOrigin: '50% 50%',

    translateY: 0,
    translateX: 0,
    scale: 1,
    rotateX: 90,
    rotateY: 0,
    skewY: 0,
    skewX: 0,
  });
  // /табы Прайсов

  // /скрипт карусели в отзывых
  var owl = $("#reviews-box");
  owl.owlCarousel({
      singleItem: true,
      slideSpeed: 1200,
      lazyLoad: true,
      navigation: false,
      pagination: false
  });
  $(".reviews__control--right").click(function(){
    owl.trigger('owl.next');
  });
  $(".reviews__control--left").click(function(){
    owl.trigger('owl.prev');
  });
  // /скрипт карусели в отзывых

});
