var arvato = {
	'globalPath':'/biotherm',
	'domain2': window.location.protocol + "//"
				+ window.location.host
				+ "/handy",
				
				isEmail:function(email){
			    	invalidChars = " /;,:{}[]|*%$#!()`<>?";
			        if (email == "")
			        {
			        return false;
			        }
			        for (i=0; i< invalidChars.length; i++)
			        {
			        badChar = invalidChars.charAt(i)
			        if (email.indexOf(badChar,0) > -1) {
			        return false;
			        }
			        }
			        atPos = email.indexOf("@",1)
			        if (atPos == -1) {   return false; }
			        if (email.indexOf("@", atPos+1) != -1) {   return false; }
			        periodPos = email.indexOf(".",atPos)
			        if(periodPos == -1) {
			        return false; // and at least one "." after the "@"
			        }
			        if ( atPos +2 > periodPos) {
			        return false; // and at least one character between "@" and "."
			        }
			        if ( periodPos +3 > email.length) {   return false; }
			        return true;
			    },

			    isTel:function(str){
			    	var regu =/^[1][3,5,8][0-9]{9}$/;
			    	var re = new RegExp(regu);
			    	if (re.test(str)) {
			    	return true;
			    	}else{
			    	return false;
			    	}
			    },
				
	logAjaxError:function(url,jqXHR){
			$.post('/handy/mmall/log.html',{'l':'error','t':'ajax','c':'url['+url+'] '+jqXHR.readyState +' '+ jqXHR.status +' '+ jqXHR.responseText});
	},
				
	gotoCart:function(){
		window.location.href = arvato.domain2+"/mmall/cart.html?fp=1&c=1&f=bio&id=214&pre=checklogin";
	},
	
	weiboShare:function(_url,_desc,_img){
			var desc = encodeURIComponent(_desc+" "+_url);
			var pic = encodeURIComponent(
					window.location.protocol + "//"
					+ window.location.host
					+ arvato.globalPath+_img
					);
			window.location.href = "http://v.t.sina.com.cn/share/share.php?appkey=2530574100&title="+desc+"&pic="+pic;
	},
		
	getCartItem:function(delegate){
		$.ajax({
			url:arvato.domain2+'/mmall/itemedit.html',
			type:'post',
			dataType:'json',
			data:{"opr":"query", "f":"biotherm"},
			success:function(r2){						
				if(r2.ret && r2.ret == '00'){
					var cartSize = 0;
					if(r2.cookie){
						var id,iid,ids;
						ids = r2.cookie.split("|");
						ids ? (id = ids[0].substring(0,ids[0].indexOf('*'))) :'';
						cartSize = ids.length;
					}else{
						
					}
					delegate.getItems(cartSize);
				}else{
				}
			},
			error:function(){
			}
		});
	},
	
	addItemToCart:function(delegate,id){
		$.ajax({
			url:this.domain2+'/mmall/itemedit.html',
			type:'post',
			dataType:'json',
			data:{"opr":"edit","products":id},
			success:function(r2){						
				if(r2.ret && r2.ret == '00'){
					arvato.getCartItem(delegate);
				}else{
					alert('添加购物车失败，请稍后再试');
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				arvato.logAjaxError(baseurl+'mmall/itemedit.html',jqXHR);
				alert('网络错误，请稍后再试');
			}
		});
	},
	
	//liang.xue edit this.
	buyItem2:function(id,brand,eventname){
		var iid = id + "*-1*1";
		console.log(this.domain2);
		$.ajax({
			url:this.domain2+'/mmall/itemedit.html',
			type:'post',
			dataType:'json',
			data:{"opr":"edit","products":id},
			success:function(r2){
				if(r2.ret && r2.ret == '00'){
					arvato.setFirstUrlHome();
					arvato.setIndexPage(window.location.protocol + "//" + window.location.host + arvato.globalPath);
					window.location.href = window.location.protocol + "//" + window.location.host
					+ "/handy" +"/mmall/cart.html?f="+brand+"&pre=checklogin&fp=1&c=1&id="+id+(eventname?"&event="+eventname:"");
				}else{
					alert('添加购物车失败，请稍后再试');
				}
			},
			error:function(jqXHR,textStatus,errorThrown){
				arvato.logAjaxError(baseurl+'mmall/itemedit.html',jqXHR);
				alert('网络错误，请稍后再试');
			}
		});
	},
	//edit end
	
//	buyItem:function(id,brand,eventname){
//		var iid = id + "*-1*1";
//		$.ajax({
//			url:this.domain2+'/mmall/itemedit.html',
//			type:'post',
//			dataType:'json',
//			data:{"opr":"lux","pros":iid},
//			success:function(r2){
//				if(r2.ret && r2.ret == '00'){
//					arvato.setFirstUrlHome();
//					arvato.setIndexPage(window.location.protocol + "//"
//							+ window.location.host
//							+ arvato.globalPath);
//					window.location.href = window.location.protocol + "//"
//					+ window.location.host
//					+ "/handy" +"/mmall/cart.html?f="+brand+"&pre=checklogin&fp=1&c=1&id="+id+(eventname?"&event="+eventname:"");
//				}else{
//					alert('添加购物车失败，请稍后再试');
//				}
//			},
//			error:function(){
//				alert('网络错误，请稍后再试');
//			}
//		});
//	},
	
	buyItem:function(id,event){
		$.ajax({
			url:arvato.domain2+'/mmall/itemedit.html',
			type:'post',
			dataType:'json',
			data:{"opr":"edit","products":id},
			success:function(r2){						
				if(r2.ret && r2.ret == '00'){
					if(r2.msg && $.trim(r2.msg)!=''){
						alert(r2.msg);
					}
					arvato.setFirstUrlHome();
					arvato.setIndexPage(window.location.protocol + "//"
							+ window.location.host
							+ arvato.globalPath);
					window.location.href = arvato.domain2 +"/mmall/cart.html?pre=checklogin&f="+event+"&fp=1&c=1&id="+id;
				}else{
					alert('添加购物车失败，请稍后再试');
				}
			},
			error:function(){
				alert('网络错误，请稍后再试');
			}
		});
	},
	
	$ : function(objName) {
		if (document.getElementById) {
			return eval('document.getElementById("' + objName + '")')
		} else {
			return eval('document.all.' + objName)
		}
	},
	isIE : navigator.appVersion.indexOf("MSIE") != -1 ? true : false,
	addEvent : function(l, i, I) {
		if (l.attachEvent) {
			l.attachEvent("on" + i, I)
		} else {
			l.addEventListener(i, I, false)
		}
	},
	delEvent : function(l, i, I) {
		if (l.detachEvent) {
			l.detachEvent("on" + i, I)
		} else {
			l.removeEventListener(i, I, false)
		}
	},
	readCookie : function(O) {
		var o = "", l = O + "=";
		if (document.cookie.length > 0) {
			var i = document.cookie.indexOf(l);
			if (i != -1) {
				i += l.length;
				var I = document.cookie.indexOf(";", i);
				if (I == -1)
					I = document.cookie.length;
				o = unescape(document.cookie.substring(i, I))
			}
		}
		;
		return o
	},
	writeCookie : function(i, l, o, c) {
		var O = "", I = "";
		if (o != null) {
			O = new Date((new Date).getTime() + o * 3600000);
			O = "; expires=" + O.toGMTString();
		}
		;
		if (c != null) {
			I = ";domain=" + c
		}
		;
		document.cookie = i + "=" + escape(l) + O + I
	},
	readStyle : function(I, l) {
		if (I.style[l]) {
			return I.style[l]
		} else if (I.currentStyle) {
			return I.currentStyle[l]
		} else if (document.defaultView
				&& document.defaultView.getComputedStyle) {
			var i = document.defaultView.getComputedStyle(I, null);
			return i.getPropertyValue(l)
		} else {
			return null
		}
	},
	setCookie : function(c_name,val,exp_days){
		var exdate = new Date();
		exdate.setDate(exdate.getDate()+exp_days);
		document.cookie=c_name+ "=" +escape(val)+((exp_days==null) ? "" : ";path=/;expires="+exdate.toGMTString());
	},
	getCookie : function(c_name){
		var arr = document.cookie.match(new RegExp("(^| )"+c_name+"=([^;]*)(;|$)"));
     	if(arr != null) return unescape(arr[2]); return null;
	},
	canMove:0,
	showBuyCount:function(type,serverurl){
		if(typeof type === 'string'){
			var me = this;
			if(type=='server'){
		 		$.ajax({
					url:serverurl,
					type:'POST',
					dataType:'json',
					success: function(d){
						if(d.ret=='00'){
							if(d.cookie){
								me.setCookie('icybercode_cart',d.cookie,1);
							}else{
								me.setCookie('icybercode_cart','',-1);
							}
							
							me = null;
						}
					},
					error:function(){
						me.setCookie('icybercode_cart','',0);
						me = null;
					}
		 		});
			}
		}
		var c_cart = this.getCookie('icybercode_cart');
		if(c_cart){
			var grp = c_cart.split('|');
			var c = 0;
			for(var i=0;i<grp.length;i++){
				c+=1;
			}
			if(c){
				$('div[name="buy_count"]').css('display','block').children('div[name="count"]').empty().html(c);
			}else{
				$('div[name="buy_count"]').css('display','none').children('div[name="count"]').empty();
			}
		}else{
			$('div[name="buy_count"]').css('display','none').children('div[name="count"]').empty();
		}
	},
	addToCart:function(_product_id,_sample_id,_color_id){
		//赠品
		if(typeof _sample_id === 'undefined'){
			if(_product_id){
				var c_cart = this.getCookie('icybercode_cart');
				if(c_cart){
					var grp = c_cart.split('|'),flag=0;
					for(var i=0;i<grp.length;i++){
						if(grp[i]==_product_id){
							flag = 1;
						}
					}
					if(!flag){
						c_cart+='|'+_product_id;
					}
					this.setCookie('icybercode_cart',c_cart,1);
				}else{
					this.setCookie('icybercode_cart',_product_id,1);
				}
			}
		}else{
			//产品*小样
			if(_product_id){
				var c_cart = this.getCookie('icybercode_cart');
				if(_sample_id && _sample_id != '-1'){
					if(c_cart){
						c_cart+='|'+_product_id+'*'+_sample_id+(typeof _color_id === 'undefined'?'':'*'+_color_id);
						this.setCookie('icybercode_cart',c_cart,1);
					}else{
						this.setCookie('icybercode_cart',_product_id+'*'+_sample_id+(typeof _color_id === 'undefined'?'':'*'+_color_id),1);
					}
				}else{
					if(c_cart){
						c_cart+='|'+_product_id;
						this.setCookie('icybercode_cart',c_cart,1);
					}else{
						this.setCookie('icybercode_cart',_product_id,1);
					}
				}
			}
		}
	},
	delFromCart:function(_product_id,_sample_id,_color_id){
		if(!_product_id){
			return;
		}
		if(typeof _sample_id === 'undefined'){
			var arr = _product_id.split('*');
			if(arr.length==2){
				_product_id = arr[0];
				_sample_id = arr[1];
			}else if(arr.length==3){
				_product_id = arr[0];
				_sample_id = arr[1];
				_color_id = arr[2];
			}else{
				return;
			}
		}
		var c_cart = this.getCookie('icybercode_cart');
		if(c_cart){
			var grp = c_cart.split('|');
			var item = _product_id+'*'+_sample_id+(typeof _color_id === 'undefined'?'':'*'+_color_id);
			for(var i=0;i<grp.length;i++){
				if(grp[i]==item){
					grp[i] = '';
				}
			}
			c_cart = grp.join('|');
			this.setCookie('icybercode_cart',c_cart,1);
		}
	},
	asynCart:function(str){
		this.setCookie('icybercode_cart',str,1);
	},
	objectHasProperty:function(obj, propName){
		if (obj.hasOwnproperty){
			return obj.hasOwnproperty(propName);
		}
		else{
			return ('undefined' !== typeof obj[propName]);
		}
	},
	isEventSupported:function(eventName,testElId) {
		var el = document.getElementById(testElId),isSupported;
		//var el = document.getElementById('send_list'),isSupported;
		eventName = 'on' + eventName;
		isSupported = this.objectHasProperty(el, eventName);
		if (!isSupported) {
			el.setAttribute(eventName, 'return;');
			isSupported = typeof el[eventName] === 'function';
		}
		el = null;
		return isSupported;
	},
	isNothing:function(val) {
		if (typeof val === 'undefined' || val == null) {
			return true;
		} else {
			return false;
		}
	},
	detect:function(testEl){
		this._transitionPrefix = (window.document.documentElement.style.webkitTransition !== undefined) ? "webkitTransition"
				: (window.document.documentElement.style.MozTransition !== undefined) ? "MozTransition"
						: "transition";
		this._transformLabel = (window.document.documentElement.style.webkitTransform !== undefined) ? "webkitTransform"
				: (window.document.documentElement.style.MozTransition !== undefined) ? "MozTransform"
						: "transform";
		this._is3dSupported = !this.isNothing(testEl.style.WebkitPerspective);
		this._isCSSTransformSupported = (!this.isNothing(testEl.style.WebkitTransform)
				|| !this.isNothing(testEl.style.MozTransform) || !this.isNothing(testEl.style.transformProperty));
		this._moveOpts={"duration":"0.5s"};
		testEl = null;
	},
	ajastContent:function(){
 		var $content = $('div[name="content"]');
 		if($content.length){
 	 		var _wh = window.innerHeight;
 	 		var _ah = _wh-71;
 	 		if($content.height()<_ah){
 	 			$content.css('height',_ah+'px');
 	 			_ah = _wh = null;
 	 		}
 		}
 		$content = null;
	},
	track:function(op){
		if(window._arvato_t){
			_arvato_t._trackOpr(op,"","");
		}
	},
	setFirstUrlHome:function(){
		var me = this;
		//var urlHome = me.getCookie('url_home');
		//if(!urlHome){
		me.setCookie('url_home',window.location.href,1);
		//}
		me = null;
	},
	setIndexPage:function(indexUrl){
		var me = this;
		//var urlHome = me.getCookie('url_home');
		//if(!urlHome){
		// me.setCookie('index_page',window.location.href,1);
		me.setCookie('index_page',indexUrl,1);
		//}
		me = null;
	},
	goBackHome:function(){
		var me = this;
		var urlHome = me.getCookie('url_home');
		if(urlHome){
			window.location.href = urlHome;
		}else{
			window.location.href = '/';
		}
		me = null;
	},
	goBackIndex:function(){
		var me = this;
		var urlHome = me.getCookie('index_page');
		if(urlHome){
			window.location.href = urlHome;
		}else{
			window.location.href = '/';
		}
		me = null;
	}
};
$.fn.extend({
    wPageSlide: function (options) {
        var defaults = {
            width: $(window).width() + 17, //宽度：默认使用满屏
            height: $(window).height(), 	//高度：默认使用宽屏
            btnsHide: false, 			//按钮隐藏：默认否
            btnsPos: "b",					//按钮定位：10个方位，参考btnPos函数，默认中下
            cNum:1,                      //默认展示内容区个数
            autoFill:false				 //内容区是否自动
        };
        options = options || defaults;
        options.width = options.width || defaults.width;
        options.height = options.height || defaults.height;
        options.btnsPos = options.btnsPos || defaults.btnsPos;
        options.btnsHide = options.btnsHide || defaults.btnsHide;
        options.fullPage = options.fullPage || defaults.fullPage;

        var extObj = {};
        var $body = $("body");
        var $wslide = $(this);
        var $wpages = $wslide.children('div[name="wpages"]');
        var $wpagesli = $wpages.children("div.wpage");
        var $wbtns = $wslide.children("ul#wpagebtns");
        var $wbtnsli = $wbtns.children("li");
        var pagewidth = options.width;
        var pageheight = options.height;
        var entouch = options.entouch;
        var windowwidth = $wpagesli.size() * pagewidth;
        var slidewidth = pagewidth;
        var btnwidth = $wbtns.width();
        var btnheight = $wbtns.height();
        var btnpos = btnPos(options.btnsPos);
        var cNum = options.cNum?options.cNum:1;
        var noendtouch = options.noendtouch?options.noendtouch:false;
        var pagefun = options.pagefun?options.pagefun:null;
        extObj.currentindex = 0;
        var currentcls = "current";
        var delay = 200;
        var drag = pagewidth * 0.1;
        var canmovevert = options.canmovevert?options.canmovevert:false;
        if (options.width == defaults.width) { $body.css({ overflow: "hidden", margin: 0, padding: 0 }); }
        $wbtns.css({ position: "absolute", margin: 0, padding: 0, zIndex: 11, top: btnpos.y, left: btnpos.x, display: options.btnsHide ? "none" : "" });
        $wpages.css({ position: "relative", margin: 0, padding: 0, zIndex: 10 });
        $wslide.css({ position: "relative", overflow: "hidden", width: cNum*slidewidth, height: pageheight });
        $wbtns.children("li:eq(0)").addClass(currentcls);

        $wpagesli.each(function (index) {
            $(this).css({ position: "absolute", top: 0, left: pagewidth * index, width: pagewidth, height: pageheight });
        });

        if(entouch){
            var orix=0,tarx=0;
            
            var me = this,isMove = 0,pageSize=$wpagesli.size()-1;
            
            var startx = 0,$me = $(me),isFinished=0,starty=0,tary=0;
            $me.bind('touchstart',function(event){
            	arvato.moveStatus = 1;
            	isMove = 1,isFinished=0;
            	if(noendtouch){
            		var currN = -Math.round($wpages.position().left/pagewidth);
            		if(currN==pageSize){
            			isMove = 2;
            		}
            	}
            	if(event.originalEvent.touches){
            		startx = event.originalEvent.touches[0].clientX;
            		if(canmovevert){
            			starty = event.originalEvent.touches[0].clientY;
            		}
            		orix = startx-$wpages.position().left;
            		//tarx = event.originalEvent.touches[0].clientX;
                    //拖动时排除例外
                    if (targetInExcluded(event)) { return; }
            	}
            	event.stopPropagation();
            })
            $me.bind('touchmove',function(event){
            	if(!isMove){
            		return;
            	}
                tarx = event.originalEvent.touches[0].clientX;
                var left = tarx - orix;
//                if(isMove==2){
//                	if(tarx>startx){
//                		pageSilde(left, 0);
//                	}
//                }else{
//                	
//                }
                pageSilde(left, 0);
                if(canmovevert){
                	tary = event.originalEvent.touches[0].clientY;
                    if(Math.abs(tarx-startx)<3 && Math.abs(tary-starty)>2){
                    	arvato.canMove = 1;
                    }else{
                    	//arvato.canMove = 0;
                    }
                }
//              event.preventDefault();
                //event.stopPropagation();
            })        
            
            var totalN = pageSize,savedIndex=-2;
            var doTouchEndAndCancel = function(event){
            	isMove = 0;
            	arvato.canMove = 0;
            	arvato.moveStatus = 0;
            	if(isFinished){
            		return;
            	}
            	var currleft = $wpages.position().left;
            	var currN = -Math.round(-currleft/pagewidth);
            	if(currN<=0 && currN >=(-totalN)){
            		if(cNum==3){
            			if(currN<=(1-totalN)){
            				pageSilde((1-totalN)*pagewidth,delay);
            			}else{
            				pageSilde(-Math.round(-currleft/pagewidth)*pagewidth,delay);
            			}
            		}else{
            			pageSilde(-Math.round(-currleft/pagewidth)*pagewidth,delay);
            		}
            		
            	}else if(currN<-totalN){
            		pageSilde(-totalN*pagewidth,delay);
            	}else{
            		if(cNum == 3){
            			if(currN>=1){
            				pageSilde(pagewidth,delay);
            			}else{
            				pageSilde(0,delay);
            			}
            		}else{
            			pageSilde(0,delay);
            		}
            		
            	}
            	if(pagefun!=null){
            		
            		if(savedIndex!=extObj.currentindex){
            			savedIndex = extObj.currentindex;
                		if(typeof pagefun === 'function'){
                			pagefun(extObj.currentindex,pageSize);
                		}            			
            		}
            	}
            	isFinished = 1;
            	//event.stopPropagation();
            }
            $me.bind('touchend',doTouchEndAndCancel).bind('touchcancel',doTouchEndAndCancel)
            
            extObj.resize = function(_cNum,_w,_h){
                pagewidth = _w;
                pageheight = _h;
                windowwidth = $wpagesli.size() * pagewidth;
                slidewidth = pagewidth;
                btnwidth = $wbtns.width();
                btnheight = $wbtns.height();
                btnpos = btnPos(options.btnsPos);
                cNum = _cNum;
                drag = pagewidth * 0.1;
                if (_w == $(window).width() + 17) { $body.css({ overflow: "hidden", margin: 0, padding: 0 }); }
                $wbtns.css({ position: "absolute", margin: 0, padding: 0, zIndex: 11, top: btnpos.y, left: btnpos.x, display: options.btnsHide ? "none" : "" });
                $wpages.css({ position: "relative", margin: 0, padding: 0, zIndex: 10 });
                $wslide.css({ position: "relative", overflow: "hidden", width: cNum*slidewidth, height: pageheight });
                $wbtns.children("li:eq(0)").addClass(currentcls);

                $wpagesli.each(function (index) {
                    $(this).css({ position: "absolute", top: 0, left: pagewidth * index, width: pagewidth, height: pageheight });
                });
                
                pageSilde(0,0);
            };
        }

        //页面滑动
        function pageSilde(left, delay) {

            $wpages.animate({ left: left }, delay, function () {
            	
                var index = Math.round(Math.abs(left) / pagewidth);
                
                if(cNum==3 && left>0){
                	index = 0-index;
                }
                
                if (extObj.currentindex != index) {
                    extObj.currentindex = index;
                    if(pagefun!=null){
                		if(typeof pagefun === 'function'){
                			pagefun(extObj.currentindex,pageSize);
                		}
                    }
                    //$wbtnsli.removeClass(currentcls);
                    //$wbtns.children("li:eq(" + index + ")").addClass(currentcls);
                }
            });
        }
        
        function initLoc(idx){
        	$wpages.css('left',0-idx*pagewidth);
        }
        
        function next(){
        	if(cNum==3){
        		var tn = $wpagesli.size()-3;
        		if(extObj.currentindex>=tn){
        			pageSilde((-tn-1)*pagewidth,delay);
        		}else{
                	if(extObj.currentindex<$wpagesli.size()-1){
                		pageSilde((-extObj.currentindex-1)*pagewidth,delay);
                	}	
        		}
        	}else{
            	if(extObj.currentindex<$wpagesli.size()-1){
            		pageSilde((-extObj.currentindex-1)*pagewidth,delay);
            	}	
        	}
        	
        }
        
        function prev(){
        	if(cNum==3){
            	if(extObj.currentindex<=-1){
            		pageSilde(pagewidth,delay);
            	}else{
                	if(extObj.currentindex>=0){
                		pageSilde((1-extObj.currentindex)*pagewidth,delay);
                	}	
            	}
        	}else{
            	if(extObj.currentindex>0){
            		pageSilde((1-extObj.currentindex)*pagewidth,delay);
            	}	
        	}
        	
        }
        
        //拖动时排除例外
        function targetInExcluded(event) {
            var taro = event.srcElement || event.target;
            var excluded = ["input", "textarea"];  //例外列表
            var _tName = $(taro).attr("tagName");
            for (var i = 0; i < excluded.length; i++) {
                if (_tName && _tName.toLowerCase() == excluded[i].toLowerCase()) {
                    return true;
                }
            }
            return false;
        }

        //按钮位置
        function btnPos(pos) {
            var x = 10;
            var y = 10;
            var xr = pagewidth - btnwidth - x;
            var xc = pagewidth / 2 - btnwidth / 2 + x;
            var yc = pageheight / 2 - btnheight / 2 - y;
            var yb = pageheight - btnheight - y;
            var offset = { x: yc, y: yb };
            switch (pos) {
                case "t": offset = { x: xc, y: y }; break; 	//中上
                case "lt": offset = { x: x, y: y }; break; 	//左上
                case "l": offset = { x: x, y: yc }; break; 	//左		
                case "lb": offset = { x: x, y: yb }; break; 	//左下
                case "b": offset = { x: xc, y: yb }; break; 	//中下
                case "c": offset = { x: xc, y: yc }; break; 	//中间
                case "rt": offset = { x: xr, y: y }; break; 	//右上
                case "r": offset = { x: xr, y: yc }; break; 	//右
                case "rb": offset = { x: xr, y: yb }; break; //右下
            }
            return offset;
        }
        
        
        extObj.pageSilde = pageSilde;
        extObj.initLoc = initLoc;
        extObj.next = next;
        extObj.prev = prev;
        return extObj;
    }
});

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
	
    var direction = GetSlideDirection(startX, startY, endX, endY);
    switch (direction) {
       
	    case 1:
	    	if(currentScreenSize == 0 || currentScreenSize >= initialScreenSize) {
        		setTimeout(function() {
	        		obj.slideUp(50);
	        	}, 100);
        	}
            break;
            
        case 2:
        	if(currentScreenSize == 0 || currentScreenSize >= initialScreenSize) {
        		setTimeout(function() {
        			obj.slideDown(200);
	        	}, 100);
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
		    
		    hideBar($('#tabbar'));
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
	    
	    hideBar($('#tabbar'));
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
window.onload = bindEvent;