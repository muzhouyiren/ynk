$(function() {
    // banner轮播图
    var swiper = new Swiper('.swiper-container-banner', {
        loop: true,
        autoplay: {
            delay: 5000,
        },
        pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function(index, className) {
                switch (index) {
                    case 0:
                        text = '标题一';
                        break;
                    case 1:
                        text = '标题二';
                        break;
                    case 2:
                        text = '标题三';
                        break;
                    case 3:
                        text = '标题四';
                        break;
                }
                return '<span class="' + className + '">' + text + '</span>';
            },
        },
    });
    if (window.innerWidth < 768) {
        $(".swiper-container span").html("");
        $(".aboutus-full").removeClass("container")
    }


    if (window.innerWidth > 992) {
        chargeWidthOrHeight()
        var listLength = $('.cz-theme .item').length;
        $('.cz-theme .wrap').css('width', listLength + "00%")
        $('.cz-theme .wrap .item').css('width', 1 / listLength * 100 + "%")

        // 主题板块占位div
        $('.theme-cutter').css('height', listLength * 100 + "vh")
        $(window).on('resize', function() {
            chargeWidthOrHeight()

        })

        //滚轮 视察滚动
        $(window).on('scroll', parallxTheme);
    }

})


function chargeWidthOrHeight(imgwidth, imgheight) {
    //获取屏幕的宽度
    var width = $(window).width()
        //获取屏幕的高度
    var height = $(window).height()
        //根据传入的参数判断以宽度还是高度为准
    if (imgwidth / imgheight > width / height) {
        //以高度为准
        $('.cz-theme .item .img').addClass('height').removeClass('width')
    } else {
        //以宽度为准
        $('.cz-theme .item .img').addClass('width').removeClass('height')
    }

}


//视差滚动处理函数
function parallxTheme() {

    var scrollTop = $(window).scrollTop();
    var windowHeight = $(window).height()
    var windowWdith = $(window).width()
    var themeBlock = $('.cz-theme')
    var themeImg = $('.cz-theme .item .img')
    var _unique = $(".ynk-theme .unique")

    //结束位置
    var endW = windowWdith * ($('.cz-theme .item').length - 1);


    themeBlock.addClass('fixed').removeClass('bottom');
    _unique.addClass('mt-120');
    // margin-top: 1.6rem;
    //获取最终滚动的距离
    var distanceY = windowHeight * ($('.cz-theme .item').length - 1)

    //横向要滚动的距离
    var distanceX = windowWdith * ($('.cz-theme .item').length - 1)

    //纵向距离差
    var differY = scrollTop - windowHeight

    //计算横向差
    var differX = distanceX * differY / distanceY

    if (scrollTop >= windowHeight && differX <= endW) {
        //显示范围
        $('.cz-theme .wrap').css("transform", "translate(" + -differX + "px,-50%)")

        //图片的缩放
        themeImg.each(function(index, item) {
            if (index != 0) {
                if ($(item).offset().left <= windowWdith && $(item).offset().left > windowWdith - $(item).width()) {

                    scale = ((windowWdith - $(item).offset().left) / 0.6) / $(item).width()
                    if (scale < 0.6) {
                        scale = 0.6
                    } else if (scale >= 1) {
                        scale = 1
                    }
                    $(item).css("transform", "scale(" + scale + ")")

                }
            }
        })
    } else if (differX > endW) {
        //大于显示范围
        _unique.removeClass('mt-120');
        themeBlock.removeClass('fixed').addClass('bottom');
        $('.cz-theme .wrap').css("transform", "translate(" + -endW + "px,-50%)")
    } else {
        //小于显示范围
        _unique.removeClass('mt-120');
        themeBlock.removeClass('fixed')
        $('.cz-theme .wrap').css("transform", "translate(" + -0 + "px,-50%)")
    }
}