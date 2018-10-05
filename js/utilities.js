$(document).ready(function() {
    document.addEventListener("touchstart", function () {
    }, false);
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
                $(this.hash)
                    .toggleClass('submenu--active')
                    .append(close.show())
                    .focus();
                e.preventDefault();

            },
            focusout: function () {
                $(this.hash).data('submenuTimer', setTimeout(function () {
                    $(this.hash).removeClass('submenu--active');
                }.bind(this), 0));
            },
            focusin: function () {
                clearTimeout($(this.hash).data('submenuTimer'));
            }
        });
        $('.submenu').on({
            focusout: function () {
                $(this).data('submenuTimer', setTimeout(function () {
                    $(this).removeClass('submenu--active');
                }.bind(this), 0));
            },
            focusin: function () {
                clearTimeout($(this).data('submenuTimer'));
            },
            keydown: function (e) {
                if (e.which === 27) {
                    $(this).removeClass('submenu--active');
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
                stickyNav.removeClass('static slideInUp').addClass("fixed animated slideInDown");
            }
            else {
                stickyNav.removeClass("fixed slideInDown").addClass('static animated slideInUp');
            }
        });
    });
});