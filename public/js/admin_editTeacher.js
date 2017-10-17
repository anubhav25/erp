

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


var email=sessionStorage.email;
$.get('/getTeacherDetails/'+email,function(data)
{
console.log(data);
	$('#name').val(data.name);
$('#mob_no').val(data.mob_no);
$('#dob').val(data.dob);
$('#religion').val(data.religion);
$('#bg').val(data.bg);
$('#gender').val(data.gender);
$('#Nationality').val(data.Nationality);
$('#email').val(data.email);
$('#voter_card_no').val(data.voter_card_no);
$('#aadhar_card_no').val(data.aadhar_card_no);
$('#address').val(data.address);
$('#city').val(data.city);
$('#distt').val(data.distt);
$('#state').val(data.state);
$('#pin').val(data.pin);
$('#landline').val(data.landline);
$('#country').val(data.country);

$('#email').attr('disabled',true);





});





$('form').submit(function(){

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

$.post('/updateTeacherDetails',tcDetails,function (data) {
			console.log(data)
			if(data.msg==="ok")
			{
                alert("Details Updated");
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



return false;
});
});
