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
          cb.click(function()
          {
        		var checkAll = $("#cb").prop('checked');
            //console.log(checkAll);
        		$(".cb").prop("checked", checkAll);
            });


            }



//console.log(list);
    for( var id=0;id<lectureCount;id++){


        if(list[id].group){

          $('<input />', { type: 'checkbox',class:"cb", id: 'cb'+id, value: list[id].class_name+'_'+list[id].sem+'_'+list[id].group }).appendTo(slelectBox);
          $('<label />', { 'for': 'cb'+id, text: list[id].class_name+'_'+list[id].sem+'_'+list[id].group }).appendTo(slelectBox);
                                             }
                   else{
                     $('<input />', { type: 'checkbox', class:"cb",id: 'cb'+id, value: list[id].class_name+'_'+list[id].sem}).appendTo(slelectBox);
          $('<label />', { 'for': 'cb'+id, text: list[id].class_name+'_'+list[id].sem}).appendTo(slelectBox);



       }
    }
    $(".cb").click(function(){

        if($(".cb").length == $(".subscheked:checked").length) {
          $('#cb').attr("checked", "checked");
        } else {
            $('#cb').removeAttr("checked");
        }

    });

  })






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
             msg.from=username;
            msg.fileName=file.name;

              var sent=0;
            for (var i=0;i<list.length;i++)
                {
                    if($('#cb'+i).checked)
                    {
                      sent++;
                      msg.target=list[i].class_name;

                       socket.emit('new_file_from_teacher', msg );
                    }
                }
                if(sent===0)
                {
                  alert('At least select One class');
                }
                else{
                  $('#file').val('');
                  $('#notification_heading').val('');
                }

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
var sent=0;
            for (var i=0;i<list.length;i++)
                {
                    if(document.getElementById('cb'+i).checked)
                    {
                      sent++;
                      data.target=list[i].class_name;
                       console.log(data);
                       socket.emit('new_text_from_teacher', data );
                    }
                }
                if(sent===0)
                {
                  alert('At least select One class');
                }
                else{
                  $('#notification_content').val('');
                  $('#notification_heading').val('');
                }

            $('#notification_content').val('');
            $('#notification_heading').val('');



            return false;
        });



});
