// 当前页
var pageid = 0;
// 总页数
var page;
// 渲染页面
render(pageid);

function render(pageid) {
    // 发送ajax渲染页面
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getmoneyctrl',
        data: {
            pageid
        },
        dataType: 'json',
        success: function (info) {
            $('.p_body').html(template('navtwo', info));
            page = Math.ceil(info.totalCount / info.pagesize);
            getpage(page);
        }
    })
}

function getpage(pageindex) {
    for (var i = 0; i < pageindex; i++) {
        $('.set_page').append("<li>" + (i + 1) + "</li>");
    }
    $('.n_page').text(pageid + 1);
    $('.all_page').text(pageindex);
}

$('.btns').on('click', function () {
    $('.set_page').toggleClass('hide');
})

$('.set_page').on('click', 'li', function () {
    $('.n_page').text($(this).text());
    pageid = $('.n_page').text() - 1;
    render(pageid);
    console.log(pageid);
    
    $('.btns').trigger('click');
    
})

// 下一页
$('.next').on('click', function () {
    if (pageid+1==page) {
        return;
    }
    $('.n_page').text(+$('.n_page').text() + 1);
    pageid = $('.n_page').text() - 1;
    // console.log(pageid);
    render(pageid);
})
$('.last').on('click', function () {
    if (pageid==0) {
        return;
    }
    $('.n_page').text(+$('.n_page').text() -1);
    pageid = $('.n_page').text() - 1;
    // console.log(pageid);
    render(pageid);
})
