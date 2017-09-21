$("#loginbtn").click(function()
{

    var a={};
    a.rollno=$('#rollno').val();
    a.email=$('#email').val();


    $.post('/registerStudent',a,function (data) {
        console.log(data)
        if(data.msg=='ok')
        {
            $('#wrongdetails').hide('fast');
            window.location.href ="/";
        }
        else
        {
            $('#wrongdetails').show('fast');
        }
    });
});

/**
 * Created by ANUBHAV on 18-Sep-17.
 */
