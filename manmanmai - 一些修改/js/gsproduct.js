first();

function first() {
    // 给按钮注册点击事件
    $('.store').on('click', function () {
        // 排他
        $(this).parent().siblings().find('.dropdown').addClass('hide');
        // 切换显示隐藏
        $(this).next().toggleClass('hide');
        // 修改按钮状态
        var res = $(this).next().hasClass('hide') ? "▼" : "▲";
        $(this).find('b').text(res);
        $(this).parent().siblings().find('b').text("▼");
    })

    // 发送ajax渲染店铺
    $.ajax({
        url: "http://127.0.0.1:9090/api/getgsshop",
        dataType: 'json',
        success: function (info) {
            // console.log(info);
            var htmlStr = template('navstore', info);
            $('.jd ul').html(htmlStr);
            $('.jd strong').text(info.result[0].shopName);
            shopId = info.result[0].shopId;
            $('.jd strong').data("shopId", shopId);
        }
    })
    // 渲染地区
    $.ajax({
        url: "http://127.0.0.1:9090/api/getgsshoparea",
        dataType: 'json',
        success: function (info) {
            var htmlStr = template('navarea', info);
            $('.hb ul').html(htmlStr);
            $('.hb strong').text(info.result[0].areaName);
            areaId = info.result[0].areaId;
            $('.hb strong').data("areaId", areaId);
            render();
        }
    })
}


// 发送ajax请求页面


function render() {
    var areaId = $('.hb strong').data("areaId");
    var shopId = $('.jd strong').data("shopId");
    console.log(areaId, shopId);

    $.ajax({
        url: "http://127.0.0.1:9090/api/getgsproduct",
        dataType: 'json',
        data: {
            areaid: areaId,
            shopid: shopId
        },
        success: function (info) {
            // console.log(info);
            var htmlStr = template('navpro', info);
            $('.probody').html(htmlStr);
        }
    })
}
// 点击店铺更改strong的id重新渲染页面
$('.jd').on('click', "li", function () {
    var shopId = $(this).data('shopid');
    $('.jd strong').data("shopId", shopId);
    $('.jd strong').text($(this).text());
    $(this).parent().prev().trigger('click');
    render();
})
// 点击地区更改strong的id重新渲染页面
$('.hb').on('click', 'li', function () {
    var areaId = $(this).data('areaid');
    $('.hb strong').data("areaId", areaId);
    $('.hb strong').text($(this).text());
    $(this).parent().prev().trigger('click');
    render();
})