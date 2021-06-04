
var audio = new Audio()
audio.autoplay = true;

//读取页面缓存的已添加歌曲列表
var addsongListSto =  localStorage.getItem("addList")
var nowList = "addList";        //当前播放的音乐来自那个列表，addList => 左侧添加列表（默认）， searList => 搜索结果列表
var nowSongSto = localStorage.getItem("nowsong")

var app = new Vue({
    el: "#app",
    data: {
        // songsListCont: new Array(), //歌曲总数
        addedSongsList: new Array(),    //已添加歌曲的列表
        searchRes: new Array(),         //搜索结果
        nowSong: {},                    //当前播放的歌曲
        searchKeyWord: new String(),    //搜索关键词
        nowSearchPage: 1,               //当前的搜索页面
        displaySearch: false,           //控制搜索弹窗关闭
        playing: false,                 //暂停播放，默认暂停
        playMode: 1,                    //播放模式， 1=>列表循环 ，2=>随机播放 ，3=>单曲循环 
        proBar: "0%",                   //播放进度条
        nowTime: "00:00"
    },
    watch: {
        nowSong: function (){
            bg.bgimgUrl = "background-image: url(" +JSON.parse( localStorage.getItem("nowsong") ).imgUrl + ")"
        }

    },
    methods: {
        input_keywords: function () {
            var keyword = document.getElementById("searchKey").value
            this.searchKeyWord = keyword;
        },

        //关闭搜索弹窗
        closeSearch: function () {
            this.displaySearch = false
        },
        popSearBox: function () {
            this.displaySearch = !this.displaySearch;
        },

        //初始搜索
        searchSong: function (){
            this.displaySearch = true;
            if (this.searchKeyWord == ""){
                alert("请输入搜索关键字")
            }else{
                search(this.searchKeyWord)
            }
            function search(word){
                requsetData({
                    method: "GET",
                    url: "https://music.api.tianli0.top/search",
                    data: {
                        "keywords": word,
                        "limit": "20",
                        "offset": "0",
                    },
                    success(res){
                        resView(res)
                        app._data.nowSearchPage = 1;
                    }
                })
            }
        },

        //搜索上一页数据
        prePage: function () {
            var offset = this.nowSearchPage - 1 - 1;
            console.log(offset)
            this.nowSearchPage == 1 ? alert("已经是第一页啦！😛") : search(this.searchKeyWord,offset)
            function search(keyword,offset){
                requsetData({
                    method: "GET",
                    url: "https://music.api.tianli0.top/search",
                    data: {
                        "keywords": keyword,
                        "limit": "20",
                        "offset": offset,
                    },
                    success(res){
                        resView(res)
                        app._data.nowSearchPage = offset + 1;

                    }
                })
            }
        },

        //搜索下一页数据
        nextPage: function () {
            var offset = this.nowSearchPage + 1 - 1;
            console.log(offset)
            search(this.searchKeyWord,offset)
            function search(keyword,offset){
                requsetData({
                    method: "GET",
                    url: "https://music.api.tianli0.top/search",
                    data: {
                        "keywords": keyword,
                        "limit": "20",
                        "offset": offset,
                    },
                    success(res){
                        resView(res)
                        app._data.nowSearchPage = offset + 1;
                    }
                })
            }
        },

        //点击搜索栏列表试听播放
        playNow: function (index,item) {
            audio.src =  "https://music.163.com/song/media/outer/url?id=" + item.id + ".mp3";
            a = self.setInterval("_playing()",250)


            new Promise(function (resolve,reject){
                requsetData({
                    method: "GET",
                    url: "https://music.api.tianli0.top/song/detail",
                    data: {
                        "ids": item.id
                    },
                    success(res){
                        res = JSON.parse(res)
                        resolve(res.songs[0].al.picUrl)
                    }
                })
            }).then(function(value){
                item.imgUrl = value
                item.playList = "searList"
                app.nowSong = item
                nowList = "searList";
                //将当前播放的写入缓存
                localStorage.setItem("nowsong", JSON.stringify(item) )
            })


        },

        //点击左侧已添加列表播放
        playAddedSong: function (index,item) {
            audio.src =  "https://music.163.com/song/media/outer/url?id=" + item.id + ".mp3";
            a = self.setInterval("_playing()",250)


            new Promise(function (resolve,reject){
                requsetData({
                    method: "GET",
                    url: "https://music.api.tianli0.top/song/detail",
                    data: {
                        "ids": item.id
                    },
                    success(res){
                        res = JSON.parse(res)
                        resolve(res.songs[0].al.picUrl)
                    }
                })
            }).then(function(value){
                item.imgUrl = value
                item.playList = "addList"
                app.nowSong = item
                nowList = "addList";
                //将当前播放的写入缓存
                localStorage.setItem("nowsong", JSON.stringify(item) )
                app.playing = true
            })
        },





        //将搜索结果添加进左侧列表
        addToList: function(e) {
            var clickId = e.currentTarget.parentElement.id;

            //判断点击的第几个li标签元素，
            var index;
            for ( let i in app._data.searchRes ){
                if (clickId == app._data.searchRes[i].id){
                    index = i;
                    break;
                }
            }
            
            //将添加的结果push进app.addedSongsList,并写入缓存
            //判断当前的缓存中是否存在该歌曲，判断依据 id
            var added = false
            if (addsongListSto == null) {  //第一次添加
                add(index)
            }else{
                
                addsongListSto = JSON.parse(localStorage.getItem("addList"))
                
                outer:
                for ( let i in addsongListSto) {
                    if (clickId == addsongListSto[i].id) {
                        alert("您已添加过该歌曲")
                        added = true;
                        break outer;
                    }
                }
                if (added == false) {
                    add(index)
                }
            }      
            
            
            //添加歌曲
            function add (index) {
                let songinfo;
                let songinfoTemp = app._data.searchRes[index]

                songinfo = {
                    id: songinfoTemp.id,
                    singer: songinfoTemp.singer,
                    songName: songinfoTemp.songName,
                    songTime: songinfoTemp.songTime,
                    songTimeD: songinfoTemp.songTimeD,
                }

                new Promise(function (resolve,reject){
                    requsetData({
                        method: "GET",
                        url: "https://music.api.tianli0.top/song/detail",
                        data: {
                            "ids": songinfoTemp.id
                        },
                        success(res){
                            res = JSON.parse(res)
                            resolve(res.songs[0].al.picUrl)
                        }
                    })
                }).then(function(value){
                    songinfo.imgUrl = value;
                    app.addedSongsList.push(songinfo)

                    let addSto = JSON.stringify(app._data.addedSongsList)

                    localStorage.setItem( "addList", addSto )
                    addsongListSto = localStorage.getItem("addList")
                    
                    alert("添加歌曲成功")
                })
                
            }
        },

        //删除左侧歌曲
        delSong: function(e) {

            var clickIndex = e.currentTarget.parentElement.id

            if (app.nowSong.id == app.addedSongsList[clickIndex].id) {

                alert("歌曲正在播放，无法删除")

            }else{

                var addStor = JSON.parse( localStorage.getItem("addList") )
                addStor.splice(clickIndex,1)

                app.addedSongsList = addStor;

                addStor = JSON.stringify( addStor )
                localStorage.setItem("addList",addStor)

            }
            
        },


        //上一曲
        preSong: function (){
            //判断当前播放模式
            //无随机模式，故直接上一曲即可

            //判断目前是那首歌
            let index;
            outer:
            for (i in app.addedSongsList) {
                if (app.nowSong.id == app.addedSongsList[i].id) {
                    index = i;
                    break outer
                }
            }
            index = Number(index)

            if (index == 0) {
                app.nowSong = app.addedSongsList[app.addedSongsList.length-1]
            }else{
                app.nowSong = app.addedSongsList[index-1]
            }
            audio.src =  "https://music.163.com/song/media/outer/url?id=" + app.nowSong.id + ".mp3";
            audio.play()

            a = self.setInterval("_playing()",250)

            // new Promise(function (resolve,reject){
            //     requsetData({
            //         method: "GET",
            //         url: "https://music.api.tianli0.top/song/detail",
            //         data: {
            //             "ids": app.nowSong.id
            //         },
            //         success(res){
            //             res = JSON.parse(res)
            //             resolve(res.songs[0].al.picUrl)
            //         }
            //     })
            // }).then(function(value){
            //     app.nowSong.imgUrl = value
            // })



            localStorage.setItem("nowsong", JSON.stringify(app.nowSong) )

            app.playing = true;
        },

        //下一曲
        nextSong: function (){

            //判断目前是那首歌
            let index;
            outer:
            for (i in app.addedSongsList) {
                if (app.nowSong.id == app.addedSongsList[i].id) {
                    index = i;
                    break outer
                }
            }
            index = Number(index)

            if (index == app.addedSongsList.length-1) {
                app.nowSong = app.addedSongsList[0]
            }else{
                app.nowSong = app.addedSongsList[index+1]
            }

            audio.src =  "https://music.163.com/song/media/outer/url?id=" + app.nowSong.id + ".mp3";
            audio.play()

            a = self.setInterval("_playing()",250)

            // new Promise(function (resolve,reject){
            //     requsetData({
            //         method: "GET",
            //         url: "https://music.api.tianli0.top/song/detail",
            //         data: {
            //             "ids": app.nowSong.id
            //         },
            //         success(res){
            //             res = JSON.parse(res)
            //             resolve(res.songs[0].al.picUrl)
            //         }
            //     })
            // }).then(function(value){
            //     app.nowSong.imgUrl = value
            // })


            localStorage.setItem("nowsong", JSON.stringify(app.nowSong) )

            app.playing = true;

        },


        //播放和暂停
        play:function(){

            app.playing = !app.playing;

            app.playing ? audio.play() : audio.pause()


            if (app.playing){
                a = self.setInterval("_playing()",250)
            }else{
                a = window.clearInterval(a)
            }
        },


        //切换播放模式  1=> 列表循环    3=> 单曲循环
        changePlayMode: function (){
            app.playMode == 1 ? app.playMode = 3 : app.playMode = 1
            if (app.playMode == 3){
                audio.loop = true
            }else{
                audio.loop = false
            }
        }
    },
})

