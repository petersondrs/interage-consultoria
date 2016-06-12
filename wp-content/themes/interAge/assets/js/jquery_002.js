/*!
 * SelectNav.js (v. 0.1)
 * Converts your <ul>/<ol> navigation into a dropdown list for small screens
 */

window.selectnav = (function(){

"use strict";

    var selectnav = function(element,options){

        element = document.getElementById(element);

        // return immediately if element doesn't exist
        if( ! element)
            return;

        // return immediately if element is not a list
        if( ! islist(element) )
            return;

        document.documentElement.className += " js";

        // retreive options and set defaults
        var o = options || {},

            activeclass = o.activeclass || 'active',
            autoselect = typeof(o.autoselect) === "boolean" ? o.autoselect : true,
            nested = typeof(o.nested) === "boolean" ? o.nested : true,
            indent = o.indent || "→",
            label = o.label || "- Navigation -",

            // helper variables
            level = 0,
            selected = " selected ";

        // insert the freshly created dropdown navigation after the existing navigation
        element.insertAdjacentHTML('afterend', parselist(element) );

        var nav = document.getElementById(id());

        // autoforward on click
        if (nav.addEventListener) nav.addEventListener('change',goTo);
        if (nav.attachEvent) nav.attachEvent('onchange', goTo);

        return nav;

        function goTo(e){

            // Crossbrowser issues - http://www.quirksmode.org/js/events_properties.html
            var targ;
            if (!e) e = window.event;
            if (e.target) targ = e.target;
            else if (e.srcElement) targ = e.srcElement;
            if (targ.nodeType === 3) // defeat Safari bug
                targ = targ.parentNode;

            if(targ.value) window.location.href = targ.value;
        }

        function islist(list){
            var n = list.nodeName.toLowerCase();
            return (n === 'ul' || n === 'ol');
        }

        function id(nextId){
            for(var j=1; document.getElementById('selectnav'+j);j++);
            return (nextId) ? 'selectnav'+j : 'selectnav'+(j-1);
        }

        function parselist(list){

            // go one level down
            level++;

            var length = list.children.length,
                html = '',
                prefix = '',
                k = level-1
                ;

            // return immediately if has no children
            if (!length) return;

            if(k) {
                while(k--){
                    prefix += indent;
                }
                prefix += " ";
            }

            for(var i=0; i < length; i++){

                var link = list.children[i].children[0];
                var text = link.innerText || link.textContent;
                var isselected = '';

                if(activeclass){
                    isselected = link.className.search(activeclass) !== -1 || link.parentElement.className.search(activeclass) !== -1 ? selected : '';
                }

                if(autoselect && !isselected){
                    isselected = link.href === document.URL ? selected : '';
                }

                html += '<option value="' + link.href + '" ' + isselected + '>' + prefix + text +'</option>';

                if(nested){
                    var subElement = list.children[i].children[1];
                    if( subElement && islist(subElement) ){
                        html += parselist(subElement);
                    }
                }
            }

            // adds label
            if(level === 1 && label) html = '<option value="">' + label + '</option>' + html;

            // add <select> tag to the top level of the list
            if(level === 1) html = '<select class="selectnav" id="'+id(true)+'">' + html + '</select>';

            // go 1 level up
            level--;

            return html;
        }

    };

    return function (element,options) {
        selectnav(element,options);
    };



})();

/*
 @name           View.js — A simple, lightweight, jQuery photo viewer for the web
 @category   Lightbox, Image Viewer
 @author     Rogie King <rogie@finegoodsmarket.com>
 @copyright  2011-2011 Rogie King
 @version        1.02
 @license    By purchasing View.js, you agree to the following: View.js remain property of Rogie King. View.js may be used by the licensee in any personal or commercial projects. View.js may not be resold or  redistributed. For example: packaged in an application where it could be downloaded for free, such as an open-source project or other application where View.js is bundled along with other files.View.js — A simple, lightweight, jQuery photo viewer for the web by Rogie King is licensed under a Creative Commons Attribution-NoDerivs 3.0 Unported License.
*/

