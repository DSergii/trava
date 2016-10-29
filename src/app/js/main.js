$(document).ready(function(){
	
	TravaApp.init();
	
});


var TravaApp = {

	init: function(){

		this.tab = $('.nav-tabs').tab();
		this.badgesCarousel = $('#badgesLvL1, #badgesLvL2, #badgesLvL3, #badgesLvL4').carousel({interval: false});
		this.testimonialsCarousel = $('#testimonials').carousel({interval: 5000});
		this.scrollTop();
		this.dropDown();
		this.checkitem();
		this.resize();
		this.headerGradient();
		
		this.options = {
			loop:false,
		    margin:0,
		    responsiveClass:true,
		    items: 5,
		    margin: 10,
		    dots: false,
		    responsive:{
		        320:{
		            items:1,
		            nav:false
		        },
		        425:{
		        	items:1,
		            nav:false
		        },
		        768:{
		            items:3,
		            nav:true
		        },
		        1500:{
		            items:5,
		            nav:true,
		            loop:false
		        }
		    }
		}
		this.carousel = $('.owl-carousel').owlCarousel(this.options);
		this.showPlaylist();
		this.videoList = $('.media-tab .video-list').customScrollbar({updateOnWindowResize:true});
		//this.videoPlayList = $('.playlist').customScrollbar();
	},

	scrollTop: function() {
		var btnUp = $('.up-btn');

		btnUp.click(function(e) {
			e.preventDefault();
			var that = $(this);
			
			$('body, html').animate({scrollTop: 0}, 800);
		});
	},

	dropDown: function() {

		var content = $('#content');
		var archBlock = content.find('.block');

		archBlock.each(function() {
			var block = $(this),
				box = block.find('.box'),
				dd_box = block.find('.dropdown-box');

			box.click(function(){
				var that = $(this);

				if(!that.parent(block).hasClass('open')){
					dd_box.slideDown(300, function(){
						that.parent(block).addClass('open');
					});
				}else {
					dd_box.slideUp(300, function(){
						that.parent(block).removeClass('open');
					});
				}
			});
		});
	},

	checkitem: function() {

		this.badgesCarousel.each(function() {
			$(this).on("slid.bs.carousel", "", function(){

				var $this = $(this);

			    if ($this.find(".carousel-inner .item:first").hasClass("active")) {
			        $this.children(".left").hide();
			        $this.children(".right").show();
			    } else if ($this.find(".carousel-inner .item:last").hasClass("active")) {
			        $this.children(".right").hide();
			        $this.children(".left").show();
			    } else {
			        $this.children(".carousel-control").show();
			    }

			});
		})
	},

	mobileSliderAdaptive: function() {

		$('.carousel:not(.main-page)').each(function(){
			var carousel = $(this),
				holder = carousel.find('.carousel-inner'),
				badges = holder.find('.badge-item'),
				active = '';

			var slider = {
				itemNum: Math.ceil(badges.length / 4),
				badgeArr: []
			}

			badges.each(function(i){
				slider.badgeArr.push(badges[i]);
			})

			holder.empty();

			for (var i = 0; i < slider.itemNum; i++) {

				i == 0 ? active = 'active' : active = '';

				holder.append('<div class="item ' + active +'"></item>');
			}

			var item = holder.find('.item');
			var len = item.length;

			item.each(function() {
				$(this).append('<div class="badges-box"></div><div class="badges-box"></div>');
			});

			for (var i = 0; i < len; i++) {

				$(item[i]).find('.badges-box').each(function() {
					for (var j = 0; j < 2; j++) {
						
						$(this).append(slider.badgeArr.shift());
					}
					
				});

			}
		});
	},

	resize: function() {

		var flag = true,
			_this = this;

		var resizeContent = function() {

			if( $(window).width() < 945 ) {
				
				if(flag) {
					_this.mobileSliderAdaptive();
				}
				flag = false;
			}
		}

		$(window).resize(function() {
			resizeContent();
		});

		resizeContent();
	},

	headerGradient: function() {
		var header = $('#header'),
			headerH = header.height(),
			img = new Image;
			video = $('.video-box');

		if( video.length ) {
			img.src = video.css('backgroundImage').replace(/url\((['"])?(.*?)\1\)/gi, '$2').split(',')[0];
		}

		$(window).scroll(function(){
			if($(this).scrollTop() + (headerH * 2) > img.height){
				header.addClass('fill');
			}else{
				header.removeClass('fill');
			}
			
		});
	},

	showPlaylist: function() {
		var hold = $('.v-container')
			btn = null,
			list = null;

		hold.each(function() {
			var _this = $(this);
			btn = _this.find('.add');
			

			btn.click(function() {
				$(this).toggleClass('active');
				list = _this.find('.playlist');
				
				if( !_this.hasClass('open') ) {
					list.slideDown(300, function(){
						$(this).customScrollbar();
						_this.addClass('open');
					});
				}else {
					list.slideUp(300, function(){
						_this.removeClass('open');
					});
				}
			});
		});
	}
}