/*-----------------------------------------------------------------------------------
/*
/* Custom JS
/*
-----------------------------------------------------------------------------------*/

/* Start Document */


(function(jQuery){
    jQuery(document).ready(function(){
     /*----------------------------------------------------*/
/*	Main Navigation
/*----------------------------------------------------*/

	/* Menu Lamp (05/09/2013) */
	// @menu
	jQuery("#navigation.menu-menu-container ul").lavaLamp({
		fx: 'easeOutBack',
		speed: 700
	});

/* Menu */
jQuery('body').removeClass('no-js').addClass('js');


/*----------------------------------------------------*/
/*  Adjust top images :before :after
/*----------------------------------------------------*/
function resizeWings(){
    var winWidth = jQuery(window).width();
    if(winWidth>1024) {
        jQuery('.container.top').removeClass('cover');
        var topWidth = jQuery('.container.top .row').width();
        var topHeight = jQuery('.container.top').height();
        var elementWidth = Math.round((winWidth-topWidth)/2);
        jQuery('#right-wing, #left-wing').show().css({
            height: topHeight+1,
            width: elementWidth
        })
    } else {
        jQuery('#right-wing, #left-wing').hide();
        jQuery('.container.top').addClass('cover');
    }};

    jQuery(window).load(function(){
        resizeWings();
    });
    jQuery(window).on('resize', function(){
     resizeWings();
 });

/*----------------------------------------------------*/
/*	Scrollup
/*----------------------------------------------------*/

jQuery('.scrollup').click(function(){
	jQuery("html, body").animate({ scrollTop: 0 }, 600);
	return false;
});



selectnav('menu-menu', {
    label: 'Menu',
    nested: true,
    indent: '&nbsp;&nbsp;&nbsp;'
});


/*----------------------------------------------------*/
/*  Flexslider
/*----------------------------------------------------*/


jQuery(window).load(function() {
  jQuery('.flexslider').flexslider({
    animation: "slide",              //String: Select your animation type, "fade" or "slide"
    easing: "swing",               //{NEW} String: Determines the easing method used in jQuery transitions. jQuery easing plugin is supported!
    smoothHeight: true,            //{NEW} Boolean: Allow height of the slider to animate smoothly in horizontal mode

    slideshowSpeed: 300,           //Integer: Set the speed of the slideshow cycling, in milliseconds
    animationSpeed: 100,            //Integer: Set the speed of animations, in milliseconds

    // Primary Controls
    controlNav: true,               //Boolean: Create navigation for paging control of each clide? Note: Leave true for manualControls usage
    directionNav: true,             //Boolean: Create navigation for previous/next navigation? (true/false)
    prevText: "Previous",           //String: Set the text for the "previous" directionNav item
    nextText: "Next",               //String: Set the text for the "next" directionNav item


    // Special properties
    controlsContainer: "",          //{UPDATED} Selector: USE CLASS SELECTOR. Declare which container the navigation elements should be appended too. Default container is the FlexSlider element. Example use would be ".flexslider-container". Property is ignored if given element is not found.
    manualControls: "",             //Selector: Declare custom control navigation. Examples would be ".flex-control-nav li" or "#tabs-nav li img", etc. The number of elements in your controlNav should match the number of slides/tabs.
});
});

/*----------------------------------------------------*/
/*  Carousel
/*----------------------------------------------------*/

// Add classes for other carousels
var jQuerycarousel = jQuery('.recent-work-jc, .recent-news-jc, .testimonials-jc, .clients-jc');

var scrollCount;

function adjustScrollCount() {
    if( jQuery(window).width() < 768 ) {
        scrollCount = 1;
    } else {
        scrollCount = 3;
    }

}

function adjustCarouselHeight() {

    jQuerycarousel.each(function() {
        var jQuerythis    = jQuery(this);
        var maxHeight = -1;
        jQuerythis.find('li').each(function() {
            maxHeight = maxHeight > jQuery(this).height() ? maxHeight : jQuery(this).height();
        });
        jQuerythis.height(maxHeight);
    });
}
function initCarousel() {
    adjustCarouselHeight();
    adjustScrollCount();
    var i = 0;
    var g = {};
    jQuerycarousel.each(function() {
        i++;
        var jQuerythis = jQuery(this);

        if(jQuerythis.hasClass('testimonials-jc')) {
            scrollCount = 1;
        } else {
            adjustScrollCount();
        }
        g[i] = jQuerythis.jcarousel({
            animation           : 600,
            scroll              : scrollCount
        });
        jQuerythis.jcarousel('scroll', 0);
        jQuerythis.parent().prev().find('.jcarousel-prev').bind('active.jcarouselcontrol', function() {
            jQuery(this).addClass('active');
        }).bind('inactive.jcarouselcontrol', function() {
            jQuery(this).removeClass('active');
        }).jcarouselControl({
            target: '-='+scrollCount,
            carousel: g[i]
        });

        jQuerythis.parent().prev().find('.jcarousel-next').bind('active.jcarouselcontrol', function() {
            jQuery(this).addClass('active');
        }).bind('inactive.jcarouselcontrol', function() {
            jQuery(this).removeClass('active');
        }).jcarouselControl({
            target: '+='+scrollCount,
            carousel: g[i]
        });

        jQuerythis.touchwipe({
            wipeLeft: function() {
                jQuerythis.jcarousel('scroll','+='+scrollCount);
            },
            wipeRight: function() {
                jQuerythis.jcarousel('scroll','-='+scrollCount);
            }
        });

    });
}
jQuery(window).load(function(){
    initCarousel();
});

jQuery(window).resize(function () {
    jQuerycarousel.each(function() {
        var jQuerythis = jQuery(this);
        jQuerythis.jcarousel('destroy');
    });
    initCarousel();
});


//portfolio overlay for thumbnails
jQuery('.portfolio-item, .thumb-container, .gallery-icon').hover( function () {
 var imgheight = jQuery(this).find( "img" ).height();
 jQuery(this).find( ".overlay" ).height(imgheight);

 jQuery(this).find('.overlay').stop().animate({
  opacity: 0.8
}, 500);
 jQuery(this).find('.hover-image').stop().animate({
  opacity: 0.8
}, 500);
}, function () {
	jQuery(this).find('.overlay').stop().animate({
		opacity: 0
	}, 500);
	jQuery(this).find('.hover-image').stop().animate({
		opacity: 0
	}, 500);
});

jQuery( ".portfolio-item" ).each(function() {
    var imgheight = jQuery(this).find( "img" ).height();
    jQuery(this).find( ".overlay" ).height(imgheight);
});

jQuery( ".view-all").each(function() {
    var thiswidth = jQuery(this).outerWidth(true);
    var calcmarg = thiswidth/2*(-1);
    jQuery(this).css('marginRight',calcmarg)
})


// Skillbars

setTimeout(function(){

    jQuery('.skill-bar .skill-bar-content').each(function() {
        var me = jQuery(this);
        var perc = me.attr("data-percentage");

        var current_perc = 0;

        var progress = setInterval(function() {
            if (current_perc>=perc) {
                clearInterval(progress);
            } else {
                current_perc +=1;
                me.css('width', (current_perc)+'%');
            }

       // me.text((current_perc)+'%');

   }, 10);

    });

},10);


/*----------------------------------------------------*/
/*  Tabs
/*----------------------------------------------------*/

var jQuerytabsNav    = jQuery('.tabs'),
jQuerytabsNavLis = jQuerytabsNav.children('li');

jQuerytabsNav.each(function() {
    var jQuerythis = jQuery(this);
    jQuerythis.next().children('.tab').stop(true,true).hide()
    .first().show();

    jQuerythis.children('li').first().addClass('active').stop(true,true).show();
});

jQuerytabsNavLis.on('click', function(e) {
    var jQuerythis = jQuery(this);

    jQuerythis.siblings().removeClass('active').end()
    .addClass('active');

    jQuerythis.parent().next().children('.tab').stop(true,true).hide()
    .siblings( jQuerythis.find('a').attr('href') ).fadeIn();

    e.preventDefault();
});


// Accordion js
var jQueryaccor = jQuery('.accordion');
var jQuerytrigger;

jQueryaccor.each(function() {
    jQuery(this).find("div").hide().first().show();
    jQuery(this).find("h4").first().addClass('active');
});

jQuerytrigger = jQueryaccor.find('h4');

jQuerytrigger.on('click', function(e) {
    var location = jQuery(this).parent();
    var jQuerytriggerloc;
    if( jQuery(this).next().is(':hidden') ) {
        jQuerytriggerloc = jQuery('h4', location);
        jQuerytriggerloc.removeClass('active').next().slideUp(300);
        jQuery(this).addClass('active').next().slideDown(300);
    }
    e.preventDefault();
});
// eof accordion js


jQuery(".toggle-container").hide();
jQuery(".toggle-trigger").click(function(){
	jQuery(this).toggleClass("active").next().slideToggle();
	return false;
});

jQuery(".box-close").click(function(e){
	e.preventDefault();
	jQuery(this).parent().parent().fadeOut();
})

jQuery('#layerslider').layerSlider({
    skinsPath : '/sites/all/themes/interage/skins/',
    skin : 'sukces',
    autoStart : true,
    navStartStop : false,
    autoPlayVideos : false,
    navPrevNext : false,
    touchNav : true,
    responsive : true,
    hoverPrevNext : false,
    thumbnailNavigation : false,
    cbAnimStop   : function(data){
      var winWidth = jQuery(window).width();

      var bgUrl = jQuery('.ls-animating').data('bg');
      if(winWidth>1024) {
        if(bgUrl) {
            var path = encodeURI(bgUrl);
            //jQuery('#fakebackground').css('background-image','url(' + path + ')');
            var sliderHeight = jQuery('.slider-container').outerHeight(true);
            var topHeight = jQuery('.container.top').outerHeight(true);
            var topbarHeight = jQuery('.container.topbar').outerHeight(true);
            var image = jQuery('#fakebackground');
            image.fadeOut(750, function () {
                image.css({
                    "background" : 'url(' + path + ')',
                    'height' : topHeight+sliderHeight,
                    'top' : topbarHeight
                });
                image.fadeIn(750);
            });
        }
    }
}
});

function resizeSliderBG(){
    var winWidth = jQuery(window).width();
     var image = jQuery('#fakebackground');
    if(winWidth>1024) {
        var sliderHeight = jQuery('.slider-container').outerHeight(true);
        var topHeight = jQuery('.container.top').outerHeight(true);
        var topbarHeight = jQuery('.container.topbar').outerHeight(true);

        image.css({
            'height' : topHeight+sliderHeight,
            'top' : topbarHeight
        });
    } else {
        image.hide();
    }
}
jQuery(window).resize(function () {
    resizeSliderBG();
});

jQuery(document).on("click", ".ls-nav-sideleft, .ls-nav-prev",  function(e) {
    e.preventDefault();
    jQuery('#layerslider').layerSlider('prev');
});
jQuery(document).on("click", ".ls-nav-sideright, .ls-nav-next",  function(e) {
    e.preventDefault();
    jQuery('#layerslider').layerSlider('next');
});

 jQuery(".video-cont").fitVids();

});

})(this.jQuery);

