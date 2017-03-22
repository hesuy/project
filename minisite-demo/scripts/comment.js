/**
 * 
 * @authors Jack.Chan (fulicat@qq.com)
 * @date    2014-07-18 14:16:25
 * @updatedate    2014-10-22 18:20:15
 * @version 1.3
 */
function commentController(){
	var me = this;
	me.name = 'commentController';
	me.debug = 0;
	me.data = [];
	me.tplData = '';
	me.$list = null,
	me.$form = null,
	me.$formMsg = null,
	me.$btnLoad = null,
	me.url = {
		get: 'comment-data.json',
		post: '',
	};
	me.pid = 0;
	me.page = 0;
	me.perPage = 5;
	me.maxPage = 0;
	me.load = function(){
		$.ajax({
			type:'GET',
			cache:false,
			url: me.url.get,
			data: {page:me.page},
			success: function(data){
				me.maxPage = data.length;
				if(me.maxPage){
					me.data = data;
					me.show();
				}else{
					console.log('no comment\n'+ data);
				};
			},
			error: function(data){
				console.log('load comment error\n'+ data);
			}
		});
		return this;
	};
	me.tpl = function (tmplate, jsondata){
		tmplate = tmplate.replace(/\{(\w+)\}/g, function (v0, v1) {
				return jsondata[v1];
		});
		return tmplate;
	};
	me.init = function(){
		me.tplData = $('#template-comment-item').html();
		me.$list = $('#list-comment').empty();
		me.$btnLoad = $('#btnLoadComment');
		me.$btnLoad.click(function(){
			if(me.$btnLoad.hasClass('btn-loading'))return false;
			me.$btnLoad.addClass('btn-loading').html('<span class="icon-loading"></span>正在加载...');
			me.showMore();
			return false;
		});
		me.$btnLoad.parent().hide();
		me.config.apply(me, []);
		return this;
	};
	me.config = function(){};
	me.toHTML = function(data){
		var html = [];
		$.each(data, function (index){
			data[index].star = (function(){
				var tmpStar = '';
				for(var i=1;i<=5;i++){
					tmpStar+='<span class="icon-star'+(i<=data[index].score?' active':'')+'"></span>';
				};
				return tmpStar;
			})();
			html.push(me.tpl(me.tplData, data[index]));
		});
		return html.join('');
	};
	me.show = function(pageid){
		me.page = pageid || me.page;
		if(!me.data.length){
			me.$list.html('<li class="comment-item tc">暂无评论</li>');
			me.$btnLoad.parent().hide();
			console.log('no comment data');
		}else{
			me.$btnLoad.parent().show();
			me.pageStart = (me.page*me.perPage);
			me.pageEnd = parseInt(me.pageStart + me.perPage);
			if(me.pageStart > me.data.length){
				console.log('no more comment');
				return this;
			};
			me.pageEnd = me.pageEnd>me.data.length ? me.data.length : me.pageEnd;
			me.tmpData = me.data.slice(me.pageStart, me.pageEnd);
			me.$list.append(me.toHTML(me.tmpData));
			if(me.pageEnd>=me.data.length){
				me.$btnLoad.addClass('btn-loading').html('没有更多内容');
			}else{
				me.$btnLoad.removeClass('btn-loading').html('加载更多');
			};
		};
		return this;
	};
	me.showMore = function(){
		me.page++;
		me.show();
		return this;
	};
	me.post = function(){
		me.$form = $('form#form-comment');
		me.$formMsg = $('#form-comment-msg');
		me.$form.submit(function(){
			var params = {
				pcode: me.pcode,
				name: $.trim($('#username').val()),
				score: $('#star').val(),
				content: $.trim($('#comment-txt').val())
			};
			if(params.content==''){
				me.$formMsg.html('<span class="error">请填评论内容</span>');
				return false;
			};
			params.name = encodeURI(params.name);
			params.content = encodeURI(params.content);
			$.ajax({
				type:'POST',
				url: me.url.post,
				data:params,
				success: function(ret){
					ret = $.trim(ret);
					params.date = '刚刚发布，后台审核中';
					if(ret=='1'){
						me.$formMsg.html('<span class="success">提交评论成功</span>');
						$('#username').val('');
						$('#comment-txt').val('');
						params.name = decodeURI(params.name);
						params.content = decodeURI(params.content);
						me.$list.prepend(me.toHTML([params]));
					}else{
						me.$formMsg.html('<span class="error">提交评论失败</span>');
					};
					setTimeout(function(){
						me.$formMsg.html('');
					}, 1000);
					if(me.debug){
						params.name = decodeURI(params.name);
						params.content = decodeURI(params.content);
						me.$list.prepend(me.toHTML([params]));
					};
				}
			});
			return false;
		});
		return this;
	};
};

