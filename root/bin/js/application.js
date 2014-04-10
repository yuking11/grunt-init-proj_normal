jQuery(document).ready(function ($) {
	//画像ロールオーバー
	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
	var preLoadImg = new Object();
	function initRollOvers(){
		$("img.over, input.over").each(function(){
			var imgSrc = this.src;
			var sep = imgSrc.lastIndexOf('.');
			var onSrc = imgSrc.substr(0, sep) + '_on' + imgSrc.substr(sep, 4);
			preLoadImg[imgSrc] = new Image();
			preLoadImg[imgSrc].src = onSrc;
			$(this).hover(
				function() { this.src = onSrc; },
				function() { this.src = imgSrc; }
			);
		});
	}
	$(function(){
		initRollOvers();
	});
	//ページトップ フローティング
	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
	$('.page_top_btn').css({'display': 'none'});
	$(window).scroll(function (){
		if($(this).scrollTop() > 100){
			$('.page_top_btn').show();
		}else{
			$('.page_top_btn').hide();
		}
	});
	//スムーズスクロール
	/* ++++++++++++++++++++++++++++++++++++++++++++++++++++++++ */
	$(function(){
		$('a[href*=#]').on('click', function() {
			if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
				var $target = $(this.hash);
				$target = $target.length && $target || $('[name=' + this.hash.slice(1) +']');
				var targetOffset = 0;
				if(this.hash.slice(1) !== 'page_top'){
					targetOffset = $target.offset().top;
				}
				$('html,body').animate({scrollTop: targetOffset}, 500);
				return false;
			}
		});
	});
});