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
		tagName: "PS、AE教程",
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
				webName: "",
				icon: "imgs/icon/CYWA/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/CYWA/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/CYWA/.png",
				url: "",
				info: ""
			},{
				webName: "",
				icon: "imgs/icon/CYWA/.png",
				url: "",
				info: ""
			},
			
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