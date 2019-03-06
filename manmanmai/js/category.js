// 分类标题api
$.ajax({
    url: "http://127.0.0.1:9090/api/getcategorytitle",
    dataType: "json",
    success: function (info) {
        var htmlStr = template('navone', info);
        $('.category_list').html(htmlStr);
    }
})

$('.category_list').on('click', ".cate_top", function () {
    $(".cate_bottom").addClass('hide');
    $(this).siblings('.cate_bottom').toggleClass('hide');
    var id = $(this).data('id');
    // 渲染二级类表
    $.ajax({
        url: "http://127.0.0.1:9090/api/getcategory",
        dataType: "json",
        data: {
            titleid: +id
        },
        success: function (info) {
            // console.log(info);

            var htmlStr = template('navtwo', info);
            $('.cate_bottom').html(htmlStr);
        }
    })
})