function View(a,b){function v(){t();q();d=c.find("img");g("body").append(c);if(!View._cssified){n()}View._cssified=true;u();i.sync();i.close();if(b.preload){i.show(d.eq(0))}i._ie7=navigator.userAgent.indexOf("MSIE 7")>-1;g(window).resize(function(){i.sync()})}function u(){c.unbind("click.view").bind("click.view",m)}function t(){if(typeof a=="object"&&a.jquery){a.filter("a[href]").each(function(){if(s(this.href)||!b.validateUrls){h.push({src:this.href,caption:this.title})}g(this).unbind("click.view").bind("click.view",r)})}else if(g.isArray(a)){h=a}}function s(a){return/\.(jpeg|jpg|gif|png)(\?|#)?(.*)?$/ig.test(a)}function r(a){a.preventDefault();i.show(this.href);i.open()}function q(){if(g.isArray(h)){for(var a=0,b;b=h[a];++a){var c=null;var d=g('<li class="loading"/>');if(typeof b=="object"&&b.src){c=b.src}else if(typeof b=="string"){c=b}var f=new Image;f.onload=function(){i.sync();g(this).css({visibility:"visible"}).parents("li").removeClass("loading")};g(f).css({visibility:"hidden"});g(f).attr("data-src",c);if(b.caption){d.addClass("has-caption").append(g('<span class="caption" />').text(b.caption))}if(a==0){d.addClass("first")}if(a==h.length-1){d.addClass("last")}e.append(d.append(g("<div/>").append(g("<span/>").append(f))))}}}function p(a){if(!a.src){g(a).attr("src",g(a).attr("data-src"))}}function o(a,b){p(a.find("img"));a.nextAll().slice(0,b).add(a.prevAll().slice(0,b)).find("img").each(function(a,b){p(b)})}function n(){var a=g("<style />");g("head").prepend(a);var c=document.styleSheets[0];for(h in b.css){var d="";for(name in b.css[h]){d+=name+":"+b.css[h][name]+";"}var e=h.split(",");for(var f=0,h;h=e[f];++f){if(c.insertRule){c.insertRule(h+"{"+d+"}",c.cssRules.length)}else{c.addRule(h,d)}}}}function m(a){a.preventDefault();$t=g(a.target);if(e.find("li").length<=1){i.close()}if($t.is("img")){if($t.parents("li").is(".current")){i.next()}else{i.show($t)}}else if($t.is("li>div,li")){if($t.parents("li").is(".next")||$t.is(".next")){i.next()}else if($t.parents("li").is(".previous")||$t.is(".previous")){i.prev()}else{i.close()}}else{i.close()}}function l(a){g.each(b.keys,function(b,c){for(var d=0;d<c.length;++d){if(a.keyCode==c[d]){i[b]()}}})}function k(a){var b='[src="'+a+'"],[data-src="'+a+'"]';return $i=d.find(b).add(d.filter(b)).eq(0)}var c,d,e,f,g=jQuery,h=[],i=this,j=g("body");c=g('<div class="viewer"><ul></ul><a href="#" class="close" title="Close this viewer">&times;</a></div>').hide();e=c.find("ul");var b=g.extend({css:{"body.viewing":{overflow:"hidden"},".viewer *, .viewer":{margin:0,padding:0,border:0},".viewer":{"background-color":"#222",filter:"progid:DXImageTransform.Microsoft.gradient(startColorstr=#D8000000,endColorstr=#D8000000)","background-color":"rgba(0,0,0,0.85)",position:"fixed",right:0,top:0,left:0,bottom:0,display:"block",overflow:"hidden","z-index":Math.ceil((new Date).getTime()/1e7),height:"100%",width:"100%"},".viewer li.current + .loading":{"background-position":"0 center"},".viewer ul":{display:"block",height:"100%",width:"100%","white-space":"nowrap"},".viewer li":{height:"100%",width:"0%",overflow:"hidden",display:"none","float":"left","text-align":"center",position:"relative"},".viewer li.previous, .viewer li.next":{cursor:"pointer",display:"block"},".viewer li>div":{left:"10px",right:"10px",bottom:"10px",top:"10px",display:"block","text-align":"center",position:"absolute"},".viewer li.has-caption>div":{bottom:"5em"},".viewer li.loading>div":{background:"url(data:image/gif;base64,R0lGODlhDAAMAPIGAFxcXE5OTlZWVkpKSkZGRkJCQgAAAAAAACH/C05FVFNDQVBFMi4wAwEAAAAh+QQFHgAGACwAAAAADAAMAAADLmhaIRJFSQHEGFRMQKQhlVFwngIyWqk8lqpgrYs1rvGMXXnapASmPAsm5EHdJAkAIfkEBR4AAQAsBgABAAMABQAAAgaEbwISHAUAIfkEBR4AAQAsBgADAAUAAwAAAgOEj1kAIfkEBR4AAgAsBgAGAAUAAwAAAgYMDmInegUAIfkEBR4AAQAsBgAGAAMABQAAAgOEj1kAIfkEBR4AAgAsAwAGAAMABQAAAgaUchDAzQUAIfkEBR4AAQAsAQAGAAUAAwAAAgOEj1kAIfkEBR4AAgAsAQADAAUAAwAAAgYEImKnGwUAIfkEBR4AAQAsAwABAAMABQAAAgOEj1kAOw%3D%3D) center center no-repeat"},".viewer li.loading.next>div":{"background-position":"0 center"},".viewer li.loading.previous>div":{"background-position":"right center"},".viewer .close":{color:"#fff","text-decoration":"none","font-weight":"bold","font-size":"20px",position:"absolute",right:"15px",top:"15px",cursor:"pointer",display:"block",opacity:.6},".viewer .close:hover":{opacity:1},".viewer img":{"max-width":"100%","max-height":"100%",cursor:"pointer",position:"relative",height:"auto",width:"auto","vertical-align":"middle","-ms-interpolation-mode":"bicubic"},".viewer .caption":{color:"#aaa","text-shadow":"0 1px 2px rgba(0,0,0,0.8)","line-height":"5em",position:"absolute",bottom:"0",left:"0",right:"0",visibility:"hidden"},".viewer li.current .caption":{visibility:"visible"},".viewer li.previous":{width:"10%"},".viewer li.current":{width:"80%",display:"block"},".viewer li.first.current":{"margin-left":"10%"},".viewer li.last.current":{"margin-right":"10%"},".viewer li.next":{width:"10%"},".viewer li.previous>div":{left:"-50%",right:"50%"},".viewer li.next>div":{right:"-50%",left:"50%"},".viewer .next img, .viewer .previous img, .viewer .current img":{"-webkit-transform":"translateZ(0)"}},keys:{close:[27],prev:[37,188],next:[39,190]},loadAhead:1,preload:false,validateUrls:true},b);this.next=function(){this.show(f.next().find("img"))};this.prev=function(){this.show(f.prev().find("img"))};this.close=function(){c.hide();g(document).unbind("keyup.view");j.removeClass("viewing")};this.open=function(){c.show();g(document).bind("keyup.view",l);j.addClass("viewing");this.sync()};this.show=function(a){if(typeof a=="string"){a=k(a)}if(a.constructor==g&&a.length>0){c.find("li").removeClass("current next previous").removeAttr("title");f=$parent=a.parents("li").addClass("current");f.next().addClass("next").attr("title","Next");f.prev().addClass("previous").attr("title","Previous");this.sync();o(f,b.loadAhead)}};this.sync=function(){var a=e.find("li.current>div").height();var b=a+"px";e.find("li>div>span").each(function(){g(this).css({"line-height":b})});if(i._ie7){d.css({"max-height":b});d.each(function(){var b=g(this);b.css({top:(a-b.height())/2+"px"})})}};this.next=function(){i.show(f.next().find("img"))};this.prev=function(){i.show(f.prev().find("img"))};v()}View._version="1.02";(function(){var a=jQuery,b=document.getElementsByTagName("script");if(b[b.length-1].src.indexOf("?auto")>-1){a().ready(function(){var b=a("a.view[href]");var c={};b.each(function(){var b=this.rel;if(b){if(!c[b]){c[b]=[]}c[b].push(this)}else{new View(a(this))}});for(var d in c){new View(a(c[d]))}})}})();



/**
 * jQuery Plugin to obtain touch gestures from iPhone, iPod Touch and iPad, should also work with Android mobile phones (not tested yet!)
 * Common usage: wipe images (left and right to show the previous or next image)
 *
 * @author Andreas Waltl, netCU Internetagentur (http://www.netcu.de)
 * @version 1.1.1 (9th December 2010) - fix bug (older IE's had problems)
 * @version 1.1 (1st September 2010) - support wipe up and wipe down
 * @version 1.0 (15th July 2010)
 */
 (function($){$.fn.touchwipe=function(settings){var config={min_move_x:20,min_move_y:20,wipeLeft:function(){},wipeRight:function(){},wipeUp:function(){},wipeDown:function(){},preventDefaultEvents:true};if(settings)$.extend(config,settings);this.each(function(){var startX;var startY;var isMoving=false;function cancelTouch(){this.removeEventListener('touchmove',onTouchMove);startX=null;isMoving=false}function onTouchMove(e){if(config.preventDefaultEvents){e.preventDefault()}if(isMoving){var x=e.touches[0].pageX;var y=e.touches[0].pageY;var dx=startX-x;var dy=startY-y;if(Math.abs(dx)>=config.min_move_x){cancelTouch();if(dx>0){config.wipeLeft()}else{config.wipeRight()}}else if(Math.abs(dy)>=config.min_move_y){cancelTouch();if(dy>0){config.wipeDown()}else{config.wipeUp()}}}}function onTouchStart(e){if(e.touches.length==1){startX=e.touches[0].pageX;startY=e.touches[0].pageY;isMoving=true;this.addEventListener('touchmove',onTouchMove,false)}}if('ontouchstart'in document.documentElement){this.addEventListener('touchstart',onTouchStart,false)}});return this}})(jQuery);


/**
 * hoverIntent is similar to jQuery's built-in "hover" method except that
 * instead of firing the handlerIn function immediately, hoverIntent checks
 * to see if the user's mouse has slowed down (beneath the sensitivity
 * threshold) before firing the event. The handlerOut function is only
 * called after a matching handlerIn.
 *
 * hoverIntent r7 // 2013.03.11 // jQuery 1.9.1+
 * http://cherne.net/brian/resources/jquery.hoverIntent.html
 *
 * You may use hoverIntent under the terms of the MIT license. Basically that
 * means you are free to use hoverIntent as long as this header is left intact.
 * Copyright 2007, 2013 Brian Cherne
 *
 * // basic usage ... just like .hover()
 * .hoverIntent( handlerIn, handlerOut )
 * .hoverIntent( handlerInOut )
 *
 * // basic usage ... with event delegation!
 * .hoverIntent( handlerIn, handlerOut, selector )
 * .hoverIntent( handlerInOut, selector )
 *
 * // using a basic configuration object
 * .hoverIntent( config )
 *
 * @param  handlerIn   function OR configuration object
 * @param  handlerOut  function OR selector for delegation OR undefined
 * @param  selector    selector OR undefined
 * @author Brian Cherne <brian(at)cherne(dot)net>
 **/
 (function($) {
    $.fn.hoverIntent = function(handlerIn,handlerOut,selector) {

        // default configuration values
        var cfg = {
            interval: 100,
            sensitivity: 7,
            timeout: 0
        };

        if ( typeof handlerIn === "object" ) {
            cfg = $.extend(cfg, handlerIn );
        } else if ($.isFunction(handlerOut)) {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerOut, selector: selector } );
        } else {
            cfg = $.extend(cfg, { over: handlerIn, out: handlerIn, selector: handlerOut } );
        }

        // instantiate variables
        // cX, cY = current X and Y position of mouse, updated by mousemove event
        // pX, pY = previous X and Y position of mouse, set by mouseover and polling interval
        var cX, cY, pX, pY;

        // A private function for getting mouse position
        var track = function(ev) {
            cX = ev.pageX;
            cY = ev.pageY;
        };

        // A private function for comparing current and previous mouse position
        var compare = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            // compare mouse positions to see if they've crossed the threshold
            if ( ( Math.abs(pX-cX) + Math.abs(pY-cY) ) < cfg.sensitivity ) {
                $(ob).off("mousemove.hoverIntent",track);
                // set hoverIntent state to true (so mouseOut can be called)
                ob.hoverIntent_s = 1;
                return cfg.over.apply(ob,[ev]);
            } else {
                // set previous coordinates for next time
                pX = cX; pY = cY;
                // use self-calling timeout, guarantees intervals are spaced out properly (avoids JavaScript timer bugs)
                ob.hoverIntent_t = setTimeout( function(){compare(ev, ob);} , cfg.interval );
            }
        };

        // A private function for delaying the mouseOut function
        var delay = function(ev,ob) {
            ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t);
            ob.hoverIntent_s = 0;
            return cfg.out.apply(ob,[ev]);
        };

        // A private function for handling mouse 'hovering'
        var handleHover = function(e) {
            // copy objects to be passed into t (required for event object to be passed in IE)
            var ev = jQuery.extend({},e);
            var ob = this;

            // cancel hoverIntent timer if it exists
            if (ob.hoverIntent_t) { ob.hoverIntent_t = clearTimeout(ob.hoverIntent_t); }

            // if e.type == "mouseenter"
            if (e.type == "mouseenter") {
                // set "previous" X and Y position based on initial entry point
                pX = ev.pageX; pY = ev.pageY;
                // update "current" X and Y position based on mousemove
                $(ob).on("mousemove.hoverIntent",track);
                // start polling interval (self-calling timeout) to compare mouse coordinates over time
                if (ob.hoverIntent_s != 1) { ob.hoverIntent_t = setTimeout( function(){compare(ev,ob);} , cfg.interval );}

                // else e.type == "mouseleave"
            } else {
                // unbind expensive mousemove event
                $(ob).off("mousemove.hoverIntent",track);
                // if hoverIntent state is true, then call the mouseOut function after the specified delay
                if (ob.hoverIntent_s == 1) { ob.hoverIntent_t = setTimeout( function(){delay(ev,ob);} , cfg.timeout );}
            }
        };

        // listen for mouseenter and mouseleave
        return this.on({'mouseenter.hoverIntent':handleHover,'mouseleave.hoverIntent':handleHover}, cfg.selector);
    };
})(jQuery);




