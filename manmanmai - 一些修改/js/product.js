function getKey(key) {
    var key = decodeURI(location.search).slice(1).split('&');
    var obj = {}
    key.forEach(function (v, i) {
        v = v.split('=');
        obj[v[0]] = v[1];
    });
    return obj;
}

var key = getKey();
console.log(key);

// 渲染导航
$.ajax({
    url: "http://127.0.0.1:9090/api/getcategorybyid",
    dataType: 'json',
    data: {
        categoryid: key.value,
    },
    success: function (info) {
        console.log(info);

        $('.item').text(key.key);
        $('.item1').text(info.result[0].category);
    }
})
// 返回
$('.item1').on('click', function () {
    history.back();
})

// 商品详情
$.ajax({
    url: 'http://127.0.0.1:9090/api/getproduct',
    dataType: 'json',
    data: {
        productid: key.id
    },
    success: function (info) {
        console.log(info);
        var strHtml = template('ListTb', info.result[0]);
        $('.product_list').append(strHtml);
        $('.tab2').html('*实际价格以各网站列出的实时售价为准，我们提供的价格可能有数小时至数日的延迟');
        render();
    }
})

// 获取评论
function render() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getproductcom",
        dataType: 'json',
        data: {
            productid: key.id
        },
        success: function (info) {
            console.log(info);
            var strHtml = template('Listone', info);
            $('.commit').html(strHtml);
        }
    })
}

