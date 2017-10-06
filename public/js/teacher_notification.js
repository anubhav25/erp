$(document).ready(function($) {

var slelectBox = $("#slelectBox");
   
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
$("#submit").click(function(event)
          {
                     
               $("#text_div").hide();
               $("#file_div").hide();
               
          });
  


    
var list;
var username='';
    $.get('/myusername',function(res)
    {
        username=res;
    });
$.get('/myLectures',function (data){
  list=data.filter((e)=>
   { return !e.group;}
    );
    
    var slelectBox = $('#slelectBox');
    var lectureCount=list.length;
    if(lectureCount>1)
    {

          var cb =$('<input />', { type: 'checkbox', id: 'cb', value: 'all' }).appendTo(slelectBox);
          $('<label />', { 'for': 'cb', text: 'All' }).appendTo(slelectBox);
          cb.on('click',()=>
          {
            var a=$('input[type=checkbox]');
            for (var i=0;i<lectureCount;i++)
                {
                    $('#cb'+i).click();
                }
          })
      }

//console.log(list);
    for( var id=0;id<lectureCount;id++){
   

        if(list[id].group){

          $('<input />', { type: 'checkbox', id: 'cb'+id, value: list[id].class_name+'_'+list[id].sem+'_'+list[id].group }).appendTo(slelectBox);
          $('<label />', { 'for': 'cb'+id, text: list[id].class_name+'_'+list[id].sem+'_'+list[id].group }).appendTo(slelectBox);
                                             } 
                   else{
                     $('<input />', { type: 'checkbox', id: 'cb'+id, value: list[id].class_name+'_'+list[id].sem}).appendTo(slelectBox);
          $('<label />', { 'for': 'cb'+id, text: list[id].class_name+'_'+list[id].sem}).appendTo(slelectBox);
                                      
                   

       }                    
    }



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
             msg.file=base64;
             msg.from=username;
            msg.fileName=file.name;

            
            for (var i=0;i<list.length;i++)
                {
                    if($('#cb'+i).checked)
                    {
                      msg.target=list[i].class_name;

                       socket.emit('new_file_from_teacher', msg );
                    }
                }
            $('#file').val('');
            $('#notification_heading').val('');
        };

        fileReader.readAsBinaryString(file);
    });

        $('form').submit(function(){
            console.log(list);

            $("#text_div").hide();
            $("#file_div").hide();

            var data={};
            data.notification_heading=$('#notification_heading').val();
            data.notification_content=$('#notification_content').val();
            data.from=username;
            
            for (var i=0;i<list.length;i++)
                {
                    if(document.getElementById('cb'+i).checked)
                    {
                      data.target=list[i].class_name;
                       console.log(data);
                       socket.emit('new_text_from_teacher', data );
                    }
                }

            $('#notification_content').val('');
            $('#notification_heading').val('');



            return false;
        });



});

