$(document).ready(function() {
    // document.addEventListener("touchstart", function () {
    // }, false);
    var doc = document.documentElement;
    doc.setAttribute('data-useragent', navigator.userAgent);
    /*Carousel functions*/
    var animationSpeed = 1000;

    function startSlider() {
        interval = setInterval(function () {
            $('.carousel__items > li:first')
                .fadeIn(animationSpeed)
                .next()
                .fadeIn(animationSpeed)
                .end()
                .appendTo('.carousel__items');
        }, 5000);
    }
    startSlider();
    $('.carousel__next').click(function () {
        clearInterval(interval);
        startSlider()
    });
    /*resizing functions for carousel(chose to work with child absolute positioned)*/
    var $child = $('.carousel__item');
    var $parent = $('.carousel__items');
    var childHeight = $child.height();
    $('.overlay').height(childHeight);
    $('header').height(childHeight);
    $parent.innerHeight(childHeight);
    $(window).resize(function () {
        var childHeight = $child.height();
        $parent.height(childHeight);
        $('header').height(childHeight);
        $('.overlay').height(childHeight);
    });
    /*just to be extra*/
    $('.logo').hover(function () {
        $(this).addClass("animated swing");
    }, function () {
        $(this).removeClass("animated swing");
    });
    var close = $('.button-close');

    /*scroll button*/
    $('.scroll').click(function () {
        $('html, body').animate({
            scrollTop: $(document).height()
        }, 'slow');
        return false;
    });
    $('.hamburger').on('click', function () {
        $(this).toggleClass("is-active");
        $('.menu').toggleClass('menu--active');
        $('.glow').toggleClass('glow--active').on('click', function () {
                $('.menu').removeClass('menu--active')
                $('.hamburger').removeClass('is-active')
                $('.hamburger-label').text("Menu")
                $('.glow').removeClass('glow--active')
            })

            if ($('.hamburger').hasClass("is-active")) {
                $('.hamburger-label').text("Close")
            } else {
                $('.hamburger-label').text("Menu")
            }
        }).hover(function () {
            $(this).toggleClass('animated pulse');
        });
        $('.menu__link').on({
            click: function (e) {
                $(this).toggleClass('active-link').find('.plus').toggleClass('active-minus');
                $(this.hash)
                    .toggleClass('submenu--active')
                    .append($('.btn--close').show())
                    .focus();
                e.preventDefault();

            },
            'mouseenter mouseleave': function() {
                $(this).find('.plus').toggleClass('hover-minus');
            },
            focusout: function () {
                $(this.hash).data('submenuTimer', setTimeout(function () {
                    $(this.hash).removeClass('submenu--active');
                    $(this).removeClass('active-link').find('.plus').removeClass('active-minus')

                }.bind(this), 0));
            },
            focusin: function () {
                clearTimeout($(this.hash).data('submenuTimer'));
            }
        });
        /*Close button on second-level*/
        $('.btn--close').on({
            click: function (e) {
                $('.submenu').focusout();
            },
            'mouseenter mouseleave': function (e) {
                $(this).toggleClass('animated pulse')
            }
        })
        $('.submenu').on({
            focusout: function () {
                $(this).data('submenuTimer', setTimeout(function () {
                    $(this).removeClass('submenu--active');
                    $('.menu__link').removeClass('active-link').find('.plus').removeClass('active-minus')
                }.bind(this), 0));
            },
            focusin: function () {
                clearTimeout($(this).data('submenuTimer'));
            },
            keydown: function (e) {
                if (e.which === 27) {
                    $(this).removeClass('submenu--active');
                    $('.menu__link').removeClass('active-link').find('.plus').removeClass('active-minus')
                    e.preventDefault();
                }
            }
        });

        var stickyNav = $("nav");
        var path = document.querySelector('.share__circle');
        var pathLength = path.getTotalLength();
        path.style.strokeDasharray = pathLength + ' ' + pathLength;
        path.style.strokeDashoffset = pathLength;
        window.addEventListener("scroll", function (e) {
            var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
            var drawLength = pathLength * scrollPercentage;
            path.style.strokeDashoffset = pathLength - drawLength;
            if (scrollPercentage) {
                stickyNav.removeClass('static').addClass("fixed");
            }
            else {
                stickyNav.removeClass("fixed").addClass('static');
            }
        });
    });