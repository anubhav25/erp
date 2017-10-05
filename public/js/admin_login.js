

/**
 * Created by ANUBHAV on 28-Sep-17.
 */

$(document).ready(function($) {

var alertBox = $("<div>").attr('id',"dialog");
    $('body').append(alertBox);

var teacherNotificationList=$('#teacherNotificationList');
var StudentNotificationList=$('#StudentNotificationList');




    
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

    socket.emit('teachers',{});
      socket.emit('students',{});

    socket.on('new_notification_text', function(res){

       console.log(res);
if(res.target=='students')
{
//console.log('student');
  var msg=$('<a>').text(res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });

        StudentNotificationList.prepend($('<li>').append(msg));

}
 else  if(res.target=='teachers')
{
//console.log('teacher');
  var msg=$('<a>').text(res.notification_heading);
  //console.log(res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });

        teacherNotificationList.prepend($('<li>').append(msg));
      //  console.log(teacherNotificationList);

}



    });

    socket.on('new_notification_file', function(res){
       // console.log(res);
 if(res.target=='students')
		{
        var msg=$('<a>').attr('href',res.link+"/"+res.fileName).text(res.notification_heading);
       StudentNotificationList.prepend($('<li>').append(msg));
		}

 if(res.target=='teachers')
		{
var msg=$('<a>').attr('href',res.link+"/"+res.fileName).text(res.notification_heading);
        teacherNotificationList.prepend($('<li>').append(msg));

} 
if(res.target=='all')
		{
var msg=$('<a>').attr('href',res.link+"/"+res.fileName).text(res.notification_heading);
        teacherNotificationList.prepend($('<li>').append(msg));
          StudentNotificationList.prepend($('<li>').append(msg));

}

    });



  



});

