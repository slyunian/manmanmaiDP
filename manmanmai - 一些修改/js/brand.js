function getKey(key) {
    var key = decodeURI(location.search).slice(1).split('&');
    var obj = {}
    key.forEach(function (v, i) {
        v = v.split('=');
        obj[v[0]] = v[1];
    });
    return obj;
}

var obj = getKey();
// console.log(obj);

$('.linkname').text(obj.name);
$('.th1').text(obj.name.replace("十大品牌", "") + "哪个牌子好")
$('.th2').text(obj.name.replace("十大品牌", "") + "产品销量排行")
$('.th3').text(obj.name.replace("十大品牌", "") + "最新评论")

// 渲染十大品牌
$.ajax({
    url: 'http://127.0.0.1:9090/api/getbrand',
    dataType: 'json',
    data: {
        brandtitleid: obj.id
    },
    success: function (info) {
        // console.log(info);
        var htmlStr = template('nav1', info);
        $('.pdContent .nav1').html(htmlStr);
    }
})

// 产品销量排行
$.ajax({
    url: 'http://127.0.0.1:9090/api/getbrandproductlist',
    dataType: 'json',
    data: {
        brandtitleid: obj.id,
        pagesize: 4
    },
    success: function (info) {
        console.log(info);
        var htmlStr = template('nav2', info);
        $('.pdContent .nav2').html(htmlStr);
    }
})

// 最新评论

$.ajax({
    url: 'http://127.0.0.1:9090/api/getproductcom',
    dataType: 'json',
    data: {
        productid:obj.id
    },
    success: function (info) {
        console.log(info);
        var htmlStr = template('nav3', info);
        $('.pdContent .nav3').html(htmlStr);
    }
})