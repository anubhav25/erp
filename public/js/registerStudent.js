$("#loginbtn").click(function()
{

    var a={};
    a.rollno=$('#rollno').val();
    a.email=$('#email').val();


    $.post('/registerPass',a,function (data) {
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

/**
 * Created by ANUBHAV on 18-Sep-17.
 */
