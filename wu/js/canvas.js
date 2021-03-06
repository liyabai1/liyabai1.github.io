var BODY = document.body
var body = window.getComputedStyle(BODY,null)
var canvas = document.querySelector("#mycanvas");
var ctx = canvas.getContext('2d');
console.log(parseInt(body.width))
canvas.width = parseInt(body.width)
canvas.height = parseInt(body.height)
// canvas.style.backgroundColor = "#000"


var perLeft = 0,perTop = 0;
var clearLeft = 0; clearTop = 0;

/** 
 * creatHeartAtMouse: 移动鼠标时，在鼠标指针上浮现爱心
 * @description  
 * @param heartNum {Number} 每次爱心浮现的数量  默认3
 * @param heartColor {Array} 每个爱心的随机颜色 默认['#FF1493','#48D1CC','#1E90FF']
 * @param height {Number} 上浮的高度，单位px,默认50
 * @param time {Number} 每个爱心显示的时长，单位秒，默认3s
 * @param position {Object} 爱心的定位（鼠标指针的位置）  {left:200,top:200}
 */

 function creatHeartAtMouse(heartNum,heartColor,height,time,position){
    var heartNum = heartNum || 3;
    var heartColor = heartColor || ['#FF1493ff','#48D1CCff','#1E90FFff','#F5FFFAff','#FFFF00ff','#FF8C00ff','#DCDCDCff'];
    var height = height || 50;
    var time = time || 3;
    
    // positon 为鼠标指针位置
    var left = position.left;
    var top = position.top;


    // 绘制每个图形
    // @param mouseX,mouseY 鼠标位置
    // @param heartSize 心形大小
    draw = (mouseX,mouseY,heartSize) => {

        ctx.save()
        let color = heartColor[Math.floor( Math.random() * heartColor.length)]
        ctx.fillStyle = color;
        ctx.translate(mouseX,mouseY)
        ctx.rotate(-135 * (Math.PI / 180))
        ctx.translate(-mouseX,-mouseY)

        ctx.beginPath()
        ctx.moveTo(mouseX,mouseY)
        ctx.fillRect(mouseX,mouseY,2*heartSize,2*heartSize)
        ctx.moveTo(mouseX + 2*heartSize,mouseY)
        ctx.arc(mouseX+2*heartSize, mouseY+heartSize, heartSize, 0, 2 * Math.PI,false)
        ctx.arc(mouseX+heartSize, mouseY+2*heartSize, heartSize,0, 2*Math.PI,false)


        ctx.fill()
        ctx.restore()

        // 清除上一次的画布内容
        ctx.clearRect(clearLeft - 2*heartSize,clearTop - 3.5 * heartSize, 3.8*heartSize, 3.8 * heartSize)
        
    }
    
    draw(position.left, position.top, 5)

 }

//  creatHeartAtMouse(5,false,50,3,{left:500,top:500})



 document.body.addEventListener("mousemove",function(e){
    let ev = e || event;

    // console.log("left位置：",ev.clientX, "top位置：", ev.clientY)

    if (Math.abs(ev.clientX - perLeft) > 25 || Math.abs(ev.clientY - perTop) > 25) {
        creatHeartAtMouse(5,false,50,3,{left:ev.clientX,top:ev.clientY})

        clearLeft = perLeft;
        clearTop = perTop;

        perLeft = ev.clientX;
        perTop = ev.clientY;
    }

 })
document.body.addEventListener("touchmove",function(e){
    let ev = e || event;

    let clientx = ev.touches[0].clientX,
        clienty = ev.touches[0].clientY;
    console.log("left位置：",clientx, "top位置：", clienty)

    if (Math.abs(clientx - perLeft) > 25 || Math.abs(clienty - perTop) > 25) {
        creatHeartAtMouse(5,false,50,3,{left:clientx,top:clienty})

        clearLeft = perLeft;
        clearTop = perTop;

        perLeft = clientx;
        perTop = clienty;
    }
    ev.preventDefault()
})