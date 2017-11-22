$(function() {
  // --------------------------------------------------------------------------
  // PRELOADER
  // --------------------------------------------------------------------------
  var preloadPictures = function(pictureUrls, callback) {
    var i, j, loaded = 0;

    for (i = 0, j = pictureUrls.length; i < j; i++) {
      (function (img, src) {
          img.onload = function () {
              if (++loaded == pictureUrls.length && callback) {
                  callback();
              }
          };
          img.src = src;
      } (new Image(), pictureUrls[i]));
    }
  };


  preloadPictures(['images/bg-begin-poster.png'], function(){
    // callback function
    setTimeout(function(){
      $('body').addClass('pace-done');
      runScrollMonitor();
    }, 500)
  })
});

$(function() {

	// --------------------------------------------------------------------------
	// SVG
	// --------------------------------------------------------------------------

	svg4everybody();


    // Detect Touch

    function detectTouch() {
        if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
            $('html').addClass('touch-device');
        }
        else {
            $('html').addClass('no-touch-device');
        }
    }
    detectTouch();

    // --------------------------------------------------------------------------
    // Animation
    // --------------------------------------------------------------------------


    if ($('html').is('.no-touch-device')) {

        var controller = new ScrollMagic.Controller();


        new ScrollMagic.Scene({triggerElement: ".nav", pushFollowers: false, duration: 0, triggerHook: 0})
                       .setClassToggle(".nav-dropdown", "is-fixed")
                       // .addIndicators()
                       .addTo(controller);

    }

    // var navScene = new ScrollMagic.Scene({triggerElement: '.nav', pushFollowers: false, duration: 0})
    //  .setPin('.nav')
    //  .addTo(controller);


    // new ScrollMagic.Scene({triggerElement: ".js-nav-trigger"})
    //              .setClassToggle(".js-nav", "is-fixed") // add class toggle
    //              // .addIndicators() // add indicators (requires plugin)
    //              .addTo(controller);

	// --------------------------------------------------------------------------
	// Nav
	// --------------------------------------------------------------------------

	$('.nav').on('click', '.nav-btn', function(event) {
		event.preventDefault();
		if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').closest('body').removeClass('is-navOpen');
        }
        else {
            $(this).addClass('is-active').closest('body').addClass('is-navOpen');
        }
	});


  // Smoth scroll
	$('a[href^="#section"]').click( function() {
      var el = $(this).attr('href');
      $('body, html').animate({
          scrollTop: $(el).offset().top - 80}, 1000);
      return false;
	});

  // Set active anchor tags
  // Cache selectors
  var topMenu = $(".nav-menu"),
  topMenuHeight = topMenu.outerHeight()+80,
  // All list items
  menuItems = topMenu.find("a"),
  // Anchors corresponding to menu items
  scrollItems = menuItems.map(function(){
    var item = $($(this).attr("href"));
    if ( item.length ) { return item; }
  });

  // Bind to scroll
  $(window).scroll(function(){
    // Get container scroll position
    var fromTop = $(this).scrollTop() + topMenuHeight;

    // Get id of current scroll item
    var cur = scrollItems.map(function(){
     if ($(this).offset().top < fromTop)
       return this;
    });
    // Get the id of the current element
    cur = cur[cur.length-1];
    var id = cur && cur.length ? cur[0].id : "";
    // Set/remove active class
    menuItems.removeClass("is-active").filter("[href='#"+id+"']").addClass("is-active");
  });

	// --------------------------------------------------------------------------
	// Owl Carousel
	// --------------------------------------------------------------------------

	var iconPrev = '<svg class="icon-prev"><use xlink:href="/sprites/sprite.svg#icon-prev"></use></svg>',
		iconNext = '<svg class="icon-next"><use xlink:href="/sprites/sprite.svg#icon-next"></use></svg>';

	$('.program-carousel').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: [iconPrev,iconNext],
	    responsive:{
	        0:{
	            items:1
	        },
	        768:{
	            items:3
	        }
	    }
	});

	$('.reviews-carousel').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: [iconPrev,iconNext],
	    items: 1,
      mouseDrag: false,
      touchDrag: false,
      freeDrag: false
	});

	$('.article-carousel').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: [iconPrev,iconNext],
	    items: 1
	});

  $('.section-carousel').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: [iconPrev,iconNext],
	    items: 1,
      responsive: {
        768: {
          items: 3
        }
      }
	});


	// --------------------------------------------------------------------------
	// Tabs
	// --------------------------------------------------------------------------

	$('.program-tabs-menu').on('click', 'li:not(.active)', function() {
		$(this).addClass('is-active').siblings().removeClass('is-active')
		.closest('.program-tabs').find('.program-tabs-panel').removeClass('is-active').eq($(this).index()).addClass('is-active');
	});

	// --------------------------------------------------------------------------
	// Accordion
	// --------------------------------------------------------------------------

	$('.js-accordion').on('click', 'dt', function (event) {
		event.preventDefault();

		if ($(this).is('.is-active')) {
            $(this).removeClass('is-active').next('dd').slideUp('fast');
        }
        else {
        	$(this).closest('.js-accordion').find('dt').removeClass('is-active').next('dd').slideUp('fast');
            $(this).addClass('is-active').next('dd').slideDown('fast');
        }
	});


	// --------------------------------------------------------------------------
	// Mask Phone
	// --------------------------------------------------------------------------

	$(".js-mask-phone").mask("+7 (999) 999-9999");

	// --------------------------------------------------------------------------
	// Table
	// --------------------------------------------------------------------------


	$('.js-table-hover').on('mouseenter mouseleave', 'th, td', function(e) {
		var i = this.cellIndex;
		$(this).closest('table').find('tr').each(function() {
			$(this).children().eq(i).toggleClass('is-hightlight');
		});

	});

	// --------------------------------------------------------------------------
	// Table
	// --------------------------------------------------------------------------

	$('[data-mfp]').magnificPopup({
		type:'inline',
		mainClass: 'mfp-with-zoom',
		showCloseBtn: false,
		removalDelay: 300,
		zoom: {
		    enabled: true,
		    duration: 300,
		    easing: 'ease-in-out'
		  },
		  overflowY: 'scroll',
		  // callbacks: {
		  //   open: function() {
		  //   	$('html').addClass('is-lockScroll');
		  //   	$('.header').css({'margin-right': $('html').css('margin-right') });
		  //   },
		  //   close: function() {
		  //   	$('html').removeClass('is-lockScroll');
		  //   	$('.header').css({'margin':'0'});
		  //   }
		  // }
	});

	$('[data-mfp-close]').on('click', function(event) {
		event.preventDefault();
		$.magnificPopup.close();
	});

  $('.about-photos').magnificPopup({
    delegate: '.about-photos-item',
    type: 'image',
    closeOnContentClick: false,
    closeBtnInside: false,
    fixedContentPos: true,
    tLoading: 'Загрузка #%curr%...',
    mainClass: 'mfp-no-margins mfp-with-scale',
    removalDelay: 300,
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0,1],
      tPrev: 'Назад', // title for left button
      tNext: 'Вперед', // title for right button
      tCounter: '<span class="mfp-counter"><span>%curr%</span> из %total%</span>'
    },
    image: {
      verticalFit: true,
      tError: '<a href="%url%">Изображение #%curr%</a> не может быть загружено.'
    },
    // zoom: {
		// 	enabled: true,
		// 	duration: 300 // don't foget to change the duration also in CSS
		// }
  });


	// WOW
  var monitorActive = false;
  window.runScrollMonitor = function(){
    setTimeout(function(){
      if ( !monitorActive ){
        monitorActive = true;
        $('.wow').each(function(i, el){

          var elWatcher = scrollMonitor.create( $(el) );

          var delay;
          if ( $(window).width() < 768 ){
            delay = 0
          } else {
            $(el).data('wow-delay');
          }

          var animationName

          if ( $(el).data('animation-name') ){
            animationName = $(el).data('animationName');
          }

          elWatcher.enterViewport(function() {
            $(el).addClass(animationName);
            $(el).css({
              'animation-name': 'wowFade',
              'animation-delay': delay,
              'visibility': 'visible'
            });
          });
          elWatcher.exitViewport(function() {
            $(el).removeClass(animationName);
            $(el).css({
              'animation-name': 'none',
              'animation-delay': 0,
              'visibility': 'hidden'
            });
          });
        });
      }

    },300);
  }
  setTimeout(function(){
    runScrollMonitor();
  },1000)

});

