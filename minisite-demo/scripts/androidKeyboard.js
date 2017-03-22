/**
 * 
 * @authors Jack.Chan (fulicat@qq.com)
 * @date    2014-07-02 17:20:51
 * @update  2014-07-14 10:44:09
 * @version 1.2
 *
 *  css animation:
	.androidKeyboardIn{
		transform: translateY(178px);
		-webkit-transform: translateY(178px);
		transition: transform .05s;
		-webkit-transition: -webkit-transform .05s;
	}
	.androidKeyboardOut{
		transform: translateY(0px);
		-webkit-transform: translateY(0px);
		transition: transform .1s;
		-webkit-transition: -webkit-transform .1s;
	}
* useage:
* $('.bar-tab').androidKeyboard({animation:'androidKeyboard'});
 */
;(function($){
	$.fn.androidKeyboard = function(opts){
		if(!$(this).size())return false;
		var $opt = $.extend({animation:'', delay:200}, opts);
		var $this = $(this);
		var inputArr = [
			'input[type="text"]',
			'input[type="search"]',
			'input[type="password"]',
			'input[type="datetime"]',
			'input[type="datetime-local"]',
			'input[type="date"]',
			'input[type="month"]',
			'input[type="time"]',
			'input[type="week"]',
			'input[type="number"]',
			'input[type="email"]',
			'input[type="url"]',
			'input[type="tel"]',
			'input[type="color"]',
			'textarea'
		];
		$opt.delayHandle = null,
		$opt.initialScreenSize = window.innerHeight;
		$opt.fn = {
			In: function(){
				if($opt.animation){
					$this.removeClass($opt.animation+'In '+$opt.animation+'Out');
					$this.addClass($opt.animation+'Out');
				}else{
					$this.show();
				};
			},
			Out: function(){
				clearTimeout($opt.delayHandle);
				if($opt.animation){
					$this.removeClass($opt.animation+'In '+$opt.animation+'Out');
					$this.addClass($opt.animation+'In');
				}else{
					$this.hide();
				};
			}
		};
		window.addEventListener('resize', function(){
			if(window.innerHeight < $opt.initialScreenSize){
				$opt.fn.Out();
			}else{
				$opt.fn.In();
			};
		}, false);
		$(document).on('focus', inputArr.join(','), function(){
			$opt.fn.Out();
		}).on('blur', inputArr.join(','), function(){
			$opt.delayHandle = setTimeout(function(){
				$opt.fn.In();
			}, $opt.delay);
		});
		return this;
	};
})($);