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
// console.log(res);


function render() {
    $.ajax({
        url: "http://127.0.0.1:9090/api/getdiscountproduct",
        dataType: 'json',
        data: {
            productid: res.id
        },
        success: function (info) {
            // console.log(info.result[0]);
            console.log(info);
            
            var htmlStr = template('navtwo', info.result[0]);
            $('.p_body').html(htmlStr);
            

        }
    })
}
render();