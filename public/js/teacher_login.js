

/**
 * Created by ANUBHAV on 28-Sep-17.
 */

$(document).ready(function($) {

var alertBox = $("<div>").attr('id',"dialog");
    $('body').append(alertBox);

var selfList=$('#selfList');



    
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
    var socket = io();

$.get('/myLectures',function (data){
  console.log(data);
  data=data.filter((a)=>{
    return !a.group;
  });
  data.forEach((a)=>{
       socket.emit(a.class_name,{});
  });
  });
    

    socket.on('new_text_from_teacher', function(res){

      console.log(res);
      var msg=$('<a>').html('<b>'+res.target+' : </b>'+res.notification_heading);
        msg.click(function()
        {
            alertBox.html('<p>'+res.notification_content+'</p>');
            alertBox.dialog("open");
        });
        selfList.prepend($('<li>').append(msg));
    });

    socket.on('new_file_from_teacher', function(res){
      console.log(res);

      var msg=$('<a>').attr('href',res.link+"/"+res.fileName).html('<b>'+res.target+' : </b>'+res.notification_heading);
      selfList.prepend($('<li>').append(msg));
		
    });


});

