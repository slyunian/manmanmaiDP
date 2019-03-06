var pageid = 1;
var page = 0;

function render() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getmoneyctrl",
        dataType: "json",
        data: {
            pageid
        },
        success: function (info) {
            var htmlStr = template('navtwo', info);
            $('.mm_proudct .p_body').html(htmlStr);

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
        $(this).css('color', "#ccc");
        return;
    }
    $('.pagination button').css('color', "#000");
    var num = $('select').children('option:selected').val();
    --num;
    $('option').eq(--num).prop("selected", true);
    $('select').change();

});
//  下一页

$('.pagination .fr').on('click', function () {
    if ($('select').children('option:selected').val() >= page) {
        $(this).css('color', "#ccc")
        return;
    }
    $('.pagination button').css('color', "#000");
    var num = $('select').children('option:selected').val();
    ++num;
    $('option').eq(--num).prop("selected", true);
    $('select').change();

})
render();

render(pageid);


$('.p_body').on('click', '.pdDemo', function () {
    var id = $(this).data('id');
    console.log(id);
    location.href = 'savemoney.html?id=' + id;
})