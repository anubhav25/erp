$("#loginbtn").click(function()
	{

		var a=new Object();
		a.username=$('#loginusername').val();
		a.password=$('#loginpassword').val();


		$.post('/login',a,function (data) {
			console.log(data)
			if(data.msg=='ok')
			{
				//console.log(data);
				//document.write(data);
				window.location.href="/dashboard";
			}
			else
			{
				$('#wrongdetails').show('fast');
			}
		});
	});