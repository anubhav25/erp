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



function teacherDetails(name,mob_no,dob,religion,bg,gender,Nationality,email,voter_card_no,aadhar_card_no,address,city,distt,state,pin,landline,country)
{
	
	this.name=name;
	this.mob_no=mob_no;
    this.dob=dob;
	this.religion=religion;
	this.bg=bg;
	this.gender=gender;
	this.Nationality=Nationality;
    this.email=email;
	this.voter_card_no=voter_card_no;
	this.aadhar_card_no=aadhar_card_no;
	
	this.address=address;
	this.city=city;
	this.distt=distt;
	this.state=state;
	this.pin=pin;
	this.landline=landline;
	this.country=country;
	}







   $('#myform').submit(function(){
	var name=$('#name').val();
var mob_no=$('#mob_no').val();
var dob=$('#dob').val();
var religion=$('#religion').val();
var bg=$('#bg').val();
var gender=$('#gender').val();
var Nationality=$('#Nationality').val();
var email=$('#email').val();
var voter_card_no=$('#voter_card_no').val();
var aadhar_card_no=$('#aadhar_card_no').val();
var address=$('#address').val();
var city=$('#city').val();
var distt=$('#distt').val();
var state=$('#state').val();
var pin=$('#pin').val();
var landline=$('#landline').val();
var country=$('#country').val();

var tcDetails=new teacherDetails(name,mob_no,dob,religion,bg,gender,Nationality,email,voter_card_no,aadhar_card_no,address,city,distt,state,pin,landline,country);

console.log(tcDetails);
	$.post('/setTeacherDetails',tcDetails,function (data) {
			console.log(data)
			if(data.msg==="ok")
			{
				alert("Teacher Added, Password sent to email.");
                $('#name').val('');
                $('#mob_no').val('');
                $('#dob').val('');
                $('#religion').val('');
                $('#bg').val('');
                $('#gender').val('');
                $('#Nationality').val('');
                $('#email').val('');
                $('#voter_card_no').val('');
                $('#aadhar_card_no').val('');
                $('#address').val('');
                $('#city').val('');
                $('#distt').val('');
                $('#state').val('');
                $('#pin').val('');
                $('#landline').val('');
                $('#country').val('');
			}
			else
			{
				alert(data.msg);
			}
		});


	return false;});



});