var a;      //定时器

//歌曲播放结束
audio.onended = function () {

    //判断当前音乐为那一播放列表
    if (app.playMode == 3) {
        audio.play()
        
    }else if (app.playMode == 1){
        if (nowList == "addList"){
            app.nextSong()
        }else if (nowList == "searList"){
            alert("试听结束")
        }
    }
}




// 将搜索结果显示在页面
function resView(res){
    res = JSON.parse(res)

    //搜索结果
    //console.log(res)

    res = res.result
    let resSongs = res.songs
    let data = []
    for (let i in resSongs) {
        // console.log(i)
        let indexData = {}
        indexData.id = resSongs[i].id
        indexData.songName = resSongs[i].name
        indexData.singer = resSongs[i].artists[0].name
        indexData.songTimeD = resSongs[i].duration

        //将毫秒变为分钟+秒
        let time = indexData.songTimeD;

        indexData.songTime = changeTime(time)

        data.push(indexData)
    }
    // console.log(data)
    app.searchRes = data
}


//歌曲正在播放事件
function _playing(){
    var nowTime = audio.currentTime * 1000  //化为毫秒
    let _nowTime = changeTime(nowTime)
    app.nowTime = _nowTime;

    let rate = (audio.currentTime / audio.duration) * 100
    app.proBar = rate + "%";
}

