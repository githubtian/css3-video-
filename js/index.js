/*
author: tiahaiting
date: 2016-2-29
function: jsws_red_pocket
*/
; (function (window) {
    
    var pics = [
        'http://action.gyyx.cn/WeiXinReservation/image/movie.mp4',
        'http://action.gyyx.cn/WeiXinReservation/image/arrow.png',
        'http://action.gyyx.cn/WeiXinReservation/image/big_word01.png',
        'http://action.gyyx.cn/WeiXinReservation/image/big_word02.png',
        'http://action.gyyx.cn/WeiXinReservation/image/click.png',
        'http://action.gyyx.cn/WeiXinReservation/image/glass_01.png',
        'http://action.gyyx.cn/WeiXinReservation/image/glass_02.png',
        'http://action.gyyx.cn/WeiXinReservation/image/hit1.png',
        'http://action.gyyx.cn/WeiXinReservation/image/hit2.png',
        'http://action.gyyx.cn/WeiXinReservation/image/hit3.png',
        'http://action.gyyx.cn/WeiXinReservation/image/logo.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page01_bg.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page01_bg_m.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page01_bg_q.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page02_bg.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page02_role.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page02_word.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page03_bg.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page03_role.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page03_word.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page04_bg.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page04_role.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page04_word.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page05_bg.jpg',
        'http://action.gyyx.cn/WeiXinReservation/image/page05_Btn.png',
        'http://action.gyyx.cn/WeiXinReservation/image/page05_word.png',
        'http://action.gyyx.cn/WeiXinReservation/image/role02.png',
        'http://action.gyyx.cn/WeiXinReservation/image/video_btn.png'
    ];
    var layouts = {
        loadProgerss: function (pic) {
            var _this = this;
            var img = new Image();
            var index = 0;
            var len = pic.length;
            var per = document.getElementById("progress");
            var loadImg = function () {
                img.src = pic[index];
                img.onload = function () {

                    per.innerHTML = Math.floor((index + 1) / len * 100) + "%";
                    index++;
                    if (index < len) {
                        loadImg();
                    } else {
                        $(".js_load").hide();
                        _this.init();
                    }
                };
                img.onerror = function () {
                    per.innerHTML = Math.floor((index + 1) / len * 100) + "%";
                    index++;
                    if (index < len) {
                        loadImg();
                    } else {
                        $(".js_load").hide();
                        _this.init();
                    }
                }
                
            };
            loadImg();
        },
        animate: function (index) {
            if (index == 1) {
                $(".js_show,#image").removeClass("hide");
                $(".layout1").removeClass("layout1_1");
                $(".hit1,.hit2,.hit3").addClass("hide");
                $("#movie1")[0].play();
            } else if (index == 2) {
                $("#movie2")[0].play();
            } else if (index == 3) {
                $("#movie3")[0].play();
            };
        },
        init: function () {
           
            $(".global").removeClass("hide");
            var context = this;
            var initialSlide = 0;
            

            context.swiper = new Swiper('body', {
                wrapperClass: 'global',
                slideClass: 'layout',
                mode: 'vertical',
                initialSlide: initialSlide,
                noSwiping: true,
                preventClicksPropagation: false,
                onSlideChangeStart: function (swiper, direction) {
                    context.animate(swiper.activeIndex);
                }
            });
            context.clickGlass();
            $(".js_videoBtn").click(function () {
                $(".js_video").show();
                $("#bg_sound")[0].pause();
                $('.video_con').html('<iframe frameborder="0" width="100%" height="100%" src="http://v.qq.com/iframe/player.html?vid=w0186hql8o8&tiny=0&auto=0" allowfullscreen></iframe>');
            });
            $(".close").click(function () { 
                $(".js_video").hide();
                $('iframe').remove();
                $("#bg_sound")[0].play();
            });
            
            
        },
        clickGlass: function () {
            var hitCount = 1;
            var _this = this;
            $(".js_click")[0].addEventListener("touchstart", function (e1) {
                if (hitCount < 4) {
                    if (_this.getIosVersion() != 7) {
                        $("#hit_sound")[0].currentTime = 0;
                        $("#hit_sound")[0].play();
                    }
                    $(".hit" + hitCount).removeClass("hide").css("-webkit-transform", "translate3d(" + e1.touches[0].pageX + "px," + e1.touches[0].pageY + "px,0)");
                } else {
                    //敲击结束后
                    hitCount = 0;
                    $(".js_show,#image").addClass("hide");
                    $(".js_video").removeClass("hide");
                    $("#movie")[0].play();
                }
                
                hitCount++;

            });
            $("#movie")[0].addEventListener("ended", function () {
                $("#movie")[0].pause();
                $(".js_video").addClass("hide");
                $(".layout1").addClass("layout1_1");
                $("#bg_sound")[0].play();
                

            });
        },
        getIosVersion:function () {
            var agent = navigator.userAgent.toLowerCase();
            var version;
            if (agent.indexOf("like mac os x") > 0) {
                //ios
                var regStr_saf = /os [\d._]*/gi;
                var verinfo = agent.match(regStr_saf);
                version = (verinfo + "").replace(/[^0-9|_.]/ig, "").replace(/_/ig, ".");
            }
            var version_str = version + "";
            if (version_str != "undefined" && version_str.length > 0) {
                version = version.substring(0, 1);
                return version
            }
            return false
        }
    };
    window.layouts = layouts;

    layouts.loadProgerss(pics);
})(window);