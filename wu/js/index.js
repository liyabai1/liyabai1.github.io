window.onload = function mainStyle(){
	var pingmuwidth = document.body.clientWidth;
	var contentBoxWidth = pingmuwidth - 250;
	var contentBox = document.getElementsByClassName('contentBox')[0];
		contentBox.style.width = contentBoxWidth + "px";
}


var tag = [
	{
		icon: "imgs/icon/CYDP.svg",
		class: "CYDP",
		tagName: "创意短片",
		webItems: [
			{
				webName: "V电影",
				icon: "imgs/icon/CYDP/Vdianying.png",
				url: "https://www.vmovier.com/",
				info: "高品质短片分享平台"
			},{
				webName: "新片场",
				icon: "imgs/icon/CYDP/xinpianchang.png",
				url: "https://www.xinpianchang.com/square",
				info: "发现全球优质视频与创作人，与百万创作人一起成长"
			},{
				webName: "NOWNESS",
				icon: "imgs/icon/CYDP/NOWNESS.png",
				url: "https://www.nowness.cn/",
				info: "全球创意影像圈"
			},{
				webName: "Sandwich",
				icon: "imgs/icon/CYDP/sandwich.png",
				url: "https://sandwich.co/",
				info: "科技电视广告视频发布平台"
			},{
				webName: "天空之城",
				icon: "imgs/icon/CYDP/tiankongzhicheng.png",
				url: "https://www.skypixel.com/",
				info: "全球航拍爱好者和专业摄影师的作品社区"
			},{
				webName: "火焰之美",
				icon: "imgs/icon/CYDP/huoyanzhimei.png",
				url: "https://www.envisioningchemistry.cn/flames",
				info: "火焰之美——重现化学"
			},{
				webName: "Vimeo",
				icon: "imgs/icon/CYDP/vimeo.png",
				url: "https://vimeo.com/",
				info: "一体化视频解决方案"
			},{
				webName: "TVCBOOK",
				icon: "imgs/icon/CYDP/TVCBOOK.png",
				url: "https://www.tvcbook.com/",
				info: "你感兴趣的创意都在T站"
			},{
				webName: "shots",
				icon: "imgs/icon/CYDP/shots.png",
				url: "https://www.shots.net/",
				info: "最前沿的创意"
			},{
				webName: "AbanCommercials",
				icon: "imgs/icon/CYDP/AbanCommer.png",
				url: "https://abancommercials.com/",
				info: "美国电视广告"
			}


		]
	},
	{
		icon: "imgs/icon/JC.svg",
		class: "JC",
		tagName: "PS、Pr教程",
		webItems: [
			{
				webName: "新CG儿",
				icon: "imgs/icon/JC/CG.png",
				url: "https://www.newcger.com/",
				info: "AE模板_视频素材_免费下载"
			},{
				webName: "",
				icon: "imgs/icon/JC/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/JC/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/JC/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/JC/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/JC/.png",
				url: "",
				info: ""
			},
		]
	},
	{
		icon: "imgs/icon/CYWA.svg",
		class: "CYWA",
		tagName: "创意文案",
		webItems: [
			{
				webName: "纽约客",
				icon: "imgs/icon/CYWA/niuyueke.png",
				url: "https://www.newyorker.com/",
				info: "《纽约客》的报道、简介、突发新闻、文化报道、播客、视频和漫画。"
			},{
				webName: "itsnicethat",
				icon: "imgs/icon/CYWA/itsnicethat.png",
				url: "https://www.itsnicethat.com/",
				info: "It\'s nice that "
			},{
				webName: "Deck of Briliance",
				icon: "imgs/icon/CYWA/Deck.png",
				url: "https://deckofbrilliance.com/zh-hans/",
				info: "帮助创意专业人士产生点子"
			},{
				webName: "设计癖",
				icon: "imgs/icon/CYWA/shejipi.png",
				url: "https://www.shejipi.com/",
				info: "关注设计癖 发现好设计"
			},{
				webName: "Voicer",
				icon: "imgs/icon/CYWA/voicer.png",
				url: "http://www.voicer.me/",
				info: "分享设计和生活的美学"
			},{
				webName: "Fubiz Media",
				icon: "imgs/icon/CYWA/FM.png",
				url: "http://www.fubiz.net/contact/",
				info: ""
			},{
				webName: "Gallery",
				icon: "imgs/icon/CYWA/gallery.png",
				url: "https://www.commarts.com/gallery",
				info: "通讯艺术的项目。"
			},{
				webName: "We Heart It",
				icon: "imgs/icon/CYWA/weheartit.png",
				url: "https://weheartit.com/",
				info: "时尚、壁纸、箴言、名人等等"
			},{
				webName: "文案狗",
				icon: "imgs/icon/CYWA/wenangou.png",
				url: "http://wenangou.com/",
				info: "给文案🐶一点灵感"
			},{
				webName: "文案迷",
				icon: "imgs/icon/CYWA/wenanmi.png",
				url: "http://www.wenanmi.com/",
				info: "文字是最好的表达方式"
			},{
				webName: "书格",
				icon: "imgs/icon/CYWA/shuge.png",
				url: "https://new.shuge.org/",
				info: "有品位的数字古籍图书馆"
			},{
				webName: "Mv Cat",
				icon: "imgs/icon/CYWA/mvcat.png",
				url: "https://www.mvcat.com/",
				info: "人生如戏，戏如人生，命由己造，相由心生。"
			}
			
		]
	}
]

var navTag = new Vue({
	el: "#tag",
	data: {
		tags: tag
	}
})

var webContentBox = new Vue({
	el: "#webContent",
	data: {
		tag: tag
	}
})