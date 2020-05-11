var pictureBank = []
var picturePosition = 0

$(document).ready(function() {
    if ($('#pictureArray').length) {
        pictureBank = $('#pictureArray').val().split(',');
        console.log(pictureBank);
        if (pictureBank.length > 1) {
            $('.arrowRow').css({'height': '4vh', 'margin-bottom': '1vh'});
            $('.pagePic').css({'height': '70vh', 'maxHeight': '70vh'});
            $('.pagePic img').css({'maxHeight': '70vh'});

            $('.arrow').click(function() {
                if ($(this).attr('id') === 'arrowRight') {
                    picturePosition++;
                    if (picturePosition == pictureBank.length) {
                        picturePosition = 0;
                    }
                } else if ($(this).attr('id') === 'arrowLeft') {
                    picturePosition--;
                    if (picturePosition < 0) {
                        picturePosition = pictureBank.length-1;
                    }
                }
                changePicture(picturePosition);
            })
        }
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

function changePicture(newPos) {
    console.log(newPos + ' - ' +  pictureBank[newPos])
    var newSrc = '/img/upload/service/' + pictureBank[newPos];
    $('#picture').attr('src', newSrc);
}