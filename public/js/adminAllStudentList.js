$(document).ready(function($) {
var products=[];
var student_edit_delete_table = $("#student_edit_delete_table");
var addStudent = $("#addStudent");
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

$("#addStudent").click(function(){
	window.location.href="admin_addStudent.html";
});

	//$.get('/options/', function(data)
	//{
		//var StudentCount=data.length;
		var StudentCount=products.length;
//		alert(StudentCount);

		var i;
		for(i=0;i<StudentCount;i++){
		 

			

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
		                                    	 a.email = $(event.target).parent().siblings().eq(3).text() 	;
                                                
		                                    	$.post("/deleteStudent",a,function(data){
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
							
						
							student_edit_delete_table.append(tr);

		}

//}
});