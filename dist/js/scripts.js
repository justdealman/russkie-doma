$(function() {
	var prevArrow = '<span class="arrow-prev">' +
			'<svg>' +
        		'<use xlink:href="./img/sprite.svg#arrow-left"></use>' +
        	'</svg>' +
		'</span>';

	var nextArrow = '<span class="arrow-next">' +
			'<svg>' +
        		'<use xlink:href="./img/sprite.svg#arrow-right"></use>' +
        	'</svg>' +
		'</span>';

	$('.js-welcome').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
        cssEase: 'ease-in-out',
        speed: 750,
        adaptiveHeight: true
    });

	$('.js-finished').slick({
		slidesToShow: 5,
		slidesToScroll: 1,
		arrows: true,
        prevArrow: prevArrow,
        nextArrow: nextArrow,
        dots: false,
		cssEase: 'ease-in-out',
		speed: 500,
		adaptiveHeight: true,
        responsive: [
            {
                breakpoint: 1779,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 4
                }
            }, {
                breakpoint: 1279,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 3
                }
            }, {
                breakpoint: 991,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2
                }
            }, {
                breakpoint: 767,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1
                }
            }
        ]
	});

	function recalcArrows(e) {
	    var arrows = e.find('.slick-arrow');
	    arrows.height(e.find('.slick-list').outerHeight()-2);
    }
    setTimeout(function() {
        recalcArrows($('.js-finished'));
    }, 100);

	svg4everybody();

	function closeAll() {
		if ( $('.header__login').hasClass('is-active') ) {
			closeUser();
		}
		if ( $('[data-target].is-opened').length ) {
			modalsClose();
		}
		if ( $('[data-order-id].is-opened').length ) {
			ordersClose();
		}
	}
		
	function modalOpen(t) {
		closeAll();
		var modal = $('[data-target="'+t+'"]');
		centerModal(modal);
		modal.addClass('is-opened');
		$('.fade-bg').addClass('is-opened');
	}
	
	function centerModal(t) {
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 30;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		});
	}
	
	function modalsClose() {
		$('[data-target], .fade-bg').removeClass('is-opened');
	}
	
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		var id = $(this).attr('data-open');
		modalOpen(id);
		$(this).addClass('is-active');
	});
	
	$('.fade-bg, .modal__close').on('click', function(e) {
		e.preventDefault();
		modalsClose();
	});

    $('.nav-drop').addClass('is-loaded');
	function openNav() {
        $('.nav-drop').addClass('is-opened');
        $('.header__menu').addClass('is-active');
	}

	function closeNav() {
        $('.nav-drop').removeClass('is-opened');
        $('.header__menu').removeClass('is-active');
	}

	$('.header__menu').on('click', function() {
		if ( !$(this).hasClass('is-active') ) {
			openNav();
		} else {
			closeNav();
		}
	});

	$('.nav-drop__close').on('click', function() {
	    closeNav();
	});

    $(document).on('click', function(e) {
        if ( !$(e.target).closest('.nav-drop').length && !$(e.target).closest('.header__menu').length ) {
            closeNav();
        }
    });

    $('.js-file-upload').on('click', function() {
		$(this).siblings('.js-file-input').trigger('click');
	});

	$('.nav-drop__link').on('click', function(e) {
		e.preventDefault();
		$(this).toggleClass('is-active');
	});

	function posNav() {
        var l = $('.header__row').offset().left;
        $('.nav-drop').css({
			paddingLeft: l
        });
	}

	$('[data-target], .fade-bg').addClass('is-loaded');

    function centerModal(t) {
        var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;

            var diff = 15;

        if ( h < $(window).scrollTop()+(diff*2) ) {
            h = $(window).scrollTop()+diff;
        }
        t.css({
            'top': h+'px'
        });
    }

    $(document).on('click', '[data-open]', function(e) {
        e.preventDefault();
        $(this).addClass('is-active');
        var t = $('[data-target="'+$(this).attr('data-open')+'"]');
        t.siblings('[data-target]').removeClass('is-opened is-active');
        $('.fade-bg').addClass('is-opened');
        centerModal(t);
        t.addClass('is-opened');
    });

    $('[data-target] .modal__close, .fade-bg').on('click', function(e) {
        e.preventDefault();
        $('[data-target], .fade-bg').removeClass('is-opened');
        $('[data-open]').removeClass('is-active');
    });

	function startApp() {
        posNav();
	}
    startApp();

    var lastWidth = $(window).width();
    $(window).on('resize', _.debounce(function() {
        if ( $(window).width() != lastWidth ) {
            startApp();
            lastWidth = $(window).width();
        }
    }, 100));

    var prevPreview = '<span class="arrow-prev">' +
		'<svg>' +
			'<use xlink:href="./img/sprite.svg#arrow-up"></use>' +
		'</svg>' +
	'</span>';
    var nextPreview = '<span class="arrow-next">' +
		'<svg>' +
			'<use xlink:href="./img/sprite.svg#arrow-down"></use>' +
		'</svg>' +
	'</span>';

    $('.js-preview').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        arrows: true,
		vertical: true,
        prevArrow: prevPreview,
        nextArrow: nextPreview,
        dots: false,
        cssEase: 'ease-in-out',
        speed: 500,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    vertical: false
                }
            }
        ]
    });

    $('.js-gallery').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        cssEase: 'ease-in-out',
        speed: 500
    });

    $('.item-preview__elem').on('click', function() {
        var id = parseInt($(this).attr('data-id'));
        $('.js-gallery').slick('slickGoTo', id-1);
    });

    $('.js-gallery').on('beforeChange', function(event, slick, currentSlide, nextSlide) {
        $('.item-preview__elem').each(function() {
           if ( $(this).attr('data-id') == nextSlide+1 ) {
               $(this).addClass('is-active');
           } else {
               $(this).removeClass('is-active');
           }
        });
    });

    $('.js-filter-more').on('click', function() {
        var t = $(this);
        var content = $('.js-filter-additional');
        if ( !t.hasClass('is-active') ) {
            content.show();
            t.text('Скрыть дополнительные параметры');
        } else {
            content.hide();
            t.text('Показать дополнительные параметры');
        }
        t.toggleClass('is-active');
    });

    $('.info-nav__item').on('click', function() {
       var id = $(this).attr('data');
       $(this).addClass('is-active').siblings().removeClass('is-active');
       $('[data-tab-complect="'+id+'"]').addClass('is-opened').siblings('[data-tab-complect]').removeClass('is-opened');
    });

    $('.info-tabs__item').on('click', function() {
       var id = $(this).attr('data');
        $('.info-tabs__item').removeClass('is-active');
       $(this).addClass('is-active');
       $('[data-tab="'+id+'"]').addClass('is-opened').siblings('[data-tab]').removeClass('is-opened');
    });

    $('.catalog-nav__item').on('click', function() {
       var id = $(this).attr('data');
       $(this).addClass('is-active').siblings().removeClass('is-active');
       $('[data-catalog="'+id+'"]').addClass('is-opened').siblings('[data-catalog]').removeClass('is-opened');
    });

    $('.complect td.has-button').each(function() {
       $(this).prev().addClass('has-padding');
    });
});