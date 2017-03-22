/**
 * @ProductList
 * @authors Jack.Chan (fulicat@qq.com)
 * @date    2014-08-22 18:00:14
 * @update  2014-08-22 10:15:15
 * @version 1.1 beta
 */
function ProductList(){
	var me = this;
	this.name = 'ProductList';
	this.author = 'Jack.Chan';
	this.ver = '1.0 beta';
	var prefix = (function(){
		var ret = '';
		var element = document.createElement('div');
		var matchesSelector = element.webkitMatchesSelector || element.mozMatchesSelector || element.oMatchesSelector || element.matchesSelector;
		if(matchesSelector){
			ret = matchesSelector.name.toLowerCase().replace('matchesselector','');
			if(ret)ret = '-'+ ret +'-';
		};
		return ret.toString();
	})();
	var transition = prefix+'transition';

	me.isSupportTouch = (function(){
		var ret = false;
		try{document.createEvent('TouchEvent');ret=true;}catch(ex){};
		return ret;
	})();

	me.$container = $('.container-products');
	me.$pl = me.$container.find('.product-list');
	me.$item = me.$pl.find('.product-list-item');
	me.itemHeight = 60;
	me.index = 0;
	var pos = {sY:0, eY:0, sTop:0, eTop:0, tmp:0};
	me.init = function(){
		if(me.isSupportTouch){
			var touch;
			var hasTouchMoved = false;
			var hasTouchEnd = false;
			me.$container.on('touchstart', function (e){
				touch = e.touches[0];
				pos.sY = pos.eY = touch.pageY;
				pos.sTop = parseInt(me.$pl.css('top'));
			}).on('touchmove', function (e){
				touch = e.touches[0];
				pos.eY = touch.pageY;
				hasTouchMoved = true;
				pos.eTop = parseInt(me.$pl.css('top'));
				if(pos.eTop<=0 && pos.eTop >= -(me.$item.size() - 1) * me.itemHeight){
					pos.tmpY = parseInt(pos.sTop + pos.eY - pos.sY);
					me.$pl.css({
						'top': pos.tmpY +'px',
						transition: '0'
					});
				};
				if(me.index != -Math.round(pos.eTop / me.itemHeight)){
					me.index = -Math.round(pos.eTop / me.itemHeight);
					me.select.apply(this, [me.index]);
				};
			}).on('touchend', function (e){
				pos.eTop = parseInt(me.$pl.css('top'));
				if(pos.eTop>0){
					me.$pl.css('top','0px');
				};
				if(pos.eTop < -(me.$item.size() - 1) * me.itemHeight){
					pos.tmpY = -(me.$item.size() - 1) * me.itemHeight;
					me.$pl.css({
						'top': pos.tmpY +'px',
						transition: '0'
					});
				};
				pos.eTop = parseInt(me.$pl.css('top'));
				if(me.index != -Math.round(pos.eTop / me.itemHeight)){
					me.index = -Math.round(pos.eTop / me.itemHeight);
					me.select.apply(this, [me.index]);
				};
				pos.tmpY = -(me.index * me.itemHeight);
				me.$pl.css({'top': pos.tmpY +'px', transition: 'top .35s'});
			});
		}else{
			console.log('your browser dosen\'t support touch event');
		};
		hasTouchMoved = false;
		hasTouchEnd = false;
		me.$item.on('touchstart', function (e){
			hasTouchMoved = false;
			hasTouchEnd = false;
		}).on('touchmove', function (e){
			hasTouchMoved = true;
		}).on('touchend', function (e){
			if(!hasTouchMoved){
				hasTouchEnd = true;
				me.index = $(this).index();
				me.select.apply(this, [me.index]);
				pos.tmpY = -(me.index * me.itemHeight);
				me.$pl.css({'top': pos.tmpY +'px', transition: 'top .35s'});
			};
		}).on('click', function(){
			if(!hasTouchEnd){
				me.index = $(this).index();
				me.select.apply(this, [me.index]);
				pos.tmpY = -(me.index * me.itemHeight);
				me.$pl.css({'top': pos.tmpY +'px', transition: 'top .35s'});
			};
		});
		me.select.apply(this, [me.index]);
	};
	me.select = function(){
		me.$item.removeClass('active').eq(me.index).addClass('active');
		var img = me.$item.eq(me.index).find('img').attr('src');
		var txt = me.$item.eq(me.index).text();
		$('.product-preview .image').attr('src', img);
		$('.product-preview .name').html(txt);
		return me;
	};
};
