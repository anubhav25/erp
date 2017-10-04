/**
 * Created by ANUBHAV on 05-Oct-17.
 */

$(document).ready(function($) {

    $('#submit').click(function(){
        var np=$('#newPassword').val();
        var cp = $('#confirmPassword').val();
        if(np===cp) {
            var a = {};
            a.oldpassword = $('#newPassword').val();
            a.newpassword = np;

                $.post('/changePass', a, function (data) {
                    if (data.msg == 'ok') {
                        window.location.href = '/logout';
                        $('#wrongdetails').hide('fast');
                    }
                    else {
                        $('#wrongdetails').show('fast');
                    }
                });
        }
        else
    {
        alert('passwords do not match');
    }

});

});