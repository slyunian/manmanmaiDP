function render() {
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getbaicaijiatitle',
        dataType: 'json',
        success: function (info) {
            // console.log(info);
            var htmlStr = template('nav', info);
            $('#wrapper ul').html(htmlStr);
        }
    })
}



render();
window.addEventListener('load', function () {
    new IScroll('#scroller', {
        scrollX: true,
        scrollY: false
    });

})


// 注册点击事件
$('#wrapper').on('click', "a", function () {
    $(this).parent().siblings().find("a").removeClass('active')
    $(this).addClass('active');
    var id = $(this).data('id');
    renderpro(id);
})

renderpro(0);

function renderpro(id) {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getbaicaijiaproduct",
        data: {
            titleid: id
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('pro', info);
            $('.prbd').html(htmlStr);
        }
    })
}