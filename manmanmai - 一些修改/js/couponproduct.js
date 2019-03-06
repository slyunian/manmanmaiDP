function getKey(key) {
    var key = decodeURI(location.search).slice(1).split('&');
    var obj = {}
    key.forEach(function (v, i) {
        v = v.split('=');
        obj[v[0]] = v[1];
    });
    return obj;
}

var res = getKey();

function render() {
    $.ajax({
        url: 'http://127.0.0.1:9090/api/getcouponproduct',
        data: {
            couponid: res.key
        },
        dataType: 'json',
        success: function (info) {
            console.log(info);
            var htmlStr = template('nav', info);
            $('.titc').html(htmlStr);
        }
    })
}

render();

var that;
$('.titc').on('click', 'li', function () {
    $('.model').show();
    $('.model img').attr('src', $(this).find('img').attr('src'))
    that = $(this);
})

$('.model').on('click','img', function () {
    // e.stopPropagation();
    $('.model').hide();
})

$('.model .left').on('click', function () {
    // console.log(that.prev());
    that = that.prev();
    if (that.length == 0) {
        that = $('.titc li').eq($('.titc li').length - 1);
    }
    $('.model img').attr('src', that.find('img').attr('src'));
    
});

$('.model .right').on('click', function () {
    that = that.next();
    if (that.length == 0) {
        // return;
        that = $('.titc li').eq(0);
    }
    $('.model img').attr('src', that.find('img').attr('src'));
});