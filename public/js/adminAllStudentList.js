$(document).ready(function($) {

var student_edit_delete_table = $("#student_edit_delete_table");
var addStudent = $("#addStudent");

$("#addStudent").click(function(){
	window.location.href="admin_addStudent.html";
});

	$.get('/getStudents/0', function(data)
	{
		var StudentCount=data.length;
    console.log(data[0]);

		var i;
		for(i=0;i<StudentCount;i++){
		 

			

			var tr =$('<tr>');
							
							
							tr.append($('<td>').text(data[i].rollno));
							
							tr.append($('<td>').text(data[i].email));
							tr.append($('<td>').text(data[i].name));
							tr.append($('<td>').text(data[i].classs));
							tr.append($('<td>').text(data[i].mob_no));

						

							var input=$('<input>')
										.attr({type : 'button',
											value : 'Edit',
											id : 'edit',
											class : 'edit'});
							

							input.click(function(event)
		                                    {

		                                    	sessionStorage.email = $(event.target).parent().siblings().eq(1).text() 	;
			                    				window.location.href="admin_editStudent.html";

		                           });

							tr.append($('<td>').append(input));
							

							var input=$('<input>')
										.attr({type : 'button',
											value : 'Delete',
											id : 'delete',
											class : 'delete'});
										input.click(function(event)
		                                    {
                                                var a={};
		                                    	 a.email = $(event.target).parent().siblings().eq(1).text() 	;
                                                
		                                    	$.post("/deleteStudent",a,function(data){
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
							
						
							student_edit_delete_table.append(tr);

		}

});
});