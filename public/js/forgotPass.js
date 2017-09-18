$("#loginbtn").click(function()
	{

		var a=new Object();
		a.rollno=$('#rollno').val();
		a.email=$('#email').val();


		$.post('/forgotPass',a,function (data) {
			console.log(data)
			if(data.msg=='ok')
			{

			}
			else
			{
				$('#wrongdetails').show('fast');
			}
		});
	});