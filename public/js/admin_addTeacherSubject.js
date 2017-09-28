$(document).ready(function($) {
   
$("#class_name_btn").click(function(event)
          {
                $("#fill_lab_details_div").hide();
               $("#fill_class_details_div").show();
              
          });
$("#lab_name_btn").click(function(event)
          {
               $("#fill_lab_details_div").show();
               $("#fill_class_details_div").hide();
          });
$("#submit").click(function(event)
          {
                     
               $("#fill_class_details_div").hide();
               $("#fill_lab_details_div").hide();
               
          });
function subjectDetails(sub_name,class_name,sem,group){
this.sub_name=sub_name;
this.class_name=class_name;
this.sem=sem;
this.group=group;


}


$('#submit').click(function (argument) {
     var sub_name=$('#sub_name').val();
var class_name=$('#class_name').val();
var sem=$('#sem').val();
var group=$('#group').val();



var subDetails=new subjectDetails(sub_name,class_name,sem,group);

console.log(tcDetails);
$.post('/addTeacher',tcDetails,function (data) {
               console.log(data)
               if(data.msg=="ok")
               {
                    
               }
               else
               {
                    alert(data.msg);
               }
          });



});



/*
$('form').submit(function(){


	return false;});
*/

  
});