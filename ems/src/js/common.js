/**
 *
 */

/* events alias */
var E = function (ev){
	var isSupportTouch = (function(){
		var ret = false;
		try{document.createEvent('TouchEvent');ret=true;}catch(ex){};
		return ret;
	})();
	var eventAlias = {
		'clickstart'	:'touchstart',
		'clickmove'	:'touchmove',
		'click'	:'touchend',
		'mousemove':'touchmove',
		'mousedown':'touchstart'
	};
	ev = isSupportTouch ? (eventAlias[ev] ? eventAlias[ev] : ev) : ev;
	return ev;
};


/* page */
var page = page || {};
page.tpl = function (tmplate, jsondata){
	tmplate = tmplate.replace(/\{(\w+)\}/g, function (v0, v1) {
			return jsondata[v1];
	});
	return tmplate;
};
page.scrollable = function (){
	window.addEventListener('touchmove', function(e){
		e.preventDefault();
	}, false);
	$(document).on('touchmove', '[role="scrollable"]', function(e){
		e.stopPropagation();
		/*
		if(this.scrollHeight > this.offsetHeight){
			if(this.scrollTop>2 && (this.scrollTop+this.offsetHeight)<this.scrollHeight-2){
				console.log(this.scrollTop);
				e.stopPropagation();
			}else{
				console.log('stop');
				//e.preventDefault();
			}
		}else{
			e.preventDefault();
		};
		*/
	});
	return this;
};
page.minimal = function (){
	/* let browser minimal */
	setTimeout(function(){window.scrollTo(0, 1);}, 0);
	return this;
};
page.asideMenu = function(){
	$(document).on(E('click'), '.open-aside-menu', function(){
		$('body').addClass('toggle-aside');
		return false;
	}).on(E('click'), '.close-aside-menu', function(){
		setTimeout(function(){
			$('body').removeClass('toggle-aside');
		}, 400);
		return false;
	});
};
page.act = function (){
	$(document).on(E('click'), '[act]', function(e){
		var act = $(this).attr('act');
		if(act.indexOf('@') > -1){
			act = act.split('@');
			var $target = act[1];
			act = act[0];
			switch(act){
				case 'active':
					$($target).addClass('active');
					break;
				case 'inactive':
					$($target).removeClass('active');
					break;
				default:

			};
		};
		//e.stopPropagation();
		return false;
	});
	return this;
};
page.standalone = function (){
	/* fixed open a new window when standalone browser */
	if(("standalone" in window.navigator) && window.navigator.standalone){
		$('a').on('click', function (e){
			e.preventDefault();
			var new_location = $(this).attr('href');
			if (new_location != undefined && new_location.substr(0, 1) != '#' && $(this).attr('data-method') == undefined){
				window.location = new_location;
			}
		});
	};
	return this;
};

page.toggleFooter = function() {
	//返回角度
	function GetSlideAngle(dx, dy) {
	    return Math.atan2(dy, dx) * 180 / Math.PI;
	}
	 
	//根据起点和终点返回方向 1：向上，2：向下,0：未滑动
	function GetSlideDirection(startX, startY, endX, endY) {
	    var dy = startY - endY;
	    var dx = endX - startX;
	    var result = 0;
	 
	    //如果滑动距离太短
	    if (Math.abs(dx) < 2 && Math.abs(dy) < 2) {
	        return result;
	    }
	 
	    var angle = GetSlideAngle(dx, dy);
	    if (angle > 30 && angle < 150) {
	        result = 1;
	    } else if (angle < -30 && angle > -150) {
	        result = 2;
	    }
	 
	    return result;
	}
	 
	//滑动处理
	var startX, startY;
	//var endX, endY;
	var initialScreenSize = window.innerHeight;
	var currentScreenSize = 0;

	window.addEventListener("resize", function() {
		currentScreenSize = window.innerHeight;
	}, false);

	//切换navbar
	function hideBar(obj) {
		if(obj.hasClass('noswipe'))return false;
	    var direction = GetSlideDirection(startX, startY, endX, endY);
	    switch (direction) {
	       
		    case 1:
		    	if(currentScreenSize == 0 || currentScreenSize >= initialScreenSize) {
	        		setTimeout(function() {
	        			obj.removeClass('androidKeyboardOut');
	        			obj.addClass('androidKeyboardIn');
		        	}, 50);
	        	}
	            break;
	            
	        case 2:
	        	if(currentScreenSize == 0 || currentScreenSize >= initialScreenSize) {
	        		setTimeout(function() {
	        			obj.removeClass('androidKeyboardIn');
	        			obj.addClass('androidKeyboardOut');
		        	}, 50);
	        	}
	            break; 
	    }
		
	}


	//touchstart事件
	function touchSatrtFunc(evt) {
	    try {
	        startX = evt.touches[0].pageX;
	    	startY = evt.touches[0].pageY;
	    } catch (e) {
	        alert('touchSatrtFunc：' + e.message);
	    }
	}

	function touchMoveFunc(evt) {
	    try {
	    	if(/(Android)/i.test(navigator.userAgent)) {//Android下不会触发touchend事件，所以隐藏菜单移到touchmove中来处理
	    		endX = evt.changedTouches[0].pageX;
			    endY = evt.changedTouches[0].pageY;
			    hideBar($('[role="barfooter"]'));
	    	}

	    } catch (e) {
	        alert('touchMoveFunc：' + e.message);
	    }
	}

	//touchend事件
	function touchEndFunc(evt) {
	    try {
		    endX = evt.changedTouches[0].pageX;
		    endY = evt.changedTouches[0].pageY;
		    
		    hideBar($('[role="barfooter"]'));
	    }
	    catch (e) {
	        alert('touchEndFunc：' + e.message);
	    }
	}

	//绑定事件
	function bindEvent() {
	    document.addEventListener('touchstart', touchSatrtFunc, false);
	    document.addEventListener('touchmove', touchMoveFunc, false);
	    document.addEventListener('touchend', touchEndFunc, false);
	}
	bindEvent();
};

page.load = function (){
	this.act();
	this.asideMenu();
	this.scrollable();
	this.toggleFooter();

	/* fixed android keyboard when infocus */
	$('[role="barfooter"]').androidKeyboard({animation:'androidKeyboard'});

	/* disable aside-menu touchmove */
	$(document).on('touchmove', '.aside-menu', function(e){
		e.preventDefault();
	}, false);
	return this;
};


page.load();


