// $(function() {
$.requestParams = function(link) {
	var params = {};
	$('script').each(function() {
		var src = $(this).attr('src');
		if(src) {
			if(src.indexOf(link) > 0 && src.indexOf("?") == src.lastIndexOf("?") && src.indexOf("?") > 0) {
				src = src.substring(src.indexOf('?') + 1);
				src = src.replace(/(^\s*)|(\s*$)/g, "");
				$.each(src.split('&'), function() {
					if(this) {
						var entry = this.split('=');
						if(entry.length == 2 && entry[0] && entry[1]) {
							var value = entry[1];
							if(value && !isNaN(value)) {
								value = value * 1;
							}
							if('true' == value) {
								value = true;
							}
							if('false' == value) {
								value = false;
							}
							params[entry[0]] = value;
						}
					}
				});
			}
		}
	});
	return params;
};
$(function() {
	var target = $.requestParams('common.js').target;
	$("#footer").load("./tpl/footer.html", function() {
		//回到顶端
		$("#gotoTop").click(function() {
			$('html,body').animate({
				scrollTop: '0px'
			}, 'slow');
		})
	});
	$("#nav").data('target', target);
	$("#nav").load("./tpl/nav.html", function() {
		$('.menu').click(function() {
			// 导航菜单按钮点击事件
			var navList = $('.nav-box');
			var menu = $('.menu');
			var header = $('.header');
			var navLogo = $('.nav-logo');

			var timeFoag = true; //点击开关
			navList.on('animationend', function() {
				timeFoag = true;
			});
			//点击开关
			if(!timeFoag) {
				return;
			}
			timeFoag = false;
			navList.toggleClass('active');
			if(navList.hasClass('active')) {
				//显示
				navList.removeClass('no');
				$("body").css({
					position: "fixed",
				});
			} else {
				//隐藏
				navList.addClass('no');
				$("body").css({
					position: "static",
				});
			}

			navLogo.toggleClass('active')
			header.toggleClass('active')
			$(menu.find('.close')).toggleClass('active')
			$(menu.find('.open')).toggleClass('active')

			document.body.addEventListener("scroll", bodyScroll, false);

			function bodyScroll(event) {
				event.preventDefault();
			}
		});
	});
});

var wow = new WOW({
	boxClass: 'wow',
	animateClass: 'animated',
	offset: 0,
	mobile: true,
	live: true
});
wow.init();

if(window.innerWidth < 768) {
	$(".swiper-container span").html("");
	$(".aboutus-full").removeClass("container")
}
// 设置字体大小
function setRemFontSize() {
	var remSize = window.innerWidth / 19.2;
	document.querySelector("html").style.fontSize = remSize + "px";
}
setRemFontSize();
window.addEventListener("resize", function() {
	setTimeout(function() {
		setRemFontSize();
	}, 200)
});

// 监听页面滚动判断导航的状态
$(window).on('scroll', function() {
	if($(this).scrollTop() > 100) {
		$('#index').removeClass('index-nav-style')
	} else {
		$('#index').addClass('index-nav-style')
	}
})

//视频点击
$(".video-play-btn").click(function() {
	var url = $(this).data('url');
	if(!url) {
		alert('无视频文件');
		return;
	}
	var html = $('#video-model-template').html();
	var $model = $(html);
	$model.find('video').attr('src', url);
	$('body').append($model);
})

$(".video-close").click(function() {
	$(this).parents('.video-modal').remove();
})