/**
 * Created by ANUBHAV on 21-Sep-17.
 */


$("#submit").click(function (){
    var sem=window.btoa($("#sem").val());
    var rno= window.btoa("2514221").val();
window.location.href = "http://49.50.77.75/Forms/Student/PrintReportCard.aspx?rollno="+rno+"&sem="+sem;
});
