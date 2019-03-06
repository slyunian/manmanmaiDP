// 发送ajax请求首页菜单栏
renderNav();
function renderNav() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getindexmenu",
        dataType: "json",
        success: function (info) {
            var htmlStr = template('navone', info);
            $('.mm_nav ul').html(htmlStr);
        }
    })
}

$('.mm_nav ul').on('click', '[data-id="7"]', function () {
    $(this).nextAll().toggleClass('hide');
})


// 首页的折扣列表中的数据api
function renderList() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        dataType: "json",
        success: function (info) {
            var htmlStr = template('navtwo', info);
            $('.mm_proudct .p_body').html(htmlStr);
        }
    })
}
renderList();