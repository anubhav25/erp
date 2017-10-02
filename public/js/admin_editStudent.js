/*var form  = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');
var error = document.querySelector('.error');

email.addEventListener("input", function (event) {
 
  if (email.validity.valid) {
    
    error.innerHTML = "";
    error.className = "error"; 
  }
}, false);
form.addEventListener("submit", function (event) {
 
  if (!email.validity.valid) {
    
    
    error.innerHTML = "I expect an e-mail, darling!";
    error.className = "error active";
    
    event.preventDefault();
  }
}, false);*/
$(document).ready(function($) {



function studentDetails(name,mob_no,rollno,batch_name,classs,sem,fname,fmob_no,foccupation,mname,dob,religion,bg,gender,Nationality,caste,Category,family_income,voter_card_no,aadhar_card_no,residancy,email,classs_group,address,city,distt,state,pin,landline,country)
{
	
	this.name=name;
	this.mob_no=mob_no;
	this.rollno=rollno;
	this.batch_name=batch_name;
	this.classs=classs;
	this.sem=sem;
	this.fname=fname;
	this.fmob_no=fmob_no;
	this.foccupation=foccupation;
	this.mname=mname;
	this.dob=dob;
	this.religion=religion;
	this.bg=bg;
	this.gender=gender;
	this.Nationality=Nationality;
	this.caste=caste;
	this.Category=Category;
	this.family_income=family_income;
	this.voter_card_no=voter_card_no;
	this.aadhar_card_no=aadhar_card_no;
	this.residancy=residancy;
	this.email=email;
	this.classs_group=classs_group;
	this.address=address;
	this.city=city;
	this.distt=distt;
	this.state=state;
	this.pin=pin;
	this.landline=landline;
	this.country=country;





	
}
$('#submit').click(function (argument) {
var name=$('#name').val();
var mob_no=$('#mob_no').val();
var rollno=$('#rollno').val();
var batch_name=$('#batch_name').val();
var classs=$('#classs').val();
var sem=$('#sem').val();
var fname=$('#fname').val();
var fmob_no=$('#fmob_no').val();
var foccupation=$('#foccupation').val();
var mname=$('#mname').val();
var dob=$('#dob').val();
var religion=$('#religion').val();
var bg=$('#bg').val();
var gender=$('#gender').val();
var Nationality=$('#Nationality').val();
var caste=$('#caste').val();
var Category=$('#Category').val();
var family_income=$('#family_income').val();
var voter_card_no=$('#voter_card_no').val();
var aadhar_card_no=$('#aadhar_card_no').val();
var residancy=$('#residancy').val();
var email=$('#email').val();
var classs_group=$('#classs_group').val();
var address=$('#address').val();
var city=$('#city').val();
var distt=$('#distt').val();
var state=$('#state').val();
var pin=$('#pin').val();
var landline=$('#landline').val();
var country=$('#country').val();

var stDetails=new studentDetails(name,mob_no,rollno,batch_name,classs,sem,fname,fmob_no,foccupation,mname,dob,religion,bg,gender,Nationality,caste,Category,family_income,voter_card_no,aadhar_card_no,residancy,email,classs_group,address,city,distt,state,pin,landline,country);

		$.post('/updateStudentDetails',stDetails,function (data) {
			console.log(data)
			if(data.msg=="ok")
			{
				alert("updated");
			}
			else
			{
				alert(data.msg);
			}
		});
		return false;
	});



var email=sessionStorage.email;
$.get('/getStudentDetails/'+email,function(data)
{
	console.log(data);

	$('#name').val(data.name);
$('#mob_no').val(data.mob_no);
$('#rollno').val(data.rollno);
$('#batch_name').val(data.batch_name);
$('#classs').val(data.classs);
$('#sem').val(data.sem);
$('#fname').val(data.fname);
$('#fmob_no').val(data.fmob_no);
$('#foccupation').val(data.foccupation);
$('#mname').val(data.mname);
$('#dob').val(data.dob);
$('#religion').val(data.religion);
$('#bg').val(data.bg);
$('#gender').val(data.gender);
$('#Nationality').val(data.Nationality);
$('#caste').val(data.caste);
$('#Category').val(data.Category);
$('#family_income').val(data.family_income);
$('#voter_card_no').val(data.voter_card_no);
$('#aadhar_card_no').val(data.aadhar_card_no);
$('#residancy').val(data.residancy);
$('#email').val(data.email);
$('#classs_group').val(data.classs_group);

$('#address').val(data.address);
$('#city').val(data.city);
$('#distt').val(data.distt);
$('#state').val(data.state);
$('#pin').val(data.pin);
$('#landline').val(data.landline);
$('#country').val(data.country);



$('#email').attr('disabled',true);





});



/*$('form').submit(function(){


	return false;});*/

});


