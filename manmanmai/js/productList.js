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
// console.log(key);

$('.item').text(key["key"]);
var categoryid = +key["value"];
var pageid = 1;
var page = 0; 

render(pageid);

function render() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getproductlist",
        dataType: "json",
        data: {
            pageid,
            categoryid
        },
        success: function (info) {
            // console.log(info);
            var htmlStr = template('ListTb', info);
            // console.log(htmlStr);

            $('.pdContent').html(htmlStr);
            page = Math.ceil(info.totalCount / info.pagesize);
            if (!$('option').text().length) {
                for (var index = 1; index <= page; index++) {
                    $('select').append('<option>' + index + '</option>');
                }
            }
            $('select').on('change', function () {
                var num = $(this).children('option:selected').val();
                pageid = num;
                render(pageid);
            })
        }
    })

}

$('.pagination .fl').on('click', function () {
    if ($('select').children('option:selected').val() <= 1) {
        $(this).css('color',"#ccc");
        return;
    }  
    $('.pagination button').css('color',"#000");
    var num = $('select').children('option:selected').val();
    --num;
    $('option').eq(--num).prop("selected", true);
    $('select').change();
    
});
//  下一页

$('.pagination .fr').on('click', function () {
    if ($('select').children('option:selected').val() >= page) {
        $(this).css('color',"#ccc")
        return;
    }
    $('.pagination button').css('color',"#000");
    var num = $('select').children('option:selected').val();
    ++num;
    $('option').eq(--num).prop("selected", true);
    $('select').change();
    
})