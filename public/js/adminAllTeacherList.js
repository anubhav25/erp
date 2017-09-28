$(document).ready(function($) {
var StudentList=[];
var products=[];
var teacher_edit_delete_table = $("#teacher_edit_delete_table");
var addTeacher = $("#addTeacher");
function getStoredProducts()
{
if (!localStorage.products)
{
localStorage.products = JSON.stringify([]);
}
console.log(localStorage.products);
return JSON.parse(localStorage.products);
}

function storeProducts(products)
{
localStorage.products = JSON.stringify(products);
}

var products=getStoredProducts();
$("#addTeacher").click(function(){
	window.location.href="admin_addTeacher.html";
});


	//$.get('/options/', function(data)
	//{
		//var StudentCount=data.length;
		var TeacherCount=products.length;
//		alert(StudentCount);

		var i;
		for(i=0;i<TeacherCount;i++){
		 

			

			var tr =$('<tr>');
							//tr.append($('<td>').text(data.studentRollNo));
							tr.append($('<td>').text(products[i].name));
							tr.append($('<td>').text(products[i].id));
							tr.append($('<td>').text(products[i].name));
							tr.append($('<td>').text(products[i].id));

							//tr.append($('<td>').text(data.studentName));

							var input=$('<input>')
										.attr({type : 'button',
											value : 'Edit',
											id : 'edit',
											class : 'edit'});
							

							input.click(function(event)
		                                    {

		                                    	sessionStorage.email = $(event.target).parent().siblings().eq(3).text() 	;
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
                                                 alert();
		                                    	sessionStorage.email = $(event.target).parent().siblings().eq(3).text() 	;
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
		                                    	 a.email = $(event.target).parent().siblings().eq(3).text() 	;
                                               
		                                    	$.post("/deleteTeacher",a,function(data){
		                                    		if(data.msg=="ok"){
		                                    			alert("delete succesfull");
		                                    			$(event.target).parent().parent().parent().remove($(event.target).parent().parent());
		                                    		}
		                                    		else{
		                                    			alert("error");
		                                    		}
		                                    	});
			                    				 });
		                          
							tr.append($('<td>').append(input));
							
						
							teacher_edit_delete_table.append(tr);
}
		

//}
});