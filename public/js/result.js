/**
 * Created by ANUBHAV on 21-Sep-17.
 */


$("#submit").click(function (){

    var a={
        sem :$("#sem").val()
    };
    $.post('/result',a,function(data){
console.log(data);
        if(data.msg=='ok')
        {
            $('#wrongdetails').hide('fast');
            window.location.href = data.url;
        }
        else
        {
            $('#wrongdetails').show('fast');
        }
    });





});
