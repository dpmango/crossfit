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
                       .addIndicators()
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
	    items: 1
	});

	$('.article-carousel').owlCarousel({
	    loop: true,
	    margin: 10,
	    nav: true,
	    dots: false,
	    navText: [iconPrev,iconNext],
	    items: 1
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


	// --------------------------------------------------------------------------
	// Map
	// --------------------------------------------------------------------------

	function initMap() {

            var map = new google.maps.Map(document.getElementById('contacts-map'), {
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

        initMap();



});