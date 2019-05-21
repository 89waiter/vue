export default {
    getCurrentTime: function(param) {
        var year = param.getFullYear()
        var month = param.getMonth() + 1
        var day = param.getDate() > 10 ? param.getDate() : '0' + param.getDate()
        var hour = param.getHours() > 10 ? param.getHours() : '0' + param.getHours()
        var minute = param.getMinutes() > 10 ? param.getMinutes() : '0' + param.getMinutes()
        var second = param.getSeconds() > 10 ? param.getSeconds() : '0' + param.getSeconds()
        return year + '-' + month + '-' + day + ' ' + hour + ':' + minute + ':' + second
    },
    // 获取URL参数
    GetUrlParam(paraName) {
　　　　var url = document.location.toString();
　　　　var arrObj = url.split("?");
　　　　if (arrObj.length > 1) {
　　　　　　var arrPara = arrObj[1].split("&");
　　　　　　var arr;
　　　　　　for (var i = 0; i < arrPara.length; i++) {
　　　　　　　　arr = arrPara[i].split("=");
　　　　　　　　if (arr != null && arr[0] == paraName) {
　　　　　　　　　　return arr[1];
　　　　　　　　}
　　　　　　}
　　　　　　return "";
　　　　}
　　　　else {
　　　　　　return "";
　　　　}
　　},
}