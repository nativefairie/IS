$(document).ready(function() {
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
    $( window ).resize(function() {
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

            if($('.hamburger').hasClass("is-active")) {
                $('.hamburger-label').text("Close").css('color','C20040')
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


    // $('.popup-first-level').on({
    //     focusout: function () {
    //         $(this).data('timer', setTimeout(function () {
    //             $(this).hide();
    //             $(".popup-outer-white").hide();
    //         }.bind(this), 0));
    //     },
    //     focusin: function () {
    //         clearTimeout($(this).data('timer'));
    //     },
    //     keydown: function (e) {
    //         if (e.which === 27) {
    //             $(this).hide();
    //             $(".popup-outer-white").hide();
    //             $('.popup-second-level').hide();
    //             e.preventDefault();
    //         }
    //     }
    // });
    // $('.menu__link').on({
    //     click: function (e) {
    //         var index = $(this).index()-1;
    //         console.log($('#menu-'+index));
    //         $('.popup-second-level').append($('#menu-'+index)).show();
    //     },focusout: function () {
    //         $(this.hash).data('submenuTimer', setTimeout(function () {
    //            $('.popup-second-level').empty()
    //         }.bind(this), 0));
    //     },
    //     focusin: function () {
    //         clearTimeout($(this.hash).data('submenuTimer'));
    //     },
    //     keydown: function (e) {
    //         if (e.which === 27) {
    //             $('.popup-second-level').empty().hide();
    //             e.preventDefault();
    //         }
    //     }
    // }).hover(function() {
    //     var index = $(this).index()+1;
    //     $('.menu__link:nth-child('+index+') span').text() === '+' ? $('.menu__link:nth-child('+index+') span').text('-') : $('.menu__link:nth-child('+index+') span').text('+')
    // })

    // $('.popup-second-level').on({
    //     focusout: function () {
    //         $(this).data('submenuTimer', setTimeout(function () {
    //             $(this).hide();
    //             $('.popup-second-level').empty();
    //         }.bind(this), 0));
    //     },
    //     focusin: function () {
    //         clearTimeout($(this).data('submenuTimer'));
    //     },
    //     keydown: function (e) {
    //         if (e.which === 27) {
    //             $(this).hide();
    //             $('.popup-second-level').empty();
    //             e.preventDefault();
    //         }
    //     }
    // });



    // $('.hamburger').on({
    //     focusout: function () {
    //         $(this.hash).data('timer', setTimeout(function () {
    //             $(this.hash).removeClass('is-active');
    //             $('.menu__link').removeClass("is-active");
    //         }.bind(this), 0));
    //     },
    //     focusin: function () {
    //         clearTimeout($(this.hash).data('timer'));
    //     }
    // });

    var stickyNav = $("nav");
    var path = document.querySelector('.share__circle');
    var pathLength = path.getTotalLength();
    path.style.strokeDasharray = pathLength + ' ' + pathLength;
    path.style.strokeDashoffset = pathLength;
    window.addEventListener("scroll", function(e) {
        var scrollPercentage = (document.documentElement.scrollTop + document.body.scrollTop) / (document.documentElement.scrollHeight - document.documentElement.clientHeight);
        var drawLength = pathLength * scrollPercentage;
        path.style.strokeDashoffset = pathLength - drawLength;
        if(scrollPercentage) {
            stickyNav.removeClass('static slideInUp').addClass("fixed animated slideInDown");
        }
        else {
            stickyNav.removeClass("fixed slideInDown").addClass('static animated slideInUp');
        }
    });

    function largestValue(value) {
        max = (max < value) ? value : max
        console.log(max)
        return max
    }

    function keyOfLargestValue() {
        for(let  i=0; i< keys.length; i++)
            if(values[i] == max)
                pos = i;
        return keys[pos];
    }

// var apiRequest2 = fetch('api.example2.com/search').then(function(response){
//         return response.json()
//     });
// var combinedData = {"apiRequest1":{},"apiRequest2":{}};
//             Promise.all([apiRequest1,apiRequest2]).then(function(values){
//                 combinedData["apiRequest1"] = values[0];
//                 combinedData["apiRequest2"] = values[1];
//                 return combinedData;
//             });
//
//     (async() => {
//         const base_url = 'https://intschools-javascript-test.firebaseapp.com';
//         const API = {
//             getKeys: async(Key) => {
//                 try {
//
//                     const r1 = await fetch(`${base_url}/getKey`);
//                     const largestNumber = JSON.parse(r1.json()).then(data => {
//                         keys = Object.keys(data);
//                         values = Object.values(data);
//                         max = 0;
//                         pos = 0;
//
//                         function maxPos(value) {
//                             max = (max < value) ? value : max
//                             return max;
//                         }
//
//                         function keyAtMaxPos() {
//                             for (i = 0; i < values.length; i++)
//                                 if (values[i] == max)
//                                     pos = i;
//                             return keys[pos];
//                         }
//
//                         values.forEach(maxPos);
//                         largestNumber = keyAtMaxPos();
//                     }
//                     console.log('Largest number', largestNumber);
//
//                     const r2 = await fetch(`${base_url}artist/albums/?artist_id=${artistID}`);
//                     const trackID = JSON.parse(response.json()).message.body.album_list[0].album.album_id;
//
//                     console.log('Random Track ID is:', trackID);
//
//                     const r3 = await fetch(`${base_url}artist/album/songsnippet?track_id=${trackID}`);
//
//                     const lyricSnippet = JSON.parse(response.json()).message;
//                     console.log('Track Id lyric snippet is:', lyricSnippet);
//                     return lyricSnippet;
//                 } catch (e) {
//
//                     console.error(e);
//                 }
//
//             }
//         }
//
//
//
//         try {
//             const art = await API.getArtistLyric('Prodigy');
//             console.log(art);
//         } catch (e ){
//             console.error(e);
//         }

 //   })()
 //    const base_url = 'https://intschools-javascript-test.firebaseapp.com';
 //    // var stage2 = fetch(base_url + '/getKey?key=' + values[i] + '&stage=2').then(function(response){
 //    //     return response.json()
 //    // }).then(data => {
 //    //     keys = Object.keys(data);
 //    //     values = Object.values(data)
 //    //     console.log(keys, values)});
 //    fetch(base_url + '/getKey')
 //    // Load it as json
 //        .then(response => response.json())
 //        .then(data => {
 //            keys = Object.keys(data);
 //            values = Object.values(data);
 //            max = 0;
 //            pos = 0;
 //            function maxPos(value) {
 //                max = (max < value) ? value : max
 //                return max;
 //            }
 //            function keyAtMaxPos() {
 //                for(i=0; i< values.length; i++)
 //                    if(values[i] == max)
 //                        pos = i;
 //                return keys[pos];
 //            }
 //            values.forEach(maxPos);
 //            keyAtMaxPos();
 //            return fetch(base_url + '/getKey?key=' + keyAtMaxPos() + '&stage=1');})
 //        .then(response => response.json())
 //        .then(data => {
 //            values = Object.values(data)
 //            for (let i = 0; i < values.length; i++) {
 //                this["Key"+i] = values[i];
 //            }
 //            return fetch(base_url + '/getKey?key=' + this.Key1 + '&stage=2');})
 //        .then(response => response.json())
 //        .then(data => {
 //            values = Object.values(data);
 //            console.log(values)
 //        })
 //        .catch(error => alert(error + "All requests will fail on average 1/5 times. Lucky you"));
});