/*global jQuery */
/*jshint multistr:true browser:true */
/*!
* FitVids 1.0
*
* Copyright 2011, Chris Coyier - http://css-tricks.com + Dave Rupert - http://daverupert.com
* Credit to Thierry Koblentz - http://www.alistapart.com/articles/creating-intrinsic-ratios-for-video/
* Released under the WTFPL license - http://sam.zoy.org/wtfpl/
*
* Date: Thu Sept 01 18:00:00 2011 -0500
*/

(function( $ ){

  "use strict";

  $.fn.fitVids = function( options ) {
    var settings = {
      customSelector: null
    };

    if(!document.getElementById('fit-vids-style')) {

      var div = document.createElement('div'),
          ref = document.getElementsByTagName('base')[0] || document.getElementsByTagName('script')[0];

      div.className = 'fit-vids-style';
      div.id = 'fit-vids-style';
      div.style.display = 'none';
      div.innerHTML = '&shy;<style>         \
        .fluid-width-video-wrapper {        \
           width: 100%;                     \
           position: relative;              \
           padding: 0;                      \
        }                                   \
                                            \
        .fluid-width-video-wrapper iframe,  \
        .fluid-width-video-wrapper object,  \
        .fluid-width-video-wrapper embed {  \
           position: absolute;              \
           top: 0;                          \
           left: 0;                         \
           width: 100%;                     \
           height: 100%;                    \
        }                                   \
      </style>';

      ref.parentNode.insertBefore(div,ref);

    }

    if ( options ) {
      $.extend( settings, options );
    }

    return this.each(function(){
      var selectors = [
        "iframe[src*='player.vimeo.com']",
        "iframe[src*='youtube.com']",
        "iframe[src*='youtube-nocookie.com']",
        "iframe[src*='kickstarter.com'][src*='video.html']",
        "object",
        "embed"
      ];

      if (settings.customSelector) {
        selectors.push(settings.customSelector);
      }

      var $allVideos = jQuery(this).find(selectors.join(','));
      $allVideos = $allVideos.not("object object"); // SwfObj conflict patch

      $allVideos.each(function(){
        var $this = jQuery(this);
        if (this.tagName.toLowerCase() === 'embed' && $this.parent('object').length || $this.parent('.fluid-width-video-wrapper').length) { return; }
        var height = ( this.tagName.toLowerCase() === 'object' || ($this.attr('height') && !isNaN(parseInt($this.attr('height'), 10))) ) ? parseInt($this.attr('height'), 10) : $this.height(),
            width = !isNaN(parseInt($this.attr('width'), 10)) ? parseInt($this.attr('width'), 10) : $this.width(),
            aspectRatio = height / width;
        if(!$this.attr('id')){
          var videoID = 'fitvid' + Math.floor(Math.random()*999999);
          $this.attr('id', videoID);
        }
        $this.wrap('<div class="fluid-width-video-wrapper"></div>').parent('.fluid-width-video-wrapper').css('padding-top', (aspectRatio * 100)+"%");
        $this.removeAttr('height').removeAttr('width');
      });
    });
  };
})( jQuery );