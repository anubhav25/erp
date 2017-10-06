$(document).ready(function($) {

var teacher_edit_delete_table = $("#teacher_edit_delete_table tbody");
var addTeacher = $("#addTeacher");

$("#addTeacher").click(function(){
	window.location.href="admin_addTeacher.html";
});


	$.get('/getTeacher/0', function(data)
	{
		var TeacherCount=data.length;
		console.log(data);


		var i;
		for(i=0;i<TeacherCount;i++){
		 

			

			var tr =$('<tr>');
							
							tr.append($('<td>').text(data[i].name));
							tr.append($('<td>').text(data[i].email));
							tr.append($('<td>').text(data[i].gender));
							tr.append($('<td>').text(data[i].mob_no));

							//tr.append($('<td>').text(data.studentName));

							var input=$('<input>')
										.attr({type : 'button',
											value : 'Edit',
											id : 'edit',
											class : 'edit'});
							

							input.click(function(event)
		                                    {

		                                    	sessionStorage.email = $(event.target).parent().siblings().eq(1).text() 	;
			                    				window.location.href="admin_editTeacher.html";

		                           });

							tr.append($('<td>').append(input));
							var input=$('<input>')
										.attr({type : 'button',
											value : 'Class Assign',
											id : 'class_assign',
											class : 'class_assign'});
							input.click(function(event)
		                                    {

		                                    	sessionStorage.email = $(event.target).parent().siblings().eq(1).text() 	;
			                    				window.location.href="admin_addTeacherSubject.html";

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
                                               
		                                    	$.post("/deleteTeacher",a,function(data){
		                                    		if(data.msg=="ok"){
		                                    			alert("delete successful");
		                                    			var parent =event.target.parentNode.parentNode.parentNode;
		                                    			var child =event.target.parentNode.parentNode;

		                                    			parent.removeChild(child);
		                                    			if(parent.childNodes.length==0)
														{
															teacher_edit_delete_table.hide();
														}
		                                    		}
		                                    		else{
		                                    			alert("error");
		                                    		}
		                                    	});
			                    				 });
		                          
							tr.append($('<td>').append(input));

						
							teacher_edit_delete_table.append(tr);
							teacher_edit_delete_table.parent().show();

}
		

});
});