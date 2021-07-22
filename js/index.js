(function(i, s, o, g, r, a, m) {
    i['GoogleAnalyticsObject'] = r;
    i[r] = i[r] || function() {
        (i[r].q = i[r].q || []).push(arguments)
    }, i[r].l = 1 * new Date();
    a = s.createElement(o),
        m = s.getElementsByTagName(o)[0];
    a.async = 1;
    a.src = g;
    m.parentNode.insertBefore(a, m)


})(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga');

ga('create', 'UA-99971748-1', 'auto');
ga('send', 'pageview');



$(document).ready(function() {
    


    $('#search').keyup(function() {

        // Search text
        var text = $(this).val();

        // Hide all content class element
        $('.pack').hide();

        
        // $('.AssetsInfoWindow').hide();

        // Search
        $('.pack:contains("' + text + '")').closest('.pack').show();

        //If the search bar gets emptied, show all packs
        if (text == '') {
            $('.pack').show();
        }
    });
});

//Case insensitive
$.expr[":"].contains = $.expr.createPseudo(function(arg) {
    return function(elem) {
        return $(elem).text().toUpperCase().indexOf(arg.toUpperCase()) >= 0;
    };
});

function responsiveHamburger() {
    var x = document.getElementById("navButtons-id");
    if (x.className === "navButtons") {
        x.className += " responsive";
    } else {
        x.className = "navButtons";
    }
}

function setValue(tag) {

    var text = document.getElementById("search").value;
    $('.pack').hide();
    $('.pack:contains("' + tag + '")').closest('.pack').show();

}

function showAll() {
    $('.pack').show();
}
/**
 * 显示资源的详细信息窗口
 */
function showAssetsInfo(imgname) {
    
        var url = "./data/assetsInfo.json"/*json文件url，本地的就写本地的位置，如果是服务器的就写服务器的路径*/
        var request = new XMLHttpRequest();
        var nameArry;
        var Allname = '';
        var json;
        var resultId;
        request.open("get", url);/*设置请求方法与路径*/
        request.send(null);/*不发送数据到服务器*/
        request.onload = function () {/*XHR对象获取到返回信息后执行*/
            if (request.status == 200) {/*返回状态为200，即为数据获取成功*/
                json = JSON.parse(request.responseText);
                for (var i = 0; i < json.length; i++) {
                    Allname += json[i].name + ",";
                    nameArry = Allname.split(',');
                }
                resultId = nameArry.indexOf(imgname);
                if(typeof imgname==="number"){
                    imgname=json.length;
                    for (let i = 0; i < imgname; i++) {
                        document.getElementsByClassName("PackText")[i].innerText = json[i].name.toUpperCase();
                        document.getElementsByClassName("tags")[i].innerText = json[i].Tags;
                    }
                }else{
                    document.getElementById("text-Models").innerText = json[resultId].Models;
                    document.getElementById("text-Animated").innerText = json[resultId].Animated;
                    document.getElementById("text-Textured").innerText = json[resultId].Textured;
                    document.getElementById("text-Formats").innerText = json[resultId].Formats;
                    document.getElementById("text-Released").innerText = json[resultId].Released;
                    document.getElementById("text-Tags").innerText = json[resultId].Tags;
                    document.getElementById("packNameText").innerText = json[resultId].name.toUpperCase();
                    document.getElementById("packDesText").innerText = json[resultId].descrip;
                    document.getElementById('assetsInfoEl').style.display = 'block';
                    document.getElementById('fade').style.display = 'block';//allinonefile
                    document.getElementById('packImgshow').src = "./assets/images/thumbnails/" + imgname + ".jpg";
                }
            }
        }
}
/**
 * 显示资源的详细信息窗口
 */
function hideAssetsInfo() {
    document.getElementById('assetsInfoEl').style.display='none';
    document.getElementById('fade').style.display='none';
}