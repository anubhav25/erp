/**
 * Created by ANUBHAV on 28-Sep-17.
 */

$(document).ready(function($) {

    $("#textbtn").click(function(event)
    {
        $("#file_div").hide();
        $("#text_div").show();

    });
    $("#filebtnbtn").click(function(event)
    {
        $("#file_div").show();
        $("#text_div").hide();
    });










     var socket = io();
    //var socket = io('http://erp.openode.io/');


    $('#file').change(function(e){

        var file = e.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var binary = e.target.result;
            var base64 = window.btoa(binary);
            var msg = {};
            msg.notification_heading=$('#notification_heading').val();
            msg.target=$('#target').val();
            msg.file=base64;
            msg.fileName=file.name;
            socket.emit('new_notification_file', msg );
            $('#file').val('');
            $('#notification_heading').val('');
        };

        fileReader.readAsBinaryString(file);
    });

        $('form').submit(function(){


            $("#text_div").hide();
            $("#file_div").hide();

            var data={};
            data.notification_heading=$('#notification_heading').val();
            data.target=$('#target').val();
            data.notification_content=$('#notification_content').val();

            console.log(data);
            socket.emit('new_notification_text', data );
            $('#notification_content').val('');
            $('#notification_heading').val('');



            return false;
        });



});