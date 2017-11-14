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
      if($('#notification_heading').val()==''){
        alert('First Enter Heading')
      };
        var file = e.target.files[0];
        var fileReader = new FileReader();
        fileReader.onload = function (e) {
            var binary = e.target.result;
            var base64 = window.btoa(binary);
            var msg = {};
            msg.notification_heading=$('#notification_heading').val();
             msg.file=base64;
            msg.fileName=file.name;
            var test =$('#target').val();
            if(test=='all')
            {
                test='teachers';
                  msg.target=test;
            socket.emit('new_notification_file', msg );
            test='students';
            }
            msg.target=test;
            socket.emit('new_notification_file', msg );
            $('#file').val('');
            $('#notification_heading').val('');
            
            alert("notification added");
        };

        fileReader.readAsBinaryString(file);
    });

        $('#textform').submit(function(){



            $("#text_div").hide();
            $("#file_div").hide();

            var data={};
            data.notification_heading=$('#notification_heading').val();

            data.notification_content=$('#notification_content').val();
           var test =$('#target').val();
            if(test=='all')
            {
                test='teachers';
                  data.target=test;
            socket.emit('new_notification_text', data );
            test='students';
            }
            data.target=test;
            socket.emit('new_notification_text', data );

            $('#notification_content').val('');
            $('#notification_heading').val('');

            alert("notification added");

            return false;
        });



});
