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

/*

function studentDetails(name,mob_no,roll_no,batch_name,classs,sem,fname,fmob_no,foccupation,mname,dob,religion,bg,gender,Nationality,caste,Category,family_income,voter_card_no,aadhar_card_no,residancy,mail,address,city,distt,state,pin,landline,country)
{
	
	this.name=name;
	this.mob_no=mob_no;
	this.roll_no=roll_no;
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
	this.mail=mail;
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
var roll_no=$('#roll_no').val();
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
var mail=$('#mail').val();
var address=$('#address').val();
var city=$('#city').val();
var distt=$('#distt').val();
var state=$('#state').val();
var pin=$('#pin').val();
var landline=$('#landline').val();
var country=$('#country').val();

var stDetails=new studentDetails(name,mob_no,roll_no,batch_name,classs,sem,fname,fmob_no,foccupation,mname,dob,religion,bg,gender,Nationality,caste,Category,family_income,voter_card_no,aadhar_card_no,residancy,mail,address,city,distt,state,pin,landline,country);

		$.post('/resistor',stDetails,function (data) {
			console.log(data)
			if(data.msg=="ok")
			{
				
			}
			else
			{
				alert(data.msg);
			}
		});
		return false;
	}


*/





$('form').submit(function(){


	return false;});

});


