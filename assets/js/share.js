/*
 * author : wushuyi
 * Copyright : wanfan
 */

// 获取 文件路径 
(function(path, constructor) {
    constructor[path] = {
		//	
		full: null,
        absolute: (function() {
            var arry = window.location.href.split('/');
            var len = arry.length - 1;
            var path = '';
            for (var i = 0; i < len; i++) {
                path += arry[i] + "/";
            }
			return path;
        })(),
		relative: (function() {
            var re = new RegExp('share(\.min)?\.js.*'),
            scripts = document.getElementsByTagName('script');
            for (var i = 0, ii = scripts.length; i < ii; i++) {
                var path = scripts[i].getAttribute('src');
                if (re.test(path)){
					return path.replace(re, '');
				}
            }
        })()
    };
	(function(){
		var _THIS = constructor[path];
		_THIS.full = _THIS.absolute +  _THIS.relative;
	})();
})('urlpath', this);

document.addEventListener('WeixinJSBridgeReady', function onBridgeReady() {
	window.shareData = {
		"imgUrl" : urlpath.full + "../image/share/weixin.jpg",
		"timeLineLink" : urlpath.absolute + "hdxq.html",
		"sendFriendLink" : urlpath.absolute + "hdxq.html",
		"weiboLink" : urlpath.absolute + "hdxq.html",
		"tTitle" : "碧欧泉七夕礼遇，给TA一场非同寻常的告白！",
		"tContent" : "碧欧泉告诉你，爱要大声说出来，立刻对TA说出你的七夕泉心密语！",
		"fTitle" : "碧欧泉七夕礼遇，给TA一场非同寻常的告白！",
		"fContent" : "碧欧泉告诉你，爱要大声说出来，立刻对TA说出你的七夕泉心密语！",
		"wContent" : "碧欧泉告诉你，爱要大声说出来，立刻对TA说出你的七夕泉心密语！"
	};
	// 发送给好友
	WeixinJSBridge.on('menu:share:appmessage', function(argv) {
		WeixinJSBridge.invoke('sendAppMessage', {
			"img_url" : window.shareData.imgUrl,
			"link" : window.shareData.sendFriendLink,
			"desc" : window.shareData.fContent,
			"title" : window.shareData.fTitle
		}, function(res) {
			_report('send_msg', res.err_msg);
		})
	});
	// 分享到朋友圈
	WeixinJSBridge.on('menu:share:timeline', function(argv) {
		WeixinJSBridge.invoke('shareTimeline', {
			"img_url" : window.shareData.imgUrl,
			"img_width" : "640",
			"img_height" : "640",
			"link" : window.shareData.timeLineLink,
			"desc" : window.shareData.tContent,
			"title" : window.shareData.tTitle
		}, function(res) {
			_report('timeline', res.err_msg);
		});
	});
	// 分享到微博
	WeixinJSBridge.on('menu:share:weibo', function(argv) {
		WeixinJSBridge.invoke('shareWeibo', {
			"content" : window.shareData.wContent,
			"url" : window.shareData.weiboLink,
		}, function(res) {
			_report('weibo', res.err_msg);
		});
	});
}, false);
