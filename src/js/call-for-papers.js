$(document).ready(function () {
    var canSend = false;
    var requiredFields = ['#name', '#email', '#topic', '#description', '#requested-time'];
    $(requiredFields.join(', ')).keyup(function () {
        var empty = requiredFields.map(function (fieldId) {
            return !$(fieldId).val();
        });
        var disabled = false;
        empty.map(function (isEmpty) {
            if (isEmpty) {
                disabled = true;
            }
        });
        canSend = !disabled;
        $('#call-for-paper-button').prop('disabled', disabled);
    });

    $('input').keypress(function (event) {
        if (event.which == 13) {
            event.preventDefault();
            $("form").submit();
        }
    });


    $('form').submit(function (event) {
        event.preventDefault();
        if (!canSend) {
            return;
        }
        var inputFields = $('form :input').filter(function (index, element) {
            return element.name
        });
        var data = {};
        for (var i = 0; i < inputFields.length; ++i) {
            data[inputFields[i].name] = inputFields[i].value;
        }
        $.ajax({
            url: "https://docs.google.com/forms/d/1JHwPXVMWzSJ0Ayg65p5J5lxBU-QMMHuKicrm0c1SPHU/formResponse",
            data: data,
            type: "POST",
            dataType: "xml"
        }).always(function () {
            window.location.href = window.location.href + '-thanks';
        });
    });


    //$('#call-for-paper-button').on('click', function () {
    //    console.log('lol');
    //});
    //
    //
    //function showLoading(show) {
    //    if (show) {
    //        $('#loading').removeClass('hidden');
    //    } else {
    //        $('#loading').addClass('hidden');
    //    }
    //}
    //
    //$('input').keypress(function (event) {
    //    if (event.which == 13) {
    //        event.preventDefault();
    //        $("form").submit();
    //    }
    //});
    //
    //$('form').submit(function (event) {
    //    event.preventDefault();
    //    var inputFields = $('form :input').filter(function (index, element) {
    //        return element.name
    //    });
    //    var data = {};
    //    for (var i = 0; i < inputFields.length; ++i) {
    //        data[inputFields[i].name] = inputFields[i].value;
    //    }
    //    showLoading(true);
    //    $.ajax({
    //        url: "https://docs.google.com/forms/d/1JHwPXVMWzSJ0Ayg65p5J5lxBU-QMMHuKicrm0c1SPHU/formResponse",
    //        data: data,
    //        type: "POST",
    //        dataType: "xml"
    //    }).always(function () {
    //        //showLoading(false);
    //        $('#thanks').removeClass('hidden');
    //    });
    //});
    //
    //$('#thanks button').on('click', function (event) {
    //    event.preventDefault();
    //    $('form').find('input, text').val('');
    //    $('#thanks').addClass('hidden');
    //    $('#loading').addClass('hidden');
    //    $('.ss-q-title').hide();
    //});
});