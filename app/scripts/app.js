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

  // маска для полей zip-кодов
  $('._zip').inputmask("99999", {"placeholder": "_____"});
  // /маска для полей zip-кодов

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
    $('html, body').stop().animate({
      scrollTop: offsetTop
    }, 300);
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

  	$('._go-to').on('click', function (event) {
		event.preventDefault();
		var id  = $(this).attr('href'),
			top = $(id).offset().top;
		$('body,html').animate({scrollTop: top}, 310);
	});


  function clear_form() {
    $("input[type='text']").val("");
  };

  var emailCount = 0;

  function email_validate(x) {
    var pattern = /^([a-z0-9_\.-])+@[a-z0-9-]+\.([a-z]{2,4}\.)?[a-z]{2,4}$/i;
    if(pattern.test(x.val())){
      x.removeClass('error');
      emailCount=0;
    }
    else if (x.val() == 0) {
      x.removeClass('error');
      emailCount=0;
    }
    else {
      x.addClass('error');
      emailCount=1;
    }
    console.log(emailCount);
  };

  $('input[name="email"]').blur(function() {
    email_validate($(this));
  });

  $('input[name="email"]').keypress(function(e){
    if(e.keyCode==13){
      email_validate($(this));
    }
  });

  $('input[name="phone"]').blur(function() {
    var phone =  $(this).val();
    var index =  phone.indexOf('_');
    if(phone.length >= 6 && index == -1) {
      $(this).removeClass('error');
    }
    else if (phone == 0) {
      $(this).removeClass('error');
    }
    else {
      $(this).addClass('error');
    }
  });

  $('._fs').submit(function(){
  var name = $(this).find('input[name="fname"]').val();
  var phone =  $(this).find('input[name="phormail"]').val();
  var index =  phone.indexOf('_');
  var indexstring =  phone.indexOf('е');
  var companyName = $(this).find('input[name="zipf"]').val();
  var formDate = $(this).find('input[name="zipt"]').val();
  var formName = $(this).find('input[name="hidden"]').val();
  if(phone.length >= 6 && index == -1 && emailCount == 0 && indexstring == -1) {
    $.ajax({
      type: "POST",
      url: "mail.php",
      data:{
        "name":name,
        "phone":phone,
        "companyName":companyName,
        "formDate":formDate,
        "formName":formName
      },
      success: function() {
        clear_form();
        $('.modal').fadeOut();
        $('.modalThanks').fadeIn();
        $('input[name="name"], input[name="phone"]').removeClass('error');
      }
    });
  }
  else {
    $(this).find('input[name="phone"]').addClass('error');
  }
  return false;
  });

});
