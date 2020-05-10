var pictureBank = []
var picturePosition = 0

$(document).ready(function() {
    if ($('#pictures').length) {
        var arr = $('#pictures').val().split(',');
        console.log(arr);
    }

    $('.language').click(function() {
        var url = '';
        var arr = window.location.href.split('/');
        for (var i in arr) {
            if (i == 3) {
                url += $(this).attr('id').split('-')[1]
            } else if (i == arr.length-1) {
                continue
            } else {
                url += arr[i]
            }
            url += '/'
        }
        window.location.href = url;
    });
});