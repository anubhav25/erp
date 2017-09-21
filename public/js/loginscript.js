$("#loginbtn").click(function()
	{

		var a=new Object();
		a.username=$('#loginusername').val();
		a.password=$('#loginpassword').val();


		$.post('/login',a,function (data) {
			console.log(data)
			if(data.msg==='ok')
			{
				//console.log(data);
				//document.write(data);
				//alert(data.addr);
				window.location.href=data.addr;
                $('#wrongdetails').hide('fast');
			}
			else
			{
				$('#wrongdetails').show('fast');
			}
		});
	});

$('#a').on('keydown',function (e) {
console.log(e.keyCode);
})