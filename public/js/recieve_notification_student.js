/**
 * Created by ANUBHAV on 28-Sep-17.
 */

$(document).ready(function($) {


var alertBox = $("<div>").attr('id',"dialog");
    $('body').append(alertBox);

 alertBox.dialog({
        autoOpen: false,
        show: {
            effect: "blind",
            duration: 1000
        },
        hide: {
            effect: "explode",
            duration: 1000
        }
    });


    //   var socket = io('http://erp.openode.io/');
    var socket = io('http://localhost:3000');

    socket.emit('students',{});

    socket.on('new_notification_text', function(res){

        //console.log(res);


        var msg=$('<a>').text(res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });

        $('#notifications').prepend($('<li>').append(msg));
    });
    socket.on('new_notification_file', function(res){
        console.log(res);

        var msg=$('<a>').attr('href',res.link+"/"+res.fileName).text(res.notification_heading);
        $('#notifications').prepend($('<li>').append(msg));
    });



});