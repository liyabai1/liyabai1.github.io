/*封装ajax函数
 * @param {string}opt.type http连接的方式，包括POST和GET两种方式
 * @param {string}opt.url 发送请求的url
 * @param {boolean}opt.async 是否为异步请求，true为异步的，false为同步的
 * @param {object}opt.data 发送的参数，格式为对象类型
 * @param {function}opt.success ajax发送并接收成功调用的回调函数
*/
function requsetData(opt){
    opt = opt || {};
    opt.method = opt.method || 'POST';
    opt.url = opt.url || '';
    opt.async = opt.async || true;
    opt.data = opt.data || null;
    var xmlhttp;
    if (window.XMLHttpRequest){
        // code for IE7+, Firefox, Chrome, Opera, Safari
        xmlhttp=new XMLHttpRequest();
    } else {
        // code for IE6, IE5
        xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
    }

    var param = [];
    for (let key in opt.data) {
        param.push(key + "=" + opt.data[key])
    }

    var paramData = param.join("&");
    if (opt.method == "POST") {
        xmlhttp.open(opt.method, opt.url, opt.async);
        xmlhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=utf-8');
        xmlhttp.send(paramData)

    } else if (opt.method == "GET") {
        xmlhttp.open(opt.method, opt.url + "?" + paramData, opt.async)
        xmlhttp.send()
    }
    xmlhttp.onreadystatechange = function () {
        if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {
            opt.success(xmlhttp.responseText);
        }else{
            // opt.fail(xmlhttp)
        }
    }
}