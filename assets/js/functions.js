/*
 * author : wushuyi
 * Copyright : wanfan
 */

(function(qixi, constructor) {
	constructor[qixi] = {
		// 初始化
		init : function() {
			var _THIS = this;
			this.domEvent();
			this.setWeixinOpenid();
		},
		// 设置变量
		settings : {
			openid : null,
			audiopath : null,
			srmy : '.pg1',
			djbf : '.pg2',
		},
		// 事件处理
		domEvent : function() {
			var _THIS = this;
			// 提交密码按钮
			$('.srmm_submnt').click(function() {
				var _thisDom = $(this);
				// 阻止在 请求接口 时  点击按钮
				var islock = _thisDom.hasClass('lock');
				if (islock) {
					return false;
				} else if (_THIS.settings.openid == undefined) {
					alert('请在官方微信进入');
					return false;
				}
				_thisDom.addClass('lock');
				var passwd = $('.passwdbox .passwd').val();
				if (passwd.length < 1) {
					alert("请输入密码!");
				}
				
				/*
				if (passwd == 'xiaowu') {
					_THIS.settings.audiopath = 'http://kiehls-voice.b0.upaiyun.com/auto.mp3';
					$('audio').attr({
						'src' : _THIS.settings.audiopath
					});
					_THIS.initaudio();
					_thisDom.removeClass('lock');
					return false;
				}
				*/

				var updata = {
					password : passwd,
					openId : _THIS.settings.openid
				};
				$.post('/messageGetMusic.ashx', updata, function(data) {
					if (data.result == 'success') {
						_THIS.settings.audiopath = data.jsonResponse;
						_THIS.initaudio();
						_hmt.push(['_trackPageview', '/djbf.html']);
					} else if (data.result == 'failed') {
						alert('对不起, 您的密码无效!');
					}
					_thisDom.removeClass('lock');
				}, 'json').error(function() {
					alert('服务端错误!');
					_thisDom.removeClass('lock');
				});
			});
			// 分享按钮
			$('.djbf_share').click(function() {
				var share_maks = $('.pubmaks, .share_maks');
				share_maks.show();
				setTimeout(function() {
					share_maks.hide();
				}, 3000);
			});
			// 输入框 提示信息 兼容性处理
			$("input[tipMsg]").each(function() {
				var _thisDom = $(this);
				var noTipStyle = {
					"color" : "#888"
				}, tipStyle = {
					"color" : "#000"
				};
				if (_thisDom.val() == "") {
					var oldVal = _thisDom.attr("tipMsg");
					if (_thisDom.val() == "") {
						_thisDom.attr("value", oldVal).css(noTipStyle);
					}
					_thisDom.css(noTipStyle).focus(function() {
						if (_thisDom.val() != oldVal) {
							_thisDom.css(tipStyle);
						} else {
							_thisDom.val("").css(noTipStyle);
						}
					}).blur(function() {
						if (_thisDom.val() == "") {
							_thisDom.val(oldVal).css(noTipStyle);
						}
					}).keydown(function() {
						_thisDom.css(tipStyle);
					});
				}
			});
		},
		// 初始化音频播放控件
		initaudio : function() {
			var _THIS = this;
			$('audio').attr({
				'src' : _THIS.settings.audiopath
			});
			$(_THIS.settings.srmy).hide();
			$(_THIS.settings.djbf).show();
			audiojs.events.ready(function() {
				var audios = document.getElementsByTagName('audio');
				var a1 = audiojs.create(audios[0], {
					css : false
				});
			});
		},
		// 解析 url search
		urlSearch : (function() {
			var urlSearchObj = {};
			var search = window.location.search;
			if (search && search.length > 1) {
				var search = search.substring(1);
				var items = search.split('&');
				for (var index = 0; index < items.length; index++) {
					if (!items[index]) {
						continue;
					}
					var kv = items[index].split('=');
					urlSearchObj[kv[0]] = typeof kv[1] === "undefined" ? "" : kv[1];
				}
			}
			return urlSearchObj;
		})(),
		// 设置 微信 openid
		setWeixinOpenid : function() {
			var _THIS = this;
			_THIS.settings.openid = _THIS.urlSearch.openid;
		}
	};
})('qixi', this);

(function($) {
	$(document).ready(function() {
		qixi.init();
	});

	$(window).load(function() {

	});

	$(window).resize(function() {

	});
})(window.jQuery);
