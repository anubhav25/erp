$(document).ready(function($) {
var studentAttendenceList = $("#studentAttendenceList tbody");
var btn = $("#btn");
var submit = $("#submit");
var date = $("#date");
var batch;
var classs;
var sem;
var sub;
var clicked = true;

    var date1 = new Date();

    var day = date1.getDate();
    var month = date1.getMonth() + 1;
    var year = date1.getFullYear();

    if (month < 10) month = "0" + month;
    if (day < 10) day = "0" + day;

    var today = year + "-" + month + "-" + day;       
    $("#date").attr("value", today);

var student_list = $("#student_list");
var left1=$('#left1');
var list;
$.get('/myLectures',function (data){
    list=data;

    var lectureCount=data.length;
    var i;
console.log(data);
    for(i=0;i<lectureCount;i++){
     sub=data[i].sub_name;

        if(data[i].group){

        var input=$('<button>').text(data[i].class_name+'_'+data[i].sem+'_'+data[i].group).attr({ id : i,
                                       class : 'class_name'});

                                input.click(function(event)
                                            {
                                               btn.hide();
                                                var a=parseInt( event.target.id);
                                                console.log(a);
                                               $.get('/getStudentList/'+list[a].class_name+'/'+list[a].sem+'/'+list[a].group,function(student_list){
                                                createList(student_list);
                                               });

                                                 });


                                        btn.append(input);
                                             } 
                   else{
                    var input=$('<button>').text(data[i].class_name+'_'+data[i].sem).attr({ id : i,
                                       class : 'class_name'});

                                  input.click(function(event)
                                            {
                                              btn.hide();
                                                var a= parseInt(event.target.id);
                                           console.log(a);

                                               $.get('/getStudentList/'+list[a].class_name+'/'+list[a].sem,function(student_list){
                                                createList(student_list);
                                               });

                                                });
                                      btn.append(input);

       }                    
    }



});

 var a={};
 function createList(student_list)
    {
      console.log(student_list);
        var StudentCount=student_list.length;
       
        
        var i;
        for(i=0;i<StudentCount;i++){
        batch=student_list[i].batch_name;
        classs=student_list[i].classs;
        sem=student_list[i].sem;

           a[student_list[i].rollno]='false';

            var tr =$('<tr>');
                            
                            tr.append($('<td>').text(student_list[i].name));
                            tr.append($('<td>').text(student_list[i].rollno));

                            

                            var input=$('<input>')
                                        .attr({type : 'button',
                                            id : i,
                                            value:"__A__",
                                            color:'white',
                                        name : student_list[i].name});
                            tr.append($('<td>').append(input));
                             input.click(function(event)
                                            {

                                             var id= event.target.id;
                                             if( a[student_list[id].rollno]==='true')
                                             {
                                                 a[student_list[id].rollno]='false'
                                                 $(this).attr('value','__A__');
                                                 $(this).css('background-color','white');
                                             }
                                             else
                                             {
                                                 a[student_list[id].rollno]='true';
                                                 $(this).attr('value','__P__');
                                                 $(this).css('background-color','#465465');
                                             }
                                             console.log(a);
                                                });
                                             
                            
                            studentAttendenceList.append(tr);
                            studentAttendenceList.parent().show();


        }
var button =$('<input>').attr({
  id:"submit",
  type:'button',
  value:"Submit"

});
button.click(function(event)
                                {
                                  studentAttendenceList.parent().hide();
                                  btn.show();
                                    studentAttendenceList.html('');
                                 
                                  $(this).remove();

var date=$('#date').val();



$.post('/takeAttendanceClass/'+batch+'/'+classs+'/'+sem+'/'+sub+'/'+date,a,function(data){
  if(data.msg=="ok"){
    alert("attendance submitted ");
  }
  else{
 alert(data.msg);
  }
});
});

                                                 
$('#student_list').append(button);


        }




});