//毫秒变为分钟
function changeTime(time){
    let min = Math.floor( time/(60*1000) )
    let sec = Math.floor( (time%(60*1000)) / 1000 )
    if (min < 10){
        min = "0" + min;
    }
    if (sec < 10){
        sec = "0" + sec;
    }
    time = min + ":" + sec
    return time
}


//页面加载的时候缓存写入到app.data内
if (localStorage.getItem("addList")) {
    app.addedSongsList = JSON.parse( localStorage.getItem("addList") )
}

if (nowSongSto) {
    app.nowSong = JSON.parse( localStorage.getItem( "nowsong" ) )
    console.log(app.nowSong)
    audio.src ="https://music.163.com/song/media/outer/url?id=" + app.nowSong.id + ".mp3";
    audio.pause()
}

var bg = new Vue({
    el: "#bgimg",
    data: {
        bgimgUrl: "",
    }
})
window.onload = function () {
    if (localStorage.getItem("nowsong")) {
        let nowsong = JSON.parse( localStorage.getItem("nowsong") );
        bg.bgimgUrl = "background-image: url(" + nowsong.imgUrl + ")"
    }else{
        bg.bgimgUrl = "background-image: url(https://img1.baidu.com/it/u=1560728822,93780344&fm=26&fmt=auto&gp=0.jpg)"
    }
}
