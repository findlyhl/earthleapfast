/*config data of earthLeap*/
var earthConfig = {
    "imgPath": "2/",//图片文件的路径前缀
    "imgFileType": ".jpg",//图片的名字后缀，必须带. Exp:[.jpg]
    "imgCount": 205,//动画图片的总大小
    "time": 0,//时间，运动时间，一般不要动这个参数
    "jiasudu": 200,//加速度，数字越大，速度越快
    "jiasujuli": 3000,//路程，重力加速度的运动距离
    "updown": true,//updown判断上升还是下降
    "step": 0.01,//运动时的时间递增值和时间递减值
    "imgId": "imgss",//装在图片的img标签id
    "imgNameNum": 1,//动画图片的初始值名字数，默认为1
    "earthdiv": "earthdiv",//播放图片的div
    "hideImgLib": "imglib",//图片库名称
    "imgWidth": 800,//图片的宽度
    "bodyId":"earthBody"//播放地图的上层ID
};
//初始化图片库
function init() {
    $("#"+earthConfig.bodyId).html("<div id=\""+earthConfig.earthdiv+"\"></div><div id=\""+earthConfig.hideImgLib+"\" style=\"display:none\"></div>");
    $("#"+earthConfig.bodyId).css({
        "background":"#000000",
        "text-align":"center"
    });
    for (var i = 1; i <= earthConfig.imgCount; i++) {
        $("#" + earthConfig.hideImgLib).html($("#" + earthConfig.hideImgLib).html() + "<div id=\"" + earthConfig.imgId + i + "\"><img  width=\"" + earthConfig.imgWidth + "px\" src=\"" + fileName(i) + "\"/></div>");
    }
}
/*根据文件名的规则，定义如何拼装文件名，返回完整的图片路径。【从根目录】*/
function fileName(cNum) {
    var qz = "000";
    if (cNum >= 10 && cNum < 100)
        qz = "00";
    if (cNum >= 100)
        qz = "0";
    return earthConfig.imgPath + qz + cNum + earthConfig.imgFileType;
}

/*真正的算法方法*/
function jump() {
    var theEndNum = (earthConfig.time * earthConfig.time * earthConfig.jiasudu);
    var stepPositon = ~~theEndNum;
    if (earthConfig.time <= 0) {
        earthConfig.updown = true;
    } else if (theEndNum >= earthConfig.jiasujuli) {
        earthConfig.updown = false;
    }
    if (earthConfig.updown) {
        earthConfig.time = earthConfig.time + earthConfig.step;
    } else {
        earthConfig.time = earthConfig.time - earthConfig.step;
    }
    if (earthConfig.updown) {
        earthConfig.imgNameNum = ~~(stepPositon % earthConfig.imgCount);
    } else {
        earthConfig.imgNameNum = Math.abs((~~(stepPositon % earthConfig.imgCount) - earthConfig.imgCount));
    }
    if (earthConfig.imgNameNum >= earthConfig.imgCount || earthConfig.imgNameNum <= 0) earthConfig.imgNameNum = 1;
    // $("#" + earthConfig.imgId).attr("src", fileName(earthConfig.imgNameNum));

    $("#" + earthConfig.earthdiv).html($("#" + earthConfig.imgId + earthConfig.imgNameNum).html());
    setTimeout("jump()", 5);
}
/*执行方法*/
function herewego() {
    init();
    setTimeout("jump()", 5);
}

$(document).ready(function(){
    herewego();
});
