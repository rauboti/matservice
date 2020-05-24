var pictureBank = []
var picturePosition = 0

$(document).ready(function() {
    if ($('#pictureArray').length) {
        pictureBank = $('#pictureArray').val().split(',');
        //console.log(pictureBank);
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

    $('#btnTools').click(function() {
        console.log('We clicked it!')
        var data = { request: 'tools' };
        $.ajax({ type: 'POST', data: JSON.stringify(data), contentType: 'application/json', success: function(result) {
            console.log(result)
            fade(0)
            $('html').append(
                '<div id="popup" class="popup"><div class="popupButtonrow"><button id="btnClose">X</button></div><div id="popupContent" class="popupContent"><table></table></div></div>'
            );
            $('#btnClose').click(function() {
                remove($('#popup'))
                fade(1)
            });
            for (var i in result) {
                $('#popupContent table').append('<tr><td>' + result[i].text + '</td><td>' + result[i].priceDay + '</td><td>' + result[i].priceWeek + '</td></tr>');
            }
        }});
    });
});

function changePicture(newPos) {
    //console.log(newPos + ' - ' +  pictureBank[newPos])
    var newSrc = '/img/upload/' + window.location.href.split('/')[window.location.href.split('/').length-2] + '/' + pictureBank[newPos];
    $('#picture').attr('src', newSrc);
}

function fade(t) {
    if (t === 1) {
        $('header').removeClass('disabled'); $('body').removeClass('disabled'); $('footer').removeClass('disabled');
    } else if (t === 0) {
        $('header').addClass('disabled'); $('body').addClass('disabled'); $('footer').addClass('disabled');
    }
}

function remove(el) {
    el.remove();
}