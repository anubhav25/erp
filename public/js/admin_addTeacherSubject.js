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

function subjectDetails(email,class_sub_name,class_class_name,class_sem){
this.sub_name=class_sub_name;
this.class_name=class_class_name;
this.sem=class_sem;

this.email=email;

}

function labDetails(email,lab_sub_name,lab_class_name,lab_sem,lab_group){
this.sub_name=lab_sub_name;
this.class_name=lab_class_name;
this.sem=lab_sem;
this.group=lab_group;
this.email=email;

}




$('#class_submit').click(function (argument) {

			$("#fill_class_details_div").hide();
               $("#fill_lab_details_div").hide();


var email= sessionStorage.email;
     var class_sub_name=$('#class_sub_name').val();
var class_class_name=$('#class_class_name').val();
var class_sem=$('#class_sem').val();


var subDetails=new subjectDetails(email,class_sub_name,class_class_name,class_sem);


$.post('/assignLecture',subDetails,function (data) {
               console.log(data)
               if(data.msg=="ok")
               {
                 alert("added");   
                 addToTable(subDetails);  
               }
               else
               {
                    alert(data.msg);
               }
          });


});


$('#lab_submit').click(function (argument) {

			$("#fill_class_details_div").hide();
               $("#fill_lab_details_div").hide();


var email= sessionStorage.email;
     var lab_sub_name=$('#lab_sub_name').val();
var lab_class_name=$('#lab_class_name').val();
var lab_sem=$('#lab_sem').val();
var lab_group=$('#lab_group').val();

var subDetails=new labDetails(email,lab_sub_name,lab_class_name,lab_sem,lab_group);


$.post('/assignLecture',subDetails,function (data) {
               console.log(data)
               if(data.msg=="ok")
               {
                 alert("added");   
                 addToTable(subDetails);

               }
               else
               {
                    alert(data.msg);
               }
          });


});








$('form').submit(function(){


	return false;});







var subject_edit_delete_table = $("#subject_edit_delete_table");
function addToTable(obj)
{


			var tr =$('<tr>');
							tr.append($('<td>').text(obj.email));
							
							tr.append($('<td>').text(obj.sub_name));
							var a='';
							if(obj.group){
								a="-"+obj.group;
							}
							tr.append($('<td>').text(obj.class_name+a));
						
							tr.append($('<td>').text(obj.sem));


							var input=$('<input>')
										.attr({type : 'button',
											value : 'Delete',
											id : 'delete',
											class : 'delete'});
										input.click(function(event)
		                                    {
                                                var a={};
		                                    	 a.email = $(event.target).parent().siblings().eq(0).text() 	;
                                               
		                                    	$.post("/removeLecture",a,function(data){
		                                    		if(data.msg=="ok"){
		                                    			alert("delete succesfull");
		                                    			var parent =event.target.parentNode.parentNode.parentNode;
		                                    			var child =event.target.parentNode.parentNode;

		                                    			parent.removeChild(child);
		                                    		}
		                                    		else{
		                                    			alert("error");
		                                    		}
		                                    	});
			                    				 });
		                          
							tr.append($('<td>').append(input));
							subject_edit_delete_table.append(tr);

							
}



var email= sessionStorage.email;
	$.get('/getLecture/'+email, function(data)
	{
		var SubjectCount=data.length;
		console.log(data);


		var i;
		for(i=0;i<SubjectCount;i++){
		 
addToTable(data[i]);
			
				}		
							
		

});


  
});