// --------------------------------------------------------------------------
// Map
// --------------------------------------------------------------------------

$(document).ready(function(){
	var map;
  // When the window has finished loading create our google map below
  google.maps.event.addDomListener(window, 'load', init);

	function init() {
			map = new google.maps.Map(document.getElementById('contacts-map'), {
					center: {lat: 55.76252304, lng: 37.55560935},
					zoom: 17,
					//- zoomControl: false,
					mapTypeControl: false,
					streetViewControl: false,
					styles: [
							{
									"featureType": "all",
									"elementType": "labels.text.fill",
									"stylers": [
											{
													"saturation": 36
											},
											{
													"color": "#000000"
											},
											{
													"lightness": 40
											}
									]
							},
							{
									"featureType": "all",
									"elementType": "labels.text.stroke",
									"stylers": [
											{
													"visibility": "on"
											},
											{
													"color": "#000000"
											},
											{
													"lightness": 16
											}
									]
							},
							{
									"featureType": "all",
									"elementType": "labels.icon",
									"stylers": [
											{
													"visibility": "off"
											}
									]
							},
							{
									"featureType": "administrative",
									"elementType": "geometry.fill",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 20
											}
									]
							},
							{
									"featureType": "administrative",
									"elementType": "geometry.stroke",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 17
											},
											{
													"weight": 1.2
											}
									]
							},
							{
									"featureType": "landscape",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 20
											}
									]
							},
							{
									"featureType": "poi",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 21
											}
									]
							},
							{
									"featureType": "road.highway",
									"elementType": "geometry.fill",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 17
											}
									]
							},
							{
									"featureType": "road.highway",
									"elementType": "geometry.stroke",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 29
											},
											{
													"weight": 0.2
											}
									]
							},
							{
									"featureType": "road.arterial",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 18
											}
									]
							},
							{
									"featureType": "road.local",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 16
											}
									]
							},
							{
									"featureType": "transit",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 19
											}
									]
							},
							{
									"featureType": "water",
									"elementType": "geometry",
									"stylers": [
											{
													"color": "#000000"
											},
											{
													"lightness": 17
											}
									]
							}
					]
			});
			var markerPath = 'images/icon-loc.png';

			var marker = new google.maps.Marker({
					position: {lat: 55.76286, lng: 37.556882},
					map: map,
					icon: markerPath
			});

			map.addListener('mouseenter', function(e) {
					return false;
			});
	